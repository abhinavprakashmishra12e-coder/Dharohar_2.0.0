import { lazy, Suspense, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeritageHome } from './components/HeritageHome';
const StateDetailModal = lazy(() => import('./components/StateDetailModal').then(m => ({ default: m.StateDetailModal })));
import type { StateHeritage, Landmark } from './types/heritage';
import './heritage.css';
import './heritage-trail.css';
const VirtualTour360 = lazy(() => import('./components/VirtualTour360').then(m => ({ default: m.VirtualTour360 })));
const GeoTracker = lazy(() => import('./components/GeoTracker').then(m => ({ default: m.GeoTracker })));
const MuseumGallery = lazy(() => import('./components/MuseumGallery').then(m => ({ default: m.MuseumGallery })));
const HeritageTrail = lazy(() => import('./components/HeritageTrail').then(m => ({ default: m.HeritageTrail })));
const HeritageAgent = lazy(() => import('./components/HeritageAgent').then(m => ({ default: m.HeritageAgent })));

export default function App() {
  const [activeView, setActiveView] = useState<'map' | 'tour' | 'radar' | 'museum' | 'trail' | 'agent'>('map');
  const [activeTourSceneId, setActiveTourSceneId] = useState('taj-mahal-360');
  const [selectedStateForModal, setSelectedStateForModal] = useState<StateHeritage | null>(null);
  const launch = (landmark: Landmark) => { setActiveTourSceneId(landmark.panoramicSceneId ?? landmark.id); setSelectedStateForModal(null); setActiveView('tour'); window.scrollTo({ top: 0, behavior: 'instant' }); };
  const state = async (id: string) => { const { INDIAN_STATES } = await import('./data/indiaHeritageData'); const found = INDIAN_STATES.find(s => s.id === id); if (found) setSelectedStateForModal(found); };
  const navigate = (view: typeof activeView) => { setSelectedStateForModal(null); setActiveView(view); window.scrollTo({ top: 0, behavior: 'instant' }); };
  return <div className="dharohar-app">
    <a href="#main-content" className="skip-link">Skip to content</a>
    <Navbar activeView={activeView} setActiveView={navigate} onSelectState={state} onSelectLandmark={launch}/>
    <main id="main-content">
      <Suspense fallback={<div className="page-loading" role="status">Opening your next discovery…</div>}>
        {activeView === 'map' && <HeritageHome onSelectState={setSelectedStateForModal} onLaunchLandmark360={launch} onOpenRadar={() => navigate('radar')}/>} 
        {activeView === 'tour' && <VirtualTour360 key={activeTourSceneId} initialSceneId={activeTourSceneId} onClose={() => navigate('map')} onLocateOnMap={id => { navigate('map'); state(id); }}/>} 
        {activeView === 'radar' && <GeoTracker onLaunchLandmark360={launch} onLocateOnMap={id => { navigate('map'); state(id); }}/>} 
        {activeView === 'museum' && <MuseumGallery onSelectState={id => { navigate('map'); state(id); }}/>} 
        {activeView === 'trail' && <HeritageTrail />}
        {activeView === 'agent' && <HeritageAgent />}
      </Suspense>
    </main>
    {selectedStateForModal && <Suspense fallback={<div className="page-loading" role="status">Opening heritage details…</div>}><StateDetailModal state={selectedStateForModal} onClose={() => setSelectedStateForModal(null)} onLaunchLandmark360={launch}/></Suspense>} 
  </div>;
}