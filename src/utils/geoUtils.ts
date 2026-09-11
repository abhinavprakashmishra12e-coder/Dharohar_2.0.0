import { GeoCoordinates, Landmark } from '../types/heritage';

/**
 * Calculates Great-Circle Distance between two coordinates using the Haversine formula
 */
export function calculateHaversineDistance(
  coord1: GeoCoordinates,
  coord2: GeoCoordinates
): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(coord2.lat - coord1.lat);
  const dLng = toRad(coord2.lng - coord1.lng);
  const lat1 = toRad(coord1.lat);
  const lat2 = toRad(coord2.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLng / 2) * Math.sin(dLng / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Calculates initial compass bearing from start to destination in degrees (0 - 359)
 */
export function calculateBearing(start: GeoCoordinates, dest: GeoCoordinates): number {
  const startLat = toRad(start.lat);
  const startLng = toRad(start.lng);
  const destLat = toRad(dest.lat);
  const destLng = toRad(dest.lng);

  const y = Math.sin(destLng - startLng) * Math.cos(destLat);
  const x =
    Math.cos(startLat) * Math.sin(destLat) -
    Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
  let brng = toDeg(Math.atan2(y, x));
  return Math.round((brng + 360) % 360);
}

export function bearingToCompass(degrees: number): string {
  const val = Math.floor(degrees / 22.5 + 0.5);
  const arr = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
  ];
  return arr[val % 16];
}

function toRad(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

function toDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

export interface LandmarkDistanceInfo {
  landmark: Landmark;
  distanceKm: number;
  bearingDeg: number;
  compassDir: string;
  flightTimeHours: number;
  trainTimeHours: number;
}

export function getLandmarksSortedByDistance(
  userLocation: GeoCoordinates,
  landmarks: Landmark[]
): LandmarkDistanceInfo[] {
  return landmarks
    .map((landmark) => {
      const distanceKm = calculateHaversineDistance(userLocation, landmark.coords);
      const bearingDeg = calculateBearing(userLocation, landmark.coords);
      const compassDir = bearingToCompass(bearingDeg);

      // Estimate travel times: flight approx 650 km/h + 1hr airport, train approx 90 km/h
      const flightTimeHours = Math.max(1, +(distanceKm / 650 + 1).toFixed(1));
      const trainTimeHours = +(distanceKm / 90).toFixed(1);

      return {
        landmark,
        distanceKm,
        bearingDeg,
        compassDir,
        flightTimeHours,
        trainTimeHours,
      };
    })
    .sort((a, b) => a.distanceKm - b.distanceKm);
}

export const PRESET_USER_LOCATIONS: { name: string; label: string; coords: GeoCoordinates }[] = [
  { name: 'delhi', label: 'New Delhi (Rashtrapati Bhavan)', coords: { lat: 28.6143, lng: 77.1994 } },
  { name: 'mumbai', label: 'Mumbai (Marine Drive)', coords: { lat: 18.9440, lng: 72.8238 } },
  { name: 'bengaluru', label: 'Bengaluru (Vidhana Soudha)', coords: { lat: 12.9791, lng: 77.5913 } },
  { name: 'kolkata', label: 'Kolkata (Park Street)', coords: { lat: 22.5535, lng: 88.3518 } },
  { name: 'varanasi', label: 'Varanasi (Dashashwamedh)', coords: { lat: 25.3076, lng: 83.0104 } },
  { name: 'jaipur', label: 'Jaipur (Hawa Mahal)', coords: { lat: 26.9239, lng: 75.8267 } },
  { name: 'london', label: 'London, UK', coords: { lat: 51.5074, lng: -0.1278 } },
  { name: 'newyork', label: 'New York, USA', coords: { lat: 40.7128, lng: -74.0060 } },
];
