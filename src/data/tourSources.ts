export type TourSource = {
  kind: 'embed' | 'external' | 'panorama';
  url: string;
  provider: string;
  externalUrl: string;
  note: string;
  credit: string;
};

// Use only provider-published embed URLs or your own licensed spherical images.
// A panorama must be a full 360×180° equirectangular image, not a wide photo.
// Local paths use import.meta.env.BASE_URL + 'panoramas/your-file.jpg'.
export const TOUR_SOURCES: Record<string, TourSource> = {
  'taj-mahal': {
    kind: 'embed',
    url: 'https://www.airpano.com/embed.php?3D=taj-mahal-india',
    provider: 'AirPano',
    externalUrl: 'https://www.airpano.com/360article/taj-mahal-india/',
    note: 'Photographic aerial panoramas. Drag inside the tour to look around; use its scene selector to change viewpoints.',
    credit: 'Panoramas courtesy of www.AirPano.com',
  },
  'golden-temple': {
    kind: 'external',
    url: 'https://www.360cities.net/image/golden-temple-amritsar/vr',
    provider: '360Cities',
    externalUrl: 'https://www.360cities.net/image/golden-temple-amritsar/vr',
    note: 'A photographic panorama is available on 360Cities. It opens in a new tab because permission to embed this image here has not been verified.',
    credit: 'External panorama: Andrei Kuznetcov / 360Cities. Not an official gurdwara tour.',
  },
  'hawa-mahal': {
    kind: 'embed',
    url: 'https://www.airpano.com/embed.php?3D=jaipur-india',
    provider: 'AirPano',
    externalUrl: 'https://www.airpano.com/360article/jaipur-india/',
    note: 'Shared Jaipur tour, not a monument-specific starting view. Choose Hawa Mahal / Palace of Winds in the provider’s scene selector.',
    credit: 'Panoramas courtesy of www.AirPano.com',
  },
  'amber-fort': {
    kind: 'embed',
    url: 'https://www.airpano.com/embed.php?3D=jaipur-india',
    provider: 'AirPano',
    externalUrl: 'https://www.airpano.com/360article/jaipur-india/',
    note: 'Shared Jaipur tour, not a monument-specific starting view. Choose Amer Fort in the provider’s scene selector.',
    credit: 'Panoramas courtesy of www.AirPano.com',
  },
};

export const FEATURED_IDS = ['taj-mahal', 'golden-temple', 'hawa-mahal', 'amber-fort', 'meenakshi-temple', 'konark-sun-temple', 'qutub-minar', 'khajuraho-temples', 'sanchi-stupa', 'gateway-of-india', 'hampi', 'mysore-palace'];
