'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Wrench, HandCoins } from 'lucide-react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useLang } from './context/LangContext';
import { t } from './translations';


/* ─── DATA ─── */
const TAB_DATA = [
  { tab:'Restaurant', headline:'Keep diners entertained, longer.', body:"Guests waiting for tables or finishing meals spend time at the machine. Average table turn time stays the same — but customers leave happier and spend more.", imgs:['/images/client/restaurant-1.jpg', '/images/client/restaurant-2.jpg'], note:'Ideal for : Casual dining, Dessert shops, Boba Tea Shops, Food courts, Bars' },
  { tab:'Retail Store', headline:'Drive foot traffic and repeat visits.', body:"Customers return to your store specifically to try the machine — and they browse while they're there. The machine pays for itself and then some.", imgs:['/images/client/retail-1.jpg', '/images/client/retail-2.jpg'], note:'Ideal for : gift shops, hobby stores, anime stores' },
  { tab:'Shopping Mall', headline:'Activate unused floor space.', body:'Empty corners and transition areas become revenue-generating attractions. Our machines are compact, striking, and maintained at our expense.', imgs:['/images/client/mall-1.jpg', '/images/client/mall-2.jpg'], note:'Ideal for : market entrances, foodcourt area, hallways' },
  { tab:'Market', headline:'Bring excitement to high-traffic spaces.', body:'Markets and food halls attract crowds looking for something new. Our machines create a natural gathering point — customers linger longer and spend more.', imgs:['/images/client/market-1.jpg', '/images/client/mall-1.jpg'], note:'Ideal for : market entrances, foodcourt area, hallways' },
];

const MACHINES = [
  { key:'chibi', img:'/images/machine-chibi.png', name:'Mini Machine', tag:'Best for small space', specs:[{k:'Width',v:'30cm  ·  1ft 1.7in'},{k:'Depth',v:'45cm  ·  1ft 1.5in'},{k:'Height',v:'156cm  ·  5ft 1in'},{k:'Power',v:'110v/220v, 40w'}], note:null },
  { key:'mid',   img:'/images/machine-mid.png',   name:'Mid Machine',     tag:'Best for normal space', specs:[{k:'Width',v:'35cm  ·  1ft 1.7in'},{k:'Depth',v:'35cm  ·  1ft 1.7in'},{k:'Height',v:'164cm  ·  5ft 4in'},{k:'Power',v:'110v/220v, 50w'}], note:null },
  { key:'stack', img:'/images/machine-stackable.png', name:'Stackable Machine', tag:'Best for mid-large space', specs:[{k:'Width',v:'60cm  ·  2ft'},{k:'Depth',v:'45cm  ·  1.5ft'},{k:'Height',v:'168cm  ·  5.5ft'},{k:'Power',v:'110v / 220v, 100w'}], note:'* Token Dispenser Required' },
  { key:'big',   img:'/images/machine-big.png',   name:'Big Machine',     tag:'Best for larger space', specs:[{k:'Width',v:'80cm  ·  1ft 1.7in'},{k:'Depth',v:'85cm  ·  1ft 1.7in'},{k:'Height',v:'195cm  ·  5ft 4in'},{k:'Power',v:'80–250w'}], note:null },
];

const FAQ_EN = [
  { q:'Is it really free to place a machine?', a:'Yes, 100%. Amusy covers the machine cost, installation, prizes, maintenance, and restocking. All we need from you is floor space, wifi, and access to an outlet.' },
  { q:'How much space is required?', a:"Our smallest (Chibi) machines need just 2×2ft of space. Larger stackable units need 5–10ft. We'll recommend the right size for your store after a quick consultation." },
  { q:'How often are prizes restocked?', a:"We check and refill machines at least once a week to once a month, depending on popularity at your location. New prize drops are rotated in monthly." },
  { q:'What is the revenue share?', a:"We offer a percentage of monthly gross commissions. The amount depends on foot traffic and store type. We can also arrange a flat monthly payment — contact us for details." },
  { q:'Are permits or licenses required?', a:'Yes, Amusy handles all permits. For example, in WA state we hold a master Amusement Operator License from the WA Gambling Commission. We will ensure to handle any local required permits in the state/city/county the business is located in.' },
  { q:'How do I know the machines are fair?', a:'We pride ourselves in providing claw machines that are actually winnable with high quality prizes. We are fully transparent that most of our machines do take more than one play to win, and skill. We are also flexible in allowing play until you win settings on most of our machines!' },
  { q:'What happens if there is a machine issue?', a:'We take care of all issues seriously & in a timely manner. Any Servicing, or maintenance will be completed as soon as possible within the next business day.' },
  { q:'What kind of prizes are used?', a:'We use a mix of cute & high quality prizes suitable for all ages from popular Japanese prize makers. Such as YELL, Amufun, Furyuu, SK Japan, +more. These prizes include plushies, squishes, figures, keychains, & more. All prizes are branded, licensed, & authentic.' },
];


const ALL_PRIZES = [
  '/images/client/prize-1.jpg','/images/client/prize-2.jpg','/images/client/prize-3.jpg',
  '/images/client/prize-4.jpg','/images/client/prize-5.jpg','/images/client/prize-6.jpg',
  '/images/client/prize-7.jpg','/images/client/prize-8.jpg','/images/client/prize-9.jpg',
  '/images/client/prize-10.jpg','/images/client/prize-11.jpg','/images/client/prize-12.jpg',
  '/images/client/prize-13.jpg','/images/client/prize-14.jpg','/images/client/prize-15.jpg',
  '/images/client/prize-16.jpg','/images/client/prize-17.jpg','/images/client/prize-18.jpg',
  '/images/client/prize-19.jpg','/images/client/prize-20.jpg','/images/client/prize-21.jpg',
  '/images/client/prize-22.jpg','/images/client/prize-23.jpg',
];

const VIDEOS = [
  { src:'https://res.cloudinary.com/dtp8nm0ai/video/upload/q_auto/f_auto/v1777470818/WhatsApp_Video_2026-04-29_at_18.50.11_nzk3wx.mp4', poster: 'https://res.cloudinary.com/dtp8nm0ai/video/upload/q_auto/f_auto/so_0/v1777470818/WhatsApp_Video_2026-04-29_at_18.50.11_nzk3wx.jpg', label:'Guest Review' },
  { src:'https://res.cloudinary.com/dtp8nm0ai/video/upload/q_auto/f_auto/v1777470818/WhatsApp_Video_2026-04-29_at_18.49.57_skebfo.mp4', poster: 'https://res.cloudinary.com/dtp8nm0ai/video/upload/q_auto/f_auto/so_2.5/v1777470818/WhatsApp_Video_2026-04-29_at_18.49.57_skebfo.jpg', label:'New setup!' },
  { src:'https://res.cloudinary.com/dtp8nm0ai/video/upload/q_auto/f_auto/v1777470817/WhatsApp_Video_2026-04-29_at_18.50.01_pvasz7.mp4', poster: 'https://res.cloudinary.com/dtp8nm0ai/video/upload/q_auto/f_auto/so_0/v1777470817/WhatsApp_Video_2026-04-29_at_18.50.01_pvasz7.jpg', label:'New prizes' },
  { src:'https://res.cloudinary.com/dtp8nm0ai/video/upload/q_auto/f_auto/v1777470817/WhatsApp_Video_2026-04-29_at_18.50.06_qprom0.mp4', poster: 'https://res.cloudinary.com/dtp8nm0ai/video/upload/q_auto/f_auto/so_0/v1777470817/WhatsApp_Video_2026-04-29_at_18.50.06_qprom0.jpg', label:'Sakuracon 2026' },
];

