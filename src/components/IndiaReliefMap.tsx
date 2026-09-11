import React, { useState, useRef } from 'react';
import { INDIAN_STATES } from '../data/indiaHeritageData';
import { HERITAGE_LANDMARKS } from '../data/landmarksData';
import { StateHeritage, Landmark } from '../types/heritage';
import { 
  Sparkles, 
  Compass, 
  Eye, 
  MapPin, 
  ChevronRight, 
  Layers, 
  Wind,
  Info,
  Waves,
  Mountain,
  Navigation
} from 'lucide-react';

interface IndiaReliefMapProps {
  onSelectState: (state: StateHeritage) => void;
  onLaunchLandmark360: (landmark: Landmark) => void;
  onOpenRadar: () => void;
}

export const IndiaReliefMap: React.FC<IndiaReliefMapProps> = ({
  onSelectState,
  onLaunchLandmark360,
  onOpenRadar,
}) => {
  const [hoveredStateId, setHoveredStateId] = useState<string | null>('uttar-pradesh');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [showLabels, setShowLabels] = useState(true);
  const [showRivers, setShowRivers] = useState(true);
  const [showLandmarks, setShowLandmarks] = useState(true);
  const [showPeaks, setShowPeaks] = useState(true);

  // Mouse tilt perspective tracking for genuine 3D parallax
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 14, rotateY: -3 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = 14 - (y / rect.height) * 12;
    const rotY = -3 + (x / rect.width) * 14;
    setTilt({ rotateX: rotX, rotateY: rotY });
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 14, rotateY: -3 });
  };

  const activeState = INDIAN_STATES.find((s) => s.id === hoveredStateId) || INDIAN_STATES[3]; // Default to UP

  const regions = ['All', 'North', 'South', 'West', 'East', 'Central', 'North-East'];

  const filteredStates = selectedRegion === 'All'
    ? INDIAN_STATES
    : INDIAN_STATES.filter((s) => s.region === selectedRegion);

  return (
    <div 
      className="relative w-full min-h-[calc(100vh-4rem)] flex flex-col items-center justify-start overflow-hidden select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={containerRef}
    >
      {/* ================= ATMOSPHERIC SKY & SUNLIGHT ================= */}
      {/* Warm Golden Sunlight Flare in Top-Left */}
      <div 
        className="absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full blur-3xl pointer-events-none opacity-80"
        style={{
          background: 'radial-gradient(circle, rgba(255, 250, 220, 0.95) 0%, rgba(254, 240, 138, 0.55) 45%, rgba(251, 191, 36, 0.2) 70%, transparent 90%)',
        }}
      />
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-200/25 rounded-full blur-2xl pointer-events-none" />

      {/* Floating Fluffy Clouds surrounding the island */}
      <div className="absolute top-14 left-8 w-80 h-32 bg-white/70 rounded-full blur-2xl animate-cloud-slow pointer-events-none" />
      <div className="absolute top-28 right-16 w-96 h-40 bg-white/60 rounded-full blur-2xl animate-cloud-fast pointer-events-none" />
      <div className="absolute bottom-16 left-1/4 w-[500px] h-44 bg-white/75 rounded-full blur-3xl pointer-events-none" />

      {/* ================= CONTROLS & HEADER HUD ================= */}
      <div className="w-full max-w-7xl px-4 sm:px-6 pt-4 pb-2 z-20 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-800 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Interactive 3D Subcontinent
            </span>
            <span className="text-xs text-slate-600 hidden sm:inline font-medium">
              Hover any state to trigger authentic 3D elevation bulge & cultural lore
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-wide mt-1 font-cinzel drop-shadow-sm">
            THE LIVING HERITAGE OF INDIA
          </h1>
        </div>

        {/* Region Filter Pills & Map Display Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Region Tabs */}
          <div className="flex items-center p-1 rounded-xl bg-white/80 backdrop-blur-md border border-sky-200/80 shadow-sm text-xs font-medium">
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  selectedRegion === region
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Layer toggles */}
          <div className="flex items-center gap-1 px-2 py-1 rounded-xl bg-white/80 backdrop-blur-md border border-sky-200/80 shadow-sm text-xs text-slate-600">
            <button
              onClick={() => setShowRivers(!showRivers)}
              className={`px-2 py-1 rounded-md transition-colors flex items-center gap-1 ${
                showRivers ? 'bg-sky-500/20 text-sky-700 font-semibold' : 'text-slate-500'
              }`}
              title="Toggle Sacred Rivers"
            >
              <Waves className="w-3 h-3" />
              Rivers
            </button>
            <button
              onClick={() => setShowLandmarks(!showLandmarks)}
              className={`px-2 py-1 rounded-md transition-colors flex items-center gap-1 ${
                showLandmarks ? 'bg-amber-500/20 text-amber-800 font-semibold' : 'text-slate-500'
              }`}
              title="Toggle 3D Monuments"
            >
              <Compass className="w-3 h-3" />
              Monuments
            </button>
            <button
              onClick={() => setShowLabels(!showLabels)}
              className={`px-2 py-1 rounded-md transition-colors ${
                showLabels ? 'bg-emerald-500/20 text-emerald-700 font-semibold' : 'text-slate-500'
              }`}
              title="Toggle State Names"
            >
              Labels
            </button>
          </div>
        </div>
      </div>

      {/* ================= MAIN 3D RELIEF ISLAND CANVAS & SIDE CARD ================= */}
      <div className="w-full max-w-7xl flex-1 px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center z-10 my-auto py-2">
        
        {/* LEFT / CENTER: THE 3D FLOATING ISLAND */}
        <div className="lg:col-span-8 flex flex-col items-center justify-center relative min-h-[580px] sm:min-h-[660px]">
          
          {/* Island Contact Shadow on Misty Clouds */}
          <div 
            className="absolute bottom-6 w-[520px] sm:w-[650px] h-[140px] bg-sky-900/20 rounded-full blur-2xl transform scale-y-50 pointer-events-none"
            style={{
              transform: `translate(${tilt.rotateY * -3}px, ${tilt.rotateX * 2}px) scaleY(0.4)`,
            }}
          />

          {/* 3D Perspective Stage */}
          <div 
            className="relative w-full max-w-[650px] aspect-[775/800] flex items-center justify-center transition-transform duration-300 ease-out"
            style={{
              transform: `perspective(1100px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
              transformStyle: 'preserve-3d',
            }}
          >
            {/* ================= 3D EXTRUDED CLIFF UNDER-LAYERS (Earth strata descending vertically downwards) ================= */}
            
            {/* 1. Deep Cliff Layer (Rock base with dark brown earth gradient) */}
            <svg 
              viewBox="0 0 775 800" 
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ transform: 'translateZ(-44px) translateY(26px)' }}
            >
              <defs>
                <linearGradient id="deepCliffGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#4a3625" />
                  <stop offset="45%" stopColor="#3d2a1b" />
                  <stop offset="85%" stopColor="#2c1e13" />
                  <stop offset="100%" stopColor="#1e150d" />
                </linearGradient>
              </defs>

              {/* Extrusion of all states combined */}
              <g fill="url(#deepCliffGrad)" stroke="#2a1d12" strokeWidth="2">
                {INDIAN_STATES.map((s) => (
                  <path key={`deep-${s.id}`} d={s.svgPath} />
                ))}
              </g>

              {/* Vertical Rock Striations */}
              <g stroke="#26190f" strokeWidth="2" opacity="0.65">
                <line x1="210" y1="520" x2="210" y2="550" />
                <line x1="250" y1="670" x2="250" y2="700" />
                <line x1="290" y1="740" x2="290" y2="770" />
                <line x1="330" y1="620" x2="330" y2="650" />
                <line x1="430" y1="460" x2="430" y2="490" />
                <line x1="520" y1="360" x2="520" y2="390" />
              </g>
            </svg>

            {/* 2. Middle Warm Earth Cliff Strata */}
            <svg 
              viewBox="0 0 775 800" 
              className="absolute inset-0 w-full h-full pointer-events-none"
              style={{ transform: 'translateZ(-22px) translateY(14px)' }}
            >
              <defs>
                <linearGradient id="midCliffGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#7a5c3e" />
                  <stop offset="50%" stopColor="#634830" />
                  <stop offset="100%" stopColor="#4a3522" />
                </linearGradient>
              </defs>

              <g fill="url(#midCliffGrad)" stroke="#8a6948" strokeWidth="1.5">
                {INDIAN_STATES.map((s) => (
                  <path key={`mid-${s.id}`} d={s.svgPath} />
                ))}
              </g>
            </svg>

            {/* ================= PRIMARY RELIEF MAP SURFACE ================= */}
            <svg 
              viewBox="0 0 775 800" 
              className="relative w-full h-full z-10 overflow-visible drop-shadow-2xl"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <defs>
                {/* 1. Snowy Mountain Crest Gradient */}
                <linearGradient id="snowPeakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#e2e8f0" />
                  <stop offset="70%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#94a3b8" />
                </linearGradient>

                {/* 2. Lush Emerald Green Plains & Plateau Gradient */}
                <linearGradient id="lushEmeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3ebd6c" />
                  <stop offset="45%" stopColor="#2c9a54" />
                  <stop offset="80%" stopColor="#1e7e40" />
                  <stop offset="100%" stopColor="#166534" />
                </linearGradient>

                {/* 3. Golden Desert Dunes Gradient (Thar / Rajasthan) */}
                <linearGradient id="desertDuneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fde047" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#ca8a04" />
                </linearGradient>

                {/* 4. Deccan Plateau Gradient */}
                <linearGradient id="deccanPlateauGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fb923c" />
                  <stop offset="50%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>

                {/* 5. Coastal Tropical Emerald */}
                <linearGradient id="tropicalCoastGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>

                {/* 6. Sacred River Gradient */}
                <linearGradient id="sacredRiverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#0284c7" />
                </linearGradient>

                {/* Active Hover Bulge Shadow Filter with Golden Radiant Glow */}
                <filter id="bulgeElevateShadow" x="-35%" y="-35%" width="170%" height="170%">
                  <feDropShadow dx="0" dy="16" stdDeviation="12" floodColor="#f59e0b" floodOpacity="0.5" />
                  <feDropShadow dx="0" dy="8" stdDeviation="6" floodColor="#0f172a" floodOpacity="0.3" />
                </filter>

                {/* Standard Elevation Shadow */}
                <filter id="stateElevationShadow" x="-15%" y="-15%" width="130%" height="130%">
                  <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#0f172a" floodOpacity="0.18" />
                </filter>
              </defs>

              {/* Subcontinental Base Island Top Grass Rim */}
              <g fill="#277a45" stroke="#4ade80" strokeWidth="2.5" opacity="0.9">
                {INDIAN_STATES.map((s) => (
                  <path key={`rim-${s.id}`} d={s.svgPath} />
                ))}
              </g>

              {/* ================= STATE POLYGONS (Interactive 3D Bulge on Mouse Hover) ================= */}
              <g id="states-layer">
                {filteredStates.map((state) => {
                  const isHovered = hoveredStateId === state.id;

                  // Determine fill color by terrain type matching authentic physical topography
                  let fillColor = state.colorTheme.base;
                  if (state.terrainType === 'snow_mountain') {
                    fillColor = 'url(#snowPeakGrad)';
                  } else if (state.terrainType === 'arid_desert') {
                    fillColor = 'url(#desertDuneGrad)';
                  } else if (state.terrainType === 'lush_plains') {
                    fillColor = 'url(#lushEmeraldGrad)';
                  } else if (state.terrainType === 'plateau') {
                    fillColor = 'url(#deccanPlateauGrad)';
                  } else if (state.terrainType === 'coastal_tropical') {
                    fillColor = 'url(#tropicalCoastGrad)';
                  }

                  return (
                    <g
                      key={state.id}
                      className="cursor-pointer transition-all duration-300 group"
                      onMouseEnter={() => setHoveredStateId(state.id)}
                      onClick={() => onSelectState(state)}
                      style={{
                        transformOrigin: `${state.center.x}px ${state.center.y}px`,
                        transform: isHovered
                          ? 'scale(1.08) translate(0px, -14px)'
                          : 'scale(1) translate(0px, 0px)',
                        transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.3s ease',
                      }}
                      filter={isHovered ? 'url(#bulgeElevateShadow)' : 'url(#stateElevationShadow)'}
                    >
                      {/* State 3D Extrusion Shadow Rim when bulging */}
                      {isHovered && (
                        <path
                          d={state.svgPath}
                          fill="#143e24"
                          opacity="0.65"
                          transform="translate(0, 14)"
                        />
                      )}

                      {/* State Surface Body */}
                      <path
                        id={`state-${state.id}`}
                        d={state.svgPath}
                        fill={isHovered ? '#fbbf24' : fillColor}
                        stroke={isHovered ? '#ffffff' : state.colorTheme.border}
                        strokeWidth={isHovered ? 3.5 : 1.5}
                        className="transition-colors duration-200"
                      />

                      {/* State Capital / Centroid Beacon */}
                      <circle
                        cx={state.center.x}
                        cy={state.center.y}
                        r={isHovered ? 5.5 : 2.5}
                        fill={isHovered ? '#ffffff' : '#fbbf24'}
                        stroke="#78350f"
                        strokeWidth={isHovered ? 2 : 0.8}
                        className="transition-all"
                      />

                      {/* State Label */}
                      {showLabels && state.name.length > 2 && (
                        <text
                          x={state.center.x}
                          y={state.center.y + (isHovered ? -12 : 12)}
                          textAnchor="middle"
                          fill={isHovered ? '#0f172a' : '#ffffff'}
                          fontSize={isHovered ? '12' : '9'}
                          fontWeight={isHovered ? '800' : '600'}
                          className="pointer-events-none select-none font-sans drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]"
                          style={{
                            letterSpacing: '0.02em',
                          }}
                        >
                          {state.name.split(',')[0].split('&')[0]}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>

              {/* ================= SNOWY HIMALAYAN MOUNTAIN PEAKS & RIDGES ================= */}
              {showPeaks && (
                <g id="himalayan-peaks" className="pointer-events-none select-none">
                  {/* Peak 1: Karakoram / K2 (Ladakh) */}
                  <polygon points="216,42 206,62 226,62" fill="#ffffff" />
                  <polygon points="216,42 226,62 232,58" fill="#cbe3f7" />
                  
                  {/* Peak 2: Nanga Parbat / J&K */}
                  <polygon points="175,70 165,88 185,88" fill="#ffffff" />
                  <polygon points="175,70 185,88 190,84" fill="#93c5fd" />

                  {/* Peak 3: Dhauladhar (Himachal) */}
                  <polygon points="238,118 228,136 248,136" fill="#ffffff" />
                  <polygon points="238,118 248,136 254,132" fill="#cbe3f7" />

                  {/* Peak 4: Nanda Devi (Uttarakhand) */}
                  <polygon points="290,162 280,182 300,182" fill="#ffffff" />
                  <polygon points="290,162 300,182 306,178" fill="#b4d7ee" />

                  {/* Peak 5: Kanchenjunga (Sikkim) */}
                  <polygon points="530,232 522,248 538,248" fill="#ffffff" />
                  <polygon points="530,232 538,248 544,244" fill="#cbe3f7" />

                  {/* Peak 6: Namcha Barwa / Arunachal */}
                  <polygon points="687,218 677,236 697,236" fill="#ffffff" />
                  <polygon points="687,218 697,236 703,232" fill="#b4d7ee" />
                </g>
              )}

              {/* ================= SACRED RIVERS (Glowing Winding Blue Rivers) ================= */}
              {showRivers && (
                <g id="rivers-layer" className="pointer-events-none">
                  {/* Indus River Northwest */}
                  <path
                    d="M 216 62 Q 190 90 180 120 T 160 160 T 140 210"
                    fill="none"
                    stroke="url(#sacredRiverGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                  {/* Ganga River (from Himalayas through UP, Bihar, Bengal to Delta) */}
                  <path
                    d="M 290 182 Q 310 230 331 259 T 395 295 T 461 300 T 514 340 T 535 390"
                    fill="none"
                    stroke="url(#sacredRiverGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                  {/* Yamuna River merging at Prayagraj */}
                  <path
                    d="M 275 190 Q 250 220 280 250 T 360 285 T 395 295"
                    fill="none"
                    stroke="url(#sacredRiverGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                  {/* Brahmaputra River through Assam */}
                  <path
                    d="M 720 230 Q 687 235 645 287 T 580 300 T 535 390"
                    fill="none"
                    stroke="url(#sacredRiverGrad)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    opacity="0.85"
                  />
                  {/* Narmada River (West flowing) */}
                  <path
                    d="M 330 350 Q 268 342 200 370 T 110 390"
                    fill="none"
                    stroke="url(#sacredRiverGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.75"
                  />
                  {/* Godavari River across Deccan */}
                  <path
                    d="M 180 460 Q 224 477 296 501 T 360 520"
                    fill="none"
                    stroke="url(#sacredRiverGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.75"
                  />
                  {/* Kaveri River in South */}
                  <path
                    d="M 180 620 Q 213 600 264 686 T 310 690"
                    fill="none"
                    stroke="url(#sacredRiverGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    opacity="0.75"
                  />
                </g>
              )}

              {/* ================= 3D MINIATURE ARCHITECTURAL MONUMENTS ================= */}
              {showLandmarks && (
                <g id="miniature-monuments" className="select-none">
                  {/* 1. TAJ MAHAL (Agra, UP - Position x=290, y=255) */}
                  <g 
                    id="mini-taj-mahal" 
                    transform="translate(290, 255) scale(1)"
                    className="cursor-pointer group"
                    onClick={(e) => {
                      e.stopPropagation();
                      const taj = HERITAGE_LANDMARKS.find((l) => l.id === 'taj-mahal');
                      if (taj) onLaunchLandmark360(taj);
                    }}
                  >
                    {/* Marble Plinth */}
                    <rect x="-14" y="-2" width="28" height="5" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.8" rx="1" />
                    {/* Central Facade */}
                    <rect x="-8" y="-15" width="16" height="13" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="0.8" />
                    <path d="M -4 -2 L -4 -10 Q 0 -13 4 -10 L 4 -2 Z" fill="#475569" />
                    {/* Onion Dome */}
                    <path d="M -6 -15 C -8 -21, -4 -27, 0 -30 C 4 -27, 8 -21, 6 -15 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
                    <line x1="0" y1="-30" x2="0" y2="-34" stroke="#f59e0b" strokeWidth="1.2" />
                    {/* Minarets */}
                    <line x1="-12" y1="-2" x2="-12" y2="-24" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="-12" cy="-24" r="1.2" fill="#cbd5e1" />
                    <line x1="12" y1="-2" x2="12" y2="-24" stroke="#ffffff" strokeWidth="2" />
                    <circle cx="12" cy="-24" r="1.2" fill="#cbd5e1" />
                    <title>Taj Mahal, Agra (Click for 360° Tour)</title>
                  </g>

                  {/* 2. GOLDEN TEMPLE (Amritsar, Punjab - Position x=185, y=155) */}
                  <g 
                    id="mini-golden-temple" 
                    transform="translate(185, 155) scale(1)"
                    className="cursor-pointer group"
                    onClick={(e) => {
                      e.stopPropagation();
                      const gt = HERITAGE_LANDMARKS.find((l) => l.id === 'golden-temple');
                      if (gt) onLaunchLandmark360(gt);
                    }}
                  >
                    {/* Amrit Sarovar Water */}
                    <rect x="-16" y="-8" width="32" height="18" fill="#0284c7" stroke="#38bdf8" strokeWidth="1" rx="2" />
                    {/* Golden Sanctum */}
                    <rect x="-6" y="-5" width="12" height="10" fill="#f59e0b" stroke="#d97706" strokeWidth="0.8" />
                    {/* Golden Dome */}
                    <path d="M -4 -5 C -5 -11, -2 -14, 0 -16 C 2 -14, 5 -11, 4 -5 Z" fill="#fbbf24" stroke="#d97706" strokeWidth="0.8" />
                    <line x1="0" y1="-16" x2="0" y2="-19" stroke="#f59e0b" strokeWidth="1" />
                    <title>Golden Temple, Amritsar (Click for 360° Tour)</title>
                  </g>

                  {/* 3. HAWA MAHAL & AMBER FORT (Jaipur, Rajasthan - Position x=195, y=245) */}
                  <g 
                    id="mini-hawa-mahal" 
                    transform="translate(195, 245) scale(0.95)"
                    className="cursor-pointer group"
                    onClick={(e) => {
                      e.stopPropagation();
                      const fort = HERITAGE_LANDMARKS.find((l) => l.id === 'hawa-mahal');
                      if (fort) onLaunchLandmark360(fort);
                    }}
                  >
                    <path d="M -14 5 L -14 -3 L -10 -3 L -10 -7 L -5 -7 L -5 -3 L 5 -3 L 5 -7 L 10 -7 L 10 -3 L 14 -3 L 14 5 Z" fill="#b91c1c" stroke="#991b1b" strokeWidth="0.8" />
                    <path d="M -3 5 L -3 0 Q 0 -2 3 0 L 3 5 Z" fill="#7f1d1d" />
                    <title>Hawa Mahal & Amber Fort (Click for 360° Tour)</title>
                  </g>

                  {/* 4. MEENAKSHI TEMPLE (Madurai, Tamil Nadu - Position x=265, y=700) */}
                  <g 
                    id="mini-meenakshi" 
                    transform="translate(265, 700) scale(1)"
                    className="cursor-pointer group"
                    onClick={(e) => {
                      e.stopPropagation();
                      const meenakshi = HERITAGE_LANDMARKS.find((l) => l.id === 'meenakshi-temple');
                      if (meenakshi) onLaunchLandmark360(meenakshi);
                    }}
                  >
                    <polygon points="0,-22 -3,-15 3,-15" fill="#e11d48" stroke="#be123c" strokeWidth="0.6" />
                    <polygon points="-4,-15 -7,-8 7,-8 4,-15" fill="#d97706" stroke="#b45309" strokeWidth="0.6" />
                    <polygon points="-8,-8 -11,0 11,0 8,-8" fill="#0284c7" stroke="#0369a1" strokeWidth="0.6" />
                    <circle cx="0" cy="-23" r="1.3" fill="#facc15" />
                    <title>Meenakshi Amman Temple (Click for 360° Tour)</title>
                  </g>

                  {/* 5. KONARK SUN TEMPLE (Odisha - Position x=470, y=440) */}
                  <g 
                    id="mini-konark" 
                    transform="translate(470, 440) scale(0.95)"
                    className="cursor-pointer group"
                    onClick={(e) => {
                      e.stopPropagation();
                      const konark = HERITAGE_LANDMARKS.find((l) => l.id === 'konark-sun-temple');
                      if (konark) onLaunchLandmark360(konark);
                    }}
                  >
                    <polygon points="0,-18 -6,-3 6,-3" fill="#d97706" stroke="#b45309" strokeWidth="0.8" />
                    <circle cx="0" cy="-18" r="2" fill="#fde047" stroke="#ca8a04" strokeWidth="0.6" />
                    <circle cx="-8" cy="2" r="4" fill="none" stroke="#b45309" strokeWidth="1.2" />
                    <circle cx="8" cy="2" r="4" fill="none" stroke="#b45309" strokeWidth="1.2" />
                    <title>Konark Sun Temple (Click for 360° Tour)</title>
                  </g>

                  {/* 6. VICTORIA MEMORIAL (Kolkata - Position x=535, y=365) */}
                  <g 
                    id="mini-victoria" 
                    transform="translate(535, 365) scale(0.95)"
                    className="cursor-pointer group"
                    onClick={(e) => {
                      e.stopPropagation();
                      const vm = HERITAGE_LANDMARKS.find((l) => l.id === 'victoria-memorial');
                      if (vm) onLaunchLandmark360(vm);
                    }}
                  >
                    <rect x="-12" y="-2" width="24" height="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="0.8" />
                    <circle cx="0" cy="-12" r="3.5" fill="#ffffff" stroke="#94a3b8" strokeWidth="0.8" />
                    <title>Victoria Memorial, Kolkata (Click for 360° Tour)</title>
                  </g>
                </g>
              )}

              {/* ================= 3D ELEVATED BOLD BLOCK "INDIA" TYPOGRAPHY ================= */}
              <g 
                id="floating-india-typography" 
                className="pointer-events-none select-none"
                transform="translate(340, 480)"
              >
                {/* Drop shadow cast onto terrain */}
                <text
                  x="0"
                  y="22"
                  textAnchor="middle"
                  fill="#0f2619"
                  opacity="0.45"
                  fontSize="64"
                  fontWeight="900"
                  letterSpacing="0.22em"
                  className="font-sans"
                  filter="blur(6px)"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  INDIA
                </text>

                {/* 3D Extrusion Side Walls */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <text
                    key={i}
                    x="0"
                    y={16 - i * 1.5}
                    textAnchor="middle"
                    fill="#15803d"
                    fontSize="64"
                    fontWeight="900"
                    letterSpacing="0.22em"
                    className="font-sans"
                    style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                  >
                    INDIA
                  </text>
                ))}

                {/* Clean Top White Face */}
                <text
                  x="0"
                  y="4"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="64"
                  fontWeight="900"
                  letterSpacing="0.22em"
                  stroke="#f8fafc"
                  strokeWidth="1.2"
                  style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
                >
                  INDIA
                </text>
              </g>

              {/* ================= CLOUD PUFFS BLENDING AT ISLAND HORIZON & RIM ================= */}
              <g id="island-mist-clouds" className="pointer-events-none opacity-85">
                <ellipse cx="140" cy="460" rx="35" ry="16" fill="#ffffff" filter="blur(3px)" />
                <ellipse cx="260" cy="760" rx="45" ry="18" fill="#ffffff" filter="blur(4px)" />
                <ellipse cx="560" cy="400" rx="40" ry="16" fill="#ffffff" filter="blur(3px)" />
              </g>

            </svg>

            {/* Floating Quick Guide Badge */}
            <div className="absolute -bottom-8 px-4 py-1.5 rounded-full bg-white/95 border border-amber-500/30 text-amber-900 text-xs font-medium backdrop-blur-md shadow-lg flex items-center gap-2">
              <Wind className="w-3.5 h-3.5 text-amber-600 animate-spin" />
              <span>Hover over any of India's 37 states & UTs to trigger 3D bulge & heritage lore</span>
            </div>
          </div>
        </div>

        {/* ================= RIGHT: DYNAMIC CULTURAL HERITAGE INSPECTION DRAWER ================= */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="glass-panel-gold rounded-3xl p-6 transition-all duration-300 relative overflow-hidden bg-white/85 border border-amber-500/30 shadow-xl text-slate-800">
            {/* Ambient Background Aura */}
            <div className="absolute -right-16 -top-16 w-48 h-48 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* State Header & Bulge Indicator */}
            <div className="flex items-start justify-between gap-3 border-b border-amber-500/20 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/15 text-amber-800 border border-amber-500/30">
                    {activeState.region} India
                  </span>
                  <span className="text-xs text-slate-500">Capital: {activeState.capital}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-cinzel tracking-wide mt-1">
                  {activeState.name}
                </h2>
                <p className="text-amber-700 text-sm font-medium font-sans">
                  {activeState.hindiName}
                </p>
              </div>

              <button
                onClick={() => onSelectState(activeState)}
                className="shrink-0 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/25 flex items-center gap-1 group"
              >
                <span>Full Dossier</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Cultural Summary */}
            <p className="text-sm text-slate-700 mt-4 leading-relaxed line-clamp-3">
              {activeState.culturalSummary}
            </p>

            {/* Cultural Matrix Tags */}
            <div className="mt-5 space-y-3.5 text-xs">
              {/* UNESCO World Heritage */}
              <div>
                <div className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>UNESCO World Heritage & Sacred Sites</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeState.unescoSites.map((site, i) => (
                    <span 
                      key={i}
                      className="px-2 py-1 rounded-md bg-amber-50 border border-amber-300 text-amber-900 text-[11px] font-medium"
                    >
                      {site}
                    </span>
                  ))}
                </div>
              </div>

              {/* Performing Arts & Classical Dance */}
              <div>
                <div className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
                  <Layers className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Traditional Dance & Performing Arts</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeState.traditionalDances.map((dance, i) => (
                    <span 
                      key={i}
                      className="px-2 py-1 rounded-md bg-emerald-50 border border-emerald-300 text-emerald-900 text-[11px] font-medium"
                    >
                      {dance}
                    </span>
                  ))}
                </div>
              </div>

              {/* Handicrafts & Cuisine */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <div className="text-[11px] font-semibold text-sky-800 uppercase tracking-wider mb-1">
                    Master Crafts
                  </div>
                  <div className="text-slate-700 text-[11px] space-y-0.5">
                    {activeState.handicrafts.slice(0, 2).map((craft, i) => (
                      <div key={i} className="truncate">• {craft}</div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-rose-800 uppercase tracking-wider mb-1">
                    Heritage Cuisine
                  </div>
                  <div className="text-slate-700 text-[11px] space-y-0.5">
                    {activeState.famousCuisine.slice(0, 2).map((dish, i) => (
                      <div key={i} className="truncate">• {dish}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Monuments in this State with 360° Quick Launch */}
            {HERITAGE_LANDMARKS.filter((l) => l.stateId === activeState.id).length > 0 && (
              <div className="mt-5 pt-4 border-t border-slate-200">
                <div className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Monuments in {activeState.name}</span>
                  <span className="text-[10px] text-slate-500">Click to enter 360°</span>
                </div>
                <div className="space-y-2">
                  {HERITAGE_LANDMARKS.filter((l) => l.stateId === activeState.id).map((landmark) => (
                    <div
                      key={landmark.id}
                      onClick={() => onLaunchLandmark360(landmark)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white/90 hover:bg-amber-50 border border-sky-200/80 hover:border-amber-400 cursor-pointer transition-all group shadow-sm"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-500/15 text-amber-700 flex items-center justify-center font-bold">
                          <Eye className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover:text-amber-700 transition-colors">
                            {landmark.name}
                          </div>
                          <div className="text-[10px] text-slate-500">
                            {landmark.architecturalStyle.split('(')[0]}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500 text-slate-950 group-hover:bg-amber-400 transition-colors shadow-sm">
                        Launch 360°
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Geolocation Proximity CTA */}
            <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>Track Distance to Monuments</span>
              </div>
              <button
                onClick={onOpenRadar}
                className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1"
              >
                <span>Open Radar</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
