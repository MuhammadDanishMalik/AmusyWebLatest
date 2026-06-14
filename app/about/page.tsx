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
    <div style={{background:'#ffffff', minHeight:'100vh'}}>
      <Navbar activePage="About"/>

      {/* ── HERO BANNER ── */}
      <div style={{
        background: '#ffffff',
        paddingTop: 100,
        paddingBottom: 0,
        textAlign: 'center',
        position: 'relative',
      }}>
        <img
          src="/images/client/about-us-hero.png"
          alt="About Amusy — Japanese Claw Machines"
          style={{
            maxWidth: 800,
            width: '95%',
            objectFit: 'contain',
            display: 'block',
            margin: '0 auto',
          }}
        />
      </div>

      <main style={{maxWidth:900, margin:'0 auto', padding:'52px clamp(20px,4vw,48px) 80px'}}>

        {/* ── Two column paragraphs ── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:40, marginBottom:48 }} className="grid-2-about">
          <p style={{...P, fontSize:18, color:'#4A3728', lineHeight:1.85, textAlign:'center'}}>
            {tx.about.col1}
          </p>
          <p style={{...P, fontSize:18, color:'#4A3728', lineHeight:1.85, textAlign:'center'}}>
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

      {/* ── BOTTOM WALLPAPER + MACHINE PHOTO ── */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url("/images/client/updated-wallpaper.jpg")',
          backgroundSize: '550px',
          backgroundRepeat: 'repeat',
          backgroundPosition: '0 0',
          opacity: 1,
          pointerEvents: 'none',
        }}/>
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', padding: '48px 20px' }}>
          <img src="/images/client/about-bottom.png" alt="Amusy Machine Setup"
            style={{ maxWidth: 700, width: '100%', objectFit: 'contain', display: 'block', borderRadius: 20 }}/>
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