/* ─── FAQ FLOATING ICONS ─── */
const FAQ_ICONS = ['🗼','🧸','🌸','✨','🌸','💖','🗼','🧸','✨','💖'];
function FaqFloatingIcons() {
  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
      {FAQ_ICONS.slice(0,7).map((icon, i) => (
        <motion.div
          key={i}
          initial={{ opacity:0, y:30, x: (i % 2 === 0 ? -1 : 1) * Math.random() * 60 + 20, scale:0.4 }}
          animate={{ opacity:[0, 0.7, 0], y:[-10, -60-i*8, -100-i*10], scale:[0.5, 0.9, 0.6], rotate: (i%2===0?-15:15) }}
          transition={{ duration: 2.5 + i*0.3, delay: i*0.12, ease:'easeOut' }}
          style={{
            position:'absolute',
            bottom: 8,
            left: `${12 + i * 13}%`,
            fontSize: 16 + (i%3)*4,
            userSelect:'none',
          }}
        >
          {icon}
        </motion.div>
      ))}
    </div>
  );
}

/* ─── MACHINE ROW (linear spread, slight tilt, all 4 visible) ─── */
// Tilts: slight, outer cards tilt more outward
const MACHINE_TILTS = [-6, -2, 2, 6];
// Y-offsets: outer cards drop slightly for natural fan
const MACHINE_Y = [18, 8, 8, 18];

