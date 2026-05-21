'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useLang } from '../context/LangContext';

const P = { fontFamily:"'Montserrat',sans-serif" };

const MACHINE_OPTIONS = [
  { key:'chibi',     img:'/images/machine-chibi.png',     name:'"Chibi" Mini',  tag:'Small space' },
  { key:'mid',       img:'/images/machine-mid.png',       name:'Mid Machine',   tag:'Normal space' },
  { key:'stackable', img:'/images/machine-stackable.png', name:'Stackable',     tag:'Mid-large' },
  { key:'big',       img:'/images/machine-big.png',       name:'Big Machine',   tag:'Large space' },
];

type Lang = 'en' | 'ja';

export default function Navbar({ activePage = '' }: { activePage?: string }) {
  const { lang, setLang, jp } = useLang();
  const [scrolled,      setScrolled]      = useState(false);
  const [menuOpen,      setMenuOpen]      = useState(false);
  const [machineHover,  setMachineHover]  = useState(false);
  const machineTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const openMachine  = () => { if (machineTimer.current) clearTimeout(machineTimer.current); setMachineHover(true); };
  const closeMachine = () => { machineTimer.current = setTimeout(() => setMachineHover(false), 220); };

  const navLinks = [
    { label: lang==='ja' ? 'ホーム'    : 'Home',     href:'/#hero' },
    { label: lang==='ja' ? '詳細'      : 'Details',  href:'/#revenue' },
    { label: lang==='ja' ? '景品'      : 'Prizes',   href:'/#prizes' },
    { label: lang==='ja' ? 'FAQ'       : 'FAQ',      href:'/#faq' },
    { label: lang==='ja' ? 'お問い合わせ' : 'Contact', href:'/#contact' },
    { label: lang==='ja' ? '私たちについて' : 'About', href:'/about' },
  ];

  /* ── Shared styles ── */
  // Use CSS classes from globals.css instead of inline style objects
  // This prevents React hydration mismatches from server/client differences

  return (
    <>
      {/* ── Mobile overlay ── */}
      <div style={{
        position:'fixed', inset:0, background:'rgba(250,250,248,0.97)',
        backdropFilter:'blur(24px)', zIndex:999,
        display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:6,
        transform: menuOpen ? 'translateY(0)' : 'translateY(-100%)',
        transition:'transform 0.45s cubic-bezier(0.76,0,0.24,1)',
      }}>
        <div style={{display:'flex',gap:6,marginBottom:24}}>
          {(['en','ja'] as Lang[]).map(l=>(
            <button key={l} onClick={()=>setLang(l)} style={{
              ...P, padding:'8px 20px', borderRadius:100, border:'none', cursor:'pointer',
              fontSize:13, fontWeight:700,
              background: lang===l ? '#ff87c4' : 'rgba(28,16,7,0.07)',
              color: lang===l ? '#fff' : '#4A3728',
              transition:'all 0.2s',
            }}>{l==='en' ? 'English' : '日本語'}</button>
          ))}
        </div>
        {navLinks.map(l=>(
          <Link key={l.href} href={l.href} onClick={()=>setMenuOpen(false)}
            style={{...P,fontSize:32,fontWeight:700,color:'#1C1007',textDecoration:'none',lineHeight:1.5}}>
            {l.label}
          </Link>
        ))}
      </div>

      {/* ── Main Nav ── */}
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main">

        {/* ── LOGO ── */}
        <Link href="/" style={{ display:'flex', alignItems:'center', flexShrink:0, textDecoration:'none' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/amusy-logo.png"
            alt="Amusy"
            style={{ height: scrolled ? 28 : 32, width: 'auto', objectFit: 'contain', display: 'block', transition: 'height 0.3s' }}
          />
        </Link>

        {/* ── Desktop links ── */}
        <div className="desk-nav" style={{display:'flex', gap:22, alignItems:'center'}}>
          {navLinks.map(l=>(
            <Link key={l.href} href={l.href} style={{
              ...P, fontSize:13.5, fontWeight:500, textDecoration:'none',
              color: activePage===l.label.replace(/[^\w]/g,'') ? '#1C1007' : '#4A3728',
              transition:'color 0.2s',
            }}
              onMouseEnter={e=>(e.currentTarget as HTMLElement).style.color='#1C1007'}
              onMouseLeave={e=>(e.currentTarget as HTMLElement).style.color='#4A3728'}
            >{l.label}</Link>
          ))}

        </div>

        {/* ── Right side ── */}
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          {/* Language toggle — desktop */}
          <div className="desk-nav" style={{display:'flex',gap:3,background:'rgba(28,16,7,0.06)',border:'1px solid rgba(28,16,7,0.09)',borderRadius:100,padding:3}}>
            {(['en','ja'] as Lang[]).map(l=>(
              <button key={l} onClick={()=>setLang(l)} style={{
                ...P, padding:'5px 14px', borderRadius:100, border:'none', cursor:'pointer',
                fontSize:11, fontWeight:700,
                background: lang===l ? '#fff' : 'transparent',
                color: lang===l ? '#1C1007' : '#8B6F5E',
                boxShadow: lang===l ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                transition:'all 0.2s',
              }}>{l==='en' ? 'EN' : 'JP'}</button>
            ))}
          </div>

          {/* Mobile space fill to keep hamburger aligned if needed */}


          {/* Hamburger mobile */}
          <button onClick={()=>setMenuOpen(!menuOpen)} className="mob-ham" style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'none',flexDirection:'column',gap:5}}>
            {[0,1,2].map(i=>(
              <span key={i} style={{display:'block',width:22,height:1.5,background:'#1C1007',borderRadius:2,transition:'all 0.3s',
                transform:menuOpen ? i===0?'rotate(45deg) translateY(6.5px)':i===2?'rotate(-45deg) translateY(-6.5px)':'scaleX(0)':'none'}}/>
            ))}
          </button>
        </div>
      </nav>
    </>
  );
}
