export interface GeoCoordinates {
  lat: number;
  lng: number;
}

export interface StateHeritage {
  id: string;
  name: string;
  hindiName: string;
  capital: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central' | 'North-East';
  svgPath: string;
  center: { x: number; y: number }; // Relative SVG canvas coordinates (0-1000)
  geoCoords: GeoCoordinates;
  culturalSummary: string;
  unescoSites: string[];
  traditionalDances: string[];
  handicrafts: string[];
  famousCuisine: string[];
  festivals: string[];
  historicalEra: string;
  terrainType: 'snow_mountain' | 'lush_plains' | 'arid_desert' | 'plateau' | 'coastal_tropical' | 'forest_hills';
  colorTheme: {
    base: string;
    hover: string;
    border: string;
  };
  keyMonuments: string[];
}

export interface Landmark {
  id: string;
  name: string;
  hindiName: string;
  stateId: string;
  stateName: string;
  coords: GeoCoordinates;
  mapPosition: { x: number; y: number }; // Relative on India map
  yearBuilt: string;
  architecturalStyle: string;
  description: string;
  historicalSignificance: string;
  thumbnailUrl: string;
  panoramicSceneId?: string;
  category: 'Temple' | 'Mausoleum' | 'Fort & Palace' | 'Cave & Rock-Cut' | 'Memorial' | 'Sacred Ghat' | 'Stupa';
  keyHighlights: string[];
  elevationMeters: number;
}

export interface Hotspot360 {
  id: string;
  yaw: number;   // Horizontal angle (degrees -180 to 180)
  pitch: number; // Vertical angle (degrees -90 to 90)
  title: string;
  description: string;
  architecturalDetail: string;
  category: 'Architecture' | 'Art & Inlay' | 'History' | 'Sacred Symbolism';
}

export interface PanoramicScene {
  id: string;
  landmarkId: string;
  title: string;
  hindiTitle: string;
  location: string;
  era: string;
  architecturalStyle: string;
  description: string;
  skyGradient: {
    top: string;
    middle: string;
    horizon: string;
  };
  groundColor: string;
  accentColor: string;
  hotspots: Hotspot360[];
  ambientSound: 'temple_bells' | 'sitar_raga' | 'courtyard_breeze' | 'river_dawn';
  featureDetails: {
    label: string;
    value: string;
  }[];
}

export interface MuseumArtifact {
  id: string;
  name: string;
  hindiName: string;
  dynasty: string;
  period: string;
  circa: string;
  originLocation: string;
  stateId: string;
  material: string;
  dimensions: string;
  discoveredAt: string;
  currentLocation: string;
  description: string;
  culturalSignificance: string;
  category: 'Sculpture' | 'Metalwork' | 'Jewelry' | 'Manuscript & Painting' | 'Architectural Relic';
  imageUrl: string;
  visualDetails: {
    title: string;
    explanation: string;
  }[];
}
