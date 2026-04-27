import Head from 'next/head';
import { useState, useRef, useCallback } from 'react';

const B = {
  teal:'#517383', yellow:'#ECEA54', coral:'#E94D60',
  cream:'#E7DFD7', dark:'#14544E', black:'#1A1A1A', white:'#FFFFFF', gray:'#F5F2EE'
};

const NISCHEN = ['Business Coaching','Life Coaching','Health Coaching','Fitness & Ernährung','Mental Health & Mindset','Beziehungs-Coaching','Karriere-Coaching','Social Media Marketing','Content Creation','Copywriting','SEO & Online Marketing','Web Design & Entwicklung','Grafikdesign & Branding','Fotografie & Video','Unternehmensberatung','Finanzberatung & Investments','Immobilien','Recht & Steuern','Personal Branding','E-Commerce & Dropshipping','Online Kurse & Memberships','Virtual Assistant','HR & Recruiting','PR & Kommunikation','Nachhaltigkeit & Impact','Spiritualität & Energie','Kunst & Kreatives','Mode & Styling','Reisen & Lifestyle','Andere'];
const POSTING_FREQ = ['Täglich','5-6x pro Woche','3-4x pro Woche','1-2x pro Woche','Weniger als 1x pro Woche','Unregelmäßig'];

const ZIELE = [
  {id:'follower', label:'📈 Mehr Follower', desc:'Reichweite & Community aufbauen'},
  {id:'umsatz', label:'💰 Mehr Umsatz', desc:'Produkte & Angebote verkaufen'},
  {id:'anfragen', label:'📩 Mehr Anfragen', desc:'Neue Kunden & Leads gewinnen'},
  {id:'reichweite', label:'🔥 Mehr Reichweite', desc:'Viral gehen & bekannter werden'},
  {id:'marke', label:'🏆 Marke aufbauen', desc:'Als Expertin positionieren'},
  {id:'community', label:'❤️ Community stärken', desc:'Engagement & Bindung erhöhen'},
  {id:'traffic', label:'🌐 Mehr Website-Traffic', desc:'Besucher auf die Website leiten'},
  {id:'email', label:'📧 E-Mail Liste aufbauen', desc:'Newsletter-Abonnenten gewinnen'},
];

const TABS_FINAL = [
  {id:'gesamt',label:'🏆 Gesamt'},
  {id:'ziele',label:'🎯 Ziele & Lücken'},
  {id:'bio',label:'📝 Bio & SEO'},
  {id:'optik',label:'🎨 Feed-Optik'},
  {id:'saeulen',label:'🏛️ Säulen'},
  {id:'hooks',label:'🪝 Hooks'},
  {id:'posts',label:'📊 Posts'},
  {id:'keywords',label:'🔑 Keywords'},
  {id:'plan',label:'📅 Content-Plan'},
  {id:'massnahmen',label:'🚀 Maßnahmen'},
];