function MachineFan({ machines, tryFree }: { machines: typeof MACHINES; tryFree: string }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState(0);

  return (
    <div>
      {/* Linear row — all 4 cards visible side by side with slight tilt */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 14,
        padding: '32px 0 16px',
        position: 'relative',
      }}>
        {machines.map((m, i) => {
          const isHov = hovered === i;
          const isSel = selected === i;
          const tilt = isHov || isSel ? 0 : MACHINE_TILTS[i];
          const yOff = isHov || isSel ? -8 : MACHINE_Y[i];
          const sc   = isHov ? 1.06 : isSel ? 1.03 : 1;

          return (
            <motion.div
              key={m.key}
              onHoverStart={() => setHovered(i)}
              onHoverEnd={() => setHovered(null)}
              onClick={() => setSelected(i)}
              animate={{ rotate: tilt, y: yOff, scale: sc }}
              transition={{ type: 'spring', stiffness: 340, damping: 24 }}
              style={{
                width: 230,
                height: 310,
                borderRadius: 28,
                overflow: 'hidden',
                cursor: 'pointer',
                outline: '4px solid #fff',
                outlineOffset: -1,
                flexShrink: 0,
                boxShadow: isSel
                  ? '0 20px 56px rgba(255,135,196,0.38), 0 0 0 2.5px #ff87c4'
                  : isHov
                    ? '0 14px 44px rgba(0,0,0,0.2)'
                    : '0 6px 22px rgba(0,0,0,0.12)',
                transformOrigin: 'bottom center',
                position: 'relative',
              }}
            >
              <img
                src={m.img}
                alt={m.name}
                style={{
                  width: '100%', height: '100%',
                  objectFit: 'cover', display: 'block',
                  transition: 'transform 0.5s ease',
                  transform: isHov ? 'scale(1.07)' : 'scale(1)',
                }}
              />
              {/* Pink overlay fade in */}
              <motion.div
                animate={{ opacity: isHov || isSel ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(0deg, rgba(255,135,196,0.72) 0%, rgba(255,135,196,0.08) 55%, transparent 100%)',
                  pointerEvents: 'none',
                }}
              />
              {/* Bottom label */}
              <motion.div
                animate={{ opacity: isHov || isSel ? 1 : 0.7, y: isHov || isSel ? 0 : 6 }}
                style={{
                  position: 'absolute', bottom: 14, left: 10, right: 10,
                  background: 'rgba(255,255,255,0.95)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: 100, padding: '7px 12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize: 11.5, fontWeight: 700, color: '#ff87c4' }}>{m.name}</span>
                <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize: 8.5, fontWeight: 600, color: '#999', textTransform: 'uppercase', letterSpacing: '0.07em' }}>{m.tag.replace('Best for ','')}</span>
              </motion.div>
              {/* Top number badge */}
              <div style={{
                position: 'absolute', top: 12, left: 12,
                background: '#ff87c4', color: '#fff',
                borderRadius: 100, padding: '4px 11px',
                fontSize: 9.5, fontWeight: 700, letterSpacing: '0.1em',
                textTransform: 'uppercase', fontFamily:"'Montserrat',sans-serif",
              }}>
                {`0${i + 1}`}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center', margin: '16px 0 28px' }}>
        {machines.map((_, i) => (
          <motion.div
            key={i}
            onClick={() => setSelected(i)}
            animate={{ width: i === selected ? 24 : 8, background: i === selected ? '#ff87c4' : '#ddd' }}
            style={{ height: 8, borderRadius: 100, cursor: 'pointer' }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          />
        ))}
      </div>

      {/* Spec panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 14, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          <div style={{
            background: '#FFF0F5',
            border: '2px solid rgba(255,135,196,0.15)',
            borderRadius: 24,
            padding: '28px 32px',
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 12,
          }}>
            {/* Name + tag spanning full row */}
            <div style={{ gridColumn: 'span 4', marginBottom: 4 }}>
              <h3 style={{ fontFamily:"'Montserrat',sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 4 }}>
                {machines[selected].name}
              </h3>
              <p style={{ fontSize: 11.5, fontWeight: 600, color: '#ff87c4', fontFamily:"'Montserrat',sans-serif", textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {machines[selected].tag}
              </p>
            </div>
            {/* 4 spec chips in one row */}
            {machines[selected].specs.map(s => (
              <div key={s.k} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#fff', borderRadius: 14, padding: '10px 14px',
                border: '1px solid rgba(255,135,196,0.12)',
              }}>
                <SpecIcon type={s.k} />
                <div>
                  <div style={{ fontSize: 9.5, fontWeight: 700, color: '#ff87c4', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily:"'Montserrat',sans-serif" }}>{s.k}</div>
                  <div style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--ink2)', fontFamily:"'Montserrat',sans-serif" }}>{s.v}</div>
                </div>
              </div>
            ))}
            {machines[selected].note && (
              <div style={{ gridColumn: 'span 4', fontSize: 11, color: '#ff87c4', fontWeight: 600, fontFamily:"'Montserrat',sans-serif" }}>
                {machines[selected].note}
              </div>
            )}
            <div style={{ gridColumn: 'span 4', marginTop: 4 }}>
              <button
                className="btn btn-dark"
                style={{ padding: '12px 40px', fontSize: 14 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>{tryFree}</span>
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ─── SPEC ICONS ─── */
function SpecIcon({ type }: { type: string }) {
  const s = { width:16, height:16, color:'var(--pink)', flexShrink:0 } as const;
  if (type === 'Width')  return <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M2 12h20M2 12l3-3M2 12l3 3M22 12l-3-3M22 12l-3 3"/></svg>;
  if (type === 'Depth')  return <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2v20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3"/></svg>;
  if (type === 'Height') return <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M9 12h6M12 9v6"/></svg>;
  return <svg style={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>;
}

/* ─── VERIFIED ─── */
function VBadge() {
  return <span className="verified" aria-hidden="true"><svg viewBox="0 0 8 8"><path d="M1 4l2 2 4-4" stroke="white" strokeWidth="1.3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg></span>;
}

const VIDEO_ROTS  = [-4, 2, -2, 3.5, -3, 1.5, -1, 3];
const VIDEO_Y_OFF = [10, 0, 6, 0, 8, 2, 5, 0]; // base y-offsets for stacked wave

function VideoCard({ src, poster, label, idx }: { src: string; poster?: string; label: string; idx: number }) {
  const videoRef  = useRef<HTMLVideoElement>(null);
  const gainTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [soundState, setSoundState] = useState<'muted'|'fadein'|'on'|'fadeout'>('muted');
  const baseRot = VIDEO_ROTS[idx % VIDEO_ROTS.length];
  const baseY   = VIDEO_Y_OFF[idx % VIDEO_Y_OFF.length];

  const rampVolume = useCallback(
    (from: number, to: number, ms: number, onDone?: () => void) => {
      const v = videoRef.current;
      if (!v) return;
      const steps = 30;
      const step  = (to - from) / steps;
      const delay = ms / steps;
      let   cur   = from;
      v.volume = Math.max(0, Math.min(1, from));
      const id = setInterval(() => {
        cur += step;
        const clamped = Math.max(0, Math.min(1, cur));
        v.volume = clamped;
        if ((step > 0 && cur >= to) || (step < 0 && cur <= to)) {
          clearInterval(id);
          v.volume = to;
          onDone?.();
        }
      }, delay);
      return id;
    }, []
  );

  const onEnter = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (gainTimer.current) clearTimeout(gainTimer.current);
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    v.muted = false;
    v.volume = 0;
    // Small delay to ensure browser accepts unmute
    setTimeout(() => {
      if (!videoRef.current) return;
      videoRef.current.muted = false;
      setSoundState('fadein');
      rampVolume(0, 1, 400, () => setSoundState('on'));
    }, 50);
  }, [rampVolume]);

  const onLeave = useCallback(() => {
    gainTimer.current = setTimeout(() => {
      setSoundState('fadeout');
      rampVolume(1, 0, 400, () => {
        const v = videoRef.current;
        if (v) { v.muted = true; v.volume = 1; }
        setSoundState('muted');
      });
    }, 1000);
  }, [rampVolume]);

  useEffect(() => {
    // Set muted=true on mount — can't use JSX muted prop (React ignores runtime changes to it)
    if (videoRef.current) { videoRef.current.muted = true; videoRef.current.volume = 1; }
  }, []);

  useEffect(() => () => {
    if (gainTimer.current) clearTimeout(gainTimer.current);
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
  }, []);

  const isOn = soundState === 'on' || soundState === 'fadein';

  return (
    <motion.div
      onHoverStart={onEnter}
      onHoverEnd={onLeave}
      initial={{ rotate: baseRot, y: baseY }}
      whileHover={{
        rotate: 0, scale: 1.06, y: -10, zIndex: 10,
        transition: { type:'spring', stiffness:320, damping:24 },
      }}
      animate={{ rotate: baseRot, y: baseY }}
      transition={{ type:'spring', stiffness:200, damping:28 }}
      style={{
        position: 'relative',
        borderRadius: 28, overflow: 'hidden',
        flexShrink: 0, width: 210, height: 310,
        background: '#0a0a0a',
        boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
        outline: '3px solid rgba(255,255,255,0.88)',
        cursor: 'default',
        transformOrigin: 'center bottom',
      }}
    >
      <video
        ref={videoRef} src={src} poster={poster} autoPlay loop playsInline preload="metadata"
        style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}
      />
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:'55%', background:'linear-gradient(0deg,rgba(0,0,0,0.72) 0%,transparent 100%)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:12, left:12, right:12 }}>
        <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:12, fontWeight:600, color:'#fff', display:'block', marginBottom:6 }}>{label}</span>
        <div style={{ display:'inline-flex', alignItems:'center', gap:5, background: isOn ? 'rgba(255,135,196,0.35)' : 'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)', borderRadius:100, padding:'4px 10px', transition:'background 0.3s ease', border: isOn ? '1px solid rgba(255,135,196,0.5)' : '1px solid rgba(255,255,255,0.15)' }}>
          {isOn ? (
            <div style={{ display:'flex', alignItems:'center', gap:1.5 }}>
              {[1,2,3].map(b => <div key={b} style={{ width:2, borderRadius:2, background:'#fff', animation:`soundBar${b} 0.6s ease-in-out infinite alternate`, animationDelay:`${b*0.12}s` }}/>)}
            </div>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" strokeLinecap="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          )}
          <span style={{ fontSize:9, color:'rgba(255,255,255,0.82)', fontFamily:"'Montserrat',sans-serif", fontWeight:600 }}>
            {soundState==='muted'?'Hover for sound':soundState==='fadein'?'Fading in...':soundState==='fadeout'?'Fading out...':'♪ Playing'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
/* ════════════════════════════════════════════════════════════
   BRUSH HIGHLIGHT — hand-drawn SVG behind a keyword
   Usage: <BrushHighlight>Revenue</BrushHighlight>
   Draws in when entering viewport via IntersectionObserver
════════════════════════════════════════════════════════════ */
function BrushHighlight({ children, color = '#F9C8D4' }: { children: React.ReactNode; color?: string }) {
  const ref   = useRef<HTMLSpanElement>(null);
  const svgRef = useRef<SVGPathElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const path = svgRef.current;
    if (!path || !visible) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray  = `${len}`;
    path.style.strokeDashoffset = visible ? '0' : `${len}`;
  }, [visible]);

  return (
    <span ref={ref} style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
      {/* Organic SVG brush shape — slightly irregular, offset below text */}
      <svg
        aria-hidden="true"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          left: '-4%', bottom: '-12%',
          width: '108%', height: '40%',
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'visible',
        }}
        viewBox="0 0 200 24"
      >
        <path
          ref={svgRef}
          d="M 4 18 C 18 8, 50 20, 80 14 C 110 8, 140 22, 170 15 C 185 11, 194 17, 198 16 C 196 20, 185 22, 165 21 C 130 23, 95 19, 60 22 C 36 24, 14 22, 4 20 Z"
          fill={color}
          fillOpacity={visible ? 0.72 : 0}
          stroke={color}
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transition: visible
              ? 'fill-opacity 0.5s ease 0.1s, stroke-dashoffset 0.6s cubic-bezier(0.4,0,0.2,1)'
              : 'none',
          }}
        />
      </svg>
      <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
    </span>
  );
}

