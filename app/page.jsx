'use client';

import { useEffect, useState } from 'react';
import { flushSync } from 'react-dom';
import { days, chapters, recall, weekSteps, dayTwoChapters, dayTwoRecall, dayTwoMainChapters, dayTwoMainRecall } from '../lib/content';

const storageKey = 'study-studio-v2';

function Glyph({ name, size = 18, strokeWidth = 1.8 }) {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true };
  const paths = {
    spark: <><path d="M12 3 9.7 9.7 3 12l6.7 2.3L12 21l2.3-6.7L21 12l-6.7-2.3L12 3Z"/></>,
    arrow: <><path d="M5 12h14m-7-7 7 7-7 7"/></>,
    back: <><path d="m15 18-6-6 6-6"/></>,
    chevron: <><path d="m9 18 6-6-6-6"/></>,
    moon: <><path d="M20.8 15.9A9 9 0 0 1 8.1 3.2 9 9 0 1 0 20.8 15.9Z"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></>,
    focus: <><path d="M8 3H5a2 2 0 0 0-2 2v3m13-5h3a2 2 0 0 1 2 2v3M3 16v3a2 2 0 0 0 2 2h3m13-5v3a2 2 0 0 1-2 2h-3"/></>,
    layers: <><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 5 9 5 9-5"/></>,
    book: <><path d="M3 5.5A2.5 2.5 0 0 1 5.5 3H21v17H5.5A2.5 2.5 0 0 1 3 17.5Zm0 12A2.5 2.5 0 0 1 5.5 15H21"/></>,
    check: <><path d="m5 12 4 4L19 6"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="M5 5 19 19M19 5 5 19"/></>,
    edit: <><path d="M12 20h9M16 4a2.1 2.1 0 0 1 3 3L9 17l-4 1 1-4L16 4Z"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    lock: <><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V8a4 4 0 1 1 8 0v3"/></>,
    refresh: <><path d="M20 11A8 8 0 1 0 12 20a8 8 0 0 0 7.5-5M20 4v7h-7"/></>,
    bolt: <><path d="m13 2-9 12h7l-1 8 10-12h-7l0-8Z"/></>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 11v5m0-8h.01"/></>,
    save: <><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2ZM7 3v6h10V4M7 21v-8h10v8"/></>
  };
  return <svg {...common}>{paths[name] || paths.spark}</svg>;
}

