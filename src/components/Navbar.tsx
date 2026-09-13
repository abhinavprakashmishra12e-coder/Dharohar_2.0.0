import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Compass, Globe2, Landmark, Map, Search, X } from 'lucide-react';
import { INDIAN_STATES } from '../data/indiaHeritageData';
import { HERITAGE_LANDMARKS } from '../data/landmarksData';
type View = 'map' | 'tour' | 'radar' | 'museum' | 'trail';
interface NavbarProps { activeView: View; setActiveView: (view: View) => void; onSelectState: (id: string) => void; onSelectLandmark: (id: string) => void; }
const tabs = [{ id: 'map' as const, label: 'Discover', icon: Map }, { id: 'tour' as const, label: '360° journeys', icon: Globe2 }, { id: 'radar' as const, label: 'Near you', icon: Compass }, { id: 'museum' as const, label: 'The museum', icon: Landmark }, { id: 'trail' as const, label: 'Heritage Trails', icon: Compass }];
export function Navbar({ activeView, setActiveView, onSelectState, onSelectLandmark }: NavbarProps) {
  const [open, setOpen] = useState(false), [query, setQuery] = useState('');
  const toggle = useRef<HTMLButtonElement>(null);
  const q = query.trim().toLocaleLowerCase();
  const states = q ? INDIAN_STATES.filter(s => `${s.name} ${s.hindiName} ${s.capital}`.toLocaleLowerCase().includes(q)).slice(0, 8) : [];
  const monuments = q ? HERITAGE_LANDMARKS.filter(l => `${l.name} ${l.hindiName} ${l.stateName}`.toLocaleLowerCase().includes(q)) : [];
  const close = () => { setOpen(false); toggle.current?.focus(); };
  useEffect(() => { if (!open) return; const key = (event: KeyboardEvent) => { if (event.key === 'Escape') close(); }; document.addEventListener('keydown', key); return () => document.removeEventListener('keydown', key); }, [open]);
  return <header className="site-header">
    <div className="header-inner">
      <button className="brand" onClick={() => setActiveView('map')} aria-label="Dharohar home"><span className="brand-symbol">ध</span><span><strong>DHAROHAR</strong><small>THE SPIRIT OF INDIA</small></span></button>
      <nav className="main-nav" aria-label="Main navigation">{tabs.map(tab => <button id={`nav-tab-${tab.id}`} key={tab.id} className={activeView === tab.id ? 'active' : ''} aria-current={activeView === tab.id ? 'page' : undefined} onClick={() => setActiveView(tab.id)}><tab.icon size={16}/><span>{tab.label}</span></button>)}</nav>
      <button ref={toggle} id="search-toggle-btn" className="search-toggle" onClick={() => setOpen(v => !v)} aria-label="Search monuments and states" aria-expanded={open}><Search size={18}/><span>Search India</span></button>
    </div>
    {open && <div className="search-panel" role="search"><div className="search-input"><Search size={18}/><input autoFocus aria-label="Search monuments and states" placeholder="Try Taj Mahal, Amer, Punjab…" value={query} onChange={event => setQuery(event.target.value)}/><button className="icon-button" aria-label="Close search" onClick={close}><X size={18}/></button></div>
      <div className="search-results">{!q && <p>Search a monument, state, or capital to begin.</p>}{q && !monuments.length && !states.length && <p>No places found. Try a different spelling.</p>}{monuments.map(l => <button key={l.id} onClick={() => { onSelectLandmark(l.id); close(); }}><Landmark size={16}/><span><strong>{l.name}</strong><small>{l.stateName}</small></span><ArrowUpRight size={16}/></button>)}{states.map(s => <button key={s.id} onClick={() => { onSelectState(s.id); close(); }}><Map size={16}/><span><strong>{s.name}</strong><small>State heritage · {s.capital}</small></span><ArrowUpRight size={16}/></button>)}</div>
    </div>}
  </header>;
}
