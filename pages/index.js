import Head from 'next/head';
import { useState } from 'react';

const B = { teal:'#517383', yellow:'#ECEA54', coral:'#E94D60', cream:'#E7DFD7', dark:'#14544E', black:'#1A1A1A', white:'#FFFFFF' };

function ScoreBar({score}){const color=score>=70?B.teal:score>=40?'#E9A020':B.coral;return(<div style={{background:'#D8D0C8',borderRadius:99,height:7,overflow:'hidden'}}><div style={{width:`${score}%`,background:color,height:'100%',borderRadius:99}}/></div>);}

function ScoreRing({score,size=110}){const color=score>=70?B.teal:score>=40?'#E9A020':B.coral;const r=42,circ=2*Math.PI*r,offset=circ-(score/100)*circ;return(<div style={{position:'relative',width:size,height:size,flexShrink:0}}><svg width={size} height={size} viewBox="0 0 100 100"><circle cx="50" cy="50" r={r} fill="none" stroke={B.cream} strokeWidth="9"/><circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="9" strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 50 50)"/></svg><div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}><span style={{fontSize:size*0.24,fontWeight:800,color,lineHeight:1}}>{score}</span><span style={{fontSize:size*0.11,color:'#999',marginTop:2}}>/100</span></div></div>);}

function Btn({children,onClick,disabled,variant='primary',small}){const styles={primary:{background:B.teal,color:B.white},yellow:{background:B.yellow,color:B.black},coral:{background:B.coral,color:B.white},ghost:{background:B.cream,color:B.black}};return(<button onClick={onClick} disabled={disabled} style={{...styles[variant],padding:small?'8px 14px':'11px 22px',borderRadius:10,border:'none',cursor:disabled?'not-allowed':'pointer',fontWeight:700,fontSize:small?12:14,fontFamily:'Montserrat, sans-serif',opacity:disabled?0.5:1}}>{children}</button>);}

function Tag({children,color=B.teal}){return(<span style={{background:color+'22',color,padding:'3px 10px',borderRadius:99,fontSize:12,fontWeight:700,display:'inline-block'}}>{children}</span>);}

function SectionBox({color,title,items}){return(<div style={{background:color+'18',borderRadius:12,padding:16}}><div style={{fontWeight:700,color,marginBottom:10,fontSize:13}}>{title}</div>{items?.map((it,i)=><div key={i} style={{fontSize:13,color:B.black,marginBottom:5}}>• {it}</div>)}</div>);}

const card={background:B.white,borderRadius:16,padding:24,boxShadow:'0 2px 16px rgba(0,0,0,0.07)',marginBottom:16};
const inp={width:'100%',border:`1.5px solid ${B.cream}`,borderRadius:10,padding:'10px 14px',fontSize:14,outline:'none',fontFamily:'Montserrat, sans-serif',boxSizing:'border-box',background:B.white,color:B.black};
const lbl={display:'block',fontSize:12,fontWeight:700,color:B.teal,marginBottom:6,letterSpacing:'0.04em',textTransform:'uppercase'};

const TABS=[{id:'bio',label:'📝 Bio',key:'bio'},{id:'seo',label:'🔍 SEO',key:'seo'},{id:'positionierung',label:'🎯 Positionierung',key:'positionierung'},{id:'saeulen',label:'🏛️ Content-Säulen',key:'contentsaeulen'},{id:'hooks',label:'🪝 Hooks',key:'hooks'},{id:'ideen',label:'💡 Ideen',key:null},{id:'keywords',label:'🔑 Keywords',key:null},{id:'massnahmen',label:'🚀 Maßnahmen',key:null}];

export default function App(){
  const [step,setStep]=useState(1);
  const [loading,setLoading]=useState(false);
  const [analysis,setAnalysis]=useState(null);
  const [activeTab,setActiveTab]=useState('bio');
  const [profile,setProfile]=useState({handle:'',seoName:'',bio:'',followers:'',niche:'',website:''});
  const up=(k,v)=>setProfile(p=>({...p,[k]:v}));
  const [posts,setPosts]=useState(Array(6).fill(null).map((_,i)=>({id:i,hook:'',caption:'',likes:'',comments:'',isTop:false,topComments:''})));
  const upPost=(id,k,v)=>setPosts(prev=>prev.map(p=>p.id===id?{...p,[k]:v}:p));
  const addPost=()=>setPosts(prev=>[...prev,{id:Date.now(),hook:'',caption:'',likes:'',comments:'',isTop:false,topComments:''}]);
  const removePost=(id)=>setPosts(prev=>prev.filter(p=>p.id!==id));
  const filled=posts.filter(p=>p.caption.trim());
  const canGo2=profile.handle.trim()&&profile.bio.trim();
  const canRun=canGo2&&filled.length>=3;
  const scoreColor=s=>s>=70?B.teal:s>=40?'#E9A020':B.coral;

  const runAnalysis=async()=>{
    setLoading(true);
    const prompt=`Du bist ein professioneller Instagram-Stratege für Coaches und Berater im DACH-Raum. Analysiere diesen Account.\n\nPROFIL:\nHandle: @${profile.handle}\nSEO-Namensfeld: ${profile.seoName||'nicht angegeben'}\nBio: ${profile.bio}\nFollower: ${profile.followers||'unbekannt'}\nNische: ${profile.niche||'nicht angegeben'}\nWebsite: ${profile.website||'keine'}\n\nPOSTS (${filled.length}):\n${filled.map((p,i)=>`POST ${i+1}${p.isTop?' TOP':''}: Hook: ${p.hook||p.caption.substring(0,80)} | Caption: ${p.caption} | Likes: ${p.likes||'k.A.'} | Kommentare: ${p.comments||'k.A.'}`).join('\n')}\n\nAntworte NUR mit JSON:\n{"gesamtscore":75,"zusammenfassung":"Text","staerken":["s1","s2","s3"],"schwaechen":["s1","s2","s3"],"bio":{"score":70,"analyse":"Text","staerken":["s"],"schwaechen":["s"],"optimierung":"Text"},"seo":{"score":65,"analyse":"Text","aktuelleKeywords":["kw"],"fehlendeKeywords":["kw"],"optimierterName":"Text"},"positionierung":{"score":70,"analyse":"Text","zielgruppe":"Text","usp":"Text","konsistenz":"Text","empfehlung":"Text"},"contentsaeulen":{"score":60,"analyse":"Text","vorhandene":[{"name":"n","anteil":"30%","beschreibung":"b","bewertung":"gut"}],"fehlende":[{"name":"n","begruendung":"b","ideen":["i"]}],"empfehlung":"Text"},"hooks":{"score":65,"analyse":"Text","staerken":["s"],"schwaechen":["s"],"optimierungen":[{"original":"o","optimiert":"opt","grund":"g"}]},"contentideen":[{"titel":"t","format":"Reel","saeule":"s","hook":"h","grund":"g"}],"keywords":{"primaer":["kw1","kw2","kw3"],"sekundaer":["kw1","kw2","kw3"],"hashtags":["#t1","#t2","#t3","#t4","#t5"]},"massnahmen":[{"rang":1,"titel":"t","was":"w","auswirkung":"a","aufwand":"niedrig"},{"rang":2,"titel":"t","was":"w","auswirkung":"a","aufwand":"mittel"},{"rang":3,"titel":"t","was":"w","auswirkung":"a","aufwand":"hoch"}]}`;
    try{
      const res=await fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({prompt})});
      const data=await res.json();
      const raw=data.content[0].text.replace(/```json|```/g,'').trim();
      setAnalysis(JSON.parse(raw));
      setStep(3);
      setActiveTab('bio');
    }catch(e){console.error(e);alert('Fehler. Bitte erneut versuchen.');}
    setLoading(false);
  };

  return(
    <>
      <Head>
        <title>Brit Ortlepp – Instagram Analyse</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap" rel="stylesheet"/>
        <style>{`*{margin:0;padding:0;box-sizing:border-box;}body{background:#F5F2EE;}`}</style>
      </Head>
      <div style={{fontFamily:'Montserrat, sans-serif',minHeight:'100vh',background:'#F5F2EE',color:B.black}}>
        <div style={{background:B.black,color:B.white,padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64}}>
          <div style={{display:'flex',alignItems:'center',gap:16}}>
            <div><div style={{fontWeight:800,fontSize:18,color:B.yellow,letterSpacing:'0.08em'}}>BRIT ORTLEPP</div><div style={{fontSize:9,letterSpacing:'0.25em',color:'#aaa',marginTop:1}}>OUTSTANDING CONTENT</div></div>
            <div style={{width:1,height:32,background:'#333'}}/>
            <div style={{fontSize:12,color:'#ccc',letterSpacing:'0.1em'}}>INSTAGRAM ANALYSE</div>
          </div>
          <div style={{display:'flex',gap:8}}>{[1,2,3].map(n=>(<div key={n} onClick={()=>n<step&&setStep(n)} style={{width:30,height:30,borderRadius:99,background:step>=n?B.yellow:'#333',color:step>=n?B.black:'#666',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,cursor:n<step?'pointer':'default'}}>{n}</div>))}</div>
        </div>

        {step===1&&(<div style={{maxWidth:680,margin:'0 auto',padding:24}}>
          <div style={card}>
            <div style={{borderLeft:`4px solid ${B.yellow}`,paddingLeft:14,marginBottom:24}}><h2 style={{fontWeight:800,fontSize:20}}>Profil-Informationen</h2><p style={{fontSize:13,color:'#777',marginTop:4}}>Kopiere die Daten direkt aus dem Instagram-Profil.</p></div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
              <div><label style={lbl}>Instagram Handle *</label><input style={inp} placeholder="@username" value={profile.handle} onChange={e=>up('handle',e.target.value)}/></div>
              <div><label style={lbl}>Follower</label><input style={inp} placeholder="z.B. 2.500" value={profile.followers} onChange={e=>up('followers',e.target.value)}/></div>
            </div>
            <div style={{marginTop:16}}><label style={lbl}>SEO-Namensfeld</label><input style={inp} placeholder="z.B. Business Coach | Online Marketing" value={profile.seoName} onChange={e=>up('seoName',e.target.value)}/></div>
            <div style={{marginTop:16}}><label style={lbl}>Bio-Text *</label><textarea style={{...inp,minHeight:120,resize:'vertical'}} placeholder="Vollständigen Bio-Text einfügen..." value={profile.bio} onChange={e=>up('bio',e.target.value)}/></div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginTop:16}}>
              <div><label style={lbl}>Nische</label><input style={inp} placeholder="z.B. Business Coaching" value={profile.niche} onChange={e=>up('niche',e.target.value)}/></div>
              <div><label style={lbl}>Website</label><input style={inp} placeholder="www.example.com" value={profile.website} onChange={e=>up('website',e.target.value)}/></div>
            </div>
          </div>
          <div style={{textAlign:'right'}}><Btn onClick={()=>setStep(2)} disabled={!canGo2} variant="yellow">Weiter zu Posts →</Btn></div>
        </div>)}

        {step===2&&(<div style={{maxWidth:800,margin:'0 auto',padding:24}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16}}>
            <div><h2 style={{fontWeight:800,fontSize:20}}>Posts eingeben</h2><p style={{fontSize:13,color:'#777',marginTop:4}}>Mind. 3 Posts · Empfohlen: 12+</p></div>
            <Btn onClick={addPost} variant="ghost" small>+ Post hinzufügen</Btn>
          </div>
          {posts.map((post,i)=>(<div key={post.id} style={{...card,borderTop:post.isTop?`4px solid ${B.yellow}`:`4px solid ${B.cream}`}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
              <div style={{display:'flex',alignItems:'center',gap:10}}><div style={{width:28,height:28,background:B.teal+'20',color:B.teal,borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13}}>{i+1}</div><span style={{fontWeight:700}}>Post {i+1}</span>{post.isTop&&<Tag color={B.coral}>⭐ Top Post</Tag>}</div>
              <div style={{display:'flex',gap:12,alignItems:'center'}}><label style={{display:'flex',alignItems:'center',gap:6,fontSize:13,cursor:'pointer'}}><input type="checkbox" checked={post.isTop} onChange={e=>upPost(post.id,'isTop',e.target.checked)}/>Top Post</label>{posts.length>3&&<button onClick={()=>removePost(post.id)} style={{background:'none',border:'none',color:B.coral,cursor:'pointer',fontSize:20}}>×</button>}</div>
            </div>
            <div><label style={lbl}>Hook</label><input style={inp} placeholder="Erste Zeile..." value={post.hook} onChange={e=>upPost(post.id,'hook',e.target.value)}/></div>
            <div style={{marginTop:12}}><label style={lbl}>Caption</label><textarea style={{...inp,minHeight:80,resize:'vertical'}} placeholder="Komplette Caption..." value={post.caption} onChange={e=>upPost(post.id,'caption',e.target.value)}/></div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:12,marginTop:12}}>
              <div><label style={lbl}>❤️ Likes</label><input style={inp} placeholder="z.B. 214" value={post.likes} onChange={e=>upPost(post.id,'likes',e.target.value)}/></div>
              <div><label style={lbl}>💬 Kommentare</label><input style={inp} placeholder="z.B. 31" value={post.comments} onChange={e=>upPost(post.id,'comments',e.target.value)}/></div>
            </div>
            {post.isTop&&<div style={{marginTop:12}}><label style={lbl}>Top-Kommentare</label><textarea style={{...inp,minHeight:60,resize:'vertical'}} value={post.topComments} onChange={e=>upPost(post.id,'topComments',e.target.value)}/></div>}
          </div>))}
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',paddingTop:8}}>
            <Btn onClick={()=>setStep(1)} variant="ghost">← Zurück</Btn>
            <Btn onClick={runAnalysis} disabled={!canRun||loading} variant={canRun?'yellow':'ghost'}>{loading?'⏳ KI analysiert...':`🔍 Analyse starten (${filled.length} Posts)`}</Btn>
          </div>
        </div>)}

        {step===3&&analysis&&(<div style={{maxWidth:940,margin:'0 auto',padding:24}}>
          <div style={{background:B.black,borderRadius:20,padding:28,marginBottom:16,display:'flex',gap:28,alignItems:'center',flexWrap:'wrap'}}>
            <ScoreRing score={analysis.gesamtscore} size={120}/>
            <div style={{flex:1}}>
              <div