function MiniArt({ kind }) {
  if (kind === 'stages') return <div className="diagram stages" aria-label="Technology adoption: dismissal, reshuffle and acceptance">
    {['Dismissal', 'Reshuffle', 'Acceptance'].map((label, i) => <div className={'stage-step ' + (i === 1 ? 'stage-current' : '')} key={label}>
      <span className="stage-index">0{i + 1}</span><div className="stage-track"><span/></div><strong>{label}</strong><small>{i === 1 ? 'Presenter view: AI today' : i === 0 ? 'Few take it seriously' : 'The opportunity is clearer'}</small>
    </div>)}
  </div>;
  if (kind === 'ownership') return <div className="diagram ownership">
    <div className="ownership-card muted-card"><span className="overline">USING AI</span><div className="abstract-line"/><strong>Complete a task</strong><small>Helpful, but the value may belong to someone else.</small></div>
    <div className="ownership-connector"><Glyph name="arrow" size={22}/></div>
    <div className="ownership-card accent-card"><span className="overline">BUILDING AN ASSET</span><div className="ownership-glow"><Glyph name="layers" size={29}/></div><strong>Own the product</strong><small>Create a result that customers choose to pay you for.</small></div>
  </div>;
  if (kind === 'products') return <div className="diagram product-visual">
    <div className="product-orbit orbit-one"/><div className="product-orbit orbit-two"/>
    <div className="product-sheet"><div className="sheet-top"><span>THE FOCUSED GUIDE</span><span>01 / 03</span></div><div className="sheet-title">One problem.<br/>One clear result.</div><div className="sheet-rule"/><div className="sheet-line long"/><div className="sheet-line medium"/><div className="sheet-line short"/><div className="sheet-bottom">A useful deliverable</div></div>
    <div className="product-pill pill-one">Templates</div><div className="product-pill pill-two">Guides</div><div className="product-pill pill-three">Tools</div>
  </div>;
  if (kind === 'pipeline') return <div className="diagram pipeline">
    {[
      {n: '01', title: 'Develop', note: 'Make the solution'},
      {n: '02', title: 'Distribute', note: 'Find the right people'},
      {n: '03', title: 'Deliver', note: 'Fulfil reliably'}
    ].map((item,i) => <div className="pipe-wrap" key={item.n}><div className="pipe-item"><span>{item.n}</span><strong>{item.title}</strong><small>{item.note}</small></div>{i < 2 && <span className="pipe-link"><Glyph name="arrow" size={19}/></span>}</div>)}
  </div>;
  if (kind === 'validation') return <div className="diagram validation">
    <span className="validation-line"/>
    {['Problem','Proof','Product'].map((a,i) => <div className="validation-node" key={a}><div className={'validation-circle c' + i}><span>{String(i + 1).padStart(2,'0')}</span></div><strong>{a}</strong><small>{['Understand the customer','Test the real demand','Deliver a useful result'][i]}</small></div>)}
  </div>;
  if (kind === 'progress') return <div className="diagram progress-code">{['Target','Recalibrate','Playbook','People','Execute'].map((a,i)=><div className="code-step" key={a}><div>{String(i+1).padStart(2,'0')}</div><span>{a}</span></div>)}</div>;
  return <div className="diagram roadmap-visual"><div className="roadmap-orbit outer"/><div className="roadmap-orbit inner"/><div className="roadmap-core"><Glyph name="bolt" size={28}/><strong>Start small.</strong><span>Learn quickly.</span></div></div>;
}