/* ════════════════════════════════════════════════════════════
   SCRIBBLE DECO — small hand-drawn SVG stroke above heading
   Usage: <ScribbleDeco /> placed before an <h2>
════════════════════════════════════════════════════════════ */
function ScribbleDeco({ color = '#ff87c4', width = 64 }: { color?: string; width?: number }) {
  const ref  = useRef<SVGPathElement>(null);
  const wrap = useRef<SVGSVGElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const p = ref.current;
    if (!p || !vis) return;
    const len = p.getTotalLength();
    p.style.strokeDasharray  = `${len}`;
    p.style.strokeDashoffset = `${len}`;
    p.getBoundingClientRect(); // force reflow
    p.style.transition = 'stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1)';
    p.style.strokeDashoffset = '0';
  }, [vis]);

  return (
    <svg
      ref={wrap}
      width={width} height={22}
      viewBox="0 0 64 22"
      fill="none"
      aria-hidden="true"
      style={{ display: 'block', marginBottom: 10, overflow: 'visible' }}
    >
      {/* Wobbly hand-drawn underline / squiggle */}
      <path
        ref={ref}
        d="M 2 14 C 8 6, 18 18, 28 10 C 36 4, 44 16, 52 11 C 57 8, 61 13, 63 12"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ─── BTN TEXT WRAPPER for outline z-index ─── */
function BtnOutline({ children, onClick, style, className }: { children: React.ReactNode; onClick?: () => void; style?: React.CSSProperties; className?: string }) {
  return (
    <button className={`btn btn-outline ${className||''}`} onClick={onClick} style={style}>
      <span style={{ position:'relative', zIndex:1, display:'inline-flex', alignItems:'center', gap:8 }}>{children}</span>
    </button>
  );
}

/* ─── MAGNETIC HOOK ─── */
function useMagnetic() {
  useEffect(() => {
    const h = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>('.btn');
      if (btn) { const r = btn.getBoundingClientRect(); btn.style.setProperty('--mx',`${e.clientX-r.left}px`); btn.style.setProperty('--my',`${e.clientY-r.top}px`); }
    };
    document.addEventListener('mousemove', h);
    return () => document.removeEventListener('mousemove', h);
  }, []);
}

/* ─── REVEAL HOOK ─── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: 0.08 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

/* ─── HERO MACHINE STACK — pixel-perfect Figma match ────────
   Card order: Chibi | Mid | Stackable | Big
   z-index:       1     3       4         2
   rotation:    -8°   -3°     +3°       +8°
   translateY:  16    -8      -4        12    (px, relative to baseline)
   overlap: marginLeft -68px (≈34% of 200px card)
──────────────────────────────────────────────────────────── */
const HERO_CARDS = [
  { img:'/images/machine-chibi.png',     name:'Mini',       tag:'Small',     rot:-8,  ty:16,  z:1 },
  { img:'/images/machine-mid.png',       name:'Mid',       tag:'Normal',    rot:-3,  ty:-8,  z:3 },
  { img:'/images/machine-stackable.png', name:'Stackable', tag:'Mid-Large', rot: 3,  ty:-4,  z:4 },
  { img:'/images/machine-big.png',       name:'Big',       tag:'Large',     rot: 8,  ty:12,  z:2 },
];

/* Falling toy icons in hero bg — continuous fall from top */
const EMOJI_POOL = ['🕹️','🧸','🐾','✨','🎀','❤️','🌸','💫','🎮','🌟','🍬','🎊'];
const FALLING_TOYS = Array.from({ length: 22 }, (_, i) => ({
  icon: EMOJI_POOL[i % EMOJI_POOL.length],
  x: (i * 4.6 + (i % 3) * 2.1) % 96,
  size: 16 + (i % 5) * 4,
  dur: 7 + (i % 7) * 1.4,
  delay: -(i * 0.85) % 9,
  sway: (i % 2 === 0 ? 1 : -1) * (8 + (i % 4) * 5),
}));

/* ── SPARK BURST — tiny glowing particles that shoot out on emoji impact ── */
const SPARK_COLORS = ['#ff87c4','#FFD166','#fff','#FF6EB0','#C9F','#FFB347'];
const SPARK_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

interface Spark { id: number; x: number; }

function SparkBurst({ x }: { x: number }) {
  return (
    <div style={{
      position: 'absolute',
      left: `${x}%`,
      bottom: '14%',
      pointerEvents: 'none',
      zIndex: 10,
    }}>
      {SPARK_ANGLES.map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const dist = 14 + (i % 3) * 9;
        const size = 4 + (i % 3) * 2;
        const col = SPARK_COLORS[i % SPARK_COLORS.length];
        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(rad) * dist,
              y: Math.sin(rad) * dist - 12,
              opacity: 0,
              scale: 0.15,
            }}
            transition={{ duration: 0.55, ease: 'easeOut', delay: i * 0.02 }}
            style={{
              position: 'absolute',
              width: size,
              height: size,
              borderRadius: '50%',
              background: col,
              boxShadow: `0 0 6px 2px ${col}`,
            }}
          />
        );
      })}
    </div>
  );
}

