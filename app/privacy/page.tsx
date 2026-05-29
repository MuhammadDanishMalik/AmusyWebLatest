'use client';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLang } from '../context/LangContext';
const P = { fontFamily:"'Montserrat',sans-serif" };
function S({title,children}:{title:string;children:React.ReactNode}){
  return(<div style={{marginBottom:28}}><h2 style={{...P,fontSize:17,fontWeight:700,color:'#1C1007',marginBottom:10}}>{title}</h2><div style={{...P,fontSize:14,color:'#4A3728',lineHeight:1.85}}>{children}</div></div>);
}

const sections_en = [
  { title:'1. Information We Collect', body:'When you fill out our partner registration form, we collect: your name, business name, email address, phone number, business address, social media handles, website URL, and Google Maps link. We also collect information you voluntarily provide in your message.\n\nWhen you use the Amusy mobile application, we may collect: device identifiers, location data (with your permission), usage analytics, and coupon redemption data.' },
  { title:'2. How We Use Your Information', body:'We use the information we collect to process and respond to partnership applications, communicate with you about our services, send you updates (with consent), improve our app experience, and comply with legal obligations.' },
  { title:'3. Data Sharing', body:'We do not sell your personal information. We may share information with trusted service providers who assist us in operating our website and app, subject to strict confidentiality agreements.' },
  { title:'4. Data Retention', body:'We retain your information for as long as necessary to fulfill the purposes described in this policy. Partnership inquiry data is retained for up to 2 years after the last communication.' },
  { title:'5. Your Rights', body:'You have the right to access, correct, or delete your personal information. Contact us at hello@amusyentertainment.com. We will respond within 30 days.' },
  { title:'6. Cookies', body:'Our website uses essential cookies for functionality and analytics cookies (with consent) to understand usage patterns.' },
  { title:'7. Security', body:'We implement industry-standard security measures to protect your information. However, no method of transmission over the internet is 100% secure.' },
  { title:'8. Contact Us', body:'Questions? Email: hello@amusyentertainment.com\nAmusy Entertainment LLC, Greater Seattle, WA' },
];

const sections_ja = [
  { title:'1. 収集する情報', body:'パートナー登録フォームにご記入いただく際、お名前、事業名、メールアドレス、電話番号、事業所住所、SNSアカウント、ウェブサイトURL、Googleマップリンクを収集します。また、メッセージに任意でご提供いただいた情報も収集します。\n\nAmysyモバイルアプリをご利用の際、デバイス識別子、位置情報（許可を得た場合）、利用分析、クーポン使用データを収集する場合があります。' },
  { title:'2. 情報の利用方法', body:'収集した情報は、パートナーシップ申請の処理と対応、サービスに関するコミュニケーション、更新情報の送信（同意を得た場合）、アプリ体験の向上、法的義務の遵守に使用します。' },
  { title:'3. データの共有', body:'お客様の個人情報を販売することはありません。当社のウェブサイトおよびアプリの運営を支援する信頼できるサービスプロバイダーと、厳格な機密保持契約のもとで情報を共有する場合があります。' },
  { title:'4. データの保持', body:'本ポリシーに記載された目的を達成するために必要な期間、お客様の情報を保持します。パートナーシップに関するお問い合わせデータは、最後の通信から最長2年間保持されます。' },
  { title:'5. お客様の権利', body:'お客様には、個人情報へのアクセス、訂正、削除の権利があります。hello@amusyentertainment.comまでご連絡ください。30日以内に対応いたします。' },
  { title:'6. Cookie', body:'当社のウェブサイトでは、機能に必要なCookieと、利用パターンを理解するための分析Cookie（同意を得た場合）を使用しています。' },
  { title:'7. セキュリティ', body:'お客様の情報を保護するために業界標準のセキュリティ対策を実施しています。ただし、インターネット上の通信方法は100%安全ではありません。' },
  { title:'8. お問い合わせ', body:'ご質問がございましたら、hello@amusyentertainment.comまでメールでお問い合わせください。\nAmusy Entertainment LLC、シアトル都市圏、ワシントン州' },
];

export default function PrivacyPage(){
  const { lang } = useLang();
  const jp = lang === 'ja';
  const sections = jp ? sections_ja : sections_en;

  return(
    <div style={{background:'#FAFAF8',minHeight:'100vh',position:'relative'}}>
      {/* Amusy logo pattern background */}
      <div style={{
        position:'fixed', inset:0,
        backgroundImage:'url("/images/client/bg-logo-transparent.png")',
        backgroundSize:'700px',
        backgroundRepeat:'repeat',
        opacity: 0.25,
        pointerEvents:'none',
        zIndex:0,
      }}/>
      <Navbar activePage="Privacy"/>
      <main style={{maxWidth:740,margin:'0 auto',padding:'120px clamp(20px,4vw,48px) 80px'}}>
        <div style={{marginBottom:44}}>
          <span style={{...P,fontSize:10.5,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'#ff87c4'}}>{jp ? '法的情報' : 'Legal'}</span>
          <h1 style={{...P,fontSize:'clamp(30px,5vw,50px)',fontWeight:700,lineHeight:1.1,letterSpacing:'-0.02em',color:'#1C1007',marginTop:10,marginBottom:10}}>{jp ? 'プライバシーポリシー' : 'Privacy Policy'}</h1>
          <p style={{...P,fontSize:13,color:'#8B6F5E'}}>{jp ? '最終更新日：2024年5月1日' : 'Last updated: May 1, 2024'}</p>
        </div>
        <div style={{background:'#fff',border:'1px solid rgba(0,0,0,0.07)',borderRadius:20,padding:'36px 40px',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
          {sections.map((s,i)=>(
            <S key={i} title={s.title}>{s.body.split('\n\n').map((p,j)=><p key={j} style={{marginTop:j>0?10:0}}>{p}</p>)}</S>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
