import Head from 'next/head';
import { useState } from 'react';

const B = {
  teal:   '#517383',
  yellow: '#ECEA54',
  coral:  '#E94D60',
  cream:  '#E7DFD7',
  dark:   '#14544E',
  black:  '#1A1A1A',
  white:  '#FFFFFF',
};

function ScoreBar({ score }) {
  const color = score >= 70 ? B.teal : score >= 40 ? '#E9A020' : B.coral;
  return (
    <div style={{ background: '#D8D0C8', borderRadius: 99, height: 7, overflow: 'hidden' }}>
      <div style={{ width: `${score}%`, background: color, height: '100%', borderRadius: 99, transition: 'width 1.2s ease' }} />
    </div>
  );
}

function ScoreRing({ score, size = 110 }) {
  const color = score >= 70 ? B.teal : score >= 40 ? '#E9A020' : B.coral;
  const r = 42, circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;
  return (
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={r} fill="none" stroke={B.cream} strokeWidth="9" />
        <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="9"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          transform="rotate(-90 50 50)" style={{ transition: 'stroke-dashoffset 1.2s ease' }} />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: size * 0.24, fontWeight: 800, color, lineHeight: 1 }}>{score}</span>
        <span style={{ fontSize: size * 0.11, color: '#999', marginTop: 2 }}>/100</span>
      </div>
    </div>
  );
}

function Btn({ children, onClick, disabled, variant = 'primary', small }) {
  const styles = {
    primary: { background: B.teal,   color: B.white },
    yellow:  { background: B.yellow, color: B.black },
    coral:   { background: B.coral,  color: B.white },
    ghost:   { background: B.cream,  color: B.black },
  };
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ ...styles[variant], padding: small ? '8px 14px' : '11px 22px', borderRadius: 10, border: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer', fontWeight: 700, fontSize: small ? 12 : 14,
        fontFamily: 'Montserrat, sans-serif', opacity: disabled ? 0.5 : 1, transition: 'all 0.2s' }}>
      {children}
    </button>
  );
}

function Tag({ children, color = B.teal }) {
  return (
    <span style={{ background: color + '22', color, padding: '3px 10px', borderRadius: 99, fontSize: 12, fontWeight: 700, display: 'inline-block' }}>
      {children}
    </span>
  );
}

function SectionBox({ color, title, items }) {
  return (
    <div style={{ background: color + '18', borderRadius: 12, padding: 16 }}>
      <div style={{ fontWeight: 700, color, marginBottom: 10, fontSize: 13 }}>{title}</div>
      {items?.map((it, i) => <div key={i} style={{ fontSize: 13, color: B.black, marginBottom: 5 }}>• {it}</div>)}
    </div>
  );
}

