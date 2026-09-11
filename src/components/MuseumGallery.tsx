import React, { useState, useRef } from 'react';
import { MUSEUM_ARTIFACTS } from '../data/artifactsData';
import { MuseumArtifact } from '../types/heritage';
import { 
  Sparkles, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Layers, 
  Volume2, 
  VolumeX, 
  Check, 
  Info,
  Calendar,
  Compass,
  Landmark as LandmarkIcon,
  ChevronRight
} from 'lucide-react';
import { soundEngine } from '../utils/audioSynthesizer';

interface MuseumGalleryProps {
  onSelectState?: (stateId: string) => void;
}

export const MuseumGallery: React.FC<MuseumGalleryProps> = ({ onSelectState }) => {
  const [selectedArtifactId, setSelectedArtifactId] = useState<string>(MUSEUM_ARTIFACTS[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [activeCalloutIdx, setActiveCalloutIdx] = useState<number>(0);

  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);

  const artifact = MUSEUM_ARTIFACTS.find((a) => a.id === selectedArtifactId) || MUSEUM_ARTIFACTS[0];

  const categories = ['All', 'Sculpture', 'Metalwork', 'Jewelry', 'Manuscript & Painting'];

  const filteredArtifacts = selectedCategory === 'All'
    ? MUSEUM_ARTIFACTS
    : MUSEUM_ARTIFACTS.filter((a) => a.category === selectedCategory);

  // Turntable drag rotation
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastXRef.current = e.clientX;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - lastXRef.current;
    setRotationAngle((prev) => (prev + deltaX * 0.8) % 360);
    lastXRef.current = e.clientX;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  // Play audio commentary
  const toggleAudioGuide = () => {
    if (isAudioPlaying) {
      soundEngine.stop();
      setIsAudioPlaying(false);
    } else {
      soundEngine.playPreset('sitar_raga');
      setIsAudioPlaying(true);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(
          `${artifact.name}. Originating from ${artifact.originLocation}, dated to ${artifact.circa}. ${artifact.description}`
        );
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        utterance.onend = () => setIsAudioPlaying(false);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ================= HEADER & CATEGORY BAR ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sky-200/80 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Virtual Curated Treasury
              </span>
              <span className="text-xs text-slate-600 hidden sm:inline font-medium">
                Ultra-high-resolution 3D artifact inspection & ancient provenance
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-cinzel tracking-wide mt-1">
              NATIONAL HERITAGE ARTIFACT GALLERY
            </h1>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center bg-white/80 p-1 rounded-xl border border-sky-200 backdrop-blur-md overflow-x-auto max-w-full shadow-sm">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-sky-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ================= MAIN TURNTABLE STAGE & CURATOR BREAKDOWN ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* 3D TURNTABLE INSPECTION STAGE (Col 1-7) */}
          <div className="lg:col-span-7 glass-panel-gold rounded-3xl p-6 flex flex-col items-center justify-between relative overflow-hidden min-h-[540px] bg-white/85 border border-sky-200 shadow-xl">
            
            {/* Top Stage Controls */}
            <div className="w-full flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-amber-500/15 text-amber-800 border border-amber-500/30">
                  {artifact.dynasty}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  {artifact.circa}
                </span>
              </div>

              {/* Audio guide & Zoom controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleAudioGuide}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
                    isAudioPlaying
                      ? 'bg-amber-500 text-slate-950 border-amber-400 animate-pulse'
                      : 'bg-white text-amber-800 border-sky-200 hover:border-amber-400'
                  }`}
                >
                  {isAudioPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  <span>{isAudioPlaying ? 'Stop Audio' : 'Audio Guide'}</span>
                </button>

                <div className="flex items-center bg-white rounded-xl border border-sky-200 p-0.5 text-xs shadow-sm">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
                    className="p-1.5 text-slate-600 hover:text-slate-900"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-1 text-[11px] font-mono text-amber-700 font-semibold">{Math.round(zoomLevel * 100)}%</span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(2.0, z + 0.2))}
                    className="p-1.5 text-slate-600 hover:text-slate-900"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Turntable Pedestal with Specular Lighting & Image */}
            <div 
              className="relative my-auto w-full max-w-[420px] aspect-square flex items-center justify-center cursor-ew-resize select-none"
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
            >
              {/* Radial Pedestal Spotlight */}
              <div className="absolute inset-0 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent rounded-full blur-2xl pointer-events-none" />

              {/* Pedestal Base Ring */}
              <div className="absolute bottom-6 w-3/4 h-12 bg-slate-300/60 border border-sky-200 rounded-full blur-[1px] transform scale-y-50 shadow-[0_15px_30px_rgba(0,0,0,0.1)]" />

              {/* Artifact Display with 3D Y-Axis Turntable Rotation */}
              <div 
                className="relative transition-transform duration-75 ease-out rounded-2xl overflow-hidden shadow-xl border border-sky-200 max-h-[340px] max-w-[340px] bg-slate-950"
                style={{
                  transform: `scale(${zoomLevel}) perspective(900px) rotateY(${rotationAngle}deg)`,
                  boxShadow: `0 20px 40px -10px rgba(14, 116, 144, 0.2)`,
                }}
              >
                <img
                  src={artifact.imageUrl}
                  alt={artifact.name}
                  className="w-full h-full object-cover pointer-events-none"
                  referrerPolicy="no-referrer"
                />

                {/* Shimmering Gold Specular Highlight simulating rotating museum light */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
                  style={{
                    background: `linear-gradient(${rotationAngle * 2}deg, rgba(251, 191, 36, 0.7) 0%, transparent 60%)`,
                  }}
                />
              </div>
            </div>

            {/* Bottom Turntable Helper Tag */}
            <div className="w-full flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-200 z-10">
              <div className="flex items-center gap-1.5 text-amber-700 font-medium">
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Drag left or right to inspect artifact around 360°</span>
              </div>
              <span className="font-mono text-slate-500">Angle: {Math.round(rotationAngle)}°</span>
            </div>
          </div>

          {/* CURATOR'S DOSSIER & PROVENANCE (Col 8-12) */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 space-y-5 bg-white/85 border border-sky-200/80 shadow-xl text-slate-800">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-300">
                {artifact.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-cinzel tracking-wide mt-2">
                {artifact.name}
              </h2>
              <p className="text-amber-700 text-sm font-medium">
                {artifact.hindiName}
              </p>
            </div>

            {/* Curator Description */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {artifact.description}
            </p>

            {/* Cultural Significance Highlight */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
              <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                Global & Cultural Significance
              </div>
              <p className="text-xs text-slate-700 leading-relaxed">
                {artifact.culturalSignificance}
              </p>
            </div>

            {/* Technical Specifications Grid */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-white border border-sky-200 shadow-sm">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Material / Medium</div>
                <div className="text-xs font-bold text-slate-900 mt-0.5">{artifact.material}</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-sky-200 shadow-sm">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Dimensions</div>
                <div className="text-xs font-bold text-slate-900 mt-0.5">{artifact.dimensions}</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-sky-200 shadow-sm">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Origin Site</div>
                <div className="text-xs font-bold text-slate-900 mt-0.5">{artifact.originLocation}</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-sky-200 shadow-sm">
                <div className="text-[10px] text-slate-500 uppercase font-semibold">Current Custodian</div>
                <div className="text-xs font-bold text-slate-900 mt-0.5">{artifact.currentLocation}</div>
              </div>
            </div>

            {/* Iconography & Visual Callout Tabs */}
            <div className="pt-2">
              <div className="text-[11px] font-bold text-amber-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                Key Iconographic Features
              </div>
              <div className="space-y-2">
                {artifact.visualDetails.map((detail, idx) => (
                  <div
                    key={idx}
                    onClick={() => setActiveCalloutIdx(idx)}
                    className={`p-2.5 rounded-xl border transition-all cursor-pointer ${
                      activeCalloutIdx === idx
                        ? 'bg-amber-50 border-amber-400 shadow-sm'
                        : 'bg-white border-sky-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      <span>{detail.title}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                      {detail.explanation}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* ================= ARTIFACTS CAROUSEL BROWSER ================= */}
        <div className="glass-panel rounded-3xl p-6 bg-white/85 border border-sky-200/80 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-cinzel">
                GALLERY ARTIFACT CATALOG
              </h3>
              <p className="text-xs text-slate-500">
                Select an artifact to examine in the 3D inspection turntable
              </p>
            </div>
            <span className="text-xs text-amber-700 font-mono font-semibold">
              {filteredArtifacts.length} Exhibits Available
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {filteredArtifacts.map((item) => {
              const isSelected = item.id === artifact.id;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedArtifactId(item.id);
                    setRotationAngle(0);
                    setActiveCalloutIdx(0);
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer group flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-50 border-amber-500 shadow-md shadow-amber-500/20 scale-[1.03]'
                      : 'bg-white/90 border-sky-200 hover:border-amber-400 hover:bg-white'
                  }`}
                >
                  <div className="w-full aspect-square rounded-xl overflow-hidden mb-2 bg-slate-950 border border-slate-200 shadow-inner">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] text-amber-700 font-mono font-semibold">{item.circa.split('(')[0]}</div>
                    <div className="text-xs font-bold text-slate-900 line-clamp-2 mt-0.5 group-hover:text-amber-700 transition-colors">
                      {item.name}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
