import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Globe2, Info, MapPin, Maximize, Minimize, RotateCw } from 'lucide-react';
import { HERITAGE_LANDMARKS } from '../data/landmarksData';
import { FEATURED_IDS, TOUR_SOURCES } from '../data/tourSources';
import { PhotoSphere } from './PhotoSphere';

interface VirtualTour360Props { initialSceneId?: string; onClose?: () => void; onLocateOnMap?: (stateId: string) => void; }
const resolveId = (id?: string) => HERITAGE_LANDMARKS.find(l => l.id === id || l.panoramicSceneId === id)?.id ?? 'taj-mahal';

export function VirtualTour360({ initialSceneId, onClose, onLocateOnMap }: VirtualTour360Props) {
  const [selectedId, setSelectedId] = useState(() => resolveId(initialSceneId));
  const [consent, setConsent] = useState(false);
  const [retry, setRetry] = useState(0);
  const [waiting, setWaiting] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [message, setMessage] = useState('');
  const viewport = useRef<HTMLDivElement>(null);
  useEffect(() => { setSelectedId(resolveId(initialSceneId)); }, [initialSceneId]);
  useEffect(() => { setConsent(false); setWaiting(false); setMessage(''); }, [selectedId]);
  useEffect(() => {
    if (!consent) return;
    const timer = window.setTimeout(() => setWaiting(true), 14000);
    return () => clearTimeout(timer);
  }, [consent, selectedId, retry]);
  useEffect(() => {
    const change = () => setFullscreen(document.fullscreenElement === viewport.current);
    document.addEventListener('fullscreenchange', change);
    return () => document.removeEventListener('fullscreenchange', change);
  }, []);
  const landmark = HERITAGE_LANDMARKS.find(l => l.id === selectedId)!;
  const source = TOUR_SOURCES[selectedId];
  const ordered = [...HERITAGE_LANDMARKS].sort((a,b) => (FEATURED_IDS.indexOf(a.id) < 0 ? 99 : FEATURED_IDS.indexOf(a.id)) - (FEATURED_IDS.indexOf(b.id) < 0 ? 99 : FEATURED_IDS.indexOf(b.id)));
  const toggleFullscreen = async () => {
    try { if (document.fullscreenElement) await document.exitFullscreen(); else await viewport.current?.requestFullscreen(); }
    catch { setMessage('Fullscreen is unavailable in this browser. You can open the provider’s tour in a new tab.'); }
  };
  return <section className="tour-page">
    <div className="tour-heading">
      <button className="text-button" onClick={onClose}><ArrowLeft size={17}/> Back to India</button>
      <span className="eyebrow"><Globe2 size={14}/> PHOTOGRAPHIC JOURNEYS</span>
    </div>
    <div className="tour-layout">
      <aside className="tour-sidebar">
        <span className="eyebrow">CHOOSE YOUR DESTINATION</span>
        <h1>Be there.<br/><em>From anywhere.</em></h1>
        <div className="tour-destinations" aria-label="Monument tours">
          {ordered.map((item) => <button key={item.id} className={`destination ${selectedId === item.id ? 'selected' : ''}`} aria-pressed={selectedId === item.id} onClick={() => setSelectedId(item.id)}>
            <span className="destination-dot"/><span><strong>{item.name}</strong><small>{item.stateName} · {TOUR_SOURCES[item.id]?.kind === 'external' ? 'External 360°' : TOUR_SOURCES[item.id] ? '360° tour' : 'Heritage details'}</small></span>
            <ArrowUpRight size={16}/>
          </button>)}
        </div>
        <p className="tour-sidebar-note">Real places. Real photography.<br/>These are recorded panoramas, not live webcams or walk-through 3D scans.</p>
      </aside>
      <div className="tour-main">
        <div className="tour-title-row"><div><span className="eyebrow">{landmark.stateName}</span><h2>{landmark.name}</h2><p>{landmark.hindiName}</p></div><button className="icon-button" aria-label="Locate state on map" onClick={() => onLocateOnMap?.(landmark.stateId)}><MapPin size={19}/></button></div>
        <div className="tour-viewport" ref={viewport}>
          {source?.kind === 'embed' && consent ? <iframe key={`${selectedId}-${retry}`} title={`${landmark.name} photographic 360 degree tour by ${source.provider}`} src={source.url} allow="fullscreen; accelerometer; gyroscope" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
          : source?.kind === 'panorama' ? <PhotoSphere url={source.url} title={landmark.name}/>
          : <div className={`tour-gateway gateway-${selectedId}`}>
              <div className="gateway-orbit"><Globe2 size={48} strokeWidth={1}/><span>360°</span></div>
              <span className="eyebrow">{source ? (source.kind === 'external' ? 'CONTINUE WITH OUR PANORAMA SOURCE' : 'A WINDOW INTO INDIA') : 'MORE JOURNEYS TO COME'}</span>
              <h3>{source ? landmark.name : 'Photography not added yet'}</h3>
              <p>{source?.note ?? 'Explore this monument’s heritage below. A verified photographic panorama has not been configured for this destination.'}</p>
              {source?.kind === 'embed' && <><button className="primary-button" onClick={() => setConsent(true)}>Enter 360° tour <ArrowUpRight size={18}/></button><small>Loads {source.provider} content and connects to their servers. Their privacy policy applies.</small></>}
              {source?.kind === 'external' && <a className="primary-button" href={source.externalUrl} target="_blank" rel="noopener noreferrer">Open photographic 360° <ArrowUpRight size={18}/></a>}
          </div>}
          {(consent || source?.kind === 'panorama') && <div className="viewport-actions"><button onClick={toggleFullscreen} aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>{fullscreen ? <Minimize size={18}/> : <Maximize size={18}/>}</button>{source?.kind === 'embed' && <button aria-label="Reload external tour" onClick={() => { setRetry(v => v + 1); setWaiting(false); }}><RotateCw size={18}/></button>}</div>}
        </div>
        {source && <div className="tour-source-note"><Info size={16}/><div><p>{source.note}</p><small>{source.credit}</small></div><a href={source.externalUrl} target="_blank" rel="noopener noreferrer">Open source <ArrowUpRight size={14}/></a></div>}
        {waiting && <p className="tour-alert" role="status">If the viewer is blank, blocked, or taking too long, use “Open source” above. Third-party availability cannot be detected reliably from this page.</p>}
        {message && <p role="status" className="tour-alert">{message}</p>}
        <div className="monument-story"><div><span className="eyebrow">THE STORY BEHIND THE STONE</span><p>{landmark.description}</p></div><dl><div><dt>Period</dt><dd>{landmark.yearBuilt}</dd></div><div><dt>Architecture</dt><dd>{landmark.architecturalStyle}</dd></div></dl></div>
      </div>
    </div>
  </section>;
}
