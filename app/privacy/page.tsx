'use client';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const P = { fontFamily:"'Montserrat',sans-serif" };
function S({title,children}:{title:string;children:React.ReactNode}){
  return(<div style={{marginBottom:28}}><h2 style={{...P,fontSize:17,fontWeight:700,color:'#1C1007',marginBottom:10}}>{title}</h2><div style={{...P,fontSize:14,color:'#4A3728',lineHeight:1.85}}>{children}</div></div>);
}
export default function PrivacyPage(){
  return(
    <div style={{background:'#FAFAF8',minHeight:'100vh'}}>
      <Navbar activePage="Privacy"/>
      <main style={{maxWidth:740,margin:'0 auto',padding:'120px clamp(20px,4vw,48px) 80px'}}>
        <div style={{marginBottom:44}}>
          <span style={{...P,fontSize:10.5,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'#ff87c4'}}>Legal</span>
          <h1 style={{...P,fontSize:'clamp(30px,5vw,50px)',fontWeight:700,lineHeight:1.1,letterSpacing:'-0.02em',color:'#1C1007',marginTop:10,marginBottom:10}}>Privacy Policy</h1>
          <p style={{...P,fontSize:13,color:'#8B6F5E'}}>Last updated: May 1, 2024</p>
        </div>
        <div style={{background:'#fff',border:'1px solid rgba(0,0,0,0.07)',borderRadius:20,padding:'36px 40px',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
          <S title="1. Information We Collect"><p>When you fill out our partner registration form, we collect: your name, business name, email address, phone number, business address, social media handles, website URL, and Google Maps link. We also collect information you voluntarily provide in your message.</p><p style={{marginTop:10}}>When you use the Amusy mobile application, we may collect: device identifiers, location data (with your permission), usage analytics, and coupon redemption data.</p></S>
          <S title="2. How We Use Your Information"><p>We use the information we collect to process and respond to partnership applications, communicate with you about our services, send you updates (with consent), improve our app experience, and comply with legal obligations.</p></S>
          <S title="3. Data Sharing"><p>We do not sell your personal information. We may share information with trusted service providers who assist us in operating our website and app, subject to strict confidentiality agreements.</p></S>
          <S title="4. Data Retention"><p>We retain your information for as long as necessary to fulfill the purposes described in this policy. Partnership inquiry data is retained for up to 2 years after the last communication.</p></S>
          <S title="5. Your Rights"><p>You have the right to access, correct, or delete your personal information. Contact us at <a href="mailto:hello@amusyentertainment.com" style={{color:'#ff87c4'}}>hello@amusyentertainment.com</a>. We will respond within 30 days.</p></S>
          <S title="6. Cookies"><p>Our website uses essential cookies for functionality and analytics cookies (with consent) to understand usage patterns.</p></S>
          <S title="7. Security"><p>We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure.</p></S>
          <S title="8. Contact Us"><p>Questions? Email: <a href="mailto:hello@amusyentertainment.com" style={{color:'#ff87c4'}}>hello@amusyentertainment.com</a><br/>Amusy Entertainment LLC, Greater Seattle, WA</p></S>
        </div>
      </main>
      <Footer />
    </div>
  );
}
