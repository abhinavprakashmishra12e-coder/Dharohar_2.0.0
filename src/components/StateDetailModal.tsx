import React, { useEffect } from 'react';
import { StateHeritage, Landmark } from '../types/heritage';
import { HERITAGE_LANDMARKS } from '../data/landmarksData';
import { 
  X, 
  Sparkles, 
  MapPin, 
  Layers, 
  Eye, 
  Utensils, 
  Palette, 
  Calendar, 
  Compass,
  Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface StateDetailModalProps {
  state: StateHeritage | null;
  onClose: () => void;
  onLaunchLandmark360: (landmark: Landmark) => void;
}

export const StateDetailModal: React.FC<StateDetailModalProps> = ({
  state,
  onClose,
  onLaunchLandmark360,
}) => {
  useEffect(() => {
    if (state) {
      confetti({
        particleCount: 25,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#38bdf8', '#fbbf24'],
      });
    }
  }, [state]);

  if (!state) return null;

  const monumentsInState = HERITAGE_LANDMARKS.filter((l) => l.stateId === state.id);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sky-950/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] rounded-3xl overflow-hidden flex flex-col shadow-2xl bg-white border border-sky-200 animate-in zoom-in-95 duration-200 text-slate-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-amber-100 via-sky-50 to-white border-b border-sky-200 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-500/30">
                {state.region} India
              </span>
              <span className="text-xs text-slate-600">
                Capital: <strong className="text-slate-900">{state.capital}</strong>
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-cinzel tracking-wide mt-2">
              {state.name}
            </h2>
            <p className="text-amber-700 text-base font-medium">
              {state.hindiName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 border border-slate-200 transition-colors shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {/* Cultural Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-2">
              <Sparkles className="w-4 h-4 text-amber-600" />
              Living Heritage & Antiquity
            </h3>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {state.culturalSummary}
            </p>
            <div className="mt-2 text-xs text-slate-500 font-mono">
              Historical Regimes: {state.historicalEra}
            </div>
          </div>

          {/* UNESCO World Heritage Sites */}
          {state.unescoSites.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5 mb-2">
                <Award className="w-4 h-4 text-amber-600" />
                UNESCO World Heritage & Inscribed Sites
              </h3>
              <div className="flex flex-wrap gap-2">
                {state.unescoSites.map((site, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-white text-amber-900 text-xs font-semibold border border-amber-300 shadow-sm"
                  >
                    ★ {site}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Cultural Matrix Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Dance & Performing Arts */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-2">
                <Layers className="w-4 h-4 text-emerald-600" />
                Traditional Dances
              </h3>
              <ul className="space-y-1 text-xs text-slate-700">
                {state.traditionalDances.map((dance, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>{dance}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Master Crafts & Textiles */}
            <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-sky-800 flex items-center gap-1.5 mb-2">
                <Palette className="w-4 h-4 text-sky-600" />
                Master Crafts & Textiles
              </h3>
              <ul className="space-y-1 text-xs text-slate-700">
                {state.handicrafts.map((craft, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
                    <span>{craft}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Heritage Cuisine */}
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5 mb-2">
                <Utensils className="w-4 h-4 text-rose-600" />
                Iconic Cuisine
              </h3>
              <ul className="space-y-1 text-xs text-slate-700">
                {state.famousCuisine.map((dish, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    <span>{dish}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Major Festivals */}
            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-2">
                <Calendar className="w-4 h-4 text-amber-600" />
                Sacred Festivals
              </h3>
              <ul className="space-y-1 text-xs text-slate-700">
                {state.festivals.map((fest, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    <span>{fest}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Monuments in State with 360 Tour Button */}
          {monumentsInState.length > 0 && (
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-3">
                <Eye className="w-4 h-4 text-amber-600" />
                Featured Monuments in {state.name}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {monumentsInState.map((monument) => (
                  <div
                    key={monument.id}
                    className="p-4 rounded-2xl bg-white border border-sky-200 hover:border-amber-400 transition-all flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-amber-800 px-2 py-0.5 rounded bg-amber-100">
                          {monument.category}
                        </span>
                        <span className="text-[10px] text-slate-500">{monument.yearBuilt}</span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 font-cinzel mt-2">
                        {monument.name}
                      </h4>
                      <p className="text-xs text-slate-600 line-clamp-2 mt-1">
                        {monument.description}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onLaunchLandmark360(monument);
                      }}
                      className="mt-3 w-full py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Launch 360° Virtual Tour</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
