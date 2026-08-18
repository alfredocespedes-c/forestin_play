
import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/global.css';

const ASSET_BASE = import.meta.env.BASE_URL;
const asset = (path) => `${ASSET_BASE}${path.replace(/^\//, '')}`;

const GAMES = [
  { id:'memorice', title:'Memorice', emoji:'🎴' },
  { id:'puzzle', title:'Puzzle del Bosque', emoji:'🧩' },
  { id:'laberinto', title:'Laberinto de Forestín', emoji:'🦫' },
  { id:'apaga', title:'¡Apaga el incendio!', emoji:'🔥' },
  { id:'rescate', title:'Rescata a los animales', emoji:'🐾' },
  { id:'cuida', title:'Cuida el bosque', emoji:'🌲' }
];

const BACKGROUNDS = [
  asset('/assets/backgrounds/01_fondo-norte-desierto.png'),
  asset('/assets/backgrounds/02_fondo-centro-norte-acantilado.png'),
  asset('/assets/backgrounds/03_fondo-zona-central.png'),
  asset('/assets/backgrounds/04_fondo-rapa-nui.png'),
  asset('/assets/backgrounds/05_fondo-cordillera-condor.png'),
  asset('/assets/backgrounds/06_fondo-bosque-cascadas.png'),
  asset('/assets/backgrounds/07_fondo-torres-del-paine.png'),
  asset('/assets/backgrounds/09_fondo-bosque-araucarias.png')
];

const CARD_POOL = [
  ['arbol',asset('/assets/memorice/01_carta-arbol.png')],
  ['ardilla',asset('/assets/memorice/02_carta-ardilla.png')],
  ['zorro',asset('/assets/memorice/03_carta-zorro.png')],
  ['pudu',asset('/assets/memorice/04_carta-pudu.png')],
  ['condor',asset('/assets/memorice/05_carta-condor.png')],
  ['buho',asset('/assets/memorice/06_carta-buho.png')],
  ['araucaria',asset('/assets/memorice/07_carta-araucaria.png')],
  ['hongos',asset('/assets/memorice/08_carta-hongos.png')],
  ['carpintero',asset('/assets/memorice/09_carta-carpintero.png')],
  ['coipo',asset('/assets/memorice/10_carta-coipo.png')],
  ['flores',asset('/assets/memorice/11_carta-flores-silvestres.png')],
  ['agua',asset('/assets/memorice/12_carta-agua-vertiente.png')],
  ['fuego-controlado',asset('/assets/memorice/13_carta-fuego-controlado.png')],
  ['prevencion',asset('/assets/memorice/14_carta-prevencion.png')],
  ['huellas',asset('/assets/memorice/15_carta-huellas-fauna.png')]
];

const LEVELS = {
  facil: { label:'Fácil', pairs:6, seconds:90 },
  medio: { label:'Medio', pairs:8, seconds:75 },
  dificil: { label:'Difícil', pairs:10, seconds:60 }
};

const TIPS = [
  'Si ves humo o fuego en el bosque, recuerda llamar al 130.',
  'No prendas fuego en nuestros bosques.',
  'Llévate toda tu basura luego de visitar una zona natural.',
  'El bosque es de todos, cuidémoslo.',
  'Evita cualquier fuente de calor cerca de vegetación seca.',
  'Respeta senderos y zonas habilitadas.',
  'Un pequeño descuido puede provocar un gran incendio.'
];

function shuffle(arr){ return [...arr].sort(()=>Math.random()-.5); }
function fmt(t){ return `${String(Math.floor(t/60)).padStart(2,'0')}:${String(t%60).padStart(2,'0')}`; }

