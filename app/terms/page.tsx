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
  { title:'1. Agreement to Terms', body:'By accessing the Amusy Entertainment website, mobile application, or submitting a partnership application, you agree to be bound by these Terms of Service.' },
  { title:'2. Partner Store Agreement', body:'When you register as a partner store, you agree to: provide accurate business information; allow Amusy staff access for servicing; not tamper with or move machines without consent; provide access to a standard electrical outlet; notify Amusy of any damage within 24 hours.' },
  { title:'3. Revenue Share', body:'The revenue share is defined in a separate Partnership Agreement executed upon machine placement. The percentage is determined by store type, foot traffic, and machine configuration. Amusy may adjust terms with 30 days written notice.' },
  { title:'4. Machine Ownership', body:'All Amusy machines, equipment, and prizes remain the sole property of Amusy Entertainment LLC at all times. The partner store is a host, not an owner.' },
  { title:'5. Prohibited Conduct', body:'You agree not to: misrepresent your business; interfere with machine operations; use Amusy branding without written permission; sublicense the partnership agreement; or engage in fraudulent coupon redemption.' },
  { title:'6. Limitation of Liability', body:'Amusy Entertainment shall not be liable for any indirect, incidental, or consequential damages. Our total liability shall not exceed the revenue share paid to you in the 3 months preceding any claim.' },
  { title:'7. Termination', body:'Either party may terminate the partnership agreement with 30 days written notice. Amusy reserves the right to terminate immediately for material breach.' },
  { title:'8. Governing Law', body:'These Terms shall be governed by the laws of the State of Washington, United States. Disputes shall be resolved in the courts of King County, Washington.' },
  { title:'9. Contact', body:'Questions? Email: info@amusyentertainment.com' },
];

const sections_ja = [
  { title:'1. 利用規約への同意', body:'Amusy Entertainmentのウェブサイト、モバイルアプリケーションへのアクセス、またはパートナーシップ申請の提出により、本利用規約に拘束されることに同意したものとみなされます。' },
  { title:'2. パートナー店舗契約', body:'パートナー店舗として登録する際、以下に同意します：正確な事業情報の提供、サービスのためのAmysyスタッフへのアクセス許可、同意なしにマシンを改ざん・移動しないこと、標準的な電源コンセントへのアクセス提供、24時間以内の損傷通知。' },
  { title:'3. 収益シェア', body:'収益シェアは、マシン設置時に締結される別途パートナーシップ契約で定義されます。割合は、店舗タイプ、来客数、マシン構成によって決定されます。Amysyは30日前の書面通知により条件を調整する場合があります。' },
  { title:'4. マシンの所有権', body:'すべてのAmysyマシン、機器、景品は、常にAmusy Entertainment LLCの独占的財産です。パートナー店舗はホストであり、所有者ではありません。' },
  { title:'5. 禁止行為', body:'以下の行為を行わないことに同意します：事業の虚偽表示、マシン運営への干渉、書面による許可なしのAmysyブランドの使用、パートナーシップ契約のサブライセンス、不正なクーポン引き換え。' },
  { title:'6. 責任の制限', body:'Amusy Entertainmentは、間接的、偶発的、または結果的な損害について責任を負いません。当社の総責任額は、請求に先立つ3ヶ月間にお支払いした収益シェアを超えないものとします。' },
  { title:'7. 解約', body:'いずれかの当事者は、30日前の書面通知によりパートナーシップ契約を解約できます。Amysyは、重大な違反の場合、直ちに解約する権利を留保します。' },
  { title:'8. 準拠法', body:'本規約は、アメリカ合衆国ワシントン州の法律に準拠します。紛争は、ワシントン州キング郡の裁判所で解決されるものとします。' },
  { title:'9. お問い合わせ', body:'ご質問がございましたら、info@amusyentertainment.comまでメールでお問い合わせください。' },
];

export default function TermsPage(){
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
      <Navbar activePage="Terms"/>
      <main style={{maxWidth:740,margin:'0 auto',padding:'120px clamp(20px,4vw,48px) 80px'}}>
        <div style={{marginBottom:44}}>
          <span style={{...P,fontSize:10.5,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'#ff87c4'}}>{jp ? '法的情報' : 'Legal'}</span>
          <h1 style={{...P,fontSize:'clamp(30px,5vw,50px)',fontWeight:700,lineHeight:1.1,letterSpacing:'-0.02em',color:'#1C1007',marginTop:10,marginBottom:10}}>{jp ? '利用規約' : 'Terms of Service'}</h1>
          <p style={{...P,fontSize:13,color:'#8B6F5E'}}>{jp ? '最終更新日：2024年5月1日' : 'Last updated: May 1, 2024'}</p>
        </div>
        <div style={{background:'#fff',border:'1px solid rgba(0,0,0,0.07)',borderRadius:20,padding:'36px 40px',boxShadow:'0 2px 8px rgba(0,0,0,0.04)'}}>
          {sections.map((s,i)=>(
            <S key={i} title={s.title}><p>{s.body}</p></S>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
