'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const P = { fontFamily:"'Montserrat',sans-serif" };

export default function Navbar({ activePage = '' }: { activePage?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const navLinks = [
    { label: 'Home',    href:'/#hero' },
    { label: 'Details', href:'/#revenue' },
    { label: 'Prizes',  href:'/#prizes' },
    { label: 'FAQ',     href:'/#faq' },
    { label: 'Contact', href:'/#contact' },
  ];

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
