'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLang } from '../context/LangContext';
import { t } from '../translations';

const P = { fontFamily:"'Montserrat',sans-serif" };

export default function Navbar({ activePage = '' }: { activePage?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { lang, setLang } = useLang();
  const isJP = lang === 'ja';
  const tx = isJP ? t.ja.nav : t.en.nav;

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  const navLinks = [
    { label: tx.home,    href:'/#hero' },
    { label: tx.details, href:null, children: [
      { label: tx.prizes,   href:'/#prizes' },
      { label: tx.machines, href:'/#machines' },
    ]},
    { label: tx.faq,     href:'/#faq' },
    { label: tx.contact, href:'/#contact' },
    { label: tx.aboutUs, href:'/about' },
  ];

  const linkStyle = (label: string) => ({
    ...P, fontSize: 13.5, fontWeight: 500, textDecoration: 'none' as const,
    color: activePage === label.replace(/[^\w]/g, '') ? '#1C1007' : '#4A3728',
    transition: 'color 0.2s',
  });

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
        {navLinks.map(l => (
          l.children ? (
            <div key={l.label} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
              <span style={{...P, fontSize:32, fontWeight:700, color:'#1C1007', lineHeight:1.5}}>{l.label}</span>
              {l.children.map(c => (
                <Link key={c.href} href={c.href} onClick={() => setMenuOpen(false)}
                  style={{...P, fontSize:24, fontWeight:600, color:'#ff87c4', textDecoration:'none', lineHeight:1.5}}>
                  {c.label}
                </Link>
              ))}
            </div>
          ) : (
            <Link key={l.href!} href={l.href!} onClick={() => setMenuOpen(false)}
              style={{...P, fontSize:32, fontWeight:700, color:'#1C1007', textDecoration:'none', lineHeight:1.5}}>
              {l.label}
            </Link>
          )
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
          {navLinks.map(l => (
            l.children ? (
              <div
                key={l.label}
                style={{ position:'relative' }}
                onMouseEnter={() => setDetailsOpen(true)}
                onMouseLeave={() => setDetailsOpen(false)}
              >
                <span style={{
                  ...linkStyle(l.label),
                  cursor:'pointer',
                  display:'inline-flex', alignItems:'center', gap:4,
                }}>
                  {l.label}
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{
                    transition:'transform 0.2s',
                    transform: detailsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
                {/* Dropdown */}
                <div style={{
                  position:'absolute', top:'100%', left:'50%', transform:'translateX(-50%)',
                  paddingTop: 8,
                  opacity: detailsOpen ? 1 : 0,
                  pointerEvents: detailsOpen ? 'auto' : 'none',
                  transition:'opacity 0.2s ease, transform 0.2s ease',
                }}>
                  <div style={{
                    background:'#fff',
                    border:'1px solid var(--border)',
                    borderRadius: 14,
                    padding:'8px 6px',
                    boxShadow:'0 8px 32px rgba(0,0,0,0.1)',
                    minWidth: 140,
                    display:'flex', flexDirection:'column', gap:2,
                  }}>
                    {l.children.map(c => (
                      <Link key={c.href} href={c.href}
                        onClick={() => setDetailsOpen(false)}
                        style={{
                          ...P, fontSize:13, fontWeight:500, textDecoration:'none',
                          color:'#4A3728', padding:'8px 14px', borderRadius:10,
                          transition:'background 0.15s, color 0.15s',
                          display:'block',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background='#fff0f5'; e.currentTarget.style.color='#ff87c4'; }}
                        onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#4A3728'; }}
                      >{c.label}</Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={l.href!} href={l.href!} style={linkStyle(l.label)}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.color='#1C1007'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.color='#4A3728'}
              >{l.label}</Link>
            )
          ))}
        </div>

        {/* ── Right side ── */}
        <div style={{display:'flex',alignItems:'center',gap:12}}>

          {/* EN / JP iOS segmented pill — matches client PDF */}
          <div style={{
            display:'flex', alignItems:'center',
            background:'rgba(120,100,90,0.10)',
            borderRadius:50, padding:3,
            boxShadow:'inset 0 1px 3px rgba(0,0,0,0.10)',
          }}>
            {(['EN','JP'] as const).map(l => {
              const active = (l === 'EN' && lang === 'en') || (l === 'JP' && lang === 'ja');
              return (
                <button key={l}
                  onClick={() => setLang(l === 'EN' ? 'en' : 'ja')}
                  style={{
                    ...P, fontSize:12, fontWeight:700, border:'none', cursor:'pointer',
                    padding:'5px 14px', borderRadius:50,
                    background: active ? '#fff' : 'transparent',
                    color: active ? '#3A2518' : '#8B6F5E',
                    boxShadow: active ? '0 1px 4px rgba(0,0,0,0.15)' : 'none',
                    transition:'all 0.22s ease',
                    letterSpacing:'0.04em',
                  }}
                >{l}</button>
              );
            })}
          </div>

          {/* Hamburger mobile */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="mob-ham" style={{background:'none',border:'none',cursor:'pointer',padding:4,display:'none',flexDirection:'column',gap:5}}>
            {[0,1,2].map(i => (
              <span key={i} style={{display:'block',width:22,height:1.5,background:'#1C1007',borderRadius:2,transition:'all 0.3s',
                transform:menuOpen ? i===0?'rotate(45deg) translateY(6.5px)':i===2?'rotate(-45deg) translateY(-6.5px)':'scaleX(0)':'none'}}/>
            ))}
          </button>
        </div>
      </nav>
    </>
  );
}