function DayTwo({ notes, setNotes }) {
  const [track,setTrack]=useState('vip');
  const [selected,setSelected]=useState(0);
  const [flip,setFlip]=useState(false);
  const [question,setQuestion]=useState(0);
  const [promise,setPromise]=useState({who:'',problem:'',result:'',time:''});
  const lessons=track==='vip'?dayTwoChapters:dayTwoMainChapters;
  const questions=track==='vip'?dayTwoRecall:dayTwoMainRecall;
  const current=lessons[selected];
  const notesKey=track==='vip'?'day2-'+current.id:'day2-main-'+current.id;
  useEffect(()=>{
    try {const saved=JSON.parse(localStorage.getItem('study-studio-day2')||'{}');if(saved.promise)setPromise(saved.promise);}catch{}
  },[]);
  useEffect(()=>{localStorage.setItem('study-studio-day2',JSON.stringify({promise}));},[promise]);
  return <section className="day-one day2-view">
    <div className="section-intro"><div><div className="overline">DAY 02 / 8 NOVEMBER 2026</div><h2>Build something people need<span>.</span></h2><p>VIP foundations and the free main session, consolidated into practical lessons.</p></div><div className="lesson-total"><span>{String(selected+1).padStart(2,'0')}</span> / {String(lessons.length).padStart(2,'0')}</div></div>
    <div className="day2-track-tabs" role="group" aria-label="Choose Day 2 session">
      <button className={track==='vip'?'is-active':''} aria-pressed={track==='vip'} onClick={()=>{setTrack('vip');setSelected(0);setQuestion(0);setFlip(false)}}>VIP session <span>7 lessons</span></button>
      <button className={track==='main'?'is-active':''} aria-pressed={track==='main'} onClick={()=>{setTrack('main');setSelected(0);setQuestion(0);setFlip(false)}}>Free main session <span>5 lessons</span></button>
    </div>
    <div className="chapter-tabs" role="tablist" aria-label={track==='vip'?'VIP lessons':'Main session lessons'}>{lessons.map((c,i)=><button key={c.id} role="tab" aria-selected={i===selected} className={'chapter-tab '+(i===selected?'chosen':'')} onClick={()=>{setSelected(i);setFlip(false)}}><span>{c.number}</span>{c.id}</button>)}</div>
    <article className="lesson-card glass enter" key={current.id}>
      <div className="lesson-top"><div className="eyebrow"><span className="eyebrow-dot"/>{current.category}</div><span className="lesson-duration"><Glyph name="clock" size={14}/> {current.duration} read</span></div>
      <h1>{current.title}</h1><p className="lesson-subtitle">{current.subtitle}</p>
      <div className="insight"><div className="insight-symbol"><Glyph name="spark" size={20}/></div><div><span className="overline">THE ONE THING TO REMEMBER</span><p>{current.insight}</p></div></div>
      <div className="visual-label"><span>VISUAL EXPLANATION</span><span className="visual-dash"/></div>
      <MiniArt kind={current.visual}/>
      <div className="concepts">{current.points.map((point,i)=><div className="concept" key={point.title}><span className="concept-num">{String(i+1).padStart(2,'0')}</span><div><h3>{point.title}</h3><p>{point.body}</p></div></div>)}</div>
      {track==='vip'&&current.id==='promise'&&<div className="promise-workshop"><div className="overline">THE FOUR-PART PRODUCT PROMISE</div><h3>Build your own.</h3><p>Fill in each part. This stays in your browser, alongside your study notes.</p><div className="promise-inputs">{[{k:'who',t:'WHO',hint:'First-time 2D game creators'},{k:'problem',t:'THE PROBLEM THAT GETS WORSE',hint:'who keep losing time to complicated setup'},{k:'result',t:'POINT B',hint:'build and play their first game prototype'},{k:'time',t:'HOW LONG',hint:'a timeframe confirmed by testing'}].map(item=><label key={item.k}>{item.t}<input value={promise[item.k]} placeholder={item.hint} onChange={e=>setPromise(v=>({...v,[item.k]:e.target.value}))}/></label>)}</div><div className="promise-result"><span className="overline">YOUR PRODUCT PROMISE</span><p>I help <strong>{promise.who||'[who]'}</strong>, with <strong>{promise.problem||'[a problem that is getting worse]'}</strong>, get to <strong>{promise.result||'[point B]'}</strong> in <strong>{promise.time||'[how long]'}</strong>.</p><button onClick={()=>navigator.clipboard?.writeText('I help '+(promise.who||'[who]')+', with '+(promise.problem||'[a worsening problem]')+', get to '+(promise.result||'[point B]')+' in '+(promise.time||'[how long]')+'.')}>Copy promise <Glyph name="save" size={14}/></button></div><small>Only claim a result or timeline that you can support with evidence. The seminar example is not verified as a guarantee.</small></div>}
      <div className="practice"><div className="practice-head"><span className="practice-icon"><Glyph name="edit" size={19}/></span><div><span className="overline">PUT IT INTO PRACTICE</span><h3>Make it yours.</h3></div></div><p>{current.action}</p><label htmlFor={notesKey} className="notes-label">MY THOUGHTS</label><textarea id={notesKey} rows={4} placeholder="Capture your thinking here." value={notes[notesKey]||''} onChange={e=>setNotes(n=>({...n,[notesKey]:e.target.value}))}/><small className="autosave"><Glyph name="check" size={13}/> Saved privately in this browser</small></div>
      {((track==='vip'&&current.id==='promise')||(track==='main'&&current.id==='claims'))&&<div className="final-tools"><div className="quiz-head"><div><span className="overline">ACTIVE RECALL</span><h3>Test your understanding.</h3></div><span>{question+1} / {questions.length}</span></div><button className={'flashcard '+(flip?'flipped':'')} onClick={()=>setFlip(!flip)}><span className="overline">{flip?'ANSWER':'QUESTION'} / TAP TO FLIP</span><strong>{flip?questions[question].a:questions[question].q}</strong><span className="flash-hint"><Glyph name="refresh" size={15}/> Reveal or hide answer</span></button><div className="flash-controls"><button aria-label="Previous question" onClick={()=>{setQuestion(i=>(i+questions.length-1)%questions.length);setFlip(false)}}><Glyph name="back"/></button><button onClick={()=>{setQuestion(i=>(i+1)%questions.length);setFlip(false)}}>Next question <Glyph name="arrow"/></button></div></div>}
      <div className="lesson-footer"><span className="lesson-question"><Glyph name="info" size={15}/> THINK ABOUT IT: {current.question}</span><div className="lesson-arrows"><button aria-label="Previous chapter" disabled={selected===0} onClick={()=>setSelected(i=>i-1)}><Glyph name="back" size={17}/></button><button disabled={selected===lessons.length-1} onClick={()=>setSelected(i=>i+1)}>Next chapter <Glyph name="arrow" size={17}/></button></div></div>
    </article>
  </section>;
}
function Placeholder({ day, goHome }) {
  return <section className="placeholder-view enter" key={'future-' + day.number}>
    <div className="eyebrow"><span className="eyebrow-dot"/> DAY {String(day.number).padStart(2, '0')} <span className="eyebrow-separator">/</span> NOTES SPACE</div>
    <div className="placeholder-art" aria-hidden="true"><div className="placeholder-ring ring-1"/><div className="placeholder-ring ring-2"/><div className="placeholder-core">{String(day.number).padStart(2,'0')}</div></div>
    <h1>{day.label}<span className="period">.</span></h1>
    <p className="placeholder-lead">A space reserved for your next session.</p>
    <p className="placeholder-copy">Once you share the meeting notes, this chapter can be filled with focused takeaways, diagrams and exercises. No invented lessons or filler.</p>
    <div className="placeholder-footer"><span><Glyph name="clock" size={17}/> {day.subtitle}</span><button className="primary-btn" onClick={goHome}>Return to Day 1 <Glyph name="arrow"/></button></div>
  </section>;
}