function Home({openGame}){
  const background = useMemo(
    () => BACKGROUNDS[Math.floor(Math.random()*BACKGROUNDS.length)],
    []
  );
  const homeTip = useMemo(
    () => TIPS[Math.floor(Math.random()*TIPS.length)],
    []
  );

  return (
    <main
      className="home-mobile-v31"
      style={{backgroundImage:`linear-gradient(rgba(10,24,13,.06),rgba(10,24,13,.34)),url("${background}")`}}
    >
      <div className="home-mobile-shade">
        <header className="home-title-wrap">
          <div className="home-title-plank">
            <span>Las aventuras de</span>
            <strong>Forestín</strong>
          </div>
        </header>

        <section className="home-forestin-zone">
          <img
            className="home-forestin-img"
            src={asset('/assets/forestin/forestin-base.png')}
            alt="Forestín"
          />

          <div className="home-advice">
            <img src={asset('/assets/ui/cartel-consejo.png')} alt="" />
            <p>{homeTip}</p>
          </div>
        </section>

        <section className="home-games-zone" aria-label="Juegos disponibles">
          {GAMES.map((g,i)=>(
            <button
              key={g.id}
              className="home-wood-card"
              onClick={()=>openGame(g.id)}
              aria-label={`Abrir ${g.title}`}
            >
              <span className="home-card-number">{String(i+1).padStart(2,'0')}</span>
              <strong>{g.title}</strong>
              <small>Tocar para jugar</small>
            </button>
          ))}
        </section>

        <aside className="home-emergency">
          <span>130</span>
          <p>Si ves humo o fuego en el bosque, mantén distancia y da aviso.</p>
        </aside>
      </div>
    </main>
  );
}

