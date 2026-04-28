import Head from 'next/head';
import { useState, useRef, useCallback } from 'react';

const B = {
  teal:'#517383', yellow:'#ECEA54', coral:'#E94D60',
  cream:'#E7DFD7', dark:'#14544E', black:'#1A1A1A', white:'#FFFFFF', gray:'#F5F2EE'
};

const NISCHEN = ['Business Coaching','Life Coaching','Health Coaching','Fitness & Ernährung','Mental Health & Mindset','Beziehungs-Coaching','Karriere-Coaching','Social Media Marketing','Content Creation','Copywriting','SEO & Online Marketing','Web Design & Entwicklung','Grafikdesign & Branding','Fotografie & Video','Unternehmensberatung','Finanzberatung & Investments','Immobilien','Recht & Steuern','Personal Branding','E-Commerce & Dropshipping','Online Kurse & Memberships','Virtual Assistant','HR & Recruiting','PR & Kommunikation','Nachhaltigkeit & Impact','Spiritualität & Energie','Kunst & Kreatives','Mode & Styling','Reisen & Lifestyle','Andere'];
const POSTING_FREQ = ['Täglich','5-6x pro Woche','3-4x pro Woche','1-2x pro Woche','Weniger als 1x pro Woche','Unregelmäßig'];
const ZIELE = [
  {id:'follower',label:'📈 Mehr Follower',desc:'Reichweite & Community aufbauen'},
  {id:'umsatz',label:'💰 Mehr Umsatz',desc:'Produkte & Angebote verkaufen'},
  {id:'anfragen',label:'📩 Mehr Anfragen',desc:'Neue Kunden & Leads gewinnen'},
  {id:'reichweite',label:'🔥 Mehr Reichweite',desc:'Viral gehen & bekannter werden'},
  {id:'marke',label:'🏆 Marke aufbauen',desc:'Als Expertin positionieren'},
  {id:'community',label:'❤️ Community stärken',desc:'Engagement & Bindung erhöhen'},
  {id:'traffic',label:'🌐 Mehr Website-Traffic',desc:'Besucher auf die Website leiten'},
  {id:'email',label:'📧 E-Mail Liste aufbauen',desc:'Newsletter-Abonnenten gewinnen'},
];
const TABS_FINAL = [
  {id:'gesamt',label:'🏆 Gesamt'},
  {id:'ziele',label:'🎯 Ziele'},
  {id:'bio',label:'📝 Bio & SEO'},
  {id:'optik',label:'🎨 Feed-Optik'},
  {id:'saeulen',label:'🏛️ Säulen'},
  {id:'hooks',label:'🪝 Hooks'},
  {id:'posts',label:'📊 Posts'},
  {id:'keywords',label:'🔑 Keywords'},
  {id:'plan',label:'📅 Plan'},
  {id:'massnahmen',label:'🚀 Maßnahmen'},
];

function Logo() {
  return (
    <div style={{display:'flex',alignItems:'center',gap:12}}>
      <div>
        <div style={{fontFamily:'Georgia,serif',fontWeight:900,fontSize:20,color:B.yellow,letterSpacing:'0.15em',lineHeight:1,textTransform:'uppercase'}}>BRIT ORTLEPP</div>
        <div style={{fontSize:8,letterSpacing:'0.3em',color:'#aaa',marginTop:3,textTransform:'uppercase'}}>OUTSTANDING CONTENT</div>
      </div>
    </div>
  );
}

