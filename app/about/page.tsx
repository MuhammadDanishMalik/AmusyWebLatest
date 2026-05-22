'use client';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const P = { fontFamily:"'Montserrat',sans-serif" };

export default function AboutPage() {
  return (
    <div style={{background:'#FAFAF8', minHeight:'100vh'}}>
      <Navbar activePage="About"/>

      {/* ── TOP BANNER — About Us hero image ── */}
      <div style={{
        paddingTop: 72,
        position: 'relative', overflow: 'hidden',
      }}>
        <img src="/images/banner-main.png" alt="Amusy — About Us"
          style={{
            width: '100%',
            maxHeight: 420,
            objectFit: 'cover',
            display: 'block',
          }}/>
      </div>

      <main style={{maxWidth:800, margin:'0 auto', padding:'56px clamp(20px,4vw,48px) 80px'}}>

        {/* ── How We Started ── */}
        <div style={{background:'#fff', border:'1px solid rgba(0,0,0,0.07)', borderRadius:20, padding:'32px 36px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', marginBottom:24}}>
          <h2 style={{...P, fontSize:20, fontWeight:700, color:'#1C1007', marginBottom:14}}>How We Started</h2>
          {/* First paragraph moved here from the removed intro section */}
          <p style={{...P, fontSize:15, color:'#4A3728', lineHeight:1.85, marginBottom:14}}>
            Amusy Entertainment was founded locally with a single vision: share the excitement and charm of authentic Japanese claw machine culture with the Greater Seattle community — and beyond.
          </p>
          <p style={{...P, fontSize:15, color:'#4A3728', lineHeight:1.85}}>
            We discovered that store owners wanted unique entertainment for their customers, and we had the means to provide it — at zero cost. What started as a passion project has grown into a network of 50+ locations across the Greater Seattle area.
          </p>
        </div>

        {/* ── What Makes Us Different ── */}
        <div style={{background:'#fff', border:'1px solid rgba(0,0,0,0.07)', borderRadius:20, padding:'32px 36px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', marginBottom:24}}>
          <h2 style={{...P, fontSize:20, fontWeight:700, color:'#1C1007', marginBottom:14}}>What Makes Us Different</h2>
          <p style={{...P, fontSize:15, color:'#4A3728', lineHeight:1.85}}>
            We specialize exclusively using only authentic licensed & branded products that include Sanrio, popular kawaii brands (YELL, Amufun, SK Japan Furyuu, +more), figures, and other Japanese collectibles. We rotate prizes monthly, ensuring customers always have a reason to return. And because we cover every expense. Machines, installation, restocking, and maintenance.
          </p>
        </div>

        {/* ── Licensed & Compliant ── */}
        <div style={{background:'#fff', border:'1px solid rgba(34,197,94,0.2)', borderRadius:20, padding:'24px 32px', display:'flex', alignItems:'flex-start', gap:16, marginBottom:40}}>
          <div style={{width:40, height:40, borderRadius:'50%', background:'rgba(34,197,94,0.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div>
            <div style={{...P, fontSize:14, fontWeight:700, color:'#1C1007', marginBottom:6}}>Licensed & Fully Compliant</div>
            <p style={{...P, fontSize:13.5, color:'#4A3728', lineHeight:1.75}}>
              All Amusy locations in Washington State operate under our Master Amusement Operator License, issued by the Washington State Gambling Commission. We handle all required permits for every location we operate in.
            </p>
          </div>
        </div>

        {/* ── Partner With Us button only ── */}
        <div style={{textAlign:'center'}}>
          <Link href="/register" style={{
            ...P, display:'inline-block', background:'#ff87c4', color:'#fff',
            borderRadius:100, padding:'14px 44px', fontSize:15, fontWeight:700,
            textDecoration:'none', transition:'all 0.2s',
            boxShadow:'0 4px 18px rgba(255,135,196,0.35)',
          }}
            onMouseEnter={e=>(e.currentTarget as HTMLElement).style.background='#e56ba8'}
            onMouseLeave={e=>(e.currentTarget as HTMLElement).style.background='#ff87c4'}
          >Partner With Us →</Link>
        </div>

      </main>

      {/* ── BRAND BANNER at bottom of About page (#8) ── */}
      <div style={{
        background:'linear-gradient(135deg,#fff5f9 0%,#fff0f5 50%,#fff5f9 100%)',
        padding:'64px 20px',
        textAlign:'center',
        borderTop:'1px solid rgba(255,135,196,0.15)',
        position:'relative',
        overflow:'hidden',
      }}>
        {/* Full Amusy watermark pattern */}
        <div style={{
          position:'absolute', inset:0, opacity:0.09,
          backgroundImage:`url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='90' height='90'><text y='48' x='5' font-size='14' fill='%23ff87c4' font-family='sans-serif'>Amusy</text><circle cx='70' cy='20' r='8' fill='%23ff87c4'/><circle cx='15' cy='75' r='6' fill='%23ff87c4'/></svg>")`,
          backgroundSize:'90px 90px',
          pointerEvents:'none',
        }}/>
        <div style={{position:'relative', zIndex:1}}>
          <img src="/images/amusy-logo.png" alt="Amusy"
            style={{height:72, objectFit:'contain', display:'block', margin:'0 auto 12px'}}/>
          <p style={{
            ...P, fontSize:20, color:'#ff87c4', fontWeight:700, letterSpacing:'0.06em',
          }}>Japanese Claw Machines</p>
        </div>
      </div>

      <Footer/>
    </div>
  );
}
