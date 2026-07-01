import { NextRequest, NextResponse } from 'next/server';
import { request as httpsRequest } from 'https';

// ─────────────────────────────────────────────────────────────────────────────
//  ONLY TWO THINGS TO CHANGE:
//
//  1. CONTACT_EMAIL  → the email address where form submissions arrive
//  2. RESEND_API_KEY → get a free key at https://resend.com (100 emails/day free)
//
//  Put these in .env.local in the project root — never commit that file.
// ─────────────────────────────────────────────────────────────────────────────
const CONTACT_EMAIL  = process.env.CONTACT_EMAIL  ?? 'danishawan.one@gmail.com';
const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';

function escHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** Send email via Resend REST API — uses only Node.js built-in https module. */
function sendViaResend(payload: object): Promise<{ ok: boolean; body: string }> {
  return new Promise((resolve, reject) => {
    const json = JSON.stringify(payload);

    const req = httpsRequest(
      {
        hostname: 'api.resend.com',
        path: '/emails',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(json),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk: Buffer) => (body += chunk.toString()));
        res.on('end', () => resolve({ ok: (res.statusCode ?? 0) < 300, body }));
      }
    );

    req.on('error', reject);
    req.write(json);
    req.end();
  });
}

export async function POST(req: NextRequest) {
  if (!RESEND_API_KEY) {
    return NextResponse.json(
      { error: 'Email service is not configured yet. Please add RESEND_API_KEY to .env.local.' },
      { status: 500 }
    );
  }

  try {
    const body = await req.json();
    const { name, phone, email, address, questions } = body as Record<string, string>;

    if (!name || !email || !phone || !address) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<style>
  body{font-family:Arial,sans-serif;background:#FAFAF8;margin:0;padding:0}
  .wrap{max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08)}
  .head{background:linear-gradient(135deg,#ff87c4,#e56ba8);padding:32px 36px}
  .head h1{color:#fff;margin:0;font-size:22px;font-weight:700}
  .head p{color:rgba(255,255,255,.85);margin:6px 0 0;font-size:13px}
  .body{padding:32px 36px}
  .lbl{font-size:11px;font-weight:700;color:#ff87c4;text-transform:uppercase;letter-spacing:.08em;margin-bottom:4px}
  .val{font-size:15px;color:#1C1007;font-weight:600;margin-bottom:2px}
  hr{border:none;border-top:1px solid #F0EDE9;margin:18px 0}
  .foot{background:#FDF5F7;padding:20px 36px;text-align:center;font-size:11.5px;color:#8B6F5E}
  .badge{display:inline-block;background:#ff87c4;color:#fff;border-radius:100px;padding:3px 12px;font-size:11px;font-weight:700;margin-bottom:12px}
</style>
</head>
<body>
<div class="wrap">
  <div class="head">
    <div class="badge">New Lead</div>
    <h1>Partnership Request Received</h1>
    <p>Someone wants to partner with Amusy Entertainment!</p>
  </div>
  <div class="body">
    <div class="lbl">Full Name</div>
    <div class="val">${escHtml(name)}</div>
    <hr/>
    <div class="lbl">Email Address</div>
    <div class="val"><a href="mailto:${escHtml(email)}" style="color:#ff87c4;text-decoration:none">${escHtml(email)}</a></div>
    <hr/>
    <div class="lbl">Phone Number</div>
    <div class="val">${escHtml(phone)}</div>
    <hr/>
    <div class="lbl">Business Address</div>
    <div class="val">${escHtml(address)}</div>
    ${questions ? `<hr/><div class="lbl">Questions / Notes</div><div class="val" style="white-space:pre-wrap;font-weight:400;color:#4A3728">${escHtml(questions)}</div>` : ''}
  </div>
  <div class="foot">
    Sent automatically by the Amusy website contact form.<br/>
    Reply directly to this email to respond to <strong>${escHtml(name)}</strong>.
  </div>
</div>
</body>
</html>`;

    const result = await sendViaResend({
      // "onboarding@resend.dev" works for testing without a custom domain.
      // Once the client verifies their domain on Resend, change this to their own address.
      from: 'Amusy Contact Form <onboarding@resend.dev>',
      to:   [CONTACT_EMAIL],
      reply_to: email,          // hitting Reply goes straight to the lead
      subject: `New Partnership Request - ${name}`,
      html,
    });

    if (!result.ok) {
      console.error('[contact/route] Resend error:', result.body);
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('[contact/route] error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