const card = { background: B.white, borderRadius: 16, padding: 24, boxShadow: '0 2px 16px rgba(0,0,0,0.07)', marginBottom: 16 };
const inp  = { width: '100%', border: `1.5px solid ${B.cream}`, borderRadius: 10, padding: '10px 14px', fontSize: 14, outline: 'none', fontFamily: 'Montserrat, sans-serif', boxSizing: 'border-box', background: B.white, color: B.black };
const lbl  = { display: 'block', fontSize: 12, fontWeight: 700, color: B.teal, marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' };
const TABS = [
  { id: 'bio',            label: '📝 Bio',            key: 'bio' },
  { id: 'seo',            label: '🔍 SEO',            key: 'seo' },
  { id: 'positionierung', label: '🎯 Positionierung', key: 'positionierung' },
  { id: 'saeulen',        label: '🏛️ Content-Säulen', key: 'contentsaeulen' },
  { id: 'hooks',          label: '🪝 Hooks',           key: 'hooks' },
  { id: 'ideen',          label: '💡 Ideen',           key: null },
  { id: 'keywords',       label: '🔑 Keywords',       key: null },
  { id: 'massnahmen',     label: '🚀 Maßnahmen',      key: null },
];

export default function App() {
  const [step, setStep]           = useState(1);
  const [loading, setLoading]     = useState(false);
  const [analysis, setAnalysis]   = useState(null);
  const [activeTab, setActiveTab] = useState('bio');

  const [profile, setProfile] = useState({ handle: '', seoName: '', bio: '', followers: '', niche: '', website: '' });
  const up = (k, v) => setProfile(p => ({ ...p, [k]: v }));

  const [posts, setPosts] = useState(
    Array(6).fill(null).map((_, i) => ({ id: i, hook: '', caption: '', likes: '', comments: '', isTop: false, topComments: '' }))
  );
  const upPost    = (id, k, v) => setPosts(prev => prev.map(p => p.id === id ? { ...p, [k]: v } : p));
  const addPost   = () => setPosts(prev => [...prev, { id: Date.now(), hook: '', caption: '', likes: '', comments: '', isTop: false, topComments: '' }]);
  const removePost = (id) => setPosts(prev => prev.filter(p => p.id !== id));

  const filled     = posts.filter(p => p.caption.trim());
  const canGo2     = profile.handle.trim() && profile.bio.trim();
  const canRun     = canGo2 && filled.length >= 3;
  const scoreColor = s => s >= 70 ? B.teal : s >= 40 ? '#E9A020' : B.coral;

  const runAnalysis = async () => {
    setLoading(true);
    const prompt = `Du bist ein professioneller Instagram-Stratege und SEO-Experte für Coaches, Berater und Dienstleister im DACH-Raum.

PROFIL:
Handle: @${profile.handle}
SEO-Namensfeld: ${profile.seoName || 'nicht angegeben'}
Bio: ${profile.bio}
Follower: ${profile.followers || 'unbekannt'}
Nische: ${profile.niche || 'nicht angegeben'}
Website: ${profile.website || 'keine'}

POSTS (${filled.length} Stück):
${filled.map((p,i) => `POST ${i+1}${p.isTop?' ⭐TOP':''}:\nHook: ${p.hook||p.caption.substring(0,100)}\nCaption: ${p.caption}\nLikes: ${p.likes||'k.A.'} | Kommentare: ${p.comments||'k.A.'}\n${p.topComments?`Top-Kommentare: ${p.topComments}`:''}`).join('\n---\n')}

Antworte NUR mit JSON:
{"gesamtscore":<0-100>,"zusammenfassung":"<2-3 Sätze>","staerken":["<s1>","<s2>","<s3>"],"schwaechen":["<s1>","<s2>","<s3>"],"bio":{"score":<0-100>,"analyse":"<Text>","staerken":["<s>"],"schwaechen":["<s>"],"optimierung":"<Text>"},"seo":{"score":<0-100>,"analyse":"<Text>","aktuelleKeywords":["<kw>"],"fehlendeKeywords":["<kw>"],"optimierterName":"<Text>"},"positionierung":{"score":<0-100>,"analyse":"<Text>","zielgruppe":"<Text>","usp":"<Text>","konsistenz":"<Text>","empfehlung":"<Text>"},"contentsaeulen":{"score":<0-100>,"analyse":"<Text>","vorhandene":[{"name":"<n>","anteil":"<x%>","beschreibung":"<b>","bewertung":"gut|ausbaufähig|zu viel"}],"fehlende":[{"name":"<n>","begruendung":"<b>","ideen":["<i>"]}],"empfehlung":"<Text>"},"hooks":{"score":<0-100>,"analyse":"<Text>","staerken":["<s>"],"schwaechen":["<s>"],"optimierungen":[{"original":"<o>","optimiert":"<opt>","grund":"<g>"}]},"contentideen":[{"titel":"<t>","format":"Reel|Karussell|Story|Static","saeule":"<s>","hook":"<h>","grund":"<g>"}],"keywords":{"primaer":["<kw>","<kw>","<kw>"],"sekundaer":["<kw>","<kw>","<kw>"],"hashtags":["#t1","#t2","#t3","#t4","#t5","#t6","#t7","#t8","#t9","#t10"]},"massnahmen":[{"rang":1,"titel":"<t>","was":"<w>","auswirkung":"<a>","aufwand":"niedrig|mittel|hoch"},{"rang":2,"titel":"<t>","was":"<w>","auswirkung":"<a>","aufwand":"niedrig|mittel|hoch"},{"rang":3,"titel":"<t>","was":"<w>","auswirkung":"<a>","aufwand":"niedrig|mittel|hoch"}]}`;

    try {
      const res  = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      return (
    <>
      <Head>
        <title>Brit Örtlepp – Instagram Analyse</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&display=swap" rel="stylesheet" />
        <style>{`* { margin: 0; padding: 0; box-sizing: border-box; } body { background: #F5F2EE; }`}</style>
      </Head>
      <div style={{ fontFamily: 'Montserrat, sans-serif', minHeight: '100vh', background: '#F5F2EE', color: B.black }}>
        <div style={{ background: B.black, color: B.white, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18, color: B.yellow, letterSpacing: '0.08em' }}>BRIT ÖRTLEPP</div>
              <div style={{ fontSize: 9, letterSpacing: '0.25em', color: '#aaa', marginTop: 1 }}>OUTSTANDING CONTENT</div>
            </div>
            <div style={{ width: 1, height: 32, background: '#333' }} />
            <div style={{ fontSize: 12, color: '#ccc', letterSpacing: '0.1em' }}>INSTAGRAM ANALYSE</div>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            {[1,2,3].map(n => (
              <div key={n} onClick={() => n < step && setStep(n)}
                style={{ width: 30, height: 30, borderRadius: 99, background: step >= n ? B.yellow : '#333', color: step >= n ? B.black : '#666', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13, cursor: n < step ? 'pointer' : 'default' }}>
                {n}
              </div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <div style={{ maxWidth: 680, margin: '0 auto', padding: 24 }}>
            <div style={card}>
              <div style={{ borderLeft: `4px solid ${B.yellow}`, paddingLeft: 14, marginBottom: 24 }}>
                <h2 style={{ fontWeight: 800, fontSize: 20 }}>Profil-Informationen</h2>
                <p style={{ fontSize: 13, color: '#777', marginTop: 4 }}>Kopiere die Daten direkt aus dem Instagram-Profil.</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div><label style={lbl}>Instagram Handle *</label><input style={inp} placeholder="@username" value={profile.handle} onChange={e => up('handle', e.target.value)} /></div>
                <div><label style={lbl}>Follower-Anzahl</label><input style={inp} placeholder="z.B. 2.500" value={profile.followers} onChange={e => up('followers', e.target.value)} /></div>
              </div>
              <div style={{ marginTop: 16 }}><label style={lbl}>SEO-Namensfeld *</label><input style={inp} placeholder="z.B. Business Coach | Online Marketing" value={profile.seoName} onChange={e => up('seoName', e.target.value)} /></div>
              <div style={{ marginTop: 16 }}><label style={lbl}>Bio-Text *</label><textarea style={{ ...inp, minHeight: 120, resize: 'vertical' }} placeholder="Vollständigen Bio-Text einfügen..." value={profile.bio} onChange={e => up('bio', e.target.value)} /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
                <div><label style={lbl}>Nische</label><input style={inp} placeholder="z.B. Business Coaching" value={profile.niche} onChange={e => up('niche', e.target.value)} /></div>
                <div><label style={lbl}>Website</label><input style={inp} placeholder="www.example.com" value={profile.website} onChange={e => up('website', e.target.value)} /></div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}><Btn onClick={() => setStep(2)} disabled={!canGo2} variant="yellow">Weiter zu Posts →</Btn></div>
          </div>
        )}

        {step === 2 && (
          <div style={{ maxWidth: 800, margin: '0 auto', padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <div>
                <h2 style={{ fontWeight: 800, fontSize: 20 }}>Posts eingeben</h2>
                <p style={{ fontSize: 13, color: '#777', marginTop: 4 }}>Mind. 3 Posts · Empfohlen: 12+</p>
              </div>
              <Btn onClick={addPost} variant="ghost" small>+ Post hinzufügen</Btn>
            </div>
            {posts.map((post, i) => (
              <div key={post.id} style={{ ...card, borderTop: post.isTop ? `4px solid ${B.yellow}` : `4px solid ${B.cream}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 28, height: 28, background: B.teal+'20', color: B.teal, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13 }}>{i+1}</div>
                    <span style={{ fontWeight: 700 }}>Post {i+1}</span>
                    {post.isTop && <Tag color={B.coral}>⭐ Top Post</Tag>}
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, cursor: 'pointer' }}>
                      <input type="checkbox" checked={post.isTop} onChange={e => upPost(post.id, 'isTop', e.target.checked)} />Top Post
                    </label>
                    {posts.length > 3 && <button onClick={() => removePost(post.id)} style={{ background: 'none', border: 'none', color: B.coral, cursor: 'pointer', fontSize: 20 }}>×</button>}
                  </div>
                </div>
                <div><label style={lbl}>Hook</label><input style={inp} placeholder="Erste Zeile..." value={post.hook} onChange={e => upPost(post.id, 'hook', e.target.value)} /></div>
                <div style={{ marginTop: 12 }}><label style={lbl}>Caption</label><textarea style={{ ...inp, minHeight: 80, resize: 'vertical' }} placeholder="Komplette Caption..." value={post.caption} onChange={e => upPost(post.id, 'caption', e.target.value)} /></div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
                  <div><label style={lbl}>❤️ Likes</label><input style={inp} placeholder="z.B. 214" value={post.likes} onChange={e => upPost(post.id, 'likes', e.target.value)} /></div>
                  <div><label style={lbl}>💬 Kommentare</label><input style={inp} placeholder="z.B. 31" value={post.comments} onChange={e => upPost(post.id, 'comments', e.target.value)} /></div>
                </div>
                {post.isTop && <div style={{ marginTop: 12 }}><label style={lbl}>Top-Kommentare</label><textarea style={{ ...inp, minHeight: 60, resize: 'vertical' }} value={post.topComments} onChange={e => upPost(post.id, 'topComments', e.target.value)} /></div>}
              </div>
            ))}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 8 }}>
              <Btn onClick={() => setStep(1)} variant="ghost">← Zurück</Btn>
              <Btn onClick={runAnalysis} disabled={!canRun || loading} variant={canRun ? 'yellow' : 'ghost'}>
                {loading ? '⏳ KI analysiert...' : `🔍 Analyse starten (${filled.length} Posts)`}
              </Btn>
            </div>
          </div>
        )}

        {step === 3 && analysis && (
          <div style={{ maxWidth: 940, margin: '0 auto', padding: 24 }}>
            <div style={{ background: B.black, borderRadius: 20, padding: 28, marginBottom: 16, display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
              <ScoreRing score={analysis.gesamtscore} size={120} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, letterSpacing: '0.2em', color: B.yellow, marginBottom: 6 }}>ANALYSE-REPORT · OUTSTANDING CONTENT</div>
                <h2 style={{ fontWeight: 800, fontSize: 24, margin: '0 0 10px', color: B.yellow }}>@{profile.handle}</h2>
                <p style={{ fontSize: 14, lineHeight: 1.75, color: '#ccc', marginBottom: 14 }}>{analysis.zusammenfassung}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {analysis.staerken?.map((st, i) => <span key={i} style={{ background: B.yellow+'25', color: B.yellow, padding: '4px 12px', borderRadius: 99, fontSize: 12, fontWeight: 700 }}>✓ {st}</span>)}
                </div>
              </div>
            </div>
            <div style={{ ...card, padding: 20 }}>
              <div style={{ fontSize: 11, letterSpacing: '0.15em', color: B.teal, fontWeight: 700, marginBottom: 16 }}>BEWERTUNGSÜBERSICHT</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px,1fr))', gap: 12 }}>
                {[{l:'Bio',k:'bio'},{l:'SEO',k:'seo'},{l:'Positionierung',k:'positionierung'},{l:'Content-Säulen',k:'contentsaeulen'},{l:'Hooks',k:'hooks'}].map(({l,k}) => (
                  <div key={k} style={{ background: '#F5F2EE', borderRadius: 12, padding: 14, textAlign: 'center' }}>
                    <div style={{ fontSize: 26, fontWeight: 800, color: scoreColor(analysis[k]?.score) }}>{analysis[k]?.score}</div>
                    <div style={{ fontSize: 11, color: '#888', marginBottom: 8 }}>{l}</div>
                    <ScoreBar score={analysis[k]?.score} />
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
              {TABS.map(t => {
                const active = activeTab === t.id;
                const sc = t.key && analysis[t.key]?.score;
                return <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ padding: '8px 14px', borderRadius: 10, border: `2px solid ${active ? B.teal : B.cream}`, background: active ? B.teal : B.white, color: active ? B.white : B.black, fontWeight: 700, fontSize: 12, cursor: 'pointer', fontFamily: 'Montserrat, sans-serif' }}>{t.label}{sc != null ? ` · ${sc}` : ''}</button>;
              })}
            </div>
            {activeTab === 'bio' && analysis.bio && <div style={card}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}><h3 style={{ fontWeight: 800, fontSize: 18, margin: 0 }}>📝 Bio-Analyse</h3><span style={{ fontSize: 22, fontWeight: 800, color: scoreColor(analysis.bio.score) }}>{analysis.bio.score}/100</span></div><p style={{ fontSize: 14, lineHeight: 1.75, color: '#444', marginBottom: 20 }}>{analysis.bio.analyse}</p><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}><SectionBox color={B.teal} title="✅ Stärken" items={analysis.bio.staerken} /><SectionBox color={B.coral} title="⚠️ Schwächen" items={analysis.bio.schwaechen} /></div><div style={{ background: B.yellow+'30', borderRadius: 12, padding: 20, borderLeft: `4px solid ${B.yellow}` }}><div style={{ fontWeight: 800, color: B.dark, marginBottom: 10, fontSize: 13 }}>✨ OPTIMIERTER BIO-VORSCHLAG</div><p style={{ fontSize: 14, lineHeight: 1.85, whiteSpace: 'pre-line' }}>{analysis.bio.optimierung}</p></div></div>}
            {activeTab === 'seo' && analysis.seo && <div style={card}><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}><h3 style={{ fontWeight: 800, fontSize: 18, margin: 0 }}>🔍 SEO</h3><span style={{ fontSize: 22, fontWeight: 800, color: scoreColor(analysis.seo.score) }}>{analysis.seo.score}/100</span></div><p style={{ fontSize: 14, lineHeight: 1.75, color: '#444', marginBottom: 20 }}>{analysis.seo.analyse}</p><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}><div style={{ background: B.teal+'15', borderRadius: 12, padding: 16 }}><div style={{ fontWeight: 700, color: B.teal, marginBottom: 10, fontSize: 13 }}>🏷️ Aktuelle Keywords</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{analysis.seo.aktuelleKeywords?.map((kw,i) => <Tag key={i} color={B.teal}>{kw}</Tag>)}</div></div><div style={{ background: B.coral+'15', borderRadius: 12, padding: 16 }}><div style={{ fontWeight: 700, color: B.coral, marginBottom: 10, fontSize: 13 }}>❌ Fehlende Keywords</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>{analysis.seo.fehlendeKeywords?.map((kw,i) => <Tag key={i} color={B.coral}>{kw}</Tag>)}</div></div></div><div style={{ background: B.yellow+'30', borderRadius: 12, padding: 20, borderLeft: `4px solid ${B.yellow}` }}><div style={{ fontWeight: 800, color: B.dark, marginBottom: 8, fontSize: 13 }}>✨ OPTIMIERTER SEO-NAME</div><p style={{ fontWeight: 800, fontSize: 16 }}>{analysis.seo.optimierterName}</p></div></div>}
            {activeTab === 'keywords' && analysis.keywords && <div style={card}><h3 style={{ fontWeight: 800, fontSize: 18, margin: '0 0 20px' }}>🔑 Keywords & Hashtags</h3>{[{label:'Primäre Keywords',items:analysis.keywords.primaer,color:B.teal},{label:'Sekundäre Keywords',items:analysis.keywords.sekundaer,color:B.dark},{label:'Hashtags',items:analysis.keywords.hashtags,color:'#555'}].map(({label:l2,items,color}) => <div key={l2} style={{ marginBottom: 20 }}><div style={{ fontSize: 12, fontWeight: 700, color: B.teal, letterSpacing: '0.1em', marginBottom: 10 }}>{l2.toUpperCase()}</div><div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{items?.map((kw,i) => <span key={i} style={{ background: color+'18', color, padding: '7px 16px', borderRadius: 99, fontSize: 13, fontWeight: 700 }}>{kw}</span>)}</div></div>)}</div>}
            {activeTab === 'massnahmen' && analysis.massnahmen && <div style={card}><h3 style={{ fontWeight: 800, fontSize: 18, margin: '0 0 16px' }}>🚀 Sofort-Maßnahmen</h3>{analysis.massnahmen.map((m,i) => { const bCol = i===0?B.coral:i===1?'#E9A020':B.teal; return <div key={i} style={{ background: '#F5F2EE', borderRadius: 12, padding: 20, marginBottom: 12, borderLeft: `4px solid ${bCol}` }}><div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}><div style={{ width: 30, height: 30, background: bCol, color: B.white, borderRadius: 99, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 13 }}>#{m.rang}</div><span style={{ fontWeight: 800, fontSize: 16 }}>{m.titel}</span></div><p style={{ fontSize: 14, color: '#444', marginBottom: 8 }}>{m.was}</p><div style={{ fontSize: 13, color: '#777' }}>📈 {m.auswirkung}</div></div>; })}</div>}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', padding: '8px 0 40px' }}>
              <Btn variant="ghost" onClick={() => { setStep(1); setAnalysis(null); }}>🔄 Neue Analyse</Btn>
              <Btn variant="yellow" onClick={() => window.print()}>📄 Report exportieren</Btn>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
