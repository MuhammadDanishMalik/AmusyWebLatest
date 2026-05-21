'use client';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const P = { fontFamily:"'Montserrat',sans-serif" };
function S({title,children}:{title:string;children:React.ReactNode}){
  return(<div style={{marginBottom:28}}><h2 style={{...P,fontSize:17,fontWeight:700,color:'#1C1007',marginBottom:10}}>{title}</h2><div style={{...P,fontSize:14,color:'#4A3728',lineHeight:1.85}}>{children}</div></div>);
}
export default function TermsPage(){
  return(
    <div style={{background:'#FAFAF8',minHeight:'100vh'}}>
      <Navbar activePage="Terms"/>
      <main style={{maxWidth:740,margin:'0 auto',padding:'120px clamp(20px,4vw,48px) 80px'}}>
        <div style={{marginBottom:44}}>
          <span style={{...P,fontSize:10.5,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'#ff87c4'}}>Legal</span>
          <h1 style={{...P,fontSize:'clamp(30px,5vw,50px)',fontWeight:700,lineHeight:1.1,letterSpacing:'-0.02em',color:'#1C1007',marginTop:10,marginBottom:10}}>Terms of Service</h1>
          <p style={{...P,fontSize:13,color:'#8B6F5E'}}>Last updated: May 1, 2024</p>
        </div>
        <div style={{background:'#fff',border:'1px solid rgba(0,0,0,0.07)',borderRadius:20,padding:'36px 40px',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
          <S title="1. Agreement to Terms"><p>By accessing the Amusy Entertainment website, mobile application, or submitting a partnership application, you agree to be bound by these Terms of Service.</p></S>
          <S title="2. Partner Store Agreement"><p>When you register as a partner store, you agree to: provide accurate business information; allow Amusy staff access for servicing; not tamper with or move machines without consent; provide access to a standard electrical outlet; notify Amusy of any damage within 24 hours.</p></S>
          <S title="3. Revenue Share"><p>The revenue share is defined in a separate Partnership Agreement executed upon machine placement. The percentage is determined by store type, foot traffic, and machine configuration. Amusy may adjust terms with 30 days written notice.</p></S>
          <S title="4. Machine Ownership"><p>All Amusy machines, equipment, and prizes remain the sole property of Amusy Entertainment LLC at all times. The partner store is a host, not an owner.</p></S>
          <S title="5. Prohibited Conduct"><p>You agree not to: misrepresent your business; interfere with machine operations; use Amusy branding without written permission; sublicense the partnership agreement; or engage in fraudulent coupon redemption.</p></S>
          <S title="6. Limitation of Liability"><p>Amusy Entertainment shall not be liable for any indirect, incidental, or consequential damages. Our total liability shall not exceed the revenue share paid to you in the 3 months preceding any claim.</p></S>
          <S title="7. Termination"><p>Either party may terminate the partnership agreement with 30 days written notice. Amusy reserves the right to terminate immediately for material breach.</p></S>
          <S title="8. Governing Law"><p>These Terms shall be governed by the laws of the State of Washington, United States. Disputes shall be resolved in the courts of King County, Washington.</p></S>
          <S title="9. Contact"><p>Questions? Email: <a href="mailto:info@amusyentertainment.com" style={{color:'#ff87c4'}}>info@amusyentertainment.com</a></p></S>
        </div>
      </main>
      <Footer />
    </div>
  );
}
