'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const P = { fontFamily:"'Montserrat',sans-serif" };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[\d\s\-().+]{7,20}$/;

interface FormData { name:string; phone:string; email:string; address:string; questions:string; }
type Errors = Partial<Record<keyof FormData,string>>;

function validate(f: FormData): Errors {
  const e: Errors = {};
  if (!f.name.trim())            e.name    = 'Name is required.';
  if (!f.email.trim())           e.email   = 'Email is required.';
  else if (!EMAIL_RE.test(f.email)) e.email = 'Please enter a valid email address.';
  if (!f.phone.trim())           e.phone   = 'Phone number is required.';
  else if (!PHONE_RE.test(f.phone)) e.phone = 'Please enter a valid phone number.';
  if (!f.address.trim())         e.address = 'Business address is required.';
  return e;
}

function FieldError({msg}:{msg?:string}) {
  if (!msg) return null;
  return <div style={{...P,fontSize:11.5,color:'#ff87c4',marginTop:5,display:'flex',alignItems:'center',gap:5}}>
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ff87c4" strokeWidth="2.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    {msg}
  </div>;
}

export default function RegisterPage() {
  const [form, setForm] = useState<FormData>({ name:'', phone:'', email:'', address:'', questions:'' });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState<Set<string>>(new Set());

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    setForm(prev => ({...prev,[k]:e.target.value}));
    if (touched.has(k)) {
      const errs = validate({...form,[k]:e.target.value});
      setErrors(prev => ({...prev,[k]:errs[k]}));
    }
  };
  const onBlur = (k: keyof FormData) => () => {
    setTouched(prev => new Set(prev).add(k));
    const errs = validate(form);
    setErrors(prev => ({...prev,[k]:errs[k]}));
  };

  const inp = (hasErr: boolean): React.CSSProperties => ({
    width:'100%', background:'#FAFAF8',
    border:`1.5px solid ${hasErr ? '#ff87c4' : 'rgba(28,16,7,0.1)'}`,
    borderRadius:10, padding:'12px 14px',
    fontSize:13.5, color:'#1C1007', outline:'none', ...P,
    transition:'border-color 0.2s, box-shadow 0.2s',
    boxShadow: hasErr ? '0 0 0 3px rgba(255,135,196,0.1)' : 'none',
  });
  const lbl: React.CSSProperties = {...P,fontSize:12,fontWeight:600,color:'#4A3728',marginBottom:5,display:'block'};
  const focus = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    if (!errors[e.target.name as keyof FormData]) {
      e.currentTarget.style.borderColor='#ff87c4';
      e.currentTarget.style.boxShadow='0 0 0 3px rgba(255,135,196,0.1)';
    }
  };
  const blur = (e: React.FocusEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    if (!errors[e.target.name as keyof FormData]) {
      e.currentTarget.style.borderColor='rgba(28,16,7,0.1)';
      e.currentTarget.style.boxShadow='none';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      setTouched(new Set(Object.keys(errs)));
      return;
    }
    setSubmitted(true);
  };

  if (submitted) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'#FAFAF8',flexDirection:'column',gap:20,padding:40,textAlign:'center'}}>
      <div style={{fontSize:64}}>🌸</div>
      <h1 style={{...P,fontSize:32,fontWeight:700,color:'#1C1007'}}>We'll be in touch!</h1>
      <p style={{...P,fontSize:16,color:'#4A3728',maxWidth:440,lineHeight:1.8}}>
        Thank you, <strong>{form.name}</strong>! We'll reach out to <strong>{form.email}</strong> within 24 hours to discuss next steps.
      </p>
      <Link href="/" style={{display:'inline-flex',alignItems:'center',gap:8,background:'#ff87c4',color:'#fff',borderRadius:100,padding:'13px 32px',fontSize:14,fontWeight:700,textDecoration:'none',...P,marginTop:8}}>
        ← Back to Home
      </Link>
    </div>
  );

  return (
    <div style={{background:'#FAFAF8',minHeight:'100vh'}}>
      <Navbar activePage=""/>
      <div style={{maxWidth:640,margin:'0 auto',padding:'110px clamp(20px,4vw,48px) 80px'}}>
        <div style={{marginBottom:36}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'#FDF5F7',border:'1px solid rgba(255,135,196,0.25)',borderRadius:100,padding:'5px 14px',fontSize:11,fontWeight:700,color:'#ff87c4',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:14,...P}}>Contact</div>
          <h1 style={{...P,fontSize:'clamp(26px,4.5vw,46px)',fontWeight:700,lineHeight:1.1,letterSpacing:'-0.02em',color:'#1C1007',marginBottom:10}}>Partner with us</h1>
          <p style={{...P,fontSize:14.5,color:'#4A3728',lineHeight:1.75,maxWidth:480}}>Fill out the form and we'll reach out within 24 hours to discuss how Amusy fits your space.</p>
          <div style={{display:'flex',flexWrap:'wrap',gap:9,marginTop:16}}>
            {['Zero upfront cost','We handle everything','Monthly revenue share'].map(b=>(
              <span key={b} style={{...P,display:'flex',alignItems:'center',gap:5,fontSize:11.5,color:'#4A3728',background:'#F4F2EE',borderRadius:100,padding:'5px 12px'}}>
                <span style={{width:4,height:4,borderRadius:'50%',background:'#ff87c4',flexShrink:0}}/>
                {b}
              </span>
            ))}
          </div>
        </div>

        <div style={{background:'#fff',border:'1px solid rgba(0,0,0,0.08)',borderRadius:22,padding:'clamp(24px,3vw,40px)',boxShadow:'0 2px 8px rgba(0,0,0,0.05)'}}>
          <form onSubmit={handleSubmit} noValidate>
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              <div>
                <label style={lbl}>Name <span style={{color:'#ff87c4'}}>*</span></label>
                <input name="name" type="text" placeholder="Jane Smith" value={form.name} onChange={set('name')} onBlur={onBlur('name')} onFocus={focus} style={inp(!!errors.name)}/>
                <FieldError msg={errors.name}/>
              </div>
              <div>
                <label style={lbl}>Phone Number <span style={{color:'#ff87c4'}}>*</span></label>
                <input name="phone" type="tel" placeholder="(206) 555-0000" value={form.phone} onChange={set('phone')} onBlur={onBlur('phone')} onFocus={focus} style={inp(!!errors.phone)}/>
                <FieldError msg={errors.phone}/>
              </div>
              <div>
                <label style={lbl}>Email <span style={{color:'#ff87c4'}}>*</span></label>
                <input name="email" type="email" placeholder="you@business.com" value={form.email} onChange={set('email')} onBlur={onBlur('email')} onFocus={focus} style={inp(!!errors.email)}/>
                <FieldError msg={errors.email}/>
              </div>
              <div>
                <label style={lbl}>Business Address <span style={{color:'#ff87c4'}}>*</span></label>
                <input name="address" type="text" placeholder="123 Main St, Seattle, WA 98101" value={form.address} onChange={set('address')} onBlur={onBlur('address')} onFocus={focus} style={inp(!!errors.address)}/>
                <FieldError msg={errors.address}/>
              </div>
              <div>
                <label style={{...lbl,display:'flex',justifyContent:'space-between'}}>
                  Any questions
                  <span style={{fontWeight:400,color:'#8B6F5E',fontSize:11}}>optional</span>
                </label>
                <textarea name="questions" placeholder="Tell us about your space, any questions..." rows={4} value={form.questions} onChange={set('questions')} onFocus={focus} onBlur={blur}
                  style={{...inp(false),resize:'vertical'}}/>
              </div>
              <button type="submit" style={{...P,width:'100%',background:'#ff87c4',color:'#fff',border:'none',borderRadius:12,padding:'15px',fontSize:15,fontWeight:700,cursor:'pointer',transition:'all 0.2s',boxShadow:'0 4px 18px rgba(255,135,196,0.3)',marginTop:4}}
                onMouseEnter={e=>{e.currentTarget.style.background='#e56ba8';e.currentTarget.style.transform='translateY(-1px)';}}
                onMouseLeave={e=>{e.currentTarget.style.background='#ff87c4';e.currentTarget.style.transform='translateY(0)';}}>
                Send Message →
              </button>
              <p style={{...P,textAlign:'center',fontSize:11.5,color:'#8B6F5E',marginTop:4}}>
                Or email us at <a href="mailto:info@amusyentertainment.com" style={{color:'#ff87c4',fontWeight:600}}>info@amusyentertainment.com</a>
              </p>
            </div>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