function HeroFloatingToys() {
  const [sparks, setSparks] = useState<Spark[]>([]);

  const addSpark = useCallback((x: number) => {
    const id = Date.now() + Math.random();
    setSparks(prev => [...prev.slice(-50), { id, x }]);
    setTimeout(() => setSparks(prev => prev.filter(s => s.id !== id)), 680);
  }, []);

  return (
    <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
      {FALLING_TOYS.map((t, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${t.x}%`,
            top: '-60px',
            fontSize: t.size,
            opacity: 0.62,
            userSelect: 'none',
            pointerEvents: 'none',
            animation: `heroEmojiFall ${t.dur}s ${t.delay}s linear infinite`,
            '--sway': `${t.sway}px`,
          } as React.CSSProperties}
          onAnimationIteration={() => addSpark(t.x)}
        >
          {t.icon}
        </div>
      ))}

      {/* Sparkle bursts rendered at bottom when each emoji completes a fall */}
      {sparks.map(s => (
        <SparkBurst key={s.id} x={s.x} />
      ))}
    </div>
  );
}




function HeroMachineStack({ machines }: { machines: typeof MACHINES }) {
  const [hov, setHov] = useState<number | null>(null);

  return (
    <div
      className="blur-in bi6"
      style={{
        display: 'flex',
        alignItems: 'flex-end',       /* anchor baseline at bottom */
        justifyContent: 'center',
        gap: 0,
        position: 'relative',
        padding: '32px 0 24px',
        /* enough height for tallest card + max upward shift */
        minHeight: 260,
      }}
    >
      {HERO_CARDS.map((c, i) => {
        const isHov = hov === i;
        return (
          <motion.div
            key={c.img}
            onHoverStart={() => setHov(i)}
            onHoverEnd={() => setHov(null)}
            animate={{
              rotate: isHov ? 0 : c.rot,
              y: isHov ? -22 : c.ty,
              scale: isHov ? 1.08 : 1,
              zIndex: isHov ? 20 : c.z,
            }}
            transition={{ type:'spring', stiffness:380, damping:28 }}
            style={{
              width: 210,
              height: 210,
              borderRadius: 24,
              overflow: 'hidden',
              flexShrink: 0,
              /* 34% overlap → marginLeft -71px (except first) */
              marginLeft: i === 0 ? 0 : -71,
              cursor: 'default',
              /* 5px white border = outline trick */
              outline: '5px solid #ffffff',
              outlineOffset: -1,
              position: 'relative',
              transformOrigin: 'bottom center',
              boxShadow: isHov
                ? '0 28px 64px rgba(255,135,196,0.45), 0 0 0 2.5px #ff87c4'
                : c.z >= 3
                  ? '0 18px 48px rgba(0,0,0,0.22)'
                  : '0 8px 28px rgba(0,0,0,0.13)',
            }}
          >
            <img
              src={c.img} alt={c.name}
              style={{
                width:'100%', height:'100%', objectFit:'cover', display:'block',
                transition:'transform 0.5s ease',
                transform: isHov ? 'scale(1.1)' : 'scale(1.0)',
              }}
            />
            {/* Gradient */}
            <div style={{
              position:'absolute', bottom:0, left:0, right:0, height:'60%',
              background:'linear-gradient(0deg,rgba(0,0,0,0.72) 0%,transparent 100%)',
              pointerEvents:'none',
            }}/>
            {/* Name + tag */}
            <div style={{ position:'absolute', bottom:10, left:10, right:10, display:'flex', flexDirection:'column', gap:3 }}>
              <span style={{ fontFamily:"'Montserrat',sans-serif", fontSize:12.5, fontWeight:700, color:'#fff' }}>{c.name}</span>
              <span style={{
                display:'inline-block', background:'#ff87c4', color:'#fff',
                borderRadius:100, padding:'2px 9px',
                fontSize:9, fontWeight:700, letterSpacing:'0.09em', textTransform:'uppercase',
                width:'fit-content', fontFamily:"'Montserrat',sans-serif",
              }}>{c.tag}</span>
            </div>
            {/* Number badge */}
            <div style={{
              position:'absolute', top:10, left:10,
              background:'rgba(255,255,255,0.9)', backdropFilter:'blur(6px)',
              borderRadius:100, padding:'2px 10px',
              fontSize:9.5, fontWeight:800, color:'#ff87c4',
              fontFamily:"'Montserrat',sans-serif",
            }}>
              0{i+1}
            </div>
          </motion.div>
        );
      })}

      {/* Ground shadow */}
      <div style={{
        position:'absolute', bottom:8, left:'15%', right:'15%', height:24,
        background:'radial-gradient(ellipse,rgba(0,0,0,0.13) 0%,transparent 70%)',
        filter:'blur(10px)', pointerEvents:'none', zIndex:0,
      }}/>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   PAGE
════════════════════════════════════════════════════════════ */
export default function Home() {
  const [revTab, setRevTab] = useState(0);
  const [revKey, setRevKey] = useState(0);
  const [faqOpen, setFaqOpen] = useState<number|null>(null);
  const { lang } = useLang();
  const tx = lang === 'ja' ? t.ja : t.en;

  useMagnetic(); useReveal();

  const go = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior:'smooth' });
  }, []);

  const switchRevTab = (i: number) => { setRevTab(i); setRevKey(k=>k+1); };

  const P = { fontFamily:"'Montserrat',sans-serif" };

  const FAQ_JP = [
    { q:'マシンの設置は本当に無料ですか？', a:'はい、100%無料です。Amysyがマシン費用、設置、景品、メンテナンス、補充をすべて負担します。必要なのはスペース、Wi-Fi、コンセントだけです。' },
    { q:'どのくらいのスペースが必要ですか？', a:'最小（Chibi）マシンは約60cm×60cmのスペースがあれば設置できます。大型スタッカブルは150〜300cmほど必要です。無料相談後、最適なサイズをご提案します。' },
    { q:'景品はどのくらいの頻度で補充されますか？', a:'人気に応じて週1〜月1回の頻度で確認・補充します。新しい景品は毎月ローテーションされます。' },
    { q:'収益シェアはどうなっていますか？', a:'月間総売上の一定割合をシェアします。金額は来客数や店舗タイプによります。月額固定払いも対応可能ですので、お問い合わせください。' },
    { q:'許可証やライセンスは必要ですか？', a:'はい、すべての許可証はAmysyが取得します。例えばワシントン州ではWAギャンブル委員会から遊技場営業者ライセンスを取得しています。' },
    { q:'マシンの公平性はどう保証されますか？', a:'実際に勝てるクレーンゲームを提供することを誇りにしています。ほとんどのマシンでは「遊び続ければ勝てる」設定も柔軟に対応しています。' },
    { q:'マシンに問題が発生した場合は？', a:'すべての問題に迅速かつ真剣に対応します。サービスやメンテナンスは翌営業日以内に対応します。' },
    { q:'どんな景品が使われていますか？', a:'YELL・Amufun・Furyuu・SK Japanなど人気の日本のメーカーから、ぬいぐるみ・フィギュア・キーホルダーなど全年齢向けの高品質景品を取り揃えています。すべて正規ライセンス品です。' },
  ];

  const faqs = lang === 'ja' ? FAQ_JP : FAQ_EN;
  const td = TAB_DATA[revTab];




  return (
    <>
      {/* ── SHARED NAVBAR ── */}
      <Navbar />

      <main id="main">

        {/* ── HERO ── */}
        <section id="hero" style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          justifyContent: 'center', alignItems: 'center',
          paddingTop: 140, paddingBottom: 80,
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,135,196,0.13) 0%, rgba(255,200,220,0.06) 45%, var(--bg) 72%)',
          position: 'relative', overflow: 'hidden', textAlign: 'center',
        }}>
          {/* Floating toys that repel mouse */}
          <HeroFloatingToys />
          {/* Soft radial glow */}
          <div style={{ position:'absolute', top:'10%', left:'50%', transform:'translateX(-50%)', width:800, height:500, background:'radial-gradient(ellipse,rgba(255,135,196,0.07) 0%,transparent 68%)', borderRadius:'50%', pointerEvents:'none' }}/>

          <div className="container" style={{ maxWidth: 900, width: '100%' }}>

            {/* ── Centered text ── */}
            <div className="blur-in bi1" style={{ marginBottom: 8 }}>
              <div className="lbl" style={{ justifyContent: 'center' }}>
                {lang === 'ja' ? '🎌 日本のクレーンゲーム設置' : 'Japanese Claw Machine Placement'}
              </div>
            </div>

            <h1 className="h1" style={{ marginBottom: 20 }}>
              <span className="blur-in bi2 hero-shimmer-heading" style={{ display: 'block' }}>
                {tx.hero.h1a} {tx.hero.h1b}
              </span>
            </h1>

            <p className="blur-in bi4" style={{ fontSize: 20, lineHeight: 1.8, color: 'var(--ink2)', maxWidth: 620, margin: '0 auto 32px', ...P }}>
              {tx.hero.sub}
            </p>

            <div className="blur-in bi5" style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', marginBottom: 16 }}>
              <button className="btn btn-dark" onClick={() => go('contact')}>
                <span style={{ position: 'relative', zIndex: 1 }}>{tx.hero.cta1}</span>
              </button>
            </div>


          </div>
        </section>

        {/* ── SHORT ABOUT US ── */}
        <section id="about-short" className="section" style={{ background: 'var(--bg2)', paddingTop: 'clamp(48px,6vw,80px)', paddingBottom: 'clamp(48px,6vw,80px)' }}>
          <div className="container" style={{ maxWidth: 800, textAlign: 'center' }}>
            <div className="reveal">
              <div className="lbl" style={{ justifyContent: 'center', marginBottom: 14 }}>{tx.aboutShort.label}</div>
              <ScribbleDeco color="#ff87c4" width={64} />
              <h2 className="h2" style={{ marginBottom: 16 }}>
                <>{tx.aboutShort.h2a}<BrushHighlight>{tx.aboutShort.h2hl}</BrushHighlight>{tx.aboutShort.h2b}</>
              </h2>
              <p style={{ fontSize: 16, color: 'var(--ink2)', lineHeight: 1.8, maxWidth: 640, margin: '0 auto', ...P }}>
                {tx.aboutShort.body}
              </p>
            </div>
          </div>
        </section>

        {/* ── MACHINE PHOTOS (moved to 3rd section) ── */}
        <section id="machine-showcase" className="section" style={{ background: 'var(--bg)', paddingTop: 'clamp(48px,6vw,80px)', paddingBottom: 'clamp(48px,6vw,80px)' }}>
          <div className="container">
            <div className="reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
              <div className="lbl" style={{ justifyContent: 'center', marginBottom: 14 }}>{tx.ourMachines.label}</div>
              <h2 className="h2">{tx.ourMachines.h2}</h2>
            </div>
            <div className="reveal d1">
              {/* Top row: 4 machine cards overlapping/fanned */}
              <div style={{
                display: 'flex', justifyContent: 'center', alignItems: 'flex-end',
                gap: 0, position: 'relative', marginBottom: 24,
              }}>
                {MACHINES.map((m, i) => {
                  const rots = [-8, -3, 3, 8];
                  const yoffs = [16, -4, -4, 16];
                  return (
                    <motion.div
                      key={m.key}
                      initial={{ rotate: rots[i], y: yoffs[i] }}
                      whileHover={{ rotate: 0, y: -12, scale: 1.06, zIndex: 10, transition: { type:'spring', stiffness:320, damping:22 } }}
                      style={{
                        width: 'clamp(160px, 22vw, 260px)',
                        height: 'clamp(210px, 29vw, 340px)',
                        borderRadius: 24,
                        overflow: 'hidden',
                        flexShrink: 0,
                        marginLeft: i === 0 ? 0 : 'clamp(-60px,-8vw,-40px)',
                        outline: '5px solid #fff',
                        outlineOffset: -1,
                        boxShadow: i === 1 || i === 2
                          ? '0 20px 52px rgba(0,0,0,0.22)'
                          : '0 10px 28px rgba(0,0,0,0.14)',
                        zIndex: i === 1 ? 3 : i === 2 ? 4 : 1,
                        position: 'relative',
                        transformOrigin: 'bottom center',
                      }}
                    >
                      <img src={m.img} alt={m.name}
                        style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }}/>
                      <div style={{
                        position:'absolute', bottom:0, left:0, right:0,
                        background:'linear-gradient(0deg,rgba(0,0,0,0.65) 0%,transparent 100%)',
                        padding:'10px 12px',
                      }}>
                        <div style={{ fontFamily:"'Montserrat',sans-serif", fontSize:12, fontWeight:700, color:'#fff' }}>{m.name}</div>
                        <span style={{
                          background:'#ff87c4', color:'#fff', borderRadius:100,
                          padding:'2px 9px', fontSize:9, fontWeight:700, letterSpacing:'0.08em',
                          textTransform:'uppercase', fontFamily:"'Montserrat',sans-serif",
                          display:'inline-block', marginTop:3,
                        }}>{m.tag.replace('Best for ','').toUpperCase()}</span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              {/* Button to jump to size details */}
              <div style={{ textAlign: 'center', marginTop: 8 }}>
                <button className="btn btn-dark" onClick={() => go('machines')} style={{ padding: '14px 36px', fontSize: 14 }}>
                  <span style={{ position: 'relative', zIndex: 1 }}>{tx.setup.viewDetails}</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── LOGO TICKER ── */}
        <div style={{
          borderTop:'1px solid var(--border)',
          borderBottom:'1px solid var(--border)',
          background:'var(--white)',
          overflow:'hidden',
          height:78,
        }}>
          <div style={{
            display:'flex',
            alignItems:'center',
            height:'100%',
            width:'max-content',
            animation:'logoSlide 45s linear infinite',
            marginTop: -12,
          }}>
            {[...Array(8)].map((_,i)=>(
              <img key={i} src="/images/client/logo-wrap.png" alt="Amusy"
                style={{
                  height:500,
                  width:'auto',
                  flexShrink:0,
                  display:'block',
                  opacity:0.85,
                }} />
            ))}
          </div>
        </div>

        {/* ── SETUP EXAMPLES (REVENUE TABS) ── */}
        <section id="revenue" className="section" style={{position:'relative', overflow:'hidden'}}>
          {/* Amusy pattern background */}
          <div style={{
            position:'absolute', inset:0,
            backgroundImage:'url("/images/client/bg-logo-transparent.png")',
            backgroundSize:'700px',
            backgroundRepeat:'repeat',
            opacity: 0.25,
            pointerEvents:'none',
          }}/>
          <div className="container" style={{position:'relative', zIndex:1}}>
            <div className="reveal" style={{maxWidth:580,marginBottom:44}}>
              <div className="lbl" style={{marginBottom:14}}>{tx.setup.label}</div>
              <ScribbleDeco />
              <h2 className="h2" style={{marginBottom:12}}>
                {tx.setup.h2a}
                <BrushHighlight>{tx.setup.h2hl}</BrushHighlight>
              </h2>
              <p style={{fontSize:14.5,color:'var(--ink2)',lineHeight:1.75,...P}}>{tx.setup.sub}</p>
            </div>
            <div className="reveal d1" style={{marginBottom:36}}>
              <div className="tab-bar">
                {TAB_DATA.map((tabItem,i)=>(
                  <button key={i} className={`tab-btn ${revTab===i?'active':''}`} onClick={()=>switchRevTab(i)}>{lang === 'ja' ? tx.setup.tabs[i] : tabItem.tab}</button>
                ))}
              </div>
            </div>
            <motion.div key={revKey} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{duration:0.35,ease:[0.16,1,0.3,1]}}
              style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:40,alignItems:'center'}} className="grid-2"
            >
              <div>
                <h3 className="h3" style={{marginBottom:12}}>{tx.setup.tabContent[revTab].headline}</h3>
                <p style={{fontSize:14.5,color:'var(--ink2)',lineHeight:1.8,marginBottom:18,...P}}>{tx.setup.tabContent[revTab].body}</p>
                <p style={{fontSize:12,color:'var(--ink3)',fontStyle:'italic',marginBottom:26,...P}}>{tx.setup.tabContent[revTab].note}</p>
                <button className="btn btn-dark" onClick={()=>go('contact')}>
                  <span style={{position:'relative',zIndex:1}}>{tx.setup.cta}</span>
                </button>
              </div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                {td.imgs.map((img,si)=>(
                  <div key={si} style={{borderRadius:16, overflow:'hidden', boxShadow:'var(--sh-sm)', height: 220}}>
                    <img src={img} alt="Location" style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}} />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>


        {/* ── HOW IT WORKS ── */}
        <section id="how" className="section" style={{background:'var(--bg2)'}}>
          <div className="container">
            <div className="reveal" style={{marginBottom:60}}>
              <div className="lbl" style={{marginBottom:14}}>{tx.howItWorks.label}</div>
              <ScribbleDeco />
              <h2 className="h2"><>{tx.howItWorks.h2a}<BrushHighlight>{tx.howItWorks.h2hl}</BrushHighlight></></h2>
            </div>

            {/* Steps — proper responsive layout */}
            <div className="steps-row">
              {tx.howItWorks.steps.map((s,i)=>{
                const icons = [<Mail key="m" size={24} color="var(--pink)" strokeWidth={2}/>,<Wrench key="w" size={24} color="var(--pink)" strokeWidth={2}/>,<HandCoins key="h" size={24} color="var(--pink)" strokeWidth={2}/>];
                const num = String(i+1).padStart(2,'0');
                return (
                <React.Fragment key={num}>
                  <div className={`reveal d${i+1}`} style={{position:'relative',paddingTop:12}}>
                    <div style={{...P,fontSize:72,fontWeight:800,lineHeight:1,letterSpacing:'-0.04em',color:'rgba(0,0,0,0.05)',position:'absolute',top:-8,left:-4,userSelect:'none'}}>{num}</div>
                    <div style={{position:'relative',zIndex:1}}>
                      <div style={{width:50,height:50,borderRadius:13,background:'#fff',border:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:18,boxShadow:'var(--sh-sm)',...P,fontSize:15,fontWeight:800,color:'var(--pink)'}}>{icons[i]}</div>
                      <h3 style={{...P,fontSize:18,fontWeight:700,marginBottom:8}}>{s.t}</h3>
                      <p style={{fontSize:14,color:'var(--ink2)',lineHeight:1.75,...P}}>{s.b}</p>
                    </div>
                  </div>
                  {i < 2 && <div className="step-connector"><div className="step-connector-line"/></div>}
                </React.Fragment>
              )})}
            </div>
          </div>
        </section>

        {/* ── VIDEOS — horizontal auto-scroll, blur edges (moved after steps) ── */}
        <section id="videos" style={{ padding: 'clamp(64px,8vw,100px) 0', background: 'var(--bg2)', overflow: 'hidden' }}>
          <div className="container" style={{ marginBottom: 36 }}>
            <div className="reveal" style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', flexWrap:'wrap', gap:16 }}>
              <div>
                <div className="lbl" style={{ marginBottom:14 }}>{tx.videos.label}</div>
                <h2 className="h2"><><BrushHighlight>{tx.videos.h2a}</BrushHighlight>{tx.videos.h2b}</></h2>
                <p style={{ marginTop:10, fontSize:14, color:'var(--ink2)', fontFamily:"'Montserrat',sans-serif" }}>
                  {tx.videos.hint}
                </p>
              </div>
              <a href="https://www.instagram.com/amusy_entertainment/" target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                <span style={{position:'relative', zIndex:1, display:'flex', alignItems:'center', gap:6}}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> @Amusy_Entertainment</span>
              </a>
            </div>
          </div>

          {/* Scroll container */}
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
            maskImage:        'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
          }}>
            <div
              className="video-scroll-track"
              style={{ alignItems: 'flex-end' }}
              onMouseEnter={e => (e.currentTarget.style.animationPlayState = 'paused')}
              onMouseLeave={e => (e.currentTarget.style.animationPlayState = 'running')}
            >
              {[...VIDEOS, ...VIDEOS, ...VIDEOS].map((v, i) => (
                <VideoCard key={i} idx={i} src={v.src} poster={v.poster} label={v.label} />
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFITS — WHY AMUSY? ── */}
        <section id="benefits" className="section" style={{ background: 'var(--bg)', position:'relative', overflow:'hidden' }}>
          {/* Amusy pattern background */}
          <div style={{
            position:'absolute', inset:0,
            backgroundImage:'url("/images/client/bg-logo-transparent.png")',
            backgroundSize:'700px',
            backgroundRepeat:'repeat',
            opacity: 0.25,
            pointerEvents:'none',
          }}/>
          <div className="container" style={{position:'relative', zIndex:1}}>
            <div className="reveal" style={{ textAlign: 'left', marginBottom: 56 }}>
              <div className="lbl" style={{ justifyContent: 'flex-start', marginBottom: 14 }}>{tx.benefits.label}</div>
              <ScribbleDeco color="#ff87c4" width={64} />
              <h2 className="h2">{lang === 'ja' ? 'なぜ' : 'Why '}<BrushHighlight>{lang === 'ja' ? 'Amusyなのか？' : 'Amusy?'}</BrushHighlight></h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }} className="grid-2">
              {tx.benefits.items.map((b, i) => (
                <div key={i} className={`reveal d${(i % 3) + 1}`} style={{
                  padding: '28px 24px',
                  background: 'var(--white)',
                  border: '1px solid var(--border)',
                  borderRadius: 18,
                  boxShadow: 'var(--sh-sm)',
                }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 10,
                    background: '#FFF0F5',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 16, fontSize: 18,
                  }}>
                    {['🎮', '🛠️', '✨', '📍', '💰', '🔁'][i]}
                  </div>
                  <h3 style={{ ...P, fontSize: 17, fontWeight: 700, marginBottom: 8, color: 'var(--ink)' }}>{b.title}</h3>
                  <p style={{ ...P, fontSize: 14, color: 'var(--ink2)', lineHeight: 1.75 }}>{b.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="machines" className="section" style={{ background: 'var(--bg)' }}>
          <div className="container">
            <div className="reveal" style={{ maxWidth: 580, marginBottom: 56 }}>
              <div className="lbl" style={{ marginBottom: 14 }}>{tx.machineTypes.label}</div>
              <h2 className="h2" style={{ marginBottom: 12 }}>
                {<>{tx.machineTypes.h2a}<br/><BrushHighlight>{tx.machineTypes.h2hl}</BrushHighlight></>}
              </h2>
              <p style={{ fontSize: 14.5, color: 'var(--ink2)', lineHeight: 1.75, fontFamily: "'Montserrat',sans-serif" }}>
                {tx.machineTypes.sub}
              </p>
            </div>
            <MachineFan machines={MACHINES} tryFree={tx.machineTypes.tryFree} />
          </div>
        </section>

        {/* ── PRIZES ── */}
        <section id="prizes" className="section" style={{background:'var(--bg2)'}}>
          <div className="container">
            <div className="reveal" style={{marginBottom:40}}>
              <div className="lbl" style={{marginBottom:14}}>{tx.prizes.label}</div>
              <ScribbleDeco />
              <h2 className="h2"><>{tx.prizes.h2a}<BrushHighlight>{tx.prizes.h2hl}</BrushHighlight></></h2>
              <p style={{marginTop:12,fontSize:15,color:'var(--ink2)',maxWidth:560,...P}}>
                {tx.prizes.sub}
              </p>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:14}} className="grid-4 reveal d1">
              {ALL_PRIZES.slice(0,8).map((img,i)=>(
                <motion.div key={i}
                  initial={{opacity:0,y:20,scale:0.95}}
                  whileInView={{opacity:1,y:0,scale:1}}
                  viewport={{once:true}}
                  transition={{duration:0.5,delay:i*0.06,ease:[0.16,1,0.3,1]}}
                  whileHover={{scale:1.04,zIndex:2,transition:{duration:0.2}}}
                  style={{aspectRatio:'1',borderRadius:16,overflow:'hidden',boxShadow:'var(--sh-sm)',background:'#fff'}}
                >
                  <img src={img} alt="Prize" loading="lazy" style={{width:'100%',height:'100%',objectFit:'cover',display:'block'}}/>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section" style={{position:'relative', overflow:'hidden'}}>
          {/* Amusy pattern background */}
          <div style={{
            position:'absolute', inset:0,
            backgroundImage:'url("/images/client/bg-logo-transparent.png")',
            backgroundSize:'700px',
            backgroundRepeat:'repeat',
            opacity: 0.25,
            pointerEvents:'none',
          }}/>
          <div className="container" style={{ maxWidth: 820, margin: '0 auto', position:'relative', zIndex:1 }}>
            {/* Blur-in heading */}
            <motion.div
              initial={{ opacity: 0, filter: 'blur(16px)', y: 12 }}
              whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: 'center', marginBottom: 56 }}
            >
              <h2 style={{
                fontFamily: "'Montserrat',sans-serif",
                fontSize: 'clamp(34px,5vw,68px)',
                fontWeight: 700, lineHeight: 1.1,
                letterSpacing: '-0.025em', color: 'var(--ink)',
              }}>
                {<>{tx.faq.h2a} <BrushHighlight>{tx.faq.h2b}</BrushHighlight></>}
              </h2>
              <p style={{ marginTop: 14, fontSize: 15, color: 'var(--ink3)', fontFamily: "'Montserrat',sans-serif" }}>
                {tx.faq.sub}
              </p>
            </motion.div>

            {/* Pill accordions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {faqs.map((f, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div
                    onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                    style={{
                      background: faqOpen === i ? 'var(--white)' : 'var(--bg2)',
                      border: `1px solid ${faqOpen === i ? 'var(--border-h)' : 'transparent'}`,
                      borderRadius: faqOpen === i ? 20 : 100,
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'border-radius 0.35s cubic-bezier(0.16,1,0.3,1), background 0.2s ease, border-color 0.2s ease',
                      boxShadow: faqOpen === i ? 'var(--sh-md)' : 'none',
                    }}
                  >
                    {/* Question row */}
                    <div style={{
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '18px 24px', gap: 16,
                    }}>
                      <span style={{
                        fontFamily: "'Montserrat',sans-serif",
                        fontSize: 'clamp(14px,1.8vw,16px)',
                        fontWeight: 500, color: 'var(--ink)',
                      }}>
                        {f.q}
                      </span>
                      <motion.div
                        animate={{ rotate: faqOpen === i ? 45 : 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                        style={{
                          width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                          background: faqOpen === i ? 'var(--pink)' : 'rgba(0,0,0,0.07)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                          stroke={faqOpen === i ? '#fff' : 'var(--ink)'}
                          strokeWidth="2.5" strokeLinecap="round"
                        >
                          <line x1="12" y1="5" x2="12" y2="19" />
                          <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                      </motion.div>
                    </div>

                    {/* Answer — spring height */}
                    <motion.div
                      initial={false}
                      animate={{ height: faqOpen === i ? 'auto' : 0, opacity: faqOpen === i ? 1 : 0 }}
                      transition={{ type: 'spring', stiffness: 240, damping: 26 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '4px 24px 22px', position: 'relative' }}>
                        <AnimatePresence>
                          {faqOpen === i && <FaqFloatingIcons key={`icons-${i}`} />}
                        </AnimatePresence>
                        <p style={{
                          fontFamily: "'Montserrat',sans-serif",
                          fontSize: 14.5, color: 'var(--ink2)',
                          lineHeight: 1.8, position: 'relative', zIndex: 1,
                        }}>
                          {f.a}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              style={{ textAlign: 'center', marginTop: 36 }}
            >
              <BtnOutline onClick={() => go('contact')}>
                Email us a question
              </BtnOutline>
            </motion.div>
          </div>
        </section>



        {/* ── CONTACT ── */}
        <section id="contact" className="section">
          <div className="container" style={{maxWidth:600,margin:'0 auto'}}>
            <div className="reveal" style={{marginBottom:40}}>
              <div className="lbl" style={{marginBottom:14}}>{tx.contact.label}</div>
              <h2 className="h2"><><ScribbleDeco width={48} />{lang === 'ja' ? 'お問い合わせ' : "Let's talk."}</></h2>
            </div>
            <div className="reveal d1" style={{background:'#fff',border:'1px solid var(--border)',borderRadius:22,padding:'clamp(22px,4vw,42px)',boxShadow:'var(--sh-sm)'}}>
              <form onSubmit={e=>e.preventDefault()} style={{display:'flex',flexDirection:'column',gap:13}} noValidate>
                {[
                  {type:'text',   ph: tx.contact.namePh},
                  {type:'text',   ph: tx.contact.bizPh},
                  {type:'email',  ph: tx.contact.emailPh},
                  {type:'tel',    ph: tx.contact.phonePh},
                  {type:'text',   ph: tx.contact.addressPh},
                ].map((f,i)=>(
                  <input key={i} type={f.type} placeholder={f.ph} style={{background:'var(--bg)',border:'1px solid var(--border)',borderRadius:12,padding:'12px 15px',fontSize:13.5,color:'var(--ink)',outline:'none',width:'100%',...P,transition:'border-color 0.2s'}}
                    onFocus={e=>e.currentTarget.style.borderColor='var(--pink)'}
                    onBlur={e=>e.currentTarget.style.borderColor='var(--border)'}
                  />
                ))}
                <textarea placeholder={tx.contact.msgPh} rows={4} style={{background:'var(--bg)',border:'1px solid var(--border)',borderRadius:12,padding:'12px 15px',fontSize:13.5,color:'var(--ink)',outline:'none',width:'100%',resize:'vertical',...P,transition:'border-color 0.2s'}}
                  onFocus={e=>e.currentTarget.style.borderColor='var(--pink)'}
                  onBlur={e=>e.currentTarget.style.borderColor='var(--border)'}
                />
                <button type="submit" className="btn btn-dark" style={{width:'100%',padding:'14px',fontSize:14}}>
                  <span style={{position:'relative',zIndex:1}}>{tx.contact.btn}</span>
                </button>
                <p style={{textAlign:'center',fontSize:12,color:'var(--ink3)',...P}}>
                  {tx.contact.emailLabel}{' '}
                  <a href="mailto:info@amusyentertainment.com" style={{color:'var(--pink)',fontWeight:600}}>info@amusyentertainment.com</a>
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* ── BRAND BANNER ── */}
        <section style={{
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
        </section>

        {/* ── FOOTER ── */}
        <Footer />

      </main>



      <style>{`
        input::placeholder,textarea::placeholder{color:var(--ink3)}
        .footer-cols{display:grid}
        /* Logo ticker slide */
        @keyframes logoSlide { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        /* Sound bar animations */
        @keyframes soundBar1{0%{height:3px}100%{height:11px}}
        @keyframes soundBar2{0%{height:9px}100%{height:3px}}
        @keyframes soundBar3{0%{height:4px}100%{height:13px}}
        /* Hero shimmer — subtle white sweep through pink text */
        .hero-shimmer-heading {
          color: #ff87c4;
          background: linear-gradient(
            105deg,
            #ff87c4 0%,
            #ff87c4 42%,
            #ffb0d8 50%,
            #ff87c4 58%,
            #ff87c4 100%
          );
          background-size: 250% 100%;
          background-position: 100% 0;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: heroShimmer 6.5s ease-in-out infinite;
        }
        @keyframes heroShimmer {
          0%   { background-position: 100% 0; }
          38%  { background-position: -50% 0; }
          100% { background-position: -50% 0; }
        }
        @media(max-width:900px){
          .footer-cols{grid-template-columns:1fr 1fr !important;gap:28px !important}
          .video-scroll-track{padding:12px 40px 20px}
        }
        @media(max-width:560px){
          .footer-cols{grid-template-columns:1fr !important}
          .fan-item:nth-child(1),.fan-item:nth-child(5){display:none}
        }
      `}</style>
    </>
  );
}