function Logo() {
  return (
    <div style={{display:'flex',alignItems:'center',gap:12}}>
      <div style={{display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
        <div style={{
          fontFamily:'Georgia,serif',
          fontWeight:900,
          fontSize:22,
          color:B.yellow,
          letterSpacing:'0.15em',
          lineHeight:1,
          textTransform:'uppercase'
        }}>BRIT ORTLEPP</div>
        <div style={{
          fontSize:8,
          letterSpacing:'0.3em',
          color:'#aaa',
          marginTop:3,
          textTransform:'uppercase'
        }}>OUTSTANDING CONTENT</div>
      </div>
    </div>
  );
}

function UploadZone({label,hint,onFile,file,icon,required}) {
  const ref = useRef();
  const [drag,setDrag] = useState(false);
  const handleDrop = useCallback((e)=>{
    e.preventDefault();setDrag(false);
    const f=e.dataTransfer.files[0];
    if(f&&f.type.startsWith('image/'))onFile(f);
  },[onFile]);
  return (
    <div>
      <div style={{fontSize:12,fontWeight:700,color:B.teal,marginBottom:6,letterSpacing:'0.05em',textTransform:'uppercase'}}>
        {label}{required&&<span style={{color:B.coral}}> *</span>}
      </div>
      {hint&&<div style={{fontSize:12,color:'#888',marginBottom:8}}>{hint}</div>}
      <div onClick={()=>ref.current.click()}
        onDragOver={e=>{e.preventDefault();setDrag(true);}}
        onDragLeave={()=>setDrag(false)}
        onDrop={handleDrop}
        style={{border:`2px dashed ${drag?B.teal:file?B.yellow:'#ccc'}`,borderRadius:14,padding:16,textAlign:'center',cursor:'pointer',background:file?B.yellow+'15':drag?B.teal+'10':'#fafafa',transition:'all 0.2s',minHeight:110,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8}}>
        {file?(
          <><img src={URL.createObjectURL(file)} alt="" style={{maxHeight:70,maxWidth:'100%',borderRadius:8,objectFit:'cover'}}/><div style={{fontSize:12,color:B.teal,fontWeight:700}}>✓ {file.name}</div></>
        ):(
          <><div style={{fontSize:28}}>{icon||'📸'}</div><div style={{fontSize:13,fontWeight:700,color:'#555'}}>Ablegen oder klicken</div></>
        )}
      </div>
      <input ref={ref} type="file" accept="image/*" style={{display:'none'}} onChange={e=>{if(e.target.files[0])onFile(e.target.files[0]);}}/>
    </div>
  );
}

function ScoreRing({score,size=100}) {
  const color=score>=70?B.teal:score>=45?'#E9A020':B.coral;
  const r=40,circ=2*Math.PI*r,offset=circ-(score/100)*circ;
  return (
    <div style={{position:'relative',width:size,height:size,flexShrink:0}}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#e8e0d8" strokeWidth="10"/>
        <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="10"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 50 50)"/>
      </svg>
      <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <span style={{fontSize:size*0.22,fontWeight:900,color,lineHeight:1}}>{score}</span>
        <span style={{fontSize:size*0.1,color:'#999'}}>/100</span>
      </div>
    </div>
  );
}

function ScoreBar({score}) {
  const color=score>=70?B.teal:score>=45?'#E9A020':B.coral;
  return (<div style={{background:'#e8e0d8',borderRadius:99,height:6,overflow:'hidden',flex:1}}>
    <div style={{width:`${score}%`,background:color,height:'100%',borderRadius:99}}/>
  </div>);
}

function Chip({children,color=B.teal}) {
  return <span style={{background:color+'20',color,padding:'4px 12px',borderRadius:99,fontSize:12,fontWeight:700,display:'inline-block',margin:'3px'}}>{children}</span>;
}

function Card({children,style={}}) {
  return <div style={{background:B.white,borderRadius:18,padding:24,boxShadow:'0 2px 20px rgba(0,0,0,0.07)',marginBottom:16,...style}}>{children}</div>;
}

function SLabel({children}) {
  return <div style={{fontSize:11,fontWeight:700,color:B.teal,letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:8}}>{children}</div>;
}

function Inp({label,placeholder,value,onChange,required}) {
  return (
    <div>
      <label style={{display:'block',fontSize:12,fontWeight:700,color:B.teal,marginBottom:6,letterSpacing:'0.04em',textTransform:'uppercase'}}>
        {label}{required&&<span style={{color:B.coral}}> *</span>}
      </label>
      <input placeholder={placeholder} value={value} onChange={onChange}
        style={{width:'100%',border:`1.5px solid ${B.cream}`,borderRadius:10,padding:'11px 14px',fontSize:14,outline:'none',fontFamily:'Montserrat,sans-serif',boxSizing:'border-box',background:B.white,color:B.black}}/>
    </div>
  );
}

function Sel({label,options,value,onChange,required}) {
  return (
    <div>
      <label style={{display:'block',fontSize:12,fontWeight:700,color:B.teal,marginBottom:6,letterSpacing:'0.04em',textTransform:'uppercase'}}>
        {label}{required&&<span style={{color:B.coral}}> *</span>}
      </label>
      <select value={value} onChange={onChange}
        style={{width:'100%',border:`1.5px solid ${B.cream}`,borderRadius:10,padding:'11px 14px',fontSize:14,outline:'none',fontFamily:'Montserrat,sans-serif',background:B.white,color:value?B.black:'#aaa',appearance:'none',cursor:'pointer'}}>
        <option value="">Bitte wählen...</option>
        {options.map(o=><option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function Txta({label,placeholder,value,onChange,rows=4}) {
  return (
    <div>
      <label style={{display:'block',fontSize:12,fontWeight:700,color:B.teal,marginBottom:6,letterSpacing:'0.04em',textTransform:'uppercase'}}>{label}</label>
      <textarea placeholder={placeholder} value={value} onChange={onChange} rows={rows}
        style={{width:'100%',border:`1.5px solid ${B.cream}`,borderRadius:10,padding:'11px 14px',fontSize:14,outline:'none',fontFamily:'Montserrat,sans-serif',boxSizing:'border-box',background:B.white,color:B.black,resize:'vertical'}}/>
    </div>
  );
}

function Btn({children,onClick,disabled,variant='primary',full}) {
  const s={
    primary:{background:B.teal,color:B.white},
    yellow:{background:B.yellow,color:B.black},
    ghost:{background:B.cream,color:B.black},
    dark:{background:B.black,color:B.white},
    coral:{background:B.coral,color:B.white},
  };
  return (
    <button onClick={onClick} disabled={disabled}
      style={{...s[variant],padding:'13px 24px',borderRadius:12,border:'none',cursor:disabled?'not-allowed':'pointer',fontWeight:700,fontSize:14,fontFamily:'Montserrat,sans-serif',opacity:disabled?0.5:1,width:full?'100%':'auto',transition:'all 0.2s'}}>
      {children}
    </button>
  );
}

function fileToB64(file) {
  return new Promise((res,rej)=>{
    const img=new Image();
    const url=URL.createObjectURL(file);
    img.onload=()=>{
      try {
        const MAX=800;
        let w=img.width,h=img.height;
        if(w>MAX||h>MAX){
          if(w>h){h=Math.round(h*MAX/w);w=MAX;}
          else{w=Math.round(w*MAX/h);h=MAX;}
        }
        const canvas=document.createElement('canvas');
        canvas.width=w;canvas.height=h;
        const ctx=canvas.getContext('2d');
        ctx.drawImage(img,0,0,w,h);
        URL.revokeObjectURL(url);
        const data=canvas.toDataURL('image/jpeg',0.6);
        res(data.split(',')[1]);
      } catch(e){rej(e);}
    };
    img.onerror=()=>rej(new Error('Image load failed'));
    img.src=url;
  });
}

const scoreColor=s=>s>=70?B.teal:s>=45?'#E9A020':B.coral;
const scoreLabel=s=>s>=70?'Gut':s>=45?'Ausbaufähig':'Handlungsbedarf';
const LOAD_MSGS=['Screenshots werden analysiert...','Bio & SEO werden ausgewertet...','Content-Qualität wird bewertet...','Deine Ziele werden berücksichtigt...','Report wird erstellt...'];

export default function App() {
  const [step,setStep]=useState(0);
  const [loading,setLoading]=useState(false);
  const [loadMsg,setLoadMsg]=useState('');
  const [analysis,setAnalysis]=useState(null);
  const [activeTab,setActiveTab]=useState('gesamt');
  const [showPrivacy,setShowPrivacy]=useState(false);

  // Screenshots
  const [profileImg,setProfileImg]=useState(null);
  const [feedImg1,setFeedImg1]=useState(null);
  const [feedImg2,setFeedImg2]=useState(null);
  const [feedImg3,setFeedImg3]=useState(null);

  // Account Infos
  const [vorname,setVorname]=useState('');
  const [customerName,setCustomerName]=useState('');
  const [handle,setHandle]=useState('');
  const [followers,setFollowers]=useState('');
  const [nische,setNische]=useState('');
  const [postingFreq,setPostingFreq]=useState('');
  const [formatMix,setFormatMix]=useState('');
  const [zielgruppe,setZielgruppe]=useState('');
  const [website,setWebsite]=useState('');
  const [linkInBio,setLinkInBio]=useState('');

  // Ziele
  const [hauptziel,setHauptziel]=useState('');
  const [nebenziele,setNebenziele]=useState([]);

  // Post Details
  const [postRequests,setPostRequests]=useState([]);
  const [postScreenshots,setPostScreenshots]=useState([]);

  // Insights
  const [avgReach,setAvgReach]=useState('');
  const [followerGrowth,setFollowerGrowth]=useState('');
  const [topFormat,setTopFormat]=useState('');
  const [profileViews,setProfileViews]=useState('');
  const [storyReach,setStoryReach]=useState('');
  const [linkClicks,setLinkClicks]=useState('');
  const [bestTime,setBestTime]=useState('');
  const [additionalNotes,setAdditionalNotes]=useState('');

  const canStep2=profileImg&&feedImg1&&handle&&followers&&nische&&hauptziel&&vorname;

  const toggleNebenziel=(id)=>{
    if(id===hauptziel)return;
    setNebenziele(prev=>prev.includes(id)?prev.filter(z=>z!==id):[...prev,id]);
  };

  const getName=()=>vorname||customerName||'du';

  async function runFirstAnalysis() {
    setLoading(true);
    let mi=0;setLoadMsg(LOAD_MSGS[0]);
    const iv=setInterval(()=>{mi=(mi+1)%LOAD_MSGS.length;setLoadMsg(LOAD_MSGS[mi]);},3000);
    try {
      const imgs=[];
      for(const f of [profileImg,feedImg1].filter(Boolean)){
        imgs.push({type:'image',source:{type:'base64',media_type:'image/jpeg',data:await fileToB64(f)}});
      }
      const hauptzielLabel=ZIELE.find(z=>z.id===hauptziel)?.label||hauptziel;
      const nebenzielLabels=nebenziele.map(id=>ZIELE.find(z=>z.id===id)?.label||id).join(', ');

      const prompt=`Du bist ein professioneller Instagram-Stratege für Coaches und Berater im DACH-Raum. Analysiere die hochgeladenen Instagram-Screenshots.

PROFIL-DATEN:
Vorname: ${vorname}
Handle: @${handle}
Follower: ${followers}
Nische: ${nische}
Posting-Frequenz: ${postingFreq||'unbekannt'}
Format-Mix: ${formatMix||'unbekannt'}
Zielgruppe: ${zielgruppe||'unbekannt'}
Website: ${website||'keine'}
Link-in-Bio: ${linkInBio||'unbekannt'}

ZIELE:
Hauptziel: ${hauptzielLabel}
Nebenziele: ${nebenzielLabels||'keine'}

Analysiere: Bio (SEO-Feld, Text, CTA), Feed-Optik (Qualität, Konsistenz, Farbwelt), sichtbare Hooks, Content-Säulen (Authority/Demand/Conversion), Gesamteindruck. Berücksichtige dabei besonders das Hauptziel "${hauptzielLabel}".

Antworte NUR mit JSON:
{"erstanalyse":{"gesamteindruck":"<3-4 Sätze, sprich ${vorname} direkt mit Du an>","bio":{"score":<0-100>,"bewertung":"<Text>","staerken":["<s>"],"schwaechen":["<s>"]},"feedOptik":{"score":<0-100>,"qualitaet":"<Text>","konsistenz":"<Text>","farbwelt":"<Text>"},"hooks":{"score":<0-100>,"bewertung":"<Text>","sichtbareHooks":["<h>"]},"contentsaeulen":{"authority":<0-100>,"demand":<0-100>,"conversion":<0-100>,"analyse":"<Text>"}},"postAnfragen":[{"nr":1,"grund":"<Konkreter Grund warum dieser Post wichtig ist - z.B. Hook war besonders stark/schwach, auffällige Reichweite etc.>","beschreibung":"<Genaue Beschreibung des Posts damit ${vorname} ihn findet - z.B. der Post mit dem roten Hintergrundbild oben links im Feed, Hook beginnt mit...>","hookHinweis":"<Falls sichtbar: Anfang des Hooks>","prioritaet":"hoch","analyseFokus":"<Was soll bei diesem Post genau analysiert werden?>"},{"nr":2,"grund":"<Grund>","beschreibung":"<Beschreibung>","hookHinweis":"<Hook-Anfang falls sichtbar>","prioritaet":"hoch","analyseFokus":"<Fokus>"},{"nr":3,"grund":"<Grund>","beschreibung":"<Beschreibung>","hookHinweis":"<Hook-Anfang>","prioritaet":"mittel","analyseFokus":"<Fokus>"},{"nr":4,"grund":"<Grund>","beschreibung":"<Beschreibung>","hookHinweis":"<Hook-Anfang>","prioritaet":"mittel","analyseFokus":"<Fokus>"},{"nr":5,"grund":"<Grund>","beschreibung":"<Beschreibung>","hookHinweis":"<Hook-Anfang>","prioritaet":"mittel","analyseFokus":"<Fokus>"}]}`;

      const res=await fetch('/api/analyze',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({messages:[{role:'user',content:[...imgs,{type:'text',text:prompt}]}]})
      });
      const data=await res.json();
      const raw=data.content[0].text.replace(/```json|```/g,'').trim();
      const parsed=JSON.parse(raw);
      setPostRequests(parsed.postAnfragen||[]);
      setPostScreenshots((parsed.postAnfragen||[]).map((_,i)=>({id:i,img:null,caption:'',likes:'',comments:'',views:'',hashtags:'',format:''})));
      setAnalysis(parsed);
      setStep(2);
    } catch(e){console.error(e);alert('Fehler bei der Analyse. Bitte erneut versuchen.');}
    clearInterval(iv);setLoading(false);
  }

  async function runFinalAnalysis() {
    setLoading(true);
    let mi=0;setLoadMsg(LOAD_MSGS[0]);
    const iv=setInterval(()=>{mi=(mi+1)%LOAD_MSGS.length;setLoadMsg(LOAD_MSGS[mi]);},3000);
    try {
      const hauptzielLabel=ZIELE.find(z=>z.id===hauptziel)?.label||hauptziel;
      const nebenzielLabels=nebenziele.map(id=>ZIELE.find(z=>z.id===id)?.label||id).join(', ');

      // Build messages with post screenshots
      const postImgContent=[];
      for(let i=0;i<postScreenshots.length;i++){
        const ps=postScreenshots[i];
        if(ps.img){
          try{
            const b64=await fileToB64(ps.img);
            postImgContent.push({type:'image',source:{type:'base64',media_type:'image/jpeg',data:b64}});
            postImgContent.push({type:'text',text:`Screenshot von Post #${i+1}`});
          }catch(e){
            console.error('Bild übersprungen:',e);
          }
        }
      }

      const prompt=`Du bist ein professioneller Instagram-Stratege. Erstelle die vollständige finale Analyse für ${vorname}.

ERSTANALYSE: ${JSON.stringify(analysis?.erstanalyse)}

ZIELE:
Hauptziel: ${hauptzielLabel}
Nebenziele: ${nebenzielLabels||'keine'}

POST-DETAILS:
${postScreenshots.map((p,i)=>`Post ${i+1}: ${p.img?'Screenshot hochgeladen ✓':''} | Caption: ${p.caption||'k.A.'} | Likes: ${p.likes||'k.A.'} | Kommentare: ${p.comments||'k.A.'} | Views: ${p.views||'k.A.'} | Hashtags: ${p.hashtags||'k.A.'} | Format: ${p.format||'k.A.'}`).join('\n')}

INSIGHTS: Reichweite: ${avgReach||'k.A.'} | Wachstum: ${followerGrowth||'k.A.'} | Profil-Aufrufe: ${profileViews||'k.A.'} | Story-Reach: ${storyReach||'k.A.'} | Link-Klicks: ${linkClicks||'k.A.'} | Beste Zeit: ${bestTime||'k.A.'} | Top-Format: ${topFormat||'k.A.'} | Zusatz: ${additionalNotes||'keine'}

WICHTIG: Sprich ${vorname} durchgehend mit "du/dein" an. Analysiere den Content IMMER im Kontext des Hauptziels "${hauptzielLabel}".

Antworte NUR mit JSON:
{"gesamtscore":<0-100>,"zusammenfassung":"<4-5 Sätze, direkte Du-Ansprache an ${vorname}>","staerken":["<s1>","<s2>","<s3>"],"sofortmassnahmen":["<m1>","<m2>","<m3>"],
"zielAnalyse":{"hauptziel":"${hauptzielLabel}","erreichungsgrad":<0-100>,"analyse":"<Wie gut hilft der aktuelle Content das Hauptziel zu erreichen?>","luecken":["<Lücke 1>","<Lücke 2>","<Lücke 3>"],"empfehlungen":["<Empfehlung 1>","<Empfehlung 2>","<Empfehlung 3>"]},
"bio":{"score":<0-100>,"analyse":"<mind. 4 Sätze, Du-Form>","staerken":["<s>"],"schwaechen":["<s>"],"optimierung":"<Optimierter Bio-Text>","seoVorschlag":"<SEO-Feld>"},
"feedOptik":{"score":<0-100>,"analyse":"<Text, Du-Form>","staerken":["<s>"],"verbesserungen":["<v>","<v>","<v>"],"empfehlung":"<Text>"},
"contentsaeulen":{"score":<0-100>,"analyse":"<Text>","authority":{"score":<0-100>,"analyse":"<Text>","ideen":["<i>","<i>","<i>"]},"demand":{"score":<0-100>,"analyse":"<Text>","ideen":["<i>","<i>","<i>"]},"conversion":{"score":<0-100>,"analyse":"<Text>","ideen":["<i>","<i>","<i>"]},"empfehlung":"<Text>"},
"hooks":{"score":<0-100>,"analyse":"<Text>","staerken":["<s>"],"schwaechen":["<s>"],"hookVorschlaege":["<h1>","<h2>","<h3>","<h4>","<h5>"],"optimierungen":[{"original":"<o>","optimiert":"<opt>","grund":"<g>"}]},
"postAnalyse":[{"titel":"<Post-Bezeichnung>","bewertung":"<Analyse, Du-Form>","score":<0-100>,"staerken":["<s>"],"schwaechen":["<s>"],"empfehlung":"<Text>"}],
"keywords":{"primaer":["<kw>","<kw>","<kw>"],"sekundaer":["<kw>","<kw>","<kw>"],"hashtags":{"gross":["#t1","#t2","#t3"],"mittel":["#t1","#t2","#t3","#t4"],"nische":["#t1","#t2","#t3","#t4","#t5"]}},
"contentplan":[{"woche":1,"titel":"<Idee>","format":"Reel|Karussell|Static","saeule":"Authority|Demand|Conversion","hook":"<Hook>","thema":"<Thema>","zielBezug":"<Wie hilft das dem Hauptziel?>"},{"woche":2,"titel":"<Idee>","format":"Reel|Karussell|Static","saeule":"Authority|Demand|Conversion","hook":"<Hook>","thema":"<Thema>","zielBezug":"<Wie hilft das dem Hauptziel?>"},{"woche":3,"titel":"<Idee>","format":"Reel|Karussell|Static","saeule":"Authority|Demand|Conversion","hook":"<Hook>","thema":"<Thema>","zielBezug":"<Wie hilft das dem Hauptziel?>"},{"woche":4,"titel":"<Idee>","format":"Reel|Karussell|Static","saeule":"Authority|Demand|Conversion","hook":"<Hook>","thema":"<Thema>","zielBezug":"<Wie hilft das dem Hauptziel?>"}],
"massnahmen":[{"rang":1,"titel":"<Titel>","was":"<Was konkret tun, Du-Form>","auswirkung":"<Wie hilft das dem Ziel?>","aufwand":"niedrig|mittel|hoch","kategorie":"Bio|Optik|Content|Strategie"},{"rang":2,"titel":"<Titel>","was":"<Was>","auswirkung":"<Ergebnis>","aufwand":"niedrig|mittel|hoch","kategorie":"Bio|Optik|Content|Strategie"},{"rang":3,"titel":"<Titel>","was":"<Was>","auswirkung":"<Ergebnis>","aufwand":"niedrig|mittel|hoch","kategorie":"Bio|Optik|Content|Strategie"},{"rang":4,"titel":"<Titel>","was":"<Was>","auswirkung":"<Ergebnis>","aufwand":"niedrig|mittel|hoch","kategorie":"Bio|Optik|Content|Strategie"},{"rang":5,"titel":"<Titel>","was":"<Was>","auswirkung":"<Ergebnis>","aufwand":"niedrig|mittel|hoch","kategorie":"Bio|Optik|Content|Strategie"}]}`;

      const msgContent=[...postImgContent,{type:'text',text:prompt}];
      const res=await fetch('/api/analyze',{
        method:'POST',headers:{'Content-Type':'application/json'},
        body:JSON.stringify({messages:[{role:'user',content:msgContent}]})
      });
      const data=await res.json();
      const raw=data.content[0].text.replace(/```json|```/g,'').trim();
      setAnalysis(prev=>({...prev,final:JSON.parse(raw)}));
      setStep(4);setActiveTab('gesamt');
    } catch(e){console.error(e);alert('Fehler bei der Analyse.');}
    clearInterval(iv);setLoading(false);
  }

  const upPost=(i,k,v)=>setPostScreenshots(prev=>prev.map((p,j)=>j===i?{...p,[k]:v}:p));

  return (
    <>
      <Head>
        <title>Brit Ortlepp – Instagram Content Analyse</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <style>{`*{box-sizing:border-box;margin:0;padding:0;}body{background:#F5F2EE;font-family:'Montserrat',sans-serif;} @media print{header{display:none}}`}</style>
      </Head>
      <div style={{minHeight:'100vh',background:B.gray,color:B.black}}>

        {/* HEADER */}
        <div style={{background:B.black,padding:'14px 28px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100,boxShadow:'0 2px 20px rgba(0,0,0,0.3)'}}>
          <Logo/>
          <div style={{display:'flex',gap:4,alignItems:'center'}}>
            {['Start','Profil','Posts','Insights','Analyse'].map((s,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:4}}>
                <div style={{width:26,height:26,borderRadius:99,background:step>=i?B.yellow:'#333',color:step>=i?B.black:'#666',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:11}}>{i+1}</div>
                {i<4&&<div style={{width:12,height:2,background:step>i?B.yellow:'#444'}}/>}
              </div>
            ))}
          </div>
        </div>

        {/* LOADING */}
        {loading&&(
          <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.9)',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',zIndex:999}}>
            <svg width="80" height="80" viewBox="0 0 100 100" style={{marginBottom:24}}>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#333" strokeWidth="8"/>
              <circle cx="50" cy="50" r="40" fill="none" stroke={B.yellow} strokeWidth="8" strokeDasharray="251" strokeDashoffset="63" strokeLinecap="round" transform="rotate(-90 50 50)">
                <animateTransform attributeName="transform" type="rotate" from="-90 50 50" to="270 50 50" dur="1.5s" repeatCount="indefinite"/>
              </circle>
            </svg>
            <div style={{color:B.yellow,fontWeight:800,fontSize:18,marginBottom:8}}>KI analysiert deinen Content</div>
            <div style={{color:'#aaa',fontSize:14}}>{loadMsg}</div>
          </div>
        )}

        {/* PRIVACY */}
        {showPrivacy&&(
          <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.6)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:998}}>
            <div style={{background:B.white,borderRadius:20,padding:32,maxWidth:480,width:'90%'}}>
              <h3 style={{fontWeight:800,marginBottom:12}}>🔒 Datenschutz</h3>
              <p style={{fontSize:14,lineHeight:1.7,color:'#555',marginBottom:16}}>Deine Daten und Screenshots werden ausschließlich zur Analyse verwendet und nicht dauerhaft gespeichert. Die Verarbeitung erfolgt über die Anthropic API. Es werden keine personenbezogenen Daten an Dritte weitergegeben.</p>
              <p style={{fontSize:12,color:'#888',marginBottom:20}}>© 2025 Brit Ortlepp – Outstanding Content | britortlepp.de</p>
              <Btn onClick={()=>setShowPrivacy(false)} variant="dark">Schließen</Btn>
            </div>
          </div>
        )}

        <div style={{maxWidth:860,margin:'0 auto',padding:'28px 20px 60px'}}>

          {/* STEP 0: ANLEITUNG */}
          {step===0&&(
            <div>
              <div style={{textAlign:'center',marginBottom:36}}>
                <div style={{display:'inline-block',background:B.yellow,borderRadius:16,padding:'6px 18px',fontSize:12,fontWeight:700,color:B.black,marginBottom:16,letterSpacing:'0.1em'}}>INSTAGRAM CONTENT ANALYSE</div>
                <h1 style={{fontWeight:900,fontSize:32,color:B.black,marginBottom:12,lineHeight:1.2}}>Dein professioneller<br/><span style={{color:B.teal}}>Content-Report</span></h1>
                <p style={{fontSize:15,color:'#666',maxWidth:560,margin:'0 auto',lineHeight:1.7}}>Erhalte eine tiefgehende KI-Analyse deines Instagram-Auftritts – inkl. Bio, Feed-Optik, Content-Säulen, Hooks und konkreten Optimierungsvorschlägen.</p>
              </div>

              <Card style={{background:B.black,color:B.white,marginBottom:20}}>
                <SLabel><span style={{color:B.yellow}}>So funktioniert es</span></SLabel>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:14,marginTop:12}}>
                  {[
                    {icon:'🎯',title:'Ziele definieren',text:'Du sagst uns was du erreichen willst.'},
                    {icon:'📸',title:'Screenshots hochladen',text:'Profil + Feed-Screenshots.'},
                    {icon:'🔍',title:'Erstanalyse',text:'KI analysiert und fragt gezielt nach Posts.'},
                    {icon:'📊',title:'Post-Details',text:'Lade Screenshots der wichtigsten Posts hoch.'},
                    {icon:'✨',title:'Insights',text:'Optional: Reichweite & Wachstum.'},
                    {icon:'📄',title:'Dein Report',text:'Umfassender Report mit konkreten Empfehlungen.'},
                  ].map((item,i)=>(
                    <div key={i} style={{background:'#222',borderRadius:14,padding:16}}>
                      <div style={{fontSize:24,marginBottom:8}}>{item.icon}</div>
                      <div style={{fontWeight:700,fontSize:13,color:B.yellow,marginBottom:6}}>{item.title}</div>
                      <div style={{fontSize:12,color:'#aaa',lineHeight:1.6}}>{item.text}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card style={{borderLeft:`5px solid ${B.yellow}`}}>
                <SLabel>Was du bekommst</SLabel>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginTop:10}}>
                  {['Bio & SEO-Optimierung','Feed-Optik Bewertung','Ziel-Lücken Analyse','Content-Säulen (Authority, Demand, Conversion)','Hook-Analyse & 5 Vorschläge','Post-für-Post Bewertung','Keywords & Hashtag-Strategie','4-Wochen Content-Plan','Top 5 Sofort-Maßnahmen'].map((item,i)=>(
                    <div key={i} style={{display:'flex',alignItems:'center',gap:8,fontSize:13}}><span style={{color:B.teal,fontWeight:700}}>✓</span>{item}</div>
                  ))}
                </div>
              </Card>

              <div style={{textAlign:'center',marginTop:8}}>
                <Btn onClick={()=>setStep(1)} variant="yellow">Jetzt starten →</Btn>
                <div style={{marginTop:12,fontSize:12,color:'#999'}}>🔒 Deine Daten werden nicht gespeichert · <span style={{cursor:'pointer',textDecoration:'underline'}} onClick={()=>setShowPrivacy(true)}>Datenschutz</span></div>
              </div>
            </div>
          )}

          {/* STEP 1: PROFIL + ZIELE */}
          {step===1&&(
            <div>
              <div style={{marginBottom:24}}>
                <h2 style={{fontWeight:900,fontSize:24,marginBottom:6}}>📸 Profil & Ziele</h2>
                <p style={{fontSize:14,color:'#777'}}>Screenshots hochladen, Infos ergänzen und deine Ziele festlegen.</p>
              </div>

              {/* Screenshots */}
              <Card>
                <SLabel>Screenshots</SLabel>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
                  <UploadZone label="Profil-Screenshot" hint="Name, Bio, SEO-Feld sichtbar" onFile={setProfileImg} file={profileImg} icon="👤" required/>
                  <UploadZone label="Feed-Screenshot 1" hint="Mind. 9 Posts sichtbar" onFile={setFeedImg1} file={feedImg1} icon="📱" required/>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                  <UploadZone label="Feed-Screenshot 2 (empfohlen)" hint="Weitere Posts" onFile={setFeedImg2} file={feedImg2} icon="📱"/>
                  <UploadZone label="Feed-Screenshot 3 (optional)" hint="Noch mehr Posts" onFile={setFeedImg3} file={feedImg3} icon="📱"/>
                </div>
              </Card>

              {/* Account Infos */}
              <Card>
                <SLabel>Deine Infos</SLabel>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                  <Inp label="Dein Vorname" placeholder="z.B. Sara" value={vorname} onChange={e=>setVorname(e.target.value)} required/>
                  <Inp label="Instagram Handle" placeholder="@username" value={handle} onChange={e=>setHandle(e.target.value)} required/>
                  <Inp label="Follower-Anzahl" placeholder="z.B. 3.200" value={followers} onChange={e=>setFollowers(e.target.value)} required/>
                  <Sel label="Nische / Branche" options={NISCHEN} value={nische} onChange={e=>setNische(e.target.value)} required/>
                  <Sel label="Posting-Häufigkeit" options={POSTING_FREQ} value={postingFreq} onChange={e=>setPostingFreq(e.target.value)}/>
                  <Inp label="Website" placeholder="www.example.com" value={website} onChange={e=>setWebsite(e.target.value)}/>
                  <Inp label="Link-in-Bio Tool" placeholder="z.B. Linktree" value={linkInBio} onChange={e=>setLinkInBio(e.target.value)}/>
                  <Inp label="Format-Mix" placeholder="z.B. 60% Reels, 40% Karussell" value={formatMix} onChange={e=>setFormatMix(e.target.value)}/>
                </div>
                <div style={{marginTop:16}}>
                  <Txta label="Zielgruppe" placeholder="Wen sprichst du an?" value={zielgruppe} onChange={e=>setZielgruppe(e.target.value)} rows={3}/>
                </div>
              </Card>

              {/* Ziele */}
              <Card>
                <SLabel>Deine Instagram-Ziele *</SLabel>
                <p style={{fontSize:13,color:'#777',marginBottom:16}}>Wähle dein <strong>Hauptziel</strong> und beliebig viele Nebenziele.</p>

                <div style={{fontSize:12,fontWeight:700,color:B.coral,letterSpacing:'0.05em',marginBottom:10}}>⭐ HAUPTZIEL (wähle eines)</div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:20}}>
                  {ZIELE.map(z=>(
                    <div key={z.id} onClick={()=>{setHauptziel(z.id);setNebenziele(prev=>prev.filter(n=>n!==z.id));}}
                      style={{border:`2px solid ${hauptziel===z.id?B.coral:'#e5e7eb'}`,borderRadius:12,padding:14,cursor:'pointer',background:hauptziel===z.id?B.coral+'15':'white',transition:'all 0.15s'}}>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <div style={{width:20,height:20,borderRadius:99,border:`2px solid ${hauptziel===z.id?B.coral:'#ccc'}`,background:hauptziel===z.id?B.coral:'white',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                          {hauptziel===z.id&&<div style={{width:8,height:8,borderRadius:99,background:'white'}}/>}
                        </div>
                        <div>
                          <div style={{fontWeight:700,fontSize:13}}>{z.label}</div>
                          <div style={{fontSize:11,color:'#888'}}>{z.desc}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {hauptziel&&(
                  <>
                    <div style={{fontSize:12,fontWeight:700,color:B.teal,letterSpacing:'0.05em',marginBottom:10}}>➕ NEBENZIELE (optional, mehrere möglich)</div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                      {ZIELE.filter(z=>z.id!==hauptziel).map(z=>(
                        <div key={z.id} onClick={()=>toggleNebenziel(z.id)}
                          style={{border:`2px solid ${nebenziele.includes(z.id)?B.teal:'#e5e7eb'}`,borderRadius:12,padding:12,cursor:'pointer',background:nebenziele.includes(z.id)?B.teal+'15':'white',transition:'all 0.15s'}}>
                          <div style={{display:'flex',alignItems:'center',gap:8}}>
                            <div style={{width:18,height:18,borderRadius:4,border:`2px solid ${nebenziele.includes(z.id)?B.teal:'#ccc'}`,background:nebenziele.includes(z.id)?B.teal:'white',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                              {nebenziele.includes(z.id)&&<span style={{color:'white',fontSize:10,fontWeight:900}}>✓</span>}
                            </div>
                            <div style={{fontWeight:600,fontSize:12}}>{z.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </Card>

              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <Btn onClick={()=>setStep(0)} variant="ghost">← Zurück</Btn>
                <div style={{textAlign:'right'}}>
                  {!canStep2&&<div style={{fontSize:12,color:'#aaa',marginBottom:8}}>Vorname, Screenshots, Handle, Follower, Nische & Hauptziel sind Pflicht</div>}
                  <Btn onClick={runFirstAnalysis} disabled={!canStep2} variant="yellow">🔍 Erstanalyse starten →</Btn>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: POST SCREENSHOTS */}
          {step===2&&analysis?.erstanalyse&&(
            <div>
              <div style={{marginBottom:20}}>
                <h2 style={{fontWeight:900,fontSize:24,marginBottom:6}}>📸 Post-Screenshots hochladen</h2>
                <p style={{fontSize:14,color:'#777'}}>Hey {vorname}! Die KI hat deinen Feed analysiert und möchte diese Posts genauer unter die Lupe nehmen.</p>
              </div>

              {/* Erstanalyse Summary */}
              <Card style={{background:B.black,color:B.white,marginBottom:20}}>
                <div style={{fontWeight:800,fontSize:16,marginBottom:12,color:B.yellow}}>📋 Erster Eindruck deines Accounts</div>
                <p style={{fontSize:14,lineHeight:1.75,opacity:0.9}}>{analysis.erstanalyse.gesamteindruck}</p>
                <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:12,marginTop:16}}>
                  {[{l:'Bio',s:analysis.erstanalyse.bio?.score},{l:'Feed-Optik',s:analysis.erstanalyse.feedOptik?.score},{l:'Hooks',s:analysis.erstanalyse.hooks?.score}].map(({l,s})=>(
                    <div key={l} style={{background:'rgba(255,255,255,0.12)',borderRadius:12,padding:14,textAlign:'center'}}>
                      <div style={{fontSize:24,fontWeight:900,color:s>=70?'#4ade80':s>=45?'#fbbf24':'#f87171'}}>{s}</div>
                      <div style={{fontSize:11,opacity:0.7,marginTop:2}}>{l}</div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Anleitung */}
              <Card style={{background:B.yellow+'30',borderLeft:`4px solid ${B.yellow}`}}>
                <div style={{fontWeight:800,color:B.dark,marginBottom:8}}>📱 So geht's:</div>
                <div style={{fontSize:13,color:'#444',lineHeight:1.8}}>
                  1. Öffne Instagram auf deinem Handy<br/>
                  2. Suche den beschriebenen Post<br/>
                  3. Mache einen Screenshot vom gesamten Post (inkl. Hook, Bild und Likes)<br/>
                  4. Lade den Screenshot hier hoch
                </div>
              </Card>

              {/* Post Requests */}
              {postRequests.map((req,i)=>(
                <div key={i} style={{background:B.white,borderRadius:18,padding:24,marginBottom:16,boxShadow:'0 2px 20px rgba(0,0,0,0.07)',borderLeft:`4px solid ${req.prioritaet==='hoch'?B.coral:B.teal}`}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:14}}>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <div style={{width:32,height:32,background:req.prioritaet==='hoch'?B.coral:B.teal,color:'white',borderRadius:99,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:14,flexShrink:0}}>
                        {req.nr}
                      </div>
                      <div>
                        <div style={{fontWeight:800,fontSize:16}}>Post #{req.nr}</div>
                        <Chip color={req.prioritaet==='hoch'?B.coral:B.teal}>{req.prioritaet==='hoch'?'⚡ Hohe Priorität':'📌 Mittlere Priorität'}</Chip>
                      </div>
                    </div>
                  </div>

                  {/* Wo ist der Post? */}
                  <div style={{background:'#f8f9fa',borderRadius:12,padding:14,marginBottom:14}}>
                    <div style={{fontSize:11,fontWeight:700,color:B.teal,letterSpacing:'0.05em',marginBottom:6}}>🔎 WELCHEN POST SUCHEN?</div>
                    <p style={{fontSize:14,color:'#333'}}>{req.beschreibung}</p>
                    {req.hookHinweis&&<div style={{marginTop:8,fontSize:13,color:'#555',fontStyle:'italic'}}>Hook beginnt mit: „{req.hookHinweis}..."</div>}
                  </div>

                  {/* Warum dieser Post? */}
                  <div style={{background:req.prioritaet==='hoch'?B.coral+'12':B.teal+'12',borderRadius:12,padding:14,marginBottom:14}}>
                    <div style={{fontSize:11,fontWeight:700,color:req.prioritaet==='hoch'?B.coral:B.teal,letterSpacing:'0.05em',marginBottom:6}}>💡 DARUM INTERESSIERT MICH DIESER POST</div>
                    <p style={{fontSize:14}}>{req.grund}</p>
                  </div>

                  {/* Was wird analysiert? */}
                  <div style={{background:B.yellow+'25',borderRadius:12,padding:14,marginBottom:16}}>
                    <div style={{fontSize:11,fontWeight:700,color:B.dark,letterSpacing:'0.05em',marginBottom:6}}>🎯 DAS ANALYSIERE ICH BEI DIESEM POST</div>
                    <p style={{fontSize:14}}>{req.analyseFokus}</p>
                  </div>

                  {/* Screenshot Upload */}
                  <UploadZone
                    label={`Screenshot von Post #${req.nr} hochladen`}
                    hint="Mache einen Screenshot des kompletten Posts auf Instagram"
                    onFile={f=>upPost(i,'img',f)}
                    file={postScreenshots[i]?.img}
                    icon="📱"
                  />

                  {/* Zusätzliche Infos */}
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginTop:14}}>
                    <Inp label="Likes" placeholder="z.B. 342" value={postScreenshots[i]?.likes||''} onChange={e=>upPost(i,'likes',e.target.value)}/>
                    <Inp label="Kommentare" placeholder="z.B. 28" value={postScreenshots[i]?.comments||''} onChange={e=>upPost(i,'comments',e.target.value)}/>
                    <Inp label="Views (Reels)" placeholder="z.B. 12.400" value={postScreenshots[i]?.views||''} onChange={e=>upPost(i,'views',e.target.value)}/>
                  </div>
                </div>
              ))}

              <div style={{display:'flex',justifyContent:'space-between',marginTop:8}}>
                <Btn onClick={()=>setStep(1)} variant="ghost">← Zurück</Btn>
                <Btn onClick={()=>setStep(3)} variant="yellow">Weiter zu Insights →</Btn>
              </div>
            </div>
          )}

          {/* STEP 3: INSIGHTS */}
          {step===3&&(
            <div>
              <div style={{marginBottom:20}}>
                <h2 style={{fontWeight:900,fontSize:24,marginBottom:6}}>📊 Deine Insights <span style={{fontSize:14,fontWeight:500,color:'#888'}}>(optional)</span></h2>
                <p style={{fontSize:14,color:'#777'}}>Hey {vorname}! Je mehr Daten du teilst, desto präziser wird deine Analyse. Alle Felder sind freiwillig.</p>
              </div>
              <Card style={{borderTop:`4px solid ${B.yellow}`}}>
                <SLabel>Reichweite & Performance</SLabel>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                  <Inp label="Ø Reichweite pro Post" placeholder="z.B. 850" value={avgReach} onChange={e=>setAvgReach(e.target.value)}/>
                  <Inp label="Follower-Wachstum (30 Tage)" placeholder="z.B. +120" value={followerGrowth} onChange={e=>setFollowerGrowth(e.target.value)}/>
                  <Inp label="Profil-Aufrufe pro Woche" placeholder="z.B. 340" value={profileViews} onChange={e=>setProfileViews(e.target.value)}/>
                  <Inp label="Story Reichweite (Ø)" placeholder="z.B. 280" value={storyReach} onChange={e=>setStoryReach(e.target.value)}/>
                  <Inp label="Link-Klicks pro Woche" placeholder="z.B. 45" value={linkClicks} onChange={e=>setLinkClicks(e.target.value)}/>
                  <Inp label="Beste Posting-Zeit" placeholder="z.B. Di/Do 18-20 Uhr" value={bestTime} onChange={e=>setBestTime(e.target.value)}/>
                </div>
                <div style={{marginTop:16}}>
                  <Inp label="Top-performendes Format" placeholder="z.B. Reels haben 3x mehr Reichweite" value={topFormat} onChange={e=>setTopFormat(e.target.value)}/>
                </div>
                <div style={{marginTop:16}}>
                  <Txta label="Zusätzliche Infos" placeholder="Was soll die KI noch wissen? z.B. bisherige Challenges, was du schon probiert hast..." value={additionalNotes} onChange={e=>setAdditionalNotes(e.target.value)} rows={4}/>
                </div>
              </Card>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <Btn onClick={()=>setStep(2)} variant="ghost">← Zurück</Btn>
                <Btn onClick={runFinalAnalysis} variant="yellow">🚀 Finale Analyse starten →</Btn>
              </div>
            </div>
          )}

          {/* STEP 4: ANALYSE */}
          {step===4&&analysis?.final&&(
            <div>
              {/* HERO */}
              <div style={{background:B.black,borderRadius:22,padding:'28px 28px 24px',marginBottom:20,position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:-20,right:-20,width:200,height:200,background:B.yellow+'08',borderRadius:'50%'}}/>
                <div style={{position:'relative',display:'flex',gap:24,alignItems:'center',flexWrap:'wrap'}}>
                  <ScoreRing score={analysis.final.gesamtscore} size={120}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:10,letterSpacing:'0.2em',color:B.yellow,marginBottom:6}}>DEIN INSTAGRAM CONTENT ANALYSE REPORT</div>
                    <h2 style={{fontWeight:900,fontSize:22,color:B.yellow,marginBottom:4}}>Hey {vorname}! 👋</h2>
                    <p style={{fontSize:13,lineHeight:1.75,color:'#ccc',marginBottom:14}}>{analysis.final.zusammenfassung}</p>
                    <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>
                      {analysis.final.staerken?.map((st,i)=><span key={i} style={{background:B.yellow+'20',color:B.yellow,padding:'3px 10px',borderRadius:99,fontSize:11,fontWeight:700}}>✓ {st}</span>)}
                    </div>
                  </div>
                </div>
              </div>

              {/* ZIEL BANNER */}
              {analysis.final.zielAnalyse&&(
                <Card style={{background:`linear-gradient(135deg, ${B.coral} 0%, ${B.coral}cc 100%)`,color:'white',padding:20}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:16}}>
                    <div style={{flex:1}}>
                      <div style={{fontSize:11,letterSpacing:'0.15em',opacity:0.8,marginBottom:6}}>DEIN HAUPTZIEL</div>
                      <div style={{fontWeight:800,fontSize:18,marginBottom:8}}>{analysis.final.zielAnalyse.hauptziel}</div>
                      <p style={{fontSize:13,opacity:0.9,lineHeight:1.7}}>{analysis.final.zielAnalyse.analyse}</p>
                    </div>
                    <div style={{textAlign:'center',background:'rgba(255,255,255,0.15)',borderRadius:16,padding:'16px 24px',flexShrink:0}}>
                      <div style={{fontSize:36,fontWeight:900}}>{analysis.final.zielAnalyse.erreichungsgrad}%</div>
                      <div style={{fontSize:11,opacity:0.8}}>Zielerreichung</div>
                    </div>
                  </div>
                </Card>
              )}

              {/* SCORE GRID */}
              <Card style={{padding:20}}>
                <SLabel>Bewertungsübersicht</SLabel>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(120px,1fr))',gap:12,marginTop:10}}>
                  {[{l:'Bio & SEO',k:'bio'},{l:'Feed-Optik',k:'feedOptik'},{l:'Säulen',k:'contentsaeulen'},{l:'Hooks',k:'hooks'}].map(({l,k})=>{
                    const s=analysis.final[k]?.score;
                    return(<div key={k} style={{background:B.gray,borderRadius:14,padding:14,textAlign:'center',borderTop:`3px solid ${scoreColor(s)}`}}>
                      <div style={{fontSize:26,fontWeight:900,color:scoreColor(s)}}>{s}</div>
                      <div style={{fontSize:11,color:'#777',margin:'4px 0 8px'}}>{l}</div>
                      <ScoreBar score={s}/>
                      <div style={{fontSize:10,color:scoreColor(s),fontWeight:700,marginTop:4}}>{scoreLabel(s)}</div>
                    </div>);
                  })}
                </div>
              </Card>

              {/* SOFORT MASSNAHMEN */}
              <Card style={{background:B.yellow,padding:20}}>
                <div style={{fontWeight:800,color:B.black,marginBottom:10,fontSize:14}}>⚡ Das solltest du sofort tun, {vorname}</div>
                {analysis.final.sofortmassnahmen?.slice(0,3).map((m,i)=>(
                  <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start',marginBottom:8}}>
                    <div style={{width:22,height:22,background:B.black,color:B.yellow,borderRadius:99,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:11,flexShrink:0}}>{i+1}</div>
                    <div style={{fontSize:13,color:B.black}}>{m}</div>
                  </div>
                ))}
              </Card>

              {/* TABS */}
              <div style={{display:'flex',gap:6,marginBottom:16,flexWrap:'wrap'}}>
                {TABS_FINAL.map(t=>(
                  <button key={t.id} onClick={()=>setActiveTab(t.id)}
                    style={{padding:'8px 14px',borderRadius:10,border:`2px solid ${activeTab===t.id?B.teal:B.cream}`,background:activeTab===t.id?B.teal:B.white,color:activeTab===t.id?B.white:B.black,fontWeight:700,fontSize:12,cursor:'pointer',fontFamily:'Montserrat,sans-serif',transition:'all 0.15s'}}>
                    {t.label}
                  </button>
                ))}
              </div>

              {/* GESAMT */}
              {activeTab==='gesamt'&&(
                <Card>
                  <h3 style={{fontWeight:800,fontSize:18,marginBottom:16}}>🏆 Gesamtbewertung</h3>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
                    <div style={{background:B.teal+'15',borderRadius:12,padding:16}}>
                      <div style={{fontWeight:700,color:B.teal,marginBottom:10,fontSize:13}}>✅ Deine Stärken</div>
                      {analysis.final.staerken?.map((s,i)=><div key={i} style={{fontSize:13,marginBottom:6}}>• {s}</div>)}
                    </div>
                    <div style={{background:B.coral+'15',borderRadius:12,padding:16}}>
                      <div style={{fontWeight:700,color:B.coral,marginBottom:10,fontSize:13}}>🚀 Sofort-Maßnahmen</div>
                      {analysis.final.sofortmassnahmen?.map((m,i)=><div key={i} style={{fontSize:13,marginBottom:6}}>• {m}</div>)}
                    </div>
                  </div>
                </Card>
              )}

              {/* ZIELE & LÜCKEN */}
              {activeTab==='ziele'&&analysis.final.zielAnalyse&&(
                <Card>
                  <h3 style={{fontWeight:800,fontSize:18,marginBottom:16}}>🎯 Ziel-Analyse: {analysis.final.zielAnalyse.hauptziel}</h3>
                  <div style={{display:'flex',alignItems:'center',gap:20,marginBottom:20,background:B.gray,borderRadius:14,padding:20}}>
                    <ScoreRing score={analysis.final.zielAnalyse.erreichungsgrad} size={90}/>
                    <div>
                      <div style={{fontSize:12,fontWeight:700,color:B.teal,marginBottom:4}}>ZIELERREICHUNG AKTUELL</div>
                      <p style={{fontSize:14,lineHeight:1.7}}>{analysis.final.zielAnalyse.analyse}</p>
                    </div>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:16}}>
                    <div style={{background:B.coral+'12',borderRadius:12,padding:16}}>
                      <div style={{fontWeight:700,color:B.coral,marginBottom:10,fontSize:13}}>❌ Diese Lücken hemmen dein Ziel</div>
                      {analysis.final.zielAnalyse.luecken?.map((l,i)=><div key={i} style={{fontSize:13,marginBottom:6}}>• {l}</div>)}
                    </div>
                    <div style={{background:B.teal+'12',borderRadius:12,padding:16}}>
                      <div style={{fontWeight:700,color:B.teal,marginBottom:10,fontSize:13}}>💡 So erreichst du dein Ziel schneller</div>
                      {analysis.final.zielAnalyse.empfehlungen?.map((e,i)=><div key={i} style={{fontSize:13,marginBottom:6}}>• {e}</div>)}
                    </div>
                  </div>
                </Card>
              )}

              {/* BIO */}
              {activeTab==='bio'&&analysis.final.bio&&(
                <Card>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                    <h3 style={{fontWeight:800,fontSize:18}}>📝 Deine Bio & SEO</h3>
                    <ScoreRing score={analysis.final.bio.score} size={70}/>
                  </div>
                  <p style={{fontSize:14,lineHeight:1.75,color:'#444',marginBottom:20}}>{analysis.final.bio.analyse}</p>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:20}}>
                    <div style={{background:B.teal+'15',borderRadius:12,padding:16}}><div style={{fontWeight:700,color:B.teal,marginBottom:10,fontSize:13}}>✅ Das läuft gut</div>{analysis.final.bio.staerken?.map((s,i)=><div key={i} style={{fontSize:13,marginBottom:5}}>• {s}</div>)}</div>
                    <div style={{background:B.coral+'15',borderRadius:12,padding:16}}><div style={{fontWeight:700,color:B.coral,marginBottom:10,fontSize:13}}>⚠️ Das kannst du verbessern</div>{analysis.final.bio.schwaechen?.map((s,i)=><div key={i} style={{fontSize:13,marginBottom:5}}>• {s}</div>)}</div>
                  </div>
                  <div style={{background:B.yellow+'25',borderRadius:14,padding:20,marginBottom:14,borderLeft:`4px solid ${B.yellow}`}}>
                    <div style={{fontWeight:800,color:B.dark,marginBottom:6,fontSize:12}}>✨ DEIN OPTIMIERTES SEO-NAMENSFELD</div>
                    <div style={{fontWeight:800,fontSize:16}}>{analysis.final.bio.seoVorschlag}</div>
                  </div>
                  <div style={{background:B.teal+'12',borderRadius:14,padding:20,borderLeft:`4px solid ${B.teal}`}}>
                    <div style={{fontWeight:800,color:B.teal,marginBottom:10,fontSize:12}}>✨ DEIN OPTIMIERTER BIO-TEXT</div>
                    <p style={{fontSize:14,lineHeight:1.85,whiteSpace:'pre-line'}}>{analysis.final.bio.optimierung}</p>
                  </div>
                </Card>
              )}

              {/* OPTIK */}
              {activeTab==='optik'&&analysis.final.feedOptik&&(
                <Card>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                    <h3 style={{fontWeight:800,fontSize:18}}>🎨 Deine Feed-Optik</h3>
                    <ScoreRing score={analysis.final.feedOptik.score} size={70}/>
                  </div>
                  <p style={{fontSize:14,lineHeight:1.75,color:'#444',marginBottom:20}}>{analysis.final.feedOptik.analyse}</p>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:16}}>
                    <div style={{background:B.teal+'15',borderRadius:12,padding:16}}><div style={{fontWeight:700,color:B.teal,marginBottom:10,fontSize:13}}>✅ Das sieht gut aus</div>{analysis.final.feedOptik.staerken?.map((s,i)=><div key={i} style={{fontSize:13,marginBottom:5}}>• {s}</div>)}</div>
                    <div style={{background:B.coral+'15',borderRadius:12,padding:16}}><div style={{fontWeight:700,color:B.coral,marginBottom:10,fontSize:13}}>🔧 Das kannst du verbessern</div>{analysis.final.feedOptik.verbesserungen?.map((v,i)=><div key={i} style={{fontSize:13,marginBottom:5}}>• {v}</div>)}</div>
                  </div>
                  <div style={{background:B.yellow+'25',borderRadius:14,padding:16,borderLeft:`4px solid ${B.yellow}`}}>
                    <div style={{fontWeight:800,color:B.dark,marginBottom:8,fontSize:12}}>💡 MEINE EMPFEHLUNG FÜR DICH</div>
                    <p style={{fontSize:14}}>{analysis.final.feedOptik.empfehlung}</p>
                  </div>
                </Card>
              )}

              {/* SÄULEN */}
              {activeTab==='saeulen'&&analysis.final.contentsaeulen&&(
                <Card>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                    <h3 style={{fontWeight:800,fontSize:18}}>🏛️ Deine Content-Säulen</h3>
                    <ScoreRing score={analysis.final.contentsaeulen.score} size={70}/>
                  </div>
                  <p style={{fontSize:14,lineHeight:1.75,color:'#444',marginBottom:20}}>{analysis.final.contentsaeulen.analyse}</p>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14,marginBottom:20}}>
                    {[{key:'authority',label:'Authority',color:B.teal,icon:'🏆',desc:'Du als Expertin'},{key:'demand',label:'Demand',color:'#E9A020',icon:'🔥',desc:'Probleme deiner Zielgruppe'},{key:'conversion',label:'Conversion',color:B.coral,icon:'💰',desc:'Angebote & CTAs'}].map(({key,label,color,icon,desc})=>{
                      const d=analysis.final.contentsaeulen[key];
                      return(<div key={key} style={{background:color+'12',borderRadius:14,padding:18,borderTop:`4px solid ${color}`}}>
                        <div style={{fontSize:22,marginBottom:6}}>{icon}</div>
                        <div style={{fontWeight:800,color,marginBottom:2,fontSize:13}}>{label}</div>
                        <div style={{fontSize:11,color:'#888',marginBottom:12}}>{desc}</div>
                        <div style={{fontSize:26,fontWeight:900,color,marginBottom:4}}>{d?.score}</div>
                        <ScoreBar score={d?.score}/>
                        <p style={{fontSize:12,color:'#555',marginTop:10,lineHeight:1.6}}>{d?.analyse}</p>
                        <div style={{marginTop:12}}><div style={{fontSize:11,fontWeight:700,color,marginBottom:6}}>IDEEN FÜR DICH:</div>{d?.ideen?.map((id,j)=><div key={j} style={{fontSize:12,marginBottom:4}}>💡 {id}</div>)}</div>
                      </div>);
                    })}
                  </div>
                  <div style={{background:B.yellow+'25',borderRadius:14,padding:16,borderLeft:`4px solid ${B.yellow}`}}>
                    <div style={{fontWeight:800,color:B.dark,marginBottom:8,fontSize:12}}>📌 MEINE STRATEGIE-EMPFEHLUNG FÜR DICH</div>
                    <p style={{fontSize:14}}>{analysis.final.contentsaeulen.empfehlung}</p>
                  </div>
                </Card>
              )}

              {/* HOOKS */}
              {activeTab==='hooks'&&analysis.final.hooks&&(
                <Card>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
                    <h3 style={{fontWeight:800,fontSize:18}}>🪝 Deine Hooks</h3>
                    <ScoreRing score={analysis.final.hooks.score} size={70}/>
                  </div>
                  <p style={{fontSize:14,lineHeight:1.75,color:'#444',marginBottom:20}}>{analysis.final.hooks.analyse}</p>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:20}}>
                    <div style={{background:B.teal+'15',borderRadius:12,padding:16}}><div style={{fontWeight:700,color:B.teal,marginBottom:10,fontSize:13}}>✅ Das machst du gut</div>{analysis.final.hooks.staerken?.map((s,i)=><div key={i} style={{fontSize:13,marginBottom:5}}>• {s}</div>)}</div>
                    <div style={{background:B.coral+'15',borderRadius:12,padding:16}}><div style={{fontWeight:700,color:B.coral,marginBottom:10,fontSize:13}}>⚠️ Das kannst du verbessern</div>{analysis.final.hooks.schwaechen?.map((s,i)=><div key={i} style={{fontSize:13,marginBottom:5}}>• {s}</div>)}</div>
                  </div>
                  <div style={{marginBottom:20}}>
                    <div style={{fontSize:12,fontWeight:700,color:B.teal,letterSpacing:'0.1em',marginBottom:12}}>✨ 5 HOOK-VORSCHLÄGE SPEZIELL FÜR DICH</div>
                    {analysis.final.hooks.hookVorschlaege?.map((h,i)=>(
                      <div key={i} style={{background:B.teal+'10',borderRadius:10,padding:14,borderLeft:`3px solid ${B.teal}`,fontSize:14,fontWeight:600,color:B.dark,marginBottom:8}}>„{h}"</div>
                    ))}
                  </div>
                  {analysis.final.hooks.optimierungen?.map((h,i)=>(
                    <div key={i} style={{background:B.gray,borderRadius:12,padding:16,marginBottom:10}}>
                      <div style={{fontSize:11,color:'#999',fontWeight:700,marginBottom:4}}>SO WAR ES</div>
                      <p style={{fontSize:14,fontStyle:'italic',color:'#555',marginBottom:12}}>„{h.original}"</p>
                      <div style={{fontSize:11,color:B.teal,fontWeight:700,marginBottom:4}}>✨ SO WÄRE ES BESSER</div>
                      <p style={{fontSize:15,fontWeight:800,color:B.teal,marginBottom:6}}>„{h.optimiert}"</p>
                      <div style={{fontSize:12,color:'#777'}}>💡 {h.grund}</div>
                    </div>
                  ))}
                </Card>
              )}

              {/* POSTS */}
              {activeTab==='posts'&&analysis.final.postAnalyse&&(
                <Card>
                  <h3 style={{fontWeight:800,fontSize:18,marginBottom:16}}>📊 Deine Posts im Detail</h3>
                  {analysis.final.postAnalyse?.map((p,i)=>(
                    <div key={i} style={{background:B.gray,borderRadius:14,padding:20,marginBottom:14,borderLeft:`4px solid ${scoreColor(p.score)}`}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                        <div style={{fontWeight:800,fontSize:15}}>{p.titel}</div>
                        <div style={{fontSize:22,fontWeight:900,color:scoreColor(p.score)}}>{p.score}</div>
                      </div>
                      <p style={{fontSize:14,color:'#444',marginBottom:12}}>{p.bewertung}</p>
                      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
                        <div style={{background:B.teal+'15',borderRadius:10,padding:12}}><div style={{fontSize:11,fontWeight:700,color:B.teal,marginBottom:6}}>✅ STÄRKEN</div>{p.staerken?.map((s,j)=><div key={j} style={{fontSize:12,marginBottom:3}}>• {s}</div>)}</div>
                        <div style={{background:B.coral+'15',borderRadius:10,padding:12}}><div style={{fontSize:11,fontWeight:700,color:B.coral,marginBottom:6}}>⚠️ SCHWÄCHEN</div>{p.schwaechen?.map((s,j)=><div key={j} style={{fontSize:12,marginBottom:3}}>• {s}</div>)}</div>
                      </div>
                      <div style={{background:B.yellow+'25',borderRadius:10,padding:12}}><div style={{fontSize:11,fontWeight:700,color:B.dark,marginBottom:4}}>💡 MEINE EMPFEHLUNG</div><div style={{fontSize:13}}>{p.empfehlung}</div></div>
                    </div>
                  ))}
                </Card>
              )}

              {/* KEYWORDS */}
              {activeTab==='keywords'&&analysis.final.keywords&&(
                <Card>
                  <h3 style={{fontWeight:800,fontSize:18,marginBottom:20}}>🔑 Deine Keywords & Hashtags</h3>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:20}}>
                    <div style={{background:B.teal+'15',borderRadius:14,padding:18}}><div style={{fontSize:12,fontWeight:700,color:B.teal,letterSpacing:'0.1em',marginBottom:12}}>PRIMÄRE KEYWORDS</div><div style={{display:'flex',flexWrap:'wrap'}}>{analysis.final.keywords.primaer?.map((kw,i)=><Chip key={i} color={B.teal}>{kw}</Chip>)}</div></div>
                    <div style={{background:B.dark+'10',borderRadius:14,padding:18}}><div style={{fontSize:12,fontWeight:700,color:B.dark,letterSpacing:'0.1em',marginBottom:12}}>SEKUNDÄRE KEYWORDS</div><div style={{display:'flex',flexWrap:'wrap'}}>{analysis.final.keywords.sekundaer?.map((kw,i)=><Chip key={i} color={B.dark}>{kw}</Chip>)}</div></div>
                  </div>
                  {[{label:'Große Hashtags (500k+)',items:analysis.final.keywords.hashtags?.gross,color:B.coral},{label:'Mittlere Hashtags (50k-500k)',items:analysis.final.keywords.hashtags?.mittel,color:B.teal},{label:'Nischen-Hashtags (<50k)',items:analysis.final.keywords.hashtags?.nische,color:B.dark}].map(({label,items,color})=>(
                    <div key={label} style={{marginBottom:16}}><div style={{fontSize:12,fontWeight:700,color,marginBottom:8}}>{label}</div><div style={{display:'flex',flexWrap:'wrap'}}>{items?.map((h,i)=><Chip key={i} color={color}>{h}</Chip>)}</div></div>
                  ))}
                </Card>
              )}

              {/* CONTENT PLAN */}
              {activeTab==='plan'&&analysis.final.contentplan&&(
                <Card>
                  <h3 style={{fontWeight:800,fontSize:18,marginBottom:16}}>📅 Dein 4-Wochen Content-Plan</h3>
                  {analysis.final.contentplan?.map((item,i)=>{
                    const sColor=item.saeule==='Authority'?B.teal:item.saeule==='Demand'?'#E9A020':B.coral;
                    return(<div key={i} style={{background:B.gray,borderRadius:14,padding:20,marginBottom:12,borderLeft:`4px solid ${sColor}`}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                        <div><div style={{fontSize:11,fontWeight:700,color:'#999',marginBottom:4}}>WOCHE {item.woche}</div><div style={{fontWeight:800,fontSize:16}}>{item.titel}</div></div>
                        <div style={{display:'flex',gap:6,marginLeft:12}}><Chip color={sColor}>{item.saeule}</Chip><Chip color={B.black}>{item.format}</Chip></div>
                      </div>
                      <div style={{fontSize:13,color:'#777',marginBottom:6}}>📌 {item.thema}</div>
                      {item.zielBezug&&<div style={{fontSize:13,color:B.teal,marginBottom:8,fontWeight:600}}>🎯 {item.zielBezug}</div>}
                      <div style={{background:sColor+'15',borderRadius:10,padding:12}}><div style={{fontSize:11,fontWeight:700,color:sColor,marginBottom:4}}>🪝 DEIN HOOK</div><div style={{fontSize:14,fontWeight:600}}>„{item.hook}"</div></div>
                    </div>);
                  })}
                </Card>
              )}

              {/* MASSNAHMEN */}
              {activeTab==='massnahmen'&&analysis.final.massnahmen&&(
                <Card>
                  <h3 style={{fontWeight:800,fontSize:18,marginBottom:16}}>🚀 Deine Top 5 Maßnahmen</h3>
                  {analysis.final.massnahmen?.map((m,i)=>{
                    const bCol=[B.coral,'#E9A020',B.teal,B.teal,B.teal][i];
                    const aufwColor=m.aufwand==='niedrig'?B.teal:m.aufwand==='hoch'?B.coral:'#E9A020';
                    return(<div key={i} style={{background:B.gray,borderRadius:14,padding:20,marginBottom:12,borderLeft:`4px solid ${bCol}`}}>
                      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
                        <div style={{display:'flex',alignItems:'center',gap:10}}>
                          <div style={{width:32,height:32,background:bCol,color:B.white,borderRadius:99,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900,fontSize:13}}>#{m.rang}</div>
                          <span style={{fontWeight:800,fontSize:16}}>{m.titel}</span>
                        </div>
                        <div style={{display:'flex',gap:6}}><Chip color={aufwColor}>⚡ {m.aufwand}</Chip><Chip color={B.dark}>{m.kategorie}</Chip></div>
                      </div>
                      <p style={{fontSize:14,color:'#444',marginBottom:8}}>{m.was}</p>
                      <div style={{fontSize:13,color:'#777'}}>📈 {m.auswirkung}</div>
                    </div>);
                  })}
                </Card>
              )}

              <div style={{display:'flex',gap:12,justifyContent:'center',padding:'20px 0',flexWrap:'wrap'}}>
                <Btn variant="ghost" onClick={()=>{setStep(0);setAnalysis(null);setProfileImg(null);setFeedImg1(null);setFeedImg2(null);setFeedImg3(null);}}>🔄 Neue Analyse</Btn>
                <Btn variant="dark" onClick={()=>window.print()}>📄 Als PDF drucken</Btn>
              </div>
            </div>
          )}

          {/* FOOTER */}
          <div style={{textAlign:'center',padding:'28px 0 0',borderTop:`1px solid ${B.cream}`,marginTop:20}}>
            <div style={{fontSize:11,color:'#bbb',marginBottom:8}}>© 2025 Brit Ortlepp – Outstanding Content · Alle Rechte vorbehalten</div>
            <div style={{display:'flex',gap:16,justifyContent:'center',fontSize:12,flexWrap:'wrap'}}>
              <a href="https://britortlepp.de" target="_blank" rel="noopener noreferrer" style={{color:B.teal,textDecoration:'none',fontWeight:700}}>🌐 britortlepp.de</a>
              <a href="https://www.instagram.com/brit.ortlepp/" target="_blank" rel="noopener noreferrer" style={{color:B.teal,textDecoration:'none',fontWeight:700}}>📸 @brit.ortlepp</a>
              <span style={{color:'#bbb',cursor:'pointer',fontSize:11}} onClick={()=>setShowPrivacy(true)}>🔒 Datenschutz</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