function UploadZone({label,hint,onFile,file,icon,required}) {
  const ref=useRef();
  const [drag,setDrag]=useState(false);
  const handleDrop=useCallback((e)=>{e.preventDefault();setDrag(false);const f=e.dataTransfer.files[0];if(f&&f.type.startsWith('image/'))onFile(f);},[onFile]);
  return (
    <div>
      <div style={{fontSize:12,fontWeight:700,color:B.teal,marginBottom:6,letterSpacing:'0.05em',textTransform:'uppercase'}}>{label}{required&&<span style={{color:B.coral}}> *</span>}</div>
      {hint&&<div style={{fontSize:12,color:'#888',marginBottom:8}}>{hint}</div>}
      <div onClick={()=>ref.current.click()} onDragOver={e=>{e.preventDefault();setDrag(true);}} onDragLeave={()=>setDrag(false)} onDrop={handleDrop}
        style={{border:`2px dashed ${drag?B.teal:file?B.yellow:'#ccc'}`,borderRadius:14,padding:16,textAlign:'center',cursor:'pointer',background:file?B.yellow+'15':drag?B.teal+'10':'#fafafa',transition:'all 0.2s',minHeight:110,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',gap:8}}>
        {file?(<><img src={URL.createObjectURL(file)} alt="" style={{maxHeight:70,maxWidth:'100%',borderRadius:8,objectFit:'cover'}}/><div style={{fontSize:12,color:B.teal,fontWeight:700}}>✓ {file.name}</div></>):(<><div style={{fontSize:28}}>{icon||'📸'}</div><div style={{fontSize:13,fontWeight:700,color:'#555'}}>Ablegen oder klicken</div></>)}
      </div>
      <input ref={ref} type="file" accept="image/*" style={{display:'none'}} onChange={e=>{if(e.target.files[0])onFile(e.target.files[0]);}}/>
    </div>
  );
}

function compressImage(file, maxSize=800, quality=0.6) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        try {
          let w = img.width, h = img.height;
          if (w > maxSize || h > maxSize) {
            if (w > h) { h = Math.round(h * maxSize / w); w = maxSize; }
            else { w = Math.round(w * maxSize / h); h = maxSize; }
          }
          const canvas = document.createElement('canvas');
          canvas.width = w; canvas.height = h;
          canvas.getContext('2d').drawImage(img, 0, 0, w, h);
          const data = canvas.toDataURL('image/jpeg', quality).split(',')[1];
          resolve(data);
        } catch(err) { reject(err); }
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function ScoreRing({score,size=100}) {
  const color=score>=70?B.teal:score>=45?'#E9A020':B.coral;
  const r=40,circ=2*Math.PI*r,offset=circ-(score/100)*circ;
  return (
    <div style={{position:'relative',width:size,height:size,flexShrink:0}}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke="#e8e0d8" strokeWidth="10"/>
        <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="10" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 50 50)"/>
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
  return (<div style={{background:'#e8e0d8',borderRadius:99,height:6,overflow:'hidden',flex:1}}><div style={{width:`${score}%`,background:color,height:'100%',borderRadius:99}}/></div>);
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
      <label style={{display:'block',fontSize:12,fontWeight:700,color:B.teal,marginBottom:6,letterSpacing:'0.04em',textTransform:'uppercase'}}>{label}{required&&<span style={{color:B.coral}}> *</span>}</label>
      <input placeholder={placeholder} value={value} onChange={onChange} style={{width:'100%',border:`1.5px solid ${B.cream}`,borderRadius:10,padding:'11px 14px',fontSize:14,outline:'none',fontFamily:'Montserrat,sans-serif',boxSizing:'border-box',background:B.white,color:B.black}}/>
    </div>
  );
}

function Sel({label,options,value,onChange,required}) {
  return (
    <div>
      <label style={{display:'block',fontSize:12,fontWeight:700,color:B.teal,marginBottom:6,letterSpacing:'0.04em',textTransform:'uppercase'}}>{label}{required&&<span style={{color:B.coral}}> *</span>}</label>
      <select value={value} onChange={onChange} style={{width:'100%',border:`1.5px solid ${B.cream}`,borderRadius:10,padding:'11px 14px',fontSize:14,outline:'none',fontFamily:'Montserrat,sans-serif',background:B.white,color:value?B.black:'#aaa',appearance:'none',cursor:'pointer'}}>
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
      <textarea placeholder={placeholder} value={value} onChange={onChange} rows={rows} style={{width:'100%',border:`1.5px solid ${B.cream}`,borderRadius:10,padding:'11px 14px',fontSize:14,outline:'none',fontFamily:'Montserrat,sans-serif',boxSizing:'border-box',background:B.white,color:B.black,resize:'vertical'}}/>
    </div>
  );
}

function Btn({children,onClick,disabled,variant='primary',full}) {
  const s={primary:{background:B.teal,color:B.white},yellow:{background:B.yellow,color:B.black},ghost:{background:B.cream,color:B.black},dark:{background:B.black,color:B.white}};
  return (<button onClick={onClick} disabled={disabled} style={{...s[variant],padding:'13px 24px',borderRadius:12,border:'none',cursor:disabled?'not-allowed':'pointer',fontWeight:700,fontSize:14,fontFamily:'Montserrat,sans-serif',opacity:disabled?0.5:1,width:full?'100%':'auto',transition:'all 0.2s'}}>{children}</button>);
}

async function callAPI(messages) {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({messages})
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Server ${res.status}: ${err.substring(0,200)}`);
  }
  const data = await res.json();
  if (!data.content?.[0]?.text) throw new Error('Keine KI-Antwort erhalten');
  let raw = data.content[0].text.trim();
  const s = raw.indexOf('{'), e = raw.lastIndexOf('}');
  if (s === -1 || e === -1) throw new Error('Kein JSON in Antwort');
  return JSON.parse(raw.substring(s, e+1));
}

const scoreColor=s=>s>=70?B.teal:s>=45?'#E9A020':B.coral;
const scoreLabel=s=>s>=70?'Gut':s>=45?'Ausbaufähig':'Handlungsbedarf';
const LOAD_MSGS=['Daten werden analysiert...','Bio & SEO werden ausgewertet...','Content-Qualität wird bewertet...','Deine Ziele werden berücksichtigt...','Report wird erstellt...'];

export default function App() {
  const [step,setStep]=useState(0);
  const [loading,setLoading]=useState(false);
  const [loadMsg,setLoadMsg]=useState('');
  const [analysis,setAnalysis]=useState(null);
  const [activeTab,setActiveTab]=useState('gesamt');
  const [showPrivacy,setShowPrivacy]=useState(false);

  // Step 1: Profil
  const [profileImg,setProfileImg]=useState(null);
  const [vorname,setVorname]=useState('');
  const [handle,setHandle]=useState('');
  const [followers,setFollowers]=useState('');
  const [nische,setNische]=useState('');
  const [postingFreq,setPostingFreq]=useState('');
  const [formatMix,setFormatMix]=useState('');
  const [zielgruppe,setZielgruppe]=useState('');
  const [website,setWebsite]=useState('');
  const [linkInBio,setLinkInBio]=useState('');
  const [hauptziel,setHauptziel]=useState('');
  const [nebenziele,setNebenziele]=useState([]);

  // Step 2: Feed
  const [feedImg1,setFeedImg1]=useState(null);
  const [feedImg2,setFeedImg2]=useState(null);
  const [feedImg3,setFeedImg3]=useState(null);

  // Step 3: Post Details
  const [postRequests,setPostRequests]=useState([]);
  const [postScreenshots,setPostScreenshots]=useState([]);

  // Step 4: Insights
  const [avgReach,setAvgReach]=useState('');
  const [followerGrowth,setFollowerGrowth]=useState('');
  const [topFormat,setTopFormat]=useState('');
  const [profileViews,setProfileViews]=useState('');
  const [storyReach,setStoryReach]=useState('');
  const [linkClicks,setLinkClicks]=useState('');
  const [bestTime,setBestTime]=useState('');
  const [additionalNotes,setAdditionalNotes]=useState('');

  const canStep2 = profileImg && vorname && handle && followers && nische && hauptziel;
  const canStep3 = feedImg1;

  const toggleNebenziel=(id)=>{if(id===hauptziel)return;setNebenziele(prev=>prev.includes(id)?prev.filter(z=>z!==id):[...prev,id]);};

  function startLoading() {
    let mi=0;
    setLoadMsg(LOAD_MSGS[0]);
    const iv=setInterval(()=>{mi=(mi+1)%LOAD_MSGS.length;setLoadMsg(LOAD_MSGS[mi]);},3000);
    return iv;
  }

  // SCHRITT 1 → 2: Profil analysieren (nur 1 Bild)
  async function runProfilAnalyse() {
    setLoading(true);
    const iv=startLoading();
    try {
      const hauptzielLabel=ZIELE.find(z=>z.id===hauptziel)?.label||hauptziel;
      const b64=await compressImage(profileImg, 700, 0.55);

      const parsed = await callAPI([{role:'user',content:[
        {type:'image',source:{type:'base64',media_type:'image/jpeg',data:b64}},
        {type:'text',text:`Du bist ein professioneller Instagram-Stratege. Analysiere diesen Profil-Screenshot.

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
Hauptziel: ${hauptzielLabel}

Analysiere Bio, SEO-Namensfeld, Positionierung und CTA. Sprich ${vorname} mit Du an.

Antworte NUR mit JSON:
{"profilAnalyse":{"gesamteindruck":"Text","bio":{"score":70,"seoFeld":"Was steht im SEO-Feld","bewertung":"Text","staerken":["s1","s2"],"schwaechen":["s1","s2"],"optimierung":"Optimierter Bio-Text","seoVorschlag":"Optimiertes SEO-Feld"},"positionierung":{"score":65,"klarheit":"Text","zielgruppe":"Text","usp":"Text","cta":"Text"}}}
`}
      ]}]);

      setAnalysis({profilAnalyse: parsed.profilAnalyse, hauptziel: hauptzielLabel});
      setStep(2);
    } catch(e) {
      console.error(e);
      alert('Fehler: '+e.message);
    }
    clearInterval(iv); setLoading(false);
  }

  // SCHRITT 2 → 3: Feed analysieren (2-3 Bilder)
  async function runFeedAnalyse() {
    setLoading(true);
    const iv=startLoading();
    try {
      const imgs=[];
      for(const f of [feedImg1,feedImg2,feedImg3].filter(Boolean)) {
        const b64=await compressImage(f, 700, 0.55);
        imgs.push({type:'image',source:{type:'base64',media_type:'image/jpeg',data:b64}});
      }

      const hauptzielLabel=analysis?.hauptziel||'';

      const parsed = await callAPI([{role:'user',content:[
        ...imgs,
        {type:'text',text:`Du bist ein professioneller Instagram-Stratege. Analysiere diese Feed-Screenshots für @${handle} (${vorname}).

Hauptziel: ${hauptzielLabel}
Nische: ${nische}

Analysiere: Feed-Optik, Konsistenz, Farbwelt, sichtbare Hooks, Content-Säulen (Authority/Demand/Conversion).
Wähle dann 5 Posts für die Detailanalyse aus. Beschreibe sie so genau, dass ${vorname} sie in Instagram finden kann.

Antworte NUR mit JSON:
{"feedAnalyse":{"gesamteindruck":"Text","feedOptik":{"score":70,"qualitaet":"Text","konsistenz":"Text","farbwelt":"Text","professionalitaet":"Text"},"hooks":{"score":65,"bewertung":"Text","sichtbareHooks":["h1","h2","h3"]},"contentsaeulen":{"authority":60,"demand":50,"conversion":40,"analyse":"Text"}},"postAnfragen":[{"nr":1,"grund":"Konkreter Grund","beschreibung":"Genaue Beschreibung damit ${vorname} diesen Post findet","hookHinweis":"Hook-Anfang falls sichtbar","prioritaet":"hoch","analyseFokus":"Was analysiert werden soll"},{"nr":2,"grund":"Text","beschreibung":"Text","hookHinweis":"Text","prioritaet":"hoch","analyseFokus":"Text"},{"nr":3,"grund":"Text","beschreibung":"Text","hookHinweis":"Text","prioritaet":"mittel","analyseFokus":"Text"},{"nr":4,"grund":"Text","beschreibung":"Text","hookHinweis":"Text","prioritaet":"mittel","analyseFokus":"Text"},{"nr":5,"grund":"Text","beschreibung":"Text","hookHinweis":"Text","prioritaet":"mittel","analyseFokus":"Text"}]}
`}
      ]}]);

      setPostRequests(parsed.postAnfragen||[]);
      setPostScreenshots((parsed.postAnfragen||[]).map((_,i)=>({id:i,img:null,caption:'',likes:'',comments:'',views:'',hashtags:'',format:''})));
      setAnalysis(prev=>({...prev, feedAnalyse: parsed.feedAnalyse}));
      setStep(3);
    } catch(e) {
      console.error(e);
      alert('Fehler: '+e.message);
    }
    clearInterval(iv); setLoading(false);
  }

  // SCHRITT 3 → 4: Finale Analyse
  async function runFinaleAnalyse() {
    setLoading(true);
    const iv=startLoading();
    try {
      const postImgContent=[];
      for(let i=0;i<postScreenshots.length;i++) {
        const ps=postScreenshots[i];
        if(ps.img) {
          try {
            const b64=await compressImage(ps.img, 600, 0.5);
            postImgContent.push({type:'image',source:{type:'base64',media_type:'image/jpeg',data:b64}});
            postImgContent.push({type:'text',text:`Post #${i+1}`});
          } catch(e) { console.error('Post-Bild übersprungen:',e); }
        }
      }

      const hauptzielLabel=analysis?.hauptziel||'';
      const nebenzielLabels=nebenziele.map(id=>ZIELE.find(z=>z.id===id)?.label||id).join(', ');

      const prompt=`Erstelle die vollständige finale Instagram-Analyse für ${vorname} (@${handle}).

PROFIL-ANALYSE: ${JSON.stringify(analysis?.profilAnalyse)}
FEED-ANALYSE: ${JSON.stringify(analysis?.feedAnalyse)}
HAUPTZIEL: ${hauptzielLabel}
NEBENZIELE: ${nebenzielLabels||'keine'}

POST-DETAILS:
${postScreenshots.map((p,i)=>`Post ${i+1}: Caption: ${p.caption||'k.A.'} | Likes: ${p.likes||'k.A.'} | Kommentare: ${p.comments||'k.A.'} | Views: ${p.views||'k.A.'} | Format: ${p.format||'k.A.'} | Hashtags: ${p.hashtags||'k.A.'}`).join('\n')}

INSIGHTS: Reichweite: ${avgReach||'k.A.'} | Wachstum: ${followerGrowth||'k.A.'} | Profil-Aufrufe: ${profileViews||'k.A.'} | Story-Reach: ${storyReach||'k.A.'} | Beste Zeit: ${bestTime||'k.A.'} | Top-Format: ${topFormat||'k.A.'} | Zusatz: ${additionalNotes||'keine'}

Sprich ${vorname} durchgehend mit Du an. Analysiere alles im Kontext des Hauptziels "${hauptzielLabel}".

Antworte NUR mit JSON:
{"gesamtscore":75,"zusammenfassung":"Text","staerken":["s1","s2","s3"],"sofortmassnahmen":["m1","m2","m3"],"zielAnalyse":{"hauptziel":"${hauptzielLabel}","erreichungsgrad":50,"analyse":"Text","luecken":["l1","l2","l3"],"empfehlungen":["e1","e2","e3"]},"bio":{"score":70,"analyse":"Text","staerken":["s"],"schwaechen":["s"],"optimierung":"Text","seoVorschlag":"Text"},"feedOptik":{"score":65,"analyse":"Text","staerken":["s"],"verbesserungen":["v1","v2","v3"],"empfehlung":"Text"},"contentsaeulen":{"score":60,"analyse":"Text","authority":{"score":60,"analyse":"Text","ideen":["i1","i2","i3"]},"demand":{"score":55,"analyse":"Text","ideen":["i1","i2","i3"]},"conversion":{"score":45,"analyse":"Text","ideen":["i1","i2","i3"]},"empfehlung":"Text"},"hooks":{"score":65,"analyse":"Text","staerken":["s"],"schwaechen":["s"],"hookVorschlaege":["h1","h2","h3","h4","h5"],"optimierungen":[{"original":"o","optimiert":"opt","grund":"g"}]},"postAnalyse":[{"titel":"Post 1","bewertung":"Text","score":70,"staerken":["s"],"schwaechen":["s"],"empfehlung":"Text"}],"keywords":{"primaer":["kw1","kw2","kw3"],"sekundaer":["kw1","kw2","kw3"],"hashtags":{"gross":["#t1","#t2","#t3"],"mittel":["#t1","#t2","#t3"],"nische":["#t1","#t2","#t3","#t4"]}},"contentplan":[{"woche":1,"titel":"Idee","format":"Reel","saeule":"Authority","hook":"Hook","thema":"Thema","zielBezug":"Bezug"},{"woche":2,"titel":"Idee","format":"Karussell","saeule":"Demand","hook":"Hook","thema":"Thema","zielBezug":"Bezug"},{"woche":3,"titel":"Idee","format":"Reel","saeule":"Conversion","hook":"Hook","thema":"Thema","zielBezug":"Bezug"},{"woche":4,"titel":"Idee","format":"Static","saeule":"Authority","hook":"Hook","thema":"Thema","zielBezug":"Bezug"}],"massnahmen":[{"rang":1,"titel":"T","was":"W","auswirkung":"A","aufwand":"niedrig","kategorie":"Bio"},{"rang":2,"titel":"T","was":"W","auswirkung":"A","aufwand":"mittel","kategorie":"Content"},{"rang":3,"titel":"T","was":"W","auswirkung":"A","aufwand":"hoch","kategorie":"Strategie"},{"rang":4,"titel":"T","was":"W","auswirkung":"A","aufwand":"niedrig","kategorie":"Optik"},{"rang":5,"titel":"T","was":"W","auswirkung":"A","aufwand":"mittel","kategorie":"Content"}]}`;

      const parsed = await callAPI([{role:'user',content:[...postImgContent,{type:'text',text:prompt}]}]);
      setAnalysis(prev=>({...prev,final:parsed}));
      setStep(5); setActiveTab('gesamt');
    } catch(e) {
      console.error(e);
      alert('Fehler: '+e.message);
    }
    clearInterval(iv); setLoading(false);
  }

  const upPost=(i,k,v)=>setPostScreenshots(prev=>prev.map((p,j)=>j===i?{...p,[k]:v}:p));

  return (
    <>
      <Head>
        <title>Brit Ortlepp – Instagram Content Analyse</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>
        <style>{`*{box-sizing:border-box;margin:0;padding:0;}body{background:#F5F2EE;font-family:'Montserrat',sans-serif;}`}</style>
      </Head>
      <div style={{minHeight:'100vh',background:B.gray,color:B.black}}>

        {/* HEADER */}
        <div style={{background:B.black,padding:'14px 28px',display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100,boxShadow:'0 2px 20px rgba(0,0,0,0.3)'}}>
          <Logo/>
          <div style={{display:'flex',gap:3,alignItems:'center'}}>
            {['Start','Profil','Feed','Posts','Insights','Analyse'].map((s,i)=>(
              <div key={i} style={{display:'flex',alignItems:'center',gap:3}}>
                <div style={{width:24,height:24,borderRadius:99,background:step>=i?B.yellow:'#333',color:step>=i?B.black:'#666',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:10}}>{i+1}</div>
                {i<5&&<div style={{width:10,height:2,background:step>i?B.yellow:'#444'}}/>}
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
              <p style={{fontSize:14,lineHeight:1.7,color:'#555',marginBottom:16}}>Deine Daten und Screenshots werden ausschließlich zur Analyse verwendet und nicht dauerhaft gespeichert. Die Verarbeitung erfolgt über die Anthropic API.</p>
              <p style={{fontSize:12,color:'#888',marginBottom:20}}>© 2025 Brit Ortlepp – Outstanding Content | britortlepp.de</p>
              <Btn onClick={()=>setShowPrivacy(false)} variant="dark">Schließen</Btn>
            </div>
          </div>
        )}

        <div style={{maxWidth:860,margin:'0 auto',padding:'28px 20px 60px'}}>

          {/* STEP 0: START */}
          {step===0&&(
            <div>
              <div style={{textAlign:'center',marginBottom:36}}>
                <div style={{display:'inline-block',background:B.yellow,borderRadius:16,padding:'6px 18px',fontSize:12,fontWeight:700,color:B.black,marginBottom:16,letterSpacing:'0.1em'}}>INSTAGRAM CONTENT ANALYSE</div>
                <h1 style={{fontWeight:900,fontSize:32,color:B.black,marginBottom:12,lineHeight:1.2}}>Dein professioneller<br/><span style={{color:B.teal}}>Content-Report</span></h1>
                <p style={{fontSize:15,color:'#666',maxWidth:560,margin:'0 auto',lineHeight:1.7}}>KI-gestützte Analyse deines Instagram-Auftritts mit konkreten Optimierungsvorschlägen.</p>
              </div>
              <Card style={{background:B.black,color:B.white,marginBottom:20}}>
                <SLabel><span style={{color:B.yellow}}>So funktioniert es – in 5 Schritten</span></SLabel>
                <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))',gap:14,marginTop:12}}>
                  {[
                    {icon:'👤',title:'Profil-Screenshot',text:'1 Bild vom Profil mit Bio & SEO-Feld'},
                    {icon:'📱',title:'Feed-Screenshots',text:'2-3 Bilder vom Feed – KI wählt Posts aus'},
                    {icon:'📊',title:'Post-Details',text:'Screenshots der ausgewählten Posts hochladen'},
                    {icon:'✨',title:'Insights',text:'Optional: Reichweite & Wachstum'},
                    {icon:'📄',title:'Dein Report',text:'Umfassende Analyse mit konkreten Empfehlungen'},
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
                  {['Bio & SEO-Optimierung','Feed-Optik Bewertung','Ziel-Lücken Analyse','Content-Säulen (Authority, Demand, Conversion)','5 Hook-Vorschläge','Post-für-Post Bewertung','Keywords & Hashtag-Strategie','4-Wochen Content-Plan','Top 5 Sofort-Maßnahmen'].map((item,i)=>(
                    <div key={i} style={{display:'flex',alignItems:'center',gap:8,fontSize:13}}><span style={{color:B.teal,fontWeight:700}}>✓</span>{item}</div>
                  ))}
                </div>
              </Card>
              <div style={{textAlign:'center',marginTop:8}}>
                <Btn onClick={()=>setStep(1)} variant="yellow">Jetzt starten →</Btn>
                <div style={{marginTop:12,fontSize:12,color:'#999'}}>🔒 Keine Datenspeicherung · <span style={{cursor:'pointer',textDecoration:'underline'}} onClick={()=>setShowPrivacy(true)}>Datenschutz</span></div>
              </div>
            </div>
          )}

          {/* STEP 1: PROFIL */}
          {step===1&&(
            <div>
              <div style={{marginBottom:24}}>
                <h2 style={{fontWeight:900,fontSize:24,marginBottom:6}}>👤 Schritt 1: Profil & Ziele</h2>
                <p style={{fontSize:14,color:'#777'}}>Lade deinen Profil-Screenshot hoch und ergänze deine Infos.</p>
              </div>
              <Card>
                <SLabel>Profil-Screenshot *</SLabel>
                <div style={{background:B.teal+'15',borderRadius:12,padding:14,marginBottom:16}}>
                  <div style={{fontWeight:700,color:B.teal,marginBottom:6,fontSize:13}}>📱 Was auf dem Screenshot sichtbar sein muss:</div>
                  <div style={{fontSize:13,color:'#444',lineHeight:1.8}}>• Dein <strong>Name / SEO-Namensfeld</strong> (fettgedruckt)<br/>• Deine vollständige <strong>Bio</strong><br/>• Dein <strong>Profilbild</strong><br/>• Deine <strong>Follower-Zahl</strong></div>
                </div>
                <UploadZone label="Profil-Screenshot hochladen" hint="Scrolle auf Instagram ganz nach oben, dann Screenshot" onFile={setProfileImg} file={profileImg} icon="👤" required/>
              </Card>
              <Card>
                <SLabel>Deine Infos</SLabel>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
                  <Inp label="Dein Vorname *" placeholder="z.B. Sara" value={vorname} onChange={e=>setVorname(e.target.value)} required/>
                  <Inp label="Instagram Handle *" placeholder="@username" value={handle} onChange={e=>setHandle(e.target.value)} required/>
                  <Inp label="Follower-Anzahl *" placeholder="z.B. 3.200" value={followers} onChange={e=>setFollowers(e.target.value)} required/>
                  <Sel label="Nische *" options={NISCHEN} value={nische} onChange={e=>setNische(e.target.value)} required/>
                  <Sel label="Posting-Häufigkeit" options={POSTING_FREQ} value={postingFreq} onChange={e=>setPostingFreq(e.target.value)}/>
                  <Inp label="Website" placeholder="www.example.com" value={website} onChange={e=>setWebsite(e.target.value)}/>
                  <Inp label="Link-in-Bio Tool" placeholder="z.B. Linktree" value={linkInBio} onChange={e=>setLinkInBio(e.target.value)}/>
                  <Inp label="Format-Mix" placeholder="z.B. 60% Reels, 40% Karussell" value={formatMix} onChange={e=>setFormatMix(e.target.value)}/>
                </div>
                <div style={{marginTop:16}}><Txta label="Zielgruppe" placeholder="Wen sprichst du an?" value={zielgruppe} onChange={e=>setZielgruppe(e.target.value)} rows={3}/></div>
              </Card>
              <Card>
                <SLabel>Dein Hauptziel auf Instagram *</SLabel>
                <p style={{fontSize:13,color:'#777',marginBottom:16}}>Wähle dein <strong>Hauptziel</strong> – die Analyse wird darauf ausgerichtet.</p>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:16}}>
                  {ZIELE.map(z=>(
                    <div key={z.id} onClick={()=>{setHauptziel(z.id);setNebenziele(prev=>prev.filter(n=>n!==z.id));}}
                      style={{border:`2px solid ${hauptziel===z.id?B.coral:'#e5e7eb'}`,borderRadius:12,padding:14,cursor:'pointer',background:hauptziel===z.id?B.coral+'15':'white',transition:'all 0.15s'}}>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <div style={{width:18,height:18,borderRadius:99,border:`2px solid ${hauptziel===z.id?B.coral:'#ccc'}`,background:hauptziel===z.id?B.coral:'white',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                          {hauptziel===z.id&&<div style={{width:7,height:7,borderRadius:99,background:'white'}}/>}
                        </div>
                        <div><div style={{fontWeight:700,fontSize:13}}>{z.label}</div><div style={{fontSize:11,color:'#888'}}>{z.desc}</div></div>
                      </div>
                    </div>
                  ))}
                </div>
                {hauptziel&&<>
                  <div style={{fontSize:12,fontWeight:700,color:B.teal,marginBottom:10}}>Nebenziele (optional)</div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                    {ZIELE.filter(z=>z.id!==hauptziel).map(z=>(
                      <div key={z.id} onClick={()=>toggleNebenziel(z.id)}
                        style={{border:`2px solid ${nebenziele.includes(z.id)?B.teal:'#e5e7eb'}`,borderRadius:10,padding:10,cursor:'pointer',background:nebenziele.includes(z.id)?B.teal+'15':'white',transition:'all 0.15s'}}>
                        <div style={{display:'flex',alignItems:'center',gap:8}}>
                          <div style={{width:16,height:16,borderRadius:4,border:`2px solid ${nebenziele.includes(z.id)?B.teal:'#ccc'}`,background:nebenziele.includes(z.id)?B.teal:'white',flexShrink:0,display:'flex',alignItems:'center',justifyContent:'center'}}>
                            {nebenziele.includes(z.id)&&<span style={{color:'white',fontSize:9,fontWeight:900}}>✓</span>}
                          </div>
                          <div style={{fontWeight:600,fontSize:12}}>{z.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>}
              </Card>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <Btn onClick={()=>setStep(0)} variant="ghost">← Zurück</Btn>
                <div style={{textAlign:'right'}}>
                  {!canStep2&&<div style={{fontSize:12,color:'#aaa',marginBottom:8}}>Screenshot, Vorname, Handle, Follower, Nische & Hauptziel sind Pflicht</div>}
                  <Btn onClick={runProfilAnalyse} disabled={!canStep2} variant="yellow">📊 Profil analysieren →</Btn>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: FEED */}
          {step===2&&(
            <div>
              <div style={{marginBottom:20}}>
                <h2 style={{fontWeight:900,fontSize:24,marginBottom:6}}>📱 Schritt 2: Feed-Screenshots</h2>
                <p style={{fontSize:14,color:'#777'}}>Hey {vorname}! Jetzt brauche ich deinen Feed – lade 2-3 Screenshots hoch.</p>
              </div>
              {analysis?.profilAnalyse&&(
                <Card style={{background:B.teal,color:B.white,marginBottom:20}}>
                  <div style={{fontWeight:800,fontSize:15,color:B.yellow,marginBottom:10}}>✅ Profil analysiert!</div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12}}>
                    <div style={{background:'rgba(255,255,255,0.1)',borderRadius:10,padding:12}}>
                      <div style={{fontSize:10,opacity:0.7,marginBottom:4}}>BIO SCORE</div>
                      <div style={{fontSize:24,fontWeight:900}}>{analysis.profilAnalyse.bio?.score}</div>
                    </div>
                    <div style={{background:'rgba(255,255,255,0.1)',borderRadius:10,padding:12}}>
                      <div style={{fontSize:10,opacity:0.7,marginBottom:4}}>POSITIONIERUNG</div>
                      <div style={{fontSize:24,fontWeight:900}}>{analysis.profilAnalyse.positionierung?.score}</div>
                    </div>
                  </div>
                </Card>
              )}
              <Card>
                <SLabel>Feed-Screenshots</SLabel>
                <div style={{background:B.yellow+'25',borderRadius:12,padding:14,marginBottom:16,borderLeft:`4px solid ${B.yellow}`}}>
                  <div style={{fontWeight:700,color:B.dark,marginBottom:6,fontSize:13}}>📱 So machst du gute Feed-Screenshots:</div>
                  <div style={{fontSize:13,color:'#444',lineHeight:1.8}}>1. Öffne dein Instagram-Profil<br/>2. Scrolle zum Feed mit deinen Posts<br/>3. <strong>Mind. 9 Posts</strong> müssen sichtbar sein<br/>4. Mache 2-3 Screenshots vom Feed</div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginBottom:16}}>
                  <UploadZone label="Feed-Screenshot 1 *" hint="Mind. 9 Posts sichtbar" onFile={setFeedImg1} file={feedImg1} icon="📱" required/>
                  <UploadZone label="Feed-Screenshot 2 (empfohlen)" hint="Weitere Posts" onFile={setFeedImg2} file={feedImg2} icon="📱"/>
                </div>
                <UploadZone label="Feed-Screenshot 3 (optional)" hint="Noch mehr Posts für bessere Analyse" onFile={setFeedImg3} file={feedImg3} icon="📱"/>
              </Card>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <Btn onClick={()=>setStep(1)} variant="ghost">← Zurück</Btn>
                <div style={{textAlign:'right'}}>
                  {!canStep3&&<div style={{fontSize:12,color:'#aaa',marginBottom:8}}>Mind. 1 Feed-Screenshot ist Pflicht</div>}
                  <Btn onClick={runFeedAnalyse} disabled={!canStep3} variant="yellow">🔍 Feed analysieren →</Btn>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: POSTS */}
          {step===3&&(
            <div>
              <div style={{marginBottom:20}}>
                <h2 style={{fontWeight:900,fontSize:24,marginBottom:6}}>📊 Schritt 3: Post-Details</h2>
                <p style={{fontSize:14,color:'#777'}}>Die KI hat deinen Feed analysiert und möchte diese Posts genauer kennen.</p>
              </div>
              {analysis?.feedAnalyse&&(
                <Card style={{background:B.black,color:B.white,marginBottom:20}}>
                  <div style={{fontWeight:800,fontSize:15,color:B.yellow,marginBottom:10}}>📋 Feed-Eindruck</div>
                  <p style={{fontSize:14,lineHeight:1.75,opacity:0.9,marginBottom:14}}>{analysis.feedAnalyse.gesamteindruck}</p>
                  <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10}}>
                    {[{l:'Feed-Optik',s:analysis.feedAnalyse.feedOptik?.score},{l:'Hooks',s:analysis.feedAnalyse.hooks?.score},{l:'Authority',s:analysis.feedAnalyse.contentsaeulen?.authority}].map(({l,s})=>(
                      <div key={l} style={{background:'rgba(255,255,255,0.1)',borderRadius:10,padding:12,textAlign:'center'}}>
                        <div style={{fontSize:22,fontWeight:900}}>{s}</div>
                        <div style={{fontSize:11,opacity:0.7}}>{l}</div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
              <Card style={{background:B.yellow+'25',borderLeft:`4px solid ${B.yellow}`}}>
                <div style={{fontWeight:800,color:B.dark,marginBottom:8}}>📱 So findest du die Posts:</div>
                <div style={{fontSize:13,color:'#444',lineHeight:1.8}}>1. Öffne Instagram → gehe zu deinem Profil<br/>2. Suche den beschriebenen Post<br/>3. Öffne den Post vollständig<br/>4. Mache einen Screenshot (Hook + Bild + Likes sichtbar)<br/>5. Lade ihn hier hoch</div>
              </Card>
              {postRequests.map((req,i)=>(
                <Card key={i} style={{borderLeft:`4px solid ${req.prioritaet==='hoch'?B.coral:B.teal}`}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <div style={{width:32,height:32,background:req.prioritaet==='hoch'?B.coral:B.teal,color:'white',borderRadius:99,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:900}}>{req.nr}</div>
                      <span style={{fontWeight:800,fontSize:16}}>Post #{req.nr}</span>
                    </div>
                    <Chip color={req.prioritaet==='hoch'?B.coral:B.teal}>{req.prioritaet==='hoch'?'⚡ Hoch':'📌 Mittel'}</Chip>
                  </div>
                  <div style={{background:'#f8f9fa',borderRadius:12,padding:14,marginBottom:12}}>
                    <div style={{fontSize:11,fontWeight:700,color:B.teal,marginBottom:6}}>🔎 WELCHEN POST SUCHEN?</div>
                    <p style={{fontSize:14}}>{req.beschreibung}</p>
                    {req.hookHinweis&&<div style={{marginTop:6,fontSize:13,color:'#666',fontStyle:'italic'}}>Hook: „{req.hookHinweis}..."</div>}
                  </div>
                  <div style={{background:req.prioritaet==='hoch'?B.coral+'12':B.teal+'12',borderRadius:12,padding:14,marginBottom:14}}>
                    <div style={{fontSize:11,fontWeight:700,color:req.prioritaet==='hoch'?B.coral:B.teal,marginBottom:6}}>💡 DARUM INTERESSIERT MICH DIESER POST</div>
                    <p style={{fontSize:14}}>{req.grund}</p>
                  </div>
                  <UploadZone label={`Screenshot von Post #${req.nr}`} hint="Kompletten Post screenshotten" onFile={f=>upPost(i,'img',f)} file={postScreenshots[i]?.img} icon="📱"/>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:10,marginTop:14}}>
                    <Inp label="Likes" placeholder="z.B. 342" value={postScreenshots[i]?.likes||''} onChange={e=>upPost(i,'likes',e.target.value)}/>
                    <Inp label="Kommentare" placeholder="z.B. 28" value={postScreenshots[i]?.comments||''} onChange={e=>upPost(i,'comments',e.target.value)}/>
                    <Inp label="Views (Reels)" placeholder="z.B. 12.400" value={postScreenshots[i]?.views||''} onChange={e=>upPost(i,'views',e.target.value)}/>
                  </div>
                  <div style={{marginTop:10}}><Txta label="Caption (optional)" placeholder="Caption einfügen für bessere Analyse..." value={postScreenshots[i]?.caption||''} onChange={e=>upPost(i,'caption',e.target.value)} rows={3}/></div>
                </Card>
              ))}
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <Btn onClick={()=>setStep(2)} variant="ghost">← Zurück</Btn>
                <Btn onClick={()=>setStep(4)} variant="yellow">Weiter zu Insights →</Btn>
              </div>
            </div>
          )}

          {/* STEP 4: INSIGHTS */}
          {step===4&&(
            <div>
              <div style={{marginBottom:20}}>
                <h2 style={{fontWeight:900,fontSize:24,marginBottom:6}}>📊 Schritt 4: Insights <span style={{fontSize:14,fontWeight:500,color:'#888'}}>(optional)</span></h2>
                <p style={{fontSize:14,color:'#777'}}>Je mehr Daten du teilst, desto präziser wird deine Analyse.</p>
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
                <div style={{marginTop:16}}><Inp label="Top-performendes Format" placeholder="z.B. Reels haben 3x mehr Reichweite" value={topFormat} onChange={e=>setTopFormat(e.target.value)}/></div>
                <div style={{marginTop:16}}><Txta label="Zusätzliche Infos" placeholder="Was soll die KI noch wissen?" value={additionalNotes} onChange={e=>setAdditionalNotes(e.target.value)} rows={3}/></div>
              </Card>
              <div style={{display:'flex',justifyContent:'space-between'}}>
                <Btn onClick={()=>setStep(3)} variant="ghost">← Zurück</Btn>
                <Btn onClick={runFinaleAnalyse} variant="yellow">🚀 Finale Analyse starten →</Btn>
              </div>
            </div>
          )}

          {/* STEP 5: ANALYSE */}
          {step===5&&analysis?.final&&(
            <div>
              <div style={{background:B.black,borderRadius:22,padding:'28px 28px 24px',marginBottom:20,position:'relative',overflow:'hidden'}}>
                <div style={{position:'absolute',top:-20,right:-20,width:180,height:180,background:B.yellow+'08',borderRadius:'50%'}}/>
                <div style={{position:'relative',display:'flex',gap:24,alignItems:'center',flexWrap:'wrap'}}>
                  <ScoreRing score={analysis.final.gesamtscore} size={120}/>
                  <div style={{flex:1}}>
                    <div style={{fontSize:10,letterSpacing:'0.2em',color:B.yellow,marginBottom:6}}>INSTAGRAM CONTENT ANALYSE REPORT</div>
                    <h2 style={{fontWeight:900,fontSize:22,color:B.yellow,marginBottom:4}}>Hey {vorname}! 👋</h2>
                    <p style={{fontSize:13,lineHeight:1.75,color:'#ccc',marginBottom:14}}>{analysis.final.zusammenfassung}</p>
                    <div style={{display:'flex',gap:6,flexWrap:'wrap'}}>{analysis.final.staerken?.map((st,i)=><span key={i} style={{background:B.yellow+'20',color:B.yellow,padding:'3px 10px',borderRadius:99,fontSize:11,fontWeight:700}}>✓ {st}</span>)}</div>
                  </div>
                </div>
              </div>

              {analysis.final.zielAnalyse&&(
                <Card style={{background:`linear-gradient(135deg,${B.coral} 0%,${B.coral}cc 100%)`,color:'white',padding:20}}>
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

              <Card style={{background:B.yellow,padding:20}}>
                <div style={{fontWeight:800,color:B.black,marginBottom:10}}>⚡ Das solltest du sofort tun, {vorname}</div>
                {analysis.final.sofortmassnahmen?.slice(0,3).map((m,i)=>(
                  <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start',marginBottom:8}}>
                    <div style={{width:22,height:22,background:B.black,color:B.yellow,borderRadius:99,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:11,flexShrink:0}}>{i+1}</div>
                    <div style={{fontSize:13,color:B.black}}>{m}</div>
                  </div>
                ))}
              </Card>

              <div style={{display:'flex',gap:6,marginBottom:16,flexWrap:'wrap'}}>
                {TABS_FINAL.map(t=>(
                  <button key={t.id} onClick={()=>setActiveTab(t.id)}
                    style={{padding:'8px 14px',borderRadius:10,border:`2px solid ${activeTab===t.id?B.teal:B.cream}`,background:activeTab===t.id?B.teal:B.white,color:activeTab===t.id?B.white:B.black,fontWeight:700,fontSize:12,cursor:'pointer',fontFamily:'Montserrat,sans-serif'}}>
                    {t.label}
                  </button>
                ))}
              </div>

              {activeTab==='gesamt'&&<Card>
                <h3 style={{fontWeight:800,fontSize:18,marginBottom:16}}>🏆 Gesamtbewertung</h3>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
                  <div style={{background:B.teal+'15',borderRadius:12,padding:16}}><div style={{fontWeight:700,color:B.teal,marginBottom:10,fontSize:13}}>✅ Deine Stärken</div>{analysis.final.staerken?.map((s,i)=><div key={i} style={{fontSize:13,marginBottom:6}}>• {s}</div>)}</div>
                  <div style={{background:B.coral+'15',borderRadius:12,padding:16}}><div style={{fontWeight:700,color:B.coral,marginBottom:10,fontSize:13}}>🚀 Sofort-Maßnahmen</div>{analysis.final.sofortmassnahmen?.map((m,i)=><div key={i} style={{fontSize:13,marginBottom:6}}>• {m}</div>)}</div>
                </div>
              </Card>}

              {activeTab==='ziele'&&analysis.final.zielAnalyse&&<Card>
                <h3 style={{fontWeight:800,fontSize:18,marginBottom:16}}>🎯 Ziel-Analyse</h3>
                <div style={{display:'flex',alignItems:'center',gap:20,marginBottom:20,background:B.gray,borderRadius:14,padding:20}}>
                  <ScoreRing score={analysis.final.zielAnalyse.erreichungsgrad} size={90}/>
                  <div><div style={{fontSize:12,fontWeight:700,color:B.teal,marginBottom:4}}>ZIELERREICHUNG AKTUELL</div><p style={{fontSize:14,lineHeight:1.7}}>{analysis.final.zielAnalyse.analyse}</p></div>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
                  <div style={{background:B.coral+'12',borderRadius:12,padding:16}}><div style={{fontWeight:700,color:B.coral,marginBottom:10,fontSize:13}}>❌ Lücken</div>{analysis.final.zielAnalyse.luecken?.map((l,i)=><div key={i} style={{fontSize:13,marginBottom:6}}>• {l}</div>)}</div>
                  <div style={{background:B.teal+'12',borderRadius:12,padding:16}}><div style={{fontWeight:700,color:B.teal,marginBottom:10,fontSize:13}}>💡 Empfehlungen</div>{analysis.final.zielAnalyse.empfehlungen?.map((e,i)=><div key={i} style={{fontSize:13,marginBottom:6}}>• {e}</div>)}</div>
                </div>
              </Card>}

              {activeTab==='bio'&&analysis.final.bio&&<Card>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}><h3 style={{fontWeight:800,fontSize:18}}>📝 Deine Bio & SEO</h3><ScoreRing score={analysis.final.bio.score} size={70}/></div>
                <p style={{fontSize:14,lineHeight:1.75,color:'#444',marginBottom:20}}>{analysis.final.bio.analyse}</p>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:20}}>
                  <div style={{background:B.teal+'15',borderRadius:12,padding:16}}><div style={{fontWeight:700,color:B.teal,marginBottom:10,fontSize:13}}>✅ Stärken</div>{analysis.final.bio.staerken?.map((s,i)=><div key={i} style={{fontSize:13,marginBottom:5}}>• {s}</div>)}</div>
                  <div style={{background:B.coral+'15',borderRadius:12,padding:16}}><div style={{fontWeight:700,color:B.coral,marginBottom:10,fontSize:13}}>⚠️ Schwächen</div>{analysis.final.bio.schwaechen?.map((s,i)=><div key={i} style={{fontSize:13,marginBottom:5}}>• {s}</div>)}</div>
                </div>
                <div style={{background:B.yellow+'25',borderRadius:14,padding:20,marginBottom:14,borderLeft:`4px solid ${B.yellow}`}}><div style={{fontWeight:800,color:B.dark,marginBottom:6,fontSize:12}}>✨ OPTIMIERTES SEO-NAMENSFELD</div><div style={{fontWeight:800,fontSize:16}}>{analysis.final.bio.seoVorschlag}</div></div>
                <div style={{background:B.teal+'12',borderRadius:14,padding:20,borderLeft:`4px solid ${B.teal}`}}><div style={{fontWeight:800,color:B.teal,marginBottom:10,fontSize:12}}>✨ OPTIMIERTER BIO-TEXT</div><p style={{fontSize:14,lineHeight:1.85,whiteSpace:'pre-line'}}>{analysis.final.bio.optimierung}</p></div>
              </Card>}

              {activeTab==='optik'&&analysis.final.feedOptik&&<Card>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}><h3 style={{fontWeight:800,fontSize:18}}>🎨 Deine Feed-Optik</h3><ScoreRing score={analysis.final.feedOptik.score} size={70}/></div>
                <p style={{fontSize:14,lineHeight:1.75,color:'#444',marginBottom:20}}>{analysis.final.feedOptik.analyse}</p>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:16}}>
                  <div style={{background:B.teal+'15',borderRadius:12,padding:16}}><div style={{fontWeight:700,color:B.teal,marginBottom:10,fontSize:13}}>✅ Stärken</div>{analysis.final.feedOptik.staerken?.map((s,i)=><div key={i} style={{fontSize:13,marginBottom:5}}>• {s}</div>)}</div>
                  <div style={{background:B.coral+'15',borderRadius:12,padding:16}}><div style={{fontWeight:700,color:B.coral,marginBottom:10,fontSize:13}}>🔧 Verbesserungen</div>{analysis.final.feedOptik.verbesserungen?.map((v,i)=><div key={i} style={{fontSize:13,marginBottom:5}}>• {v}</div>)}</div>
                </div>
                <div style={{background:B.yellow+'25',borderRadius:14,padding:16,borderLeft:`4px solid ${B.yellow}`}}><div style={{fontWeight:800,color:B.dark,marginBottom:8,fontSize:12}}>💡 EMPFEHLUNG</div><p style={{fontSize:14}}>{analysis.final.feedOptik.empfehlung}</p></div>
              </Card>}

              {activeTab==='saeulen'&&analysis.final.contentsaeulen&&<Card>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}><h3 style={{fontWeight:800,fontSize:18}}>🏛️ Content-Säulen</h3><ScoreRing score={analysis.final.contentsaeulen.score} size={70}/></div>
                <p style={{fontSize:14,lineHeight:1.75,color:'#444',marginBottom:20}}>{analysis.final.contentsaeulen.analyse}</p>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:14,marginBottom:20}}>
                  {[{key:'authority',label:'Authority',color:B.teal,icon:'🏆'},{key:'demand',label:'Demand',color:'#E9A020',icon:'🔥'},{key:'conversion',label:'Conversion',color:B.coral,icon:'💰'}].map(({key,label,color,icon})=>{
                    const d=analysis.final.contentsaeulen[key];
                    return(<div key={key} style={{background:color+'12',borderRadius:14,padding:18,borderTop:`4px solid ${color}`}}>
                      <div style={{fontSize:22,marginBottom:6}}>{icon}</div>
                      <div style={{fontWeight:800,color,marginBottom:12,fontSize:13}}>{label}</div>
                      <div style={{fontSize:26,fontWeight:900,color,marginBottom:4}}>{d?.score}</div>
                      <ScoreBar score={d?.score}/>
                      <p style={{fontSize:12,color:'#555',marginTop:10,lineHeight:1.6}}>{d?.analyse}</p>
                      <div style={{marginTop:12}}><div style={{fontSize:11,fontWeight:700,color,marginBottom:6}}>IDEEN:</div>{d?.ideen?.map((id,j)=><div key={j} style={{fontSize:12,marginBottom:4}}>💡 {id}</div>)}</div>
                    </div>);
                  })}
                </div>
                <div style={{background:B.yellow+'25',borderRadius:14,padding:16,borderLeft:`4px solid ${B.yellow}`}}><div style={{fontWeight:800,color:B.dark,marginBottom:8,fontSize:12}}>📌 STRATEGIE</div><p style={{fontSize:14}}>{analysis.final.contentsaeulen.empfehlung}</p></div>
              </Card>}

              {activeTab==='hooks'&&analysis.final.hooks&&<Card>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}><h3 style={{fontWeight:800,fontSize:18}}>🪝 Deine Hooks</h3><ScoreRing score={analysis.final.hooks.score} size={70}/></div>
                <p style={{fontSize:14,lineHeight:1.75,color:'#444',marginBottom:20}}>{analysis.final.hooks.analyse}</p>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:20}}>
                  <div style={{background:B.teal+'15',borderRadius:12,padding:16}}><div style={{fontWeight:700,color:B.teal,marginBottom:10,fontSize:13}}>✅ Stärken</div>{analysis.final.hooks.staerken?.map((s,i)=><div key={i} style={{fontSize:13,marginBottom:5}}>• {s}</div>)}</div>
                  <div style={{background:B.coral+'15',borderRadius:12,padding:16}}><div style={{fontWeight:700,color:B.coral,marginBottom:10,fontSize:13}}>⚠️ Schwächen</div>{analysis.final.hooks.schwaechen?.map((s,i)=><div key={i} style={{fontSize:13,marginBottom:5}}>• {s}</div>)}</div>
                </div>
                <div style={{marginBottom:20}}><div style={{fontSize:12,fontWeight:700,color:B.teal,letterSpacing:'0.1em',marginBottom:12}}>✨ 5 HOOK-VORSCHLÄGE FÜR DICH</div>{analysis.final.hooks.hookVorschlaege?.map((h,i)=>(<div key={i} style={{background:B.teal+'10',borderRadius:10,padding:14,borderLeft:`3px solid ${B.teal}`,fontSize:14,fontWeight:600,color:B.dark,marginBottom:8}}>„{h}"</div>))}</div>
                {analysis.final.hooks.optimierungen?.map((h,i)=>(
                  <div key={i} style={{background:B.gray,borderRadius:12,padding:16,marginBottom:10}}>
                    <div style={{fontSize:11,color:'#999',fontWeight:700,marginBottom:4}}>ORIGINAL</div>
                    <p style={{fontSize:14,fontStyle:'italic',color:'#555',marginBottom:12}}>„{h.original}"</p>
                    <div style={{fontSize:11,color:B.teal,fontWeight:700,marginBottom:4}}>✨ OPTIMIERT</div>
                    <p style={{fontSize:15,fontWeight:800,color:B.teal,marginBottom:6}}>„{h.optimiert}"</p>
                    <div style={{fontSize:12,color:'#777'}}>💡 {h.grund}</div>
                  </div>
                ))}
              </Card>}

              {activeTab==='posts'&&analysis.final.postAnalyse&&<Card>
                <h3 style={{fontWeight:800,fontSize:18,marginBottom:16}}>📊 Post-Analyse</h3>
                {analysis.final.postAnalyse?.map((p,i)=>(
                  <div key={i} style={{background:B.gray,borderRadius:14,padding:20,marginBottom:14,borderLeft:`4px solid ${scoreColor(p.score)}`}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}><div style={{fontWeight:800,fontSize:15}}>{p.titel}</div><div style={{fontSize:22,fontWeight:900,color:scoreColor(p.score)}}>{p.score}</div></div>
                    <p style={{fontSize:14,color:'#444',marginBottom:12}}>{p.bewertung}</p>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10,marginBottom:10}}>
                      <div style={{background:B.teal+'15',borderRadius:10,padding:12}}><div style={{fontSize:11,fontWeight:700,color:B.teal,marginBottom:6}}>✅ STÄRKEN</div>{p.staerken?.map((s,j)=><div key={j} style={{fontSize:12,marginBottom:3}}>• {s}</div>)}</div>
                      <div style={{background:B.coral+'15',borderRadius:10,padding:12}}><div style={{fontSize:11,fontWeight:700,color:B.coral,marginBottom:6}}>⚠️ SCHWÄCHEN</div>{p.schwaechen?.map((s,j)=><div key={j} style={{fontSize:12,marginBottom:3}}>• {s}</div>)}</div>
                    </div>
                    <div style={{background:B.yellow+'25',borderRadius:10,padding:12}}><div style={{fontSize:11,fontWeight:700,color:B.dark,marginBottom:4}}>💡 EMPFEHLUNG</div><div style={{fontSize:13}}>{p.empfehlung}</div></div>
                  </div>
                ))}
              </Card>}

              {activeTab==='keywords'&&analysis.final.keywords&&<Card>
                <h3 style={{fontWeight:800,fontSize:18,marginBottom:20}}>🔑 Keywords & Hashtags</h3>
                <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginBottom:20}}>
                  <div style={{background:B.teal+'15',borderRadius:14,padding:18}}><div style={{fontSize:12,fontWeight:700,color:B.teal,letterSpacing:'0.1em',marginBottom:12}}>PRIMÄRE KEYWORDS</div><div style={{display:'flex',flexWrap:'wrap'}}>{analysis.final.keywords.primaer?.map((kw,i)=><Chip key={i} color={B.teal}>{kw}</Chip>)}</div></div>
                  <div style={{background:B.dark+'10',borderRadius:14,padding:18}}><div style={{fontSize:12,fontWeight:700,color:B.dark,letterSpacing:'0.1em',marginBottom:12}}>SEKUNDÄRE KEYWORDS</div><div style={{display:'flex',flexWrap:'wrap'}}>{analysis.final.keywords.sekundaer?.map((kw,i)=><Chip key={i} color={B.dark}>{kw}</Chip>)}</div></div>
                </div>
                {[{label:'Große Hashtags',items:analysis.final.keywords.hashtags?.gross,color:B.coral},{label:'Mittlere Hashtags',items:analysis.final.keywords.hashtags?.mittel,color:B.teal},{label:'Nischen-Hashtags',items:analysis.final.keywords.hashtags?.nische,color:B.dark}].map(({label,items,color})=>(
                  <div key={label} style={{marginBottom:16}}><div style={{fontSize:12,fontWeight:700,color,marginBottom:8}}>{label}</div><div style={{display:'flex',flexWrap:'wrap'}}>{items?.map((h,i)=><Chip key={i} color={color}>{h}</Chip>)}</div></div>
                ))}
              </Card>}

              {activeTab==='plan'&&analysis.final.contentplan&&<Card>
                <h3 style={{fontWeight:800,fontSize:18,marginBottom:16}}>📅 4-Wochen Content-Plan</h3>
                {analysis.final.contentplan?.map((item,i)=>{
                  const sColor=item.saeule==='Authority'?B.teal:item.saeule==='Demand'?'#E9A020':B.coral;
                  return(<div key={i} style={{background:B.gray,borderRadius:14,padding:20,marginBottom:12,borderLeft:`4px solid ${sColor}`}}>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',marginBottom:10}}>
                      <div><div style={{fontSize:11,fontWeight:700,color:'#999',marginBottom:4}}>WOCHE {item.woche}</div><div style={{fontWeight:800,fontSize:16}}>{item.titel}</div></div>
                      <div style={{display:'flex',gap:6,marginLeft:12}}><Chip color={sColor}>{item.saeule}</Chip><Chip color={B.black}>{item.format}</Chip></div>
                    </div>
                    <div style={{fontSize:13,color:'#777',marginBottom:6}}>📌 {item.thema}</div>
                    {item.zielBezug&&<div style={{fontSize:13,color:B.teal,marginBottom:8,fontWeight:600}}>🎯 {item.zielBezug}</div>}
                    <div style={{background:sColor+'15',borderRadius:10,padding:12}}><div style={{fontSize:11,fontWeight:700,color:sColor,marginBottom:4}}>🪝 HOOK</div><div style={{fontSize:14,fontWeight:600}}>„{item.hook}"</div></div>
                  </div>);
                })}
              </Card>}

              {activeTab==='massnahmen'&&analysis.final.massnahmen&&<Card>
                <h3 style={{fontWeight:800,fontSize:18,marginBottom:16}}>🚀 Top 5 Maßnahmen</h3>
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
              </Card>}

              <div style={{display:'flex',gap:12,justifyContent:'center',padding:'20px 0',flexWrap:'wrap'}}>
                <Btn variant="ghost" onClick={()=>{setStep(0);setAnalysis(null);setProfileImg(null);setFeedImg1(null);setFeedImg2(null);setFeedImg3(null);}}>🔄 Neue Analyse</Btn>
                <Btn variant="dark" onClick={()=>window.print()}>📄 Als PDF drucken</Btn>
              </div>
            </div>
          )}

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