function RevenueExplorer() {
  const [price, setPrice] = useState(19);
  const [orders, setOrders] = useState(5);
  const format = n => new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP',maximumFractionDigits:0}).format(n);
  return <div className="revenue-explorer"><div className="revenue-fields"><label>Example product price <strong>{format(price)}</strong><input aria-label="Example price" type="range" min="5" max="99" step="1" value={price} onChange={e=>setPrice(Number(e.target.value))}/></label><label>Example orders per day <strong>{orders}</strong><input aria-label="Example daily orders" type="range" min="1" max="20" step="1" value={orders} onChange={e=>setOrders(Number(e.target.value))}/></label></div><div className="revenue-total"><span>ILLUSTRATIVE DAILY REVENUE</span><strong>{format(price*orders)}</strong><small>Revenue only, before fees, refunds, taxes and other expenses. Not an earnings forecast.</small></div></div>;
}

export default function Home() {
  const [day, setDay] = useState(1);
  const [chapterId, setChapterId] = useState('opportunity');
  const [dark, setDark] = useState(false);
  const [focus, setFocus] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [notes, setNotes] = useState({});
  const [done, setDone] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [readProgress, setReadProgress] = useState(0);

  const chapterIndex = Math.max(chapters.findIndex(c=>c.id===chapterId),0);
  const chapter = chapters[chapterIndex];
  const currentDay = days.find(d=>d.number===day) || days[0];
  const progress = Math.round((done.length/weekSteps.length)*100);

  useEffect(()=>{
    try {
      const saved=JSON.parse(localStorage.getItem(storageKey)||'{}');
      if (saved.notes && typeof saved.notes === 'object') setNotes(saved.notes);
      if (Array.isArray(saved.done)) setDone(saved.done.filter(n=>Number.isInteger(n) && n>=0 && n<weekSteps.length));
      setDark(Boolean(saved.dark)); setFocus(Boolean(saved.focus));
    } catch {}
    const readHash = () => {
      const match = window.location.hash.match(/^#day-([1-5])(?:\/([a-z]+))?/);
      if (match) {setDay(Number(match[1]));if(chapters.some(c=>c.id===match[2]))setChapterId(match[2]);}
    };
    readHash();
    window.addEventListener('hashchange',readHash);
    setHydrated(true);
    return ()=>window.removeEventListener('hashchange',readHash);
  },[]);
  useEffect(()=>{document.documentElement.dataset.theme=dark?'dark':'light';},[dark]);
  useEffect(()=>{document.documentElement.dataset.focus=focus?'true':'false';},[focus]);
  useEffect(()=>{if(hydrated)localStorage.setItem(storageKey,JSON.stringify({notes,done,dark,focus}));},[notes,done,dark,focus,hydrated]);
  useEffect(()=>{
    const measure=()=>{ const max=document.documentElement.scrollHeight-window.innerHeight;setReadProgress(max>0?Math.max(0,Math.min(100,Math.round(window.scrollY/max*100))):100); };
    measure();window.addEventListener('scroll',measure,{passive:true});window.addEventListener('resize',measure);
    return ()=>{window.removeEventListener('scroll',measure);window.removeEventListener('resize',measure);};
  },[day,chapterId]);
  useEffect(()=>{
    if(typeof window==='undefined'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    let raf=0,px=0,py=0;
    const move=e=>{px=(e.clientX/window.innerWidth-.5)*2;py=(e.clientY/window.innerHeight-.5)*2;if(raf)return;raf=requestAnimationFrame(()=>{document.documentElement.style.setProperty('--mx',(px*20).toFixed(1)+'px');document.documentElement.style.setProperty('--my',(py*17).toFixed(1)+'px');raf=0;});};
    window.addEventListener('pointermove',move,{passive:true});
    return ()=>{window.removeEventListener('pointermove',move);cancelAnimationFrame(raf);};
  },[]);
  useEffect(()=>{
    const key=e=>{
      const tag=e.target?.tagName;
      if(tag==='TEXTAREA'||tag==='INPUT'||tag==='BUTTON'||e.metaKey||e.ctrlKey||e.altKey||day!==1)return;
      if(e.key==='ArrowRight'&&chapterIndex<chapters.length-1){e.preventDefault();navigate(1,chapters[chapterIndex+1].id);}
      if(e.key==='ArrowLeft'&&chapterIndex>0){e.preventDefault();navigate(1,chapters[chapterIndex-1].id);}
    };
    window.addEventListener('keydown',key);
    return ()=>window.removeEventListener('keydown',key);
  },[day,chapterIndex]);

  function navigate(nextDay, nextChapter='opportunity') {
    const mutate=()=>{setDay(nextDay);setChapterId(nextChapter);setDrawer(false);setFlipped(false);};
    const target='#day-'+nextDay+(nextDay===1?'/'+nextChapter:'');
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (document.startViewTransition && !reduced) document.startViewTransition(()=>flushSync(mutate));
    else mutate();
    if(window.location.hash!==target)window.history.pushState(null,'',target);
    window.scrollTo({top:0,behavior:reduced?'instant':'smooth'});
  }
  function toggleStep(index) {setDone(prev=>prev.includes(index)?prev.filter(x=>x!==index):[...prev,index]);}
  function exportNotes() {
    const plain=['AI INCOME STUDY STUDIO','DAY 1 PERSONAL NOTES','',...chapters.map(c=>c.title+'\n'+(notes[c.id]||'(no notes yet)')+'\n'),'DAY 2 VIP NOTES','',...dayTwoChapters.map(c=>c.title+'\n'+(notes['day2-'+c.id]||'(no notes yet)')+'\n'),'DAY 2 FREE MAIN SESSION','',...dayTwoMainChapters.map(c=>c.title+'\n'+(notes['day2-main-'+c.id]||'(no notes yet)')+'\n'),'','FIRST WEEK',...weekSteps.map((s,i)=>(done.includes(i)?'[x] ':'[ ] ')+s)].join('\n');
    const blob=new Blob([plain],{type:'text/plain;charset=utf-8'});
    const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='study-studio-notes.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }

  return <div className="site">
    <div className="ambient ambient-a" aria-hidden="true"/><div className="ambient ambient-b" aria-hidden="true"/><div className="ambient ambient-c" aria-hidden="true"/>
    <a className="skip-link" href="#main-content">Skip to study content</a>
    <header className="topbar glass">
      <button className="mobile-menu icon-btn" onClick={()=>setDrawer(!drawer)} aria-label={drawer?'Close day menu':'Open day menu'}><Glyph name={drawer?'close':'menu'}/></button>
      <button className="brand" onClick={()=>navigate(1)} aria-label="Study Studio home"><span className="brand-icon"><Glyph name="spark" size={19}/></span><span>STUDY<span className="brand-light">STUDIO</span></span></button>
      <div className="top-center"><span className="live-dot"/> YOUR PERSONAL LEARNING SPACE <span className="top-divider"/> AI INCOME CHALLENGE</div>
      <div className="toolbar">
        <button className={'icon-btn '+(focus?'active-tool':'')} onClick={()=>setFocus(!focus)} aria-label={focus?'Exit focus mode':'Enable focus mode'} title="Focus mode"><Glyph name="focus"/></button>
        <button className="icon-btn" onClick={()=>setDark(!dark)} aria-label={dark?'Use light theme':'Use dark theme'} title="Change theme"><Glyph name={dark?'sun':'moon'}/></button>
        <span className="top-avatar">{String(day).padStart(2,'0')}<span>/05</span></span>
      </div>
      <div className="reading-rail" role="progressbar" aria-label="Page reading progress" aria-valuemin={0} aria-valuemax={100} aria-valuenow={readProgress}><span style={{width:readProgress+'%'}}/></div>
    </header>

    <div className="shell">
      <aside className={'sidebar '+(drawer?'drawer-open':'')}>
        <div className="sidebar-head"><span className="overline">YOUR LIBRARY</span><button className="mobile-close icon-btn" onClick={()=>setDrawer(false)} aria-label="Close menu"><Glyph name="close"/></button></div>
        <div className="course-title">AI Income<br/>Challenge<span>.</span></div>
        <p className="sidebar-desc">Five days of learning.<br/>One clear path forward.</p>
        <div className="side-rule"/>
        <div className="side-group-label">THE CURRICULUM <span>05 DAYS</span></div>
        <nav className="day-nav" aria-label="Study days">
          {days.map(d=><button key={d.number} className={'day-link '+(day===d.number?'selected':'')} onClick={()=>navigate(d.number)} aria-current={day===d.number?'page':undefined}>
            <span className="day-number">{String(d.number).padStart(2,'0')}</span><span className="day-text"><strong>{d.label}</strong><small>{d.number===1?'7 essential chapters':d.number===2?'VIP + main session':d.subtitle}</small></span>{d.number<=2?<span className="ready-mark"><Glyph name="check" size={13}/></span>:<Glyph name="chevron" size={16}/>}
          </button>)}
        </nav>
        <div className="sidebar-bottom"><div className="side-progress-head"><span>YOUR FIRST WEEK</span><strong>{progress}%</strong></div><div className="progress-bar"><span style={{width:progress+'%'}}/></div><p>Progress is saved on this device.</p><button className="export-btn" onClick={exportNotes}><Glyph name="save" size={15}/> Export my notes</button></div>
      </aside>
      {drawer&&<button className="drawer-scrim" onClick={()=>setDrawer(false)} aria-label="Close day menu"/>}

      <main className="main" id="main-content">
        <div className="main-inner">
          <div className="breadcrumb"><span>THE STUDY COLLECTION</span><Glyph name="chevron" size={13}/><strong>DAY {String(day).padStart(2,'0')}</strong></div>
          <div className="dashboard-bento"><section className="hero glass">
            <div className="hero-wash" aria-hidden="true"/><div className="hero-type"><span className="hero-eyebrow"><span/> {day===1?'DAY ONE / THE FOUNDATION':day===2?'DAY TWO / PRODUCT STRATEGY':'YOUR LEARNING LIBRARY'}</span>
            <h2>Less noise.<br/><em>More signal.</em></h2><p>Complex ideas, distilled into meaningful steps. Study at your own pace.</p>
            <div className="hero-footer"><span className="hero-chip"><Glyph name="book" size={15}/> {day<=2?'7 focused lessons':'5 days in your library'}</span><span className="hero-chip"><Glyph name="spark" size={15}/> Made for clarity</span></div></div>
            <div className="hero-art" aria-hidden="true"><div className="hero-ring h1"/><div className="hero-ring h2"/><div className="hero-ring h3"/><span className="hero-art-center">S<span>.</span></span></div>
          </section>
            <aside className="bento-stack" aria-label="Study dashboard">
              <button className="bento-mini glass" onClick={()=>navigate(1,'roadmap')}>
                <span className="overline">YOUR FIRST WEEK</span>
                <div className="bento-mini-number">{progress}<small>%</small></div>
                <span className="bento-mini-label">Actions completed</span>
                <span className="bento-progress-track"><span style={{width:progress+'%'}}/></span>
                <span className="bento-mini-link">View your plan <Glyph name="arrow" size={15}/></span>
              </button>
              <button className="bento-mini bento-path glass" onClick={()=>navigate(1,'system')}>
                <span className="overline">THE ESSENTIAL FRAMEWORK</span>
                <div className="bento-path-dots"><span>01</span><i/><span>02</span><i/><span>03</span></div>
                <strong>Develop. Distribute.<br/>Deliver.</strong>
                <span className="bento-mini-link">Explore the 3D system <Glyph name="arrow" size={15}/></span>
              </button>
            </aside>
          </div>

          {day===2?<DayTwo notes={notes} setNotes={setNotes}/>:day===1?<div className="day-one">
            <div className="section-intro"><div><div className="overline">DAY 01 / THE FOUNDATION</div><h2>Explore the essentials<span>.</span></h2><p>One concept at a time. Pick up wherever you left off.</p></div><div className="lesson-total"><span>{String(chapterIndex+1).padStart(2,'0')}</span> / {String(chapters.length).padStart(2,'0')}</div></div>
            <div className="chapter-tabs" role="tablist" aria-label="Day 1 chapters" onKeyDown={e=>{
              if(e.key!=='ArrowLeft'&&e.key!=='ArrowRight')return;
              e.preventDefault();
              const i=(chapterIndex+(e.key==='ArrowRight'?1:-1)+chapters.length)%chapters.length;
              navigate(1,chapters[i].id);
              requestAnimationFrame(()=>document.querySelectorAll('.chapter-tabs [role="tab"]')[i]?.focus());
            }}>{chapters.map(c=><button role="tab" aria-selected={c.id===chapterId} className={'chapter-tab '+(c.id===chapterId?'chosen':'')} key={c.id} onClick={()=>navigate(1,c.id)}><span>{c.number}</span>{c.category.toLowerCase()}</button>)}</div>
            <article className="lesson-card glass enter" key={chapter.id} id="chapter-stage">
              <div className="lesson-top"><div className="eyebrow"><span className="eyebrow-dot"/> {chapter.category} <span className="eyebrow-separator">/</span> CHAPTER {chapter.number}</div><span className="lesson-duration"><Glyph name="clock" size={14}/> {chapter.duration} read</span></div>
              <h1>{chapter.title}</h1><p className="lesson-subtitle">{chapter.subtitle}</p>
              <div className="insight"><div className="insight-symbol"><Glyph name="spark" size={20}/></div><div><span className="overline">THE ONE THING TO REMEMBER</span><p>{chapter.insight}</p></div></div>
              <div className="visual-label"><span>VISUAL EXPLANATION</span><span className="visual-dash"/></div>
              <MiniArt kind={chapter.visual}/>
              <div className="concepts">{chapter.points.map((p,i)=><div className="concept" key={p.title}><span className="concept-num">{String(i+1).padStart(2,'0')}</span><div><h3>{p.title}</h3><p>{p.body}</p></div></div>)}</div>
              {chapter.id==='products'&&<RevenueExplorer/>}
              <div className="practice"><div className="practice-head"><span className="practice-icon"><Glyph name="edit" size={19}/></span><div><span className="overline">PUT IT INTO PRACTICE</span><h3>Make it yours.</h3></div></div><p>{chapter.action}</p><label htmlFor={'notes-'+chapter.id} className="notes-label">MY THOUGHTS</label><textarea id={'notes-'+chapter.id} placeholder="Capture your thinking here. Keep it simple." rows={3} value={notes[chapter.id]||''} onChange={e=>setNotes(prev=>({...prev,[chapter.id]:e.target.value}))}/><small className="autosave"><Glyph name="check" size={13}/> Notes are saved privately in this browser</small></div>
              {chapter.id==='roadmap'&&<div className="final-tools"><div className="tool-head"><span className="overline">YOUR FIRST WEEK</span><h3>Small steps. Real momentum.</h3></div><div className="week-checklist">{weekSteps.map((step,i)=><label key={step} className={'check-row '+(done.includes(i)?'is-done':'')}><input type="checkbox" checked={done.includes(i)} onChange={()=>toggleStep(i)}/><span className="custom-check"><Glyph name="check" size={13}/></span>{step}</label>)}</div><div className="quiz-head"><div><span className="overline">ACTIVE RECALL</span><h3>Test what stayed with you.</h3></div><span>{cardIndex+1} / {recall.length}</span></div><button className={'flashcard '+(flipped?'flipped':'')} onClick={()=>setFlipped(!flipped)}><span className="overline">{flipped?'ANSWER':'QUESTION'} / TAP TO FLIP</span><strong>{flipped?recall[cardIndex].a:recall[cardIndex].q}</strong><span className="flash-hint"><Glyph name="refresh" size={15}/> {flipped?'Back to question':'Reveal the answer'}</span></button><div className="flash-controls"><button onClick={()=>{setCardIndex((cardIndex-1+recall.length)%recall.length);setFlipped(false)}} aria-label="Previous question"><Glyph name="back"/></button><button onClick={()=>{setCardIndex((cardIndex+1)%recall.length);setFlipped(false)}}>Next question <Glyph name="arrow"/></button></div></div>}
              <div className="lesson-footer"><span className="lesson-question"><Glyph name="info" size={15}/> THINK ABOUT IT: {chapter.question}</span><div className="lesson-arrows"><button disabled={chapterIndex===0} onClick={()=>navigate(1,chapters[chapterIndex-1].id)} aria-label="Previous chapter"><Glyph name="back" size={17}/></button><button onClick={()=>chapterIndex===chapters.length-1?navigate(2):navigate(1,chapters[chapterIndex+1].id)}>{chapterIndex===chapters.length-1?'Day 2':'Next chapter'} <Glyph name="arrow" size={17}/></button></div></div>
            </article>
          </div>:<Placeholder day={currentDay} goHome={()=>navigate(1)}/>}
          <footer className="site-footer"><div>STUDY STUDIO <span>© 2026</span></div><p>Learn deliberately. Build responsibly.</p><a href="https://github.com/JayMackay/ai-income-study-guide" target="_blank" rel="noreferrer">View source <Glyph name="arrow" size={14}/></a></footer>
        </div>
      </main>
    </div>
  </div>;
}