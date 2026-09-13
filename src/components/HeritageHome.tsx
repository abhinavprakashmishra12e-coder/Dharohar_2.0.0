import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Compass, Layers, Play, RotateCcw, SkipForward, Sparkles } from 'lucide-react';
import { INDIAN_STATES } from '../data/indiaHeritageData';
import { HERITAGE_LANDMARKS } from '../data/landmarksData';
import { FEATURED_IDS } from '../data/tourSources';
import type { Landmark, StateHeritage } from '../types/heritage';
const HeritageDiorama = lazy(() => import('./HeritageDiorama').then(m => ({ default: m.HeritageDiorama })));
const IndiaReliefMap = lazy(() => import('./IndiaReliefMap').then(m => ({ default: m.IndiaReliefMap })));
let openingSeen = false;

export function HeritageHome({ onSelectState, onLaunchLandmark360, onOpenRadar }: { onSelectState: (s: StateHeritage) => void; onLaunchLandmark360: (l: Landmark) => void; onOpenRadar: () => void }) {
  const [classic, setClassic] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [replayKey, setReplayKey] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [intro, setIntro] = useState(!openingSeen && !reducedMotion);
  const [skip, setSkip] = useState(openingSeen || reducedMotion);
  const destinations = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReducedMotion(media.matches);
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  const finish = () => { openingSeen = true; setIntro(false); };
  const replay = () => { setClassic(false); setSkip(false); setIntro(!reducedMotion); setReplayKey(n => n + 1); };
  const launch = (id: string) => { const item = HERITAGE_LANDMARKS.find(l => l.id === id); if (item) onLaunchLandmark360(item); };
  const selectState = (id: string) => { const state = INDIAN_STATES.find(s => s.id === id); if (state) onSelectState(state); };

  return <div className="heritage-home">
    <section className={`heritage-hero ${intro ? 'intro-playing' : ''}`}>
      <div className="hero-ambient hero-ambient-one"/><div className="hero-ambient hero-ambient-two"/>
      <div className="hero-copy">
        <span className="eyebrow"><span className="live-dot"/> AN INVITATION TO EXPLORE</span>
        <p className="hero-devanagari">अतुल्य भारत</p>
        <h1>A thousand stories.<br/>One <em>extraordinary</em><br/>land.</h1>
        <p className="hero-description">Across marble courtyards and golden sanctuaries, discover the places that hold India’s stories.</p>
        <button className="primary-button" onClick={() => destinations.current?.scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' })}>Begin exploring <ArrowRight size={18}/></button>
        <button className="hero-secondary" onClick={() => launch('taj-mahal')}><Play size={13} fill="currentColor"/> Step inside a 360° tour</button>
        <div className="hero-facts"><div><strong>01</strong><span>Extraordinary country</span></div><i/><div><strong>∞</strong><span>Stories to discover</span></div></div>
      </div>
      <div className="hero-map-column">
        <div className="map-eyebrow"><span><Sparkles size={14}/> THE LIVING ATLAS</span><span>EXPLORE IN 3D</span></div>
        <div className="diorama-stage">
          {unavailable ? <div className="map-fallback"><Compass size={46} strokeWidth={1}/><h2>Your journey still begins here.</h2><p>This device could not load the 3D map. The state explorer and monument tours are still available.</p><button className="primary-button" onClick={() => setClassic(true)}>Open state explorer <ArrowRight size={16}/></button></div> : <Suspense fallback={<div className="map-loading" role="status"><Compass size={32}/><span>Preparing your journey…</span></div>}><HeritageDiorama replayKey={replayKey} skipIntro={skip} reducedMotion={reducedMotion} onIntroEnd={finish} onSelectLandmark={launch} onSelectState={selectState} onUnavailable={() => { setUnavailable(true); finish(); }}/></Suspense>}
          <div className="map-top-actions">{intro ? <button onClick={() => { setSkip(true); finish(); }}><SkipForward size={14}/> Skip opening</button> : <button onClick={replay}><RotateCcw size={14}/> Replay opening</button>}</div>
          {intro && <div className="intro-caption" role="status"><span>WELCOME TO INDIA</span><p>A journey through living heritage</p><div className="intro-progress"/></div>}
          <span className="map-north" aria-hidden="true">N<br/>↑</span>
        </div>
        <div className="map-bottom"><span>Drag to orbit · Scroll to zoom · Select a landmark</span><button className="primary-button map-bottom-button" onClick={() => setClassic(v => !v)} aria-expanded={classic}><Layers size={14}/>{classic ? 'Hide state explorer' : 'State explorer'} <ArrowUpRight size={14}/></button></div>
        <p className="map-disclaimer">Illustrative diorama · Symbolic monument positions and terrain; not a survey or navigation map.</p>
      </div>
    </section>
    {classic && <section className="classic-explorer"><div className="section-heading"><span className="eyebrow">YOUR ORIGINAL STATE EXPLORER</span><button className="text-button" onClick={() => setClassic(false)}>Close explorer</button></div><Suspense fallback={<p>Loading state explorer…</p>}><IndiaReliefMap onSelectState={onSelectState} onLaunchLandmark360={onLaunchLandmark360} onOpenRadar={onOpenRadar}/></Suspense></section>}
    <section className="featured-section" ref={destinations} id="destinations">
      <div className="section-heading"><div><span className="eyebrow">FOUR ICONS. COUNTLESS PERSPECTIVES.</span><h2>Where will your curiosity take you?</h2></div><span className="section-number">EXPLORE <ArrowDown size={15}/></span></div>
      <div className="featured-grid">{FEATURED_IDS.map((id, index) => { const item = HERITAGE_LANDMARKS.find(l => l.id === id)!; const badgeLabel = id === 'golden-temple' ? 'EXTERNAL 360°' : id === 'taj-mahal' ? '360° TOUR' : id === 'meenakshi-temple' ? 'SOUTH INDIA' : id === 'konark-sun-temple' ? 'SUN TEMPLE' : id === 'hampi' ? 'RUINS & RITUALS' : id === 'mysore-palace' ? 'ROYAL PALACE' : 'HERITAGE DISCOVERY'; return <button key={id} className={`monument-card card-${id}`} onClick={() => launch(id)}>
        <div className="card-art" aria-hidden="true">{id !== 'amber-fort' && <img src={item.thumbnailUrl} alt="" loading="lazy" onError={e => { e.currentTarget.style.display = 'none'; }}/>}<span className="card-silhouette">{id === 'amber-fort' ? 'आमेर' : item.hindiName.split('(')[0]}</span><span className="card-index">0{index + 1}</span><span className="card-tour-badge">{badgeLabel}</span></div>
        <div className="card-info"><span className="eyebrow">{item.stateName}</span><h3>{id === 'golden-temple' ? 'Sri Harmandir Sahib' : item.name}</h3><span className="card-cta">{id === 'golden-temple' ? 'Discover the sacred' : 'Explore the monument'} <ArrowUpRight size={18}/></span></div>
      </button>; })}</div>
    </section>
    <footer className="heritage-footer"><span className="footer-brand">DHAROHAR <small>धरोहर</small></span><p>Preserving stories. Inspiring journeys.</p><span>MADE WITH CURIOSITY, IN INDIA.</span></footer>
  </div>;
}
