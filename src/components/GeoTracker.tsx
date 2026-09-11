import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  Navigation, 
  Eye, 
  Plane, 
  Train, 
  Radio, 
  Sparkles, 
  LocateFixed, 
  Globe
} from 'lucide-react';
import { HERITAGE_LANDMARKS } from '../data/landmarksData';
import { 
  GeoCoordinates, 
  Landmark 
} from '../types/heritage';
import { 
  getLandmarksSortedByDistance, 
  LandmarkDistanceInfo, 
  PRESET_USER_LOCATIONS 
} from '../utils/geoUtils';

interface GeoTrackerProps {
  onLaunchLandmark360: (landmark: Landmark) => void;
  onLocateOnMap: (stateId: string) => void;
}

export const GeoTracker: React.FC<GeoTrackerProps> = ({
  onLaunchLandmark360,
  onLocateOnMap,
}) => {
  // Current user GPS position (defaulting to New Delhi)
  const [currentLocation, setCurrentLocation] = useState<GeoCoordinates>({
    lat: 28.6139,
    lng: 77.2090,
  });
  const [locationName, setLocationName] = useState<string>('New Delhi (Central India)');
  const [isLocating, setIsLocating] = useState<boolean>(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [selectedLandmarkId, setSelectedLandmarkId] = useState<string | null>(null);

  // Request browser GPS
  const handleDetectLocation = () => {
    setIsLocating(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser.');
      setIsLocating(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLocationName(
          `Your Live GPS (${pos.coords.latitude.toFixed(2)}°N, ${pos.coords.longitude.toFixed(2)}°E)`
        );
        setIsLocating(false);
      },
      (err) => {
        setLocationError(`GPS notice: ${err.message}. You can use preset explorer locations.`);
        setIsLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  // Sort landmarks by distance from current location
  const sortedLandmarks: LandmarkDistanceInfo[] = getLandmarksSortedByDistance(
    currentLocation,
    HERITAGE_LANDMARKS
  );

  const nearest = sortedLandmarks[0];

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-sky-200/80 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-800 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
                Live Geolocation Tracking
              </span>
              <span className="text-xs text-slate-600 hidden sm:inline font-medium">
                Real-time geodesic distance & compass bearing to Indian monuments
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-cinzel tracking-wide mt-1">
              HERITAGE GEOLOCATION RADAR
            </h1>
          </div>

          {/* Location selector & GPS Button */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleDetectLocation}
              disabled={isLocating}
              className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 disabled:opacity-50"
            >
              <LocateFixed className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
              <span>{isLocating ? 'Locating...' : 'Detect My GPS'}</span>
            </button>

            {/* Presets dropdown */}
            <div className="relative">
              <select
                aria-label="Select Explorer Origin City"
                value={locationName}
                onChange={(e) => {
                  const preset = PRESET_USER_LOCATIONS.find((p) => p.label === e.target.value);
                  if (preset) {
                    setCurrentLocation(preset.coords);
                    setLocationName(preset.label);
                  }
                }}
                className="px-3 py-2 rounded-xl bg-white/90 border border-sky-200 text-xs text-slate-800 focus:outline-none focus:border-amber-500 cursor-pointer shadow-sm"
              >
                {PRESET_USER_LOCATIONS.map((preset) => (
                  <option key={preset.name} value={preset.label}>
                    Origin: {preset.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {locationError && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center gap-2 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>{locationError}</span>
          </div>
        )}

        {/* ================= TOP GRID: RADAR SCANNER + NEAREST SPOTLIGHT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* RADAR SCREEN VISUALIZER (Col 1-5) */}
          <div className="lg:col-span-5 glass-panel-gold rounded-3xl p-6 flex flex-col items-center justify-center relative overflow-hidden bg-white/85 border border-sky-200 shadow-xl">
            <div className="w-full flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                  Monument Proximity Radar
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">
                {currentLocation.lat.toFixed(3)}°N, {currentLocation.lng.toFixed(3)}°E
              </span>
            </div>

            {/* Circular Radar Sweep Display */}
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border-2 border-emerald-500/40 bg-slate-900 shadow-[inset_0_0_30px_rgba(16,185,129,0.25)] flex items-center justify-center overflow-hidden my-2">
              {/* Concentric Distance Rings */}
              <div className="absolute w-3/4 h-3/4 rounded-full border border-emerald-500/25" />
              <div className="absolute w-1/2 h-1/2 rounded-full border border-emerald-500/30" />
              <div className="absolute w-1/4 h-1/4 rounded-full border border-emerald-500/35" />

              {/* Crosshair Axes */}
              <div className="absolute inset-x-0 top-1/2 h-[1px] bg-emerald-500/25" />
              <div className="absolute inset-y-0 left-1/2 w-[1px] bg-emerald-500/25" />

              {/* Cardinal Labels */}
              <span className="absolute top-1.5 text-[10px] font-bold font-mono text-emerald-400">N</span>
              <span className="absolute bottom-1.5 text-[10px] font-bold font-mono text-emerald-400">S</span>
              <span className="absolute left-2 text-[10px] font-bold font-mono text-emerald-400">W</span>
              <span className="absolute right-2 text-[10px] font-bold font-mono text-emerald-400">E</span>

              {/* Rotating Radar Sweep Beam */}
              <div 
                className="absolute inset-0 animate-radar-sweep pointer-events-none"
                style={{
                  background: 'conic-gradient(from 0deg, rgba(16, 185, 129, 0.45) 0deg, rgba(16, 185, 129, 0) 65deg, transparent 65deg)',
                }}
              />

              {/* Center User Blip */}
              <div className="relative z-10 w-4 h-4 rounded-full bg-amber-400 border-2 border-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/50">
                <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />
              </div>

              {/* Landmark Blips on Radar */}
              {sortedLandmarks.map((info) => {
                const maxDist = 2200;
                const normalizedRadius = Math.min(1, info.distanceKm / maxDist) * 115;
                const rad = ((info.bearingDeg - 90) * Math.PI) / 180;
                const bx = 144 + normalizedRadius * Math.cos(rad);
                const by = 144 + normalizedRadius * Math.sin(rad);
                const isSelected = selectedLandmarkId === info.landmark.id;

                return (
                  <div
                    key={info.landmark.id}
                    onClick={() => setSelectedLandmarkId(info.landmark.id)}
                    style={{ left: `${bx}px`, top: `${by}px` }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                    title={`${info.landmark.name} (${info.distanceKm} km, ${info.compassDir})`}
                  >
                    <div className={`w-3 h-3 rounded-full transition-transform ${
                      isSelected ? 'bg-amber-400 scale-150 ring-4 ring-amber-400/30' : 'bg-emerald-400 group-hover:scale-125'
                    }`} />
                    <div className="absolute left-4 -top-2 whitespace-nowrap px-1.5 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[9px] text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
                      {info.landmark.name.split('(')[0]} ({info.distanceKm} km)
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Radar Legend */}
            <div className="w-full flex items-center justify-between text-[11px] text-slate-600 pt-3 border-t border-slate-200">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Your Location</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Heritage Monuments</span>
              </div>
              <span className="text-amber-700 font-mono font-semibold">Range: 2,200 km</span>
            </div>
          </div>

          {/* NEAREST LANDMARK SPOTLIGHT CARD (Col 6-12) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 relative overflow-hidden bg-white/85 border border-amber-500/30 shadow-xl text-slate-800">
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-800 text-[11px] font-bold uppercase tracking-wider border border-amber-500/30 flex items-center gap-1.5 w-fit">
                  <Sparkles className="w-3 h-3 text-amber-600" />
                  Closest Cultural Landmark
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 font-cinzel tracking-wide mt-2">
                  {nearest.landmark.name}
                </h2>
                <p className="text-amber-700 text-sm font-medium">
                  {nearest.landmark.hindiName} • {nearest.landmark.stateName}
                </p>
              </div>

              {/* Large Distance Metric Badge */}
              <div className="text-right shrink-0 bg-amber-50 px-4 py-2.5 rounded-2xl border border-amber-200 shadow-sm">
                <div className="text-3xl sm:text-4xl font-extrabold text-amber-700 font-mono tracking-tight">
                  {nearest.distanceKm.toLocaleString()}
                  <span className="text-sm font-normal text-slate-600 ml-1">km</span>
                </div>
                <div className="text-[11px] text-slate-600 font-mono flex items-center justify-end gap-1">
                  <Navigation className="w-3 h-3 text-amber-600" />
                  <span>Heading: {nearest.bearingDeg}° {nearest.compassDir}</span>
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 mt-4 leading-relaxed">
              {nearest.landmark.description}
            </p>

            {/* Travel Times & Key Specs */}
            <div className="grid grid-cols-3 gap-3 my-5">
              <div className="p-3 rounded-xl bg-white border border-sky-200/80 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Plane className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Flight Time</div>
                  <div className="text-xs font-bold text-slate-900 font-mono">~{nearest.flightTimeHours} hrs</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-sky-200/80 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <Train className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Vande Bharat Rail</div>
                  <div className="text-xs font-bold text-slate-900 font-mono">~{nearest.trainTimeHours} hrs</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-sky-200/80 shadow-sm flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold">Elevation</div>
                  <div className="text-xs font-bold text-slate-900 font-mono">{nearest.landmark.elevationMeters}m MSL</div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => onLaunchLandmark360(nearest.landmark)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-md shadow-amber-500/25 flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                <span>Enter 360° Virtual Tour</span>
              </button>

              <button
                onClick={() => onLocateOnMap(nearest.landmark.stateId)}
                className="px-4 py-2 rounded-xl bg-white hover:bg-sky-50 text-slate-800 text-xs font-medium transition-colors border border-sky-200 shadow-sm flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-amber-600" />
                <span>View on 3D Relief Map</span>
              </button>
            </div>
          </div>
        </div>

        {/* ================= MONUMENT PROXIMITY DIRECTORY ================= */}
        <div className="glass-panel rounded-3xl p-6 bg-white/85 border border-sky-200/80 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-cinzel">
                ALL MONUMENTS RANKED BY DISTANCE
              </h3>
              <p className="text-xs text-slate-500">
                Sorted relative to {locationName}
              </p>
            </div>
            <span className="text-xs text-amber-700 font-mono font-semibold">
              {sortedLandmarks.length} Landmarks Tracked
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {sortedLandmarks.map((info) => (
              <div
                key={info.landmark.id}
                onClick={() => setSelectedLandmarkId(info.landmark.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  selectedLandmarkId === info.landmark.id
                    ? 'bg-amber-50/90 border-amber-400 shadow-md shadow-amber-500/15'
                    : 'bg-white/80 border-sky-200/70 hover:border-amber-300 hover:bg-white'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-100 text-sky-800">
                      {info.landmark.category}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-700">
                      {info.distanceKm.toLocaleString()} km
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-slate-900 font-cinzel mt-2 leading-snug">
                    {info.landmark.name}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {info.landmark.stateName}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-slate-600 font-mono text-[11px]">
                    <Navigation className="w-3 h-3 text-amber-600" />
                    <span>{info.compassDir} ({info.bearingDeg}°)</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onLaunchLandmark360(info.landmark);
                    }}
                    className="p-1.5 rounded-lg bg-amber-500/15 hover:bg-amber-500 text-amber-700 hover:text-slate-950 transition-colors"
                    title="Launch 360°"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
