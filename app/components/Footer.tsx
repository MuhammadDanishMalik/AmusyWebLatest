'use client';
import Link from 'next/link';

const P = { fontFamily:"'Montserrat',sans-serif" };

export default function Footer() {

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.location.href = `/#${id}`;
  };

  return (
    <footer style={{ background:'#fff', borderTop:'1px solid rgba(28,16,7,0.08)', padding:'clamp(44px,6vw,72px) 0 26px' }}>
      <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 clamp(20px,4vw,64px)' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:36, marginBottom:44 }} className="footer-cols">

          {/* Brand */}
          <div>
            <Link href="/" style={{ display:'block', marginBottom:12, textDecoration:'none' }}>
              <img src="/images/amusy-logo.png" alt="Amusy" style={{ height:32, objectFit:'contain', display:'block' }}/>
            </Link>
            <p style={{ ...P, fontSize:13, color:'#8B6F5E', lineHeight:1.75, maxWidth:200, marginBottom:20 }}>
              Bringing Japanese entertainment to local spaces.
            </p>
            <div style={{ display:'flex', gap:8 }}>
              {[
                { href:'https://www.instagram.com/amusy_entertainment/', label:'Instagram',
                  icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
                { href:'https://www.tiktok.com/@amusy_entertainment', label:'TikTok',
                  icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.33 6.34 6.34 6.34 0 0 0 6.33 6.34 6.34 6.34 0 0 0 6.34-6.34V8.69a8.27 8.27 0 0 0 4.83 1.55V6.79a4.85 4.85 0 0 1-1.06-.1z"/></svg> },
              ].map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  style={{ width:34, height:34, borderRadius:10, background:'rgba(28,16,7,0.04)', border:'1px solid rgba(28,16,7,0.09)', display:'flex', alignItems:'center', justifyContent:'center', color:'#8B6F5E', transition:'all 0.2s', textDecoration:'none' }}
                  onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='#ff87c4';(e.currentTarget as HTMLElement).style.color='#ff87c4';}}
                  onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='rgba(28,16,7,0.09)';(e.currentTarget as HTMLElement).style.color='#8B6F5E';}}
                >{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div style={{ ...P, fontSize:10, fontWeight:700, letterSpacing:'0.14em', color:'#8B6F5E', textTransform:'uppercase', marginBottom:16 }}>
              Navigation
            </div>
            {([
              ['Home',    'hero'],
              ['Details', 'revenue'],
              ['Prizes',  'prizes'],
              ['FAQ',     'faq'],
              ['Contact', 'contact'],
            ] as [string,string][]).map(([label,id])=>(
              <button key={id} onClick={()=>scrollTo(id)}
                style={{ ...P, display:'block', background:'none', border:'none', cursor:'pointer', fontSize:13, color:'#4A3728', padding:'4px 0', marginBottom:1, transition:'color 0.2s', textAlign:'left' }}
                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='#ff87c4'}
                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='#4A3728'}
              >{label}</button>
            ))}
          </div>

          {/* Legal / Pages */}
          <div>
            <div style={{ ...P, fontSize:10, fontWeight:700, letterSpacing:'0.14em', color:'#8B6F5E', textTransform:'uppercase', marginBottom:16 }}>
              Pages
            </div>
            {([
              ['About Us',       '/about'],
              ['Privacy Policy', '/privacy'],
              ['Terms of Service', '/terms'],
            ] as [string,string][]).map(([label,href])=>(
              <Link key={href} href={href}
                style={{ ...P, display:'block', fontSize:13, color:'#4A3728', padding:'4px 0', marginBottom:1, textDecoration:'none', transition:'color 0.2s' }}
                onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='#ff87c4'}
                onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='#4A3728'}
              >{label}</Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{ ...P, fontSize:10, fontWeight:700, letterSpacing:'0.14em', color:'#8B6F5E', textTransform:'uppercase', marginBottom:16 }}>
              Contact
            </div>
            <a href="mailto:info@amusyentertainment.com"
              style={{ ...P, display:'flex', alignItems:'center', gap:7, fontSize:13, color:'#4A3728', padding:'4px 0', marginBottom:6, textDecoration:'none', transition:'color 0.2s' }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='#ff87c4'}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='#4A3728'}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              info@amusyentertainment.com
            </a>
            <div style={{ ...P, fontSize:13, color:'#8B6F5E', padding:'4px 0', marginBottom:6, display:'flex', alignItems:'center', gap:7 }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Greater Seattle WA &amp; beyond
            </div>
            <a href="https://www.instagram.com/amusy_entertainment/" target="_blank" rel="noopener noreferrer"
              style={{ ...P, display:'flex', alignItems:'center', gap:7, fontSize:13, color:'#4A3728', padding:'4px 0', marginBottom:16, textDecoration:'none', transition:'color 0.2s' }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='#ff87c4'}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='#4A3728'}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              @amusy_entertainment
            </a>
            <Link href="/#contact"
              style={{ ...P, display:'inline-block', background:'#ff87c4', color:'#fff', borderRadius:100, padding:'9px 20px', fontSize:12.5, fontWeight:700, textDecoration:'none', transition:'all 0.2s' }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background='#e56ba8'}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background='#ff87c4'}
            >
              Become a Partner →
            </Link>
          </div>

        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:'1px solid rgba(28,16,7,0.07)', paddingTop:22, display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'space-between', gap:12 }}>
          <p style={{ ...P, fontSize:12, color:'#8B6F5E' }}>© 2024 Amusy Entertainment LLC. All rights reserved.</p>
          <div style={{ display:'flex', gap:16, alignItems:'center', flexWrap:'wrap' }}>
            <Link href="/about" style={{ ...P, fontSize:11.5, color:'#8B6F5E', textDecoration:'none', transition:'color 0.2s' }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='#1C1007'}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='#8B6F5E'}
            >About Us</Link>
            <Link href="/privacy" style={{ ...P, fontSize:11.5, color:'#8B6F5E', textDecoration:'none', transition:'color 0.2s' }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='#1C1007'}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='#8B6F5E'}
            >Privacy</Link>
            <Link href="/terms" style={{ ...P, fontSize:11.5, color:'#8B6F5E', textDecoration:'none', transition:'color 0.2s' }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='#1C1007'}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='#8B6F5E'}
            >Terms</Link>
          </div>
        </div>
      </div>

      <style>{`
        .footer-cols { display: grid; }
        @media (max-width: 900px) { .footer-cols { grid-template-columns: 1fr 1fr !important; gap: 28px !important; } }
        @media (max-width: 560px) { .footer-cols { grid-template-columns: 1fr !important; } }
      `}
      </style>
    </footer>
  );
}
