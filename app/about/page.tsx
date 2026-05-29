'use client';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLang } from '../context/LangContext';
import { t } from '../translations';

const P = { fontFamily:"'Montserrat',sans-serif" };

export default function AboutPage() {
  const { lang } = useLang();
  const tx = lang === 'ja' ? t.ja : t.en;
  return (
    <div style={{background:'#FAFAF8', minHeight:'100vh'}}>
      <Navbar activePage="About"/>

      {/* ── HERO BANNER with Amusy pattern background ── */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#fff5f9',
        paddingTop: 80,
        paddingBottom: 0,
        textAlign: 'center',
      }}>
        {/* Amusy repeating pattern */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("/images/client/bg-logo-transparent.png")',
          backgroundSize: '600px',
          backgroundRepeat: 'repeat',
          opacity: 0.35,
          pointerEvents: 'none',
        }}/>
        {/* Soft radial pink glow in the centre */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,135,196,0.18) 0%, transparent 80%)',
          pointerEvents: 'none',
        }}/>
        {/* About-amusy image sitting on top */}
        <div style={{ position: 'relative', zIndex: 1, display: 'inline-block' }}>
          <img
            src="/images/client/about-amusy.png"
            alt="About Amusy"
            style={{
              maxWidth: 380,
              width: '100%',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 16px 40px rgba(255,135,196,0.28))',
            }}
          />
        </div>
      </div>

      <main style={{maxWidth:900, margin:'0 auto', padding:'52px clamp(20px,4vw,48px) 80px'}}>

        {/* ── Two column paragraphs ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, marginBottom:48 }} className="grid-2-about">
          <p style={{...P, fontSize:16, color:'#4A3728', lineHeight:1.85, textAlign:'center'}}>
            {tx.about.col1}
          </p>
          <p style={{...P, fontSize:16, color:'#4A3728', lineHeight:1.85, textAlign:'center'}}>
            {tx.about.col2}
          </p>
        </div>

        {/* ── What Makes Us Different ── */}
        <div style={{background:'#fff', border:'1px solid rgba(0,0,0,0.07)', borderRadius:20, padding:'32px 36px', boxShadow:'0 2px 8px rgba(0,0,0,0.04)', marginBottom:24}}>
          <h2 style={{...P, fontSize:20, fontWeight:700, color:'#1C1007', marginBottom:14}}>{tx.about.diffTitle}</h2>
          <p style={{...P, fontSize:15, color:'#4A3728', lineHeight:1.85}}>
            {tx.about.diffBody}
          </p>
        </div>

        {/* ── Licensed & Compliant ── */}
        <div style={{background:'#fff', border:'1px solid rgba(34,197,94,0.2)', borderRadius:20, padding:'24px 32px', display:'flex', alignItems:'flex-start', gap:16, marginBottom:40}}>
          <div style={{width:40, height:40, borderRadius:'50%', background:'rgba(34,197,94,0.1)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div>
            <div style={{...P, fontSize:14, fontWeight:700, color:'#1C1007', marginBottom:6}}>{tx.about.licenseTitle}</div>
            <p style={{...P, fontSize:13.5, color:'#4A3728', lineHeight:1.75}}>
              {tx.about.licenseBody}
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
          >{tx.about.cta}</Link>
        </div>

      </main>

      {/* ── BRAND BANNER at bottom of About page ── */}
      <div style={{
        position:'relative', overflow:'hidden',
        background:'#fff5f9',
        padding:'72px 20px', textAlign:'center',
        borderTop:'1px solid rgba(255,135,196,0.15)',
      }}>
        <div style={{
          position:'absolute', inset:0,
          backgroundImage:'url("/images/client/bg-logo-transparent.png")',
          backgroundSize:'700px',
          backgroundRepeat:'repeat',
          opacity: 0.30,
          pointerEvents:'none',
        }}/>
        <div style={{position:'relative', zIndex:1}}>
          <img src="/images/end-logo-transparent.png" alt="Amusy — Japanese Claw Machines"
            style={{height:160,objectFit:'contain',display:'block',margin:'0 auto'}}/>
        </div>
      </div>

      <Footer/>

      <style>{`
        @media(max-width:700px){
          .grid-2-about { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  );
}