function Memorice({goHome}){
  const [level,setLevel] = useState('facil');
  const [background,setBackground] = useState(BACKGROUNDS[0]);
  const [deck,setDeck] = useState([]);
  const [open,setOpen] = useState([]);
  const [matched,setMatched] = useState([]);
  const [moves,setMoves] = useState(0);
  const [time,setTime] = useState(LEVELS.facil.seconds);
  const [status,setStatus] = useState('playing');
  const [tip,setTip] = useState('Observa bien, recuerda la ubicación y encuentra todas las parejas.');
  const [forestin,setForestin] = useState(asset('/assets/forestin/forestin-base.png'));

  const config = LEVELS[level];

  function newGame(nextLevel=level){
    const cfg=LEVELS[nextLevel];
    const chosen=shuffle(CARD_POOL).slice(0,cfg.pairs);
    const cards=shuffle([...chosen,...chosen]).map(([id,img],i)=>({uid:`${id}-${i}-${Math.random()}`, id, img}));
    setDeck(cards);
    setOpen([]);
    setMatched([]);
    setMoves(0);
    setTime(cfg.seconds);
    setStatus('playing');
    setTip('Observa bien, recuerda la ubicación y encuentra todas las parejas.');
    setForestin(asset('/assets/forestin/forestin-base.png'));
    setBackground(BACKGROUNDS[Math.floor(Math.random()*BACKGROUNDS.length)]);
  }

  useEffect(()=>{ newGame(level); },[level]);

  useEffect(()=>{
    if(status!=='playing') return;
    if(time<=0){ setStatus('lost'); setForestin(asset('/assets/forestin/forestin-tiempo.png')); return; }
    const id=setTimeout(()=>setTime(t=>t-1),1000);
    return ()=>clearTimeout(id);
  },[time,status]);

  useEffect(()=>{
    if(deck.length && matched.length===deck.length){
      setStatus('won');
      setForestin(asset('/assets/forestin/forestin-feliz.png'));
      setTip('¡Muy bien! Encontraste todas las parejas y protegiste el bosque.');
    }
  },[matched,deck]);

  function choose(i){
    if(status!=='playing' || open.includes(i) || matched.includes(i) || open.length===2) return;
    const next=[...open,i];
    setOpen(next);
    if(next.length===2){
      setMoves(m=>m+1);
      const a=deck[next[0]], b=deck[next[1]];
      if(a.id===b.id){
        setTimeout(()=>{
          setMatched(m=>[...m,...next]);
          setOpen([]);
          setTip(TIPS[Math.floor(Math.random()*TIPS.length)]);
          setForestin(asset('/assets/forestin/forestin-consejo.png'));
          setTimeout(()=>setForestin(asset('/assets/forestin/forestin-base.png')),1800);
        },250);
      } else {
        setTimeout(()=>setOpen([]),700);
      }
    }
  }

  const progress = Math.min(100, Math.max(0, (1 - time/config.seconds)*100));
  const cols = config.pairs<=6 ? 3 : 4;

  return (
    <main className="memorice-page" style={{backgroundImage:`linear-gradient(rgba(10,25,13,.18),rgba(10,25,13,.38)),url("${background}")`}}>
      <div className="memorice-overlay">
        <header className="mem-top">
          <button className="image-button back" onClick={goHome} aria-label="Volver">
            <img src={asset('/assets/ui/boton-volver.png')}/>
          </button>
          <div className="mem-title">
            <div className="kicker light">FORESTÍN PLAY</div>
            <h1>Memorice</h1>
          </div>
        </header>

        <div className="difficulty">
          {Object.entries(LEVELS).map(([key,cfg])=>(
            <button key={key} className={level===key?'active':''} onClick={()=>setLevel(key)}>{cfg.label}</button>
          ))}
        </div>

        <section className="stats">
          <div className="stat-img">
            <img src={asset('/assets/ui/panel-tiempo.png')}/>
            <strong>{fmt(time)}</strong>
          </div>
          <div className="stat-img">
            <img src={asset('/assets/ui/panel-movimientos.png')}/>
            <strong>{moves}</strong>
          </div>
        </section>

        <section className="fire-line" aria-label="Tiempo restante">
          <span>🔥</span><div><i style={{width:`${progress}%`}}/></div><span>🌳</span>
        </section>

        <section className="memory-frame">
          <div className="memory-grid" style={{gridTemplateColumns:`repeat(${cols},1fr)`}}>
            {deck.map((card,i)=>{
              const visible=open.includes(i)||matched.includes(i);
              return (
                <button className={`mem-card ${visible?'visible':''} ${matched.includes(i)?'matched':''}`} key={card.uid} onClick={()=>choose(i)}>
                  <div className="mem-card-inner">
                    <img className="mem-back" src={asset('/assets/memorice/00_carta-memorice-reverso.png')}/>
                    <img className="mem-front" src={card.img}/>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        <section className="forestin-tip-row">
          <img className="forestin-char" src={forestin} />
          <div className="bubble-wrap">
            <img src={asset('/assets/ui/burbuja-izquierda.png')}/>
            <p>{tip}</p>
          </div>
        </section>

        {status!=='playing' && (
          <div className="result-modal">
            <div className="result-box">
              <div className="result-icon">{status==='won'?'🎉':'⏰'}</div>
              <h2>{status==='won'?'¡Encontraste todas las parejas!':'¡Se acabó el tiempo!'}</h2>
              <p>{status==='won'?`Lo lograste en ${moves} movimientos.`:'Inténtalo nuevamente antes de que el fuego llegue al árbol.'}</p>
              <button onClick={()=>newGame(level)}>JUGAR DE NUEVO</button>
              <button className="ghost" onClick={goHome}>VOLVER AL HOME</button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

function Placeholder({game,goHome}){
  return (
    <main className="placeholder-game">
      <button className="plain-back" onClick={goHome}>← Volver</button>
      <div className="placeholder-box">
        <div>{game.emoji}</div><h1>{game.title}</h1>
        <p>La lógica de este juego se mantiene disponible en la base. En V3 estamos integrando primero el nuevo sistema visual de Memorice.</p>
      </div>
    </main>
  );
}

function App(){
  const [game,setGame]=useState(null);
  if(!game) return <Home openGame={setGame}/>;
  if(game==='memorice') return <Memorice goHome={()=>setGame(null)}/>;
  return <Placeholder game={GAMES.find(g=>g.id===game)} goHome={()=>setGame(null)}/>;
}

createRoot(document.getElementById('root')).render(<App/>);
