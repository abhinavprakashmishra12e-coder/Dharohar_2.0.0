import type { Landmark } from '../types/heritage';
import { heritageArtwork } from './artwork';

export const HERITAGE_LANDMARKS: Landmark[] = [
  {
    "id": "taj-mahal",
    "name": "Taj Mahal",
    "hindiName": "ताज महल",
    "stateId": "uttar-pradesh",
    "stateName": "Uttar Pradesh",
    "coords": {
      "lat": 27.1751,
      "lng": 78.0421
    },
    "mapPosition": {
      "x": 290,
      "y": 255
    },
    "yearBuilt": "1632 - 1653 CE",
    "architecturalStyle": "Mughal Architecture (White Makrana Marble with Pietra Dura)",
    "description": "An immense mausoleum of pure white marble built in Agra by Mughal emperor Shah Jahan in memory of his beloved wife Mumtaz Mahal. It is the jewel of Muslim art in India and one of the universally admired masterpieces of the world’s heritage.",
    "historicalSignificance": "UNESCO World Heritage Site and one of the New Seven Wonders of the World. Represents the zenith of Indo-Islamic symmetry, Persian charbagh garden layout, and lapidary pietra dura stonework.",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg",
    "panoramicSceneId": "taj-mahal-360",
    "category": "Mausoleum",
    "keyHighlights": [
      "Central Onion Dome",
      "Four 40m Minarets with Outward Tilt",
      "Charbagh Water Reflecting Pools",
      "Calligraphic Quranic Inscriptions"
    ],
    "elevationMeters": 171
  },
  {
    "id": "golden-temple",
    "name": "Sri Harmandir Sahib (Golden Temple)",
    "hindiName": "श्री हरिमंदिर साहिब (स्वर्ण मंदिर)",
    "stateId": "punjab",
    "stateName": "Punjab",
    "coords": {
      "lat": 31.62,
      "lng": 74.8765
    },
    "mapPosition": {
      "x": 185,
      "y": 155
    },
    "yearBuilt": "1581 - 1604 CE (Gold foil added 1830)",
    "architecturalStyle": "Sikh Architecture (Blend of Rajput and Mughal styles with pure gold leaf)",
    "description": "The holiest gurdwara of Sikhism, situated in the holy city of Amritsar. Built around a man-made sacred pool (Amrit Sarovar), the sanctum is coated with over 500 kilograms of pure 24-karat gold foil donated by Maharaja Ranjit Singh.",
    "historicalSignificance": "Founded by Guru Ram Das (the 4th Sikh Guru). Features four entrances signifying open welcome to all castes, creeds, and religions. Hosts Guru ka Langar, serving over 100,000 free hot meals daily.",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1d/Golden_Temple_Amritsar.jpg",
    "panoramicSceneId": "golden-temple-360",
    "category": "Temple",
    "keyHighlights": [
      "500kg Pure Gold Sanctum",
      "Amrit Sarovar (Pool of Nectar)",
      "24-hour Guru Granth Sahib Kirtan",
      "World’s Largest Community Kitchen (Langar)"
    ],
    "elevationMeters": 232
  },
  {
    "id": "hawa-mahal",
    "name": "Hawa Mahal",
    "hindiName": "हवा महल",
    "stateId": "rajasthan",
    "stateName": "Rajasthan",
    "coords": {
      "lat": 26.9239,
      "lng": 75.8267
    },
    "mapPosition": {
      "x": 195,
      "y": 245
    },
    "yearBuilt": "1799 CE",
    "architecturalStyle": "Rajput-Mughal Fusion (Pink and Red Sandstone with Jali Lattice)",
    "description": "The Palace of Winds in Jaipur is a five-story crown-shaped honeycomb monument with 953 miniature carved stone casements (jharokhas), engineered to funnel cool breezes and allow royal women to observe street processions unseen.",
    "historicalSignificance": "Built by Maharaja Sawai Pratap Singh, designed by Lal Chand Ustad in the form of the crown of Lord Krishna. An acoustic and aerodynamic masterpiece of passive desert cooling.",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/7/73/Hawa_Mahal.jpg",
    "panoramicSceneId": "hawa-mahal-360",
    "category": "Fort & Palace",
    "keyHighlights": [
      "953 Jharokha Windows",
      "Five-Storey Sandstone Facade",
      "Palace of Winds",
      "Jaipur Old City Views"
    ],
    "elevationMeters": 431
  },
  {
    "id": "amber-fort",
    "name": "Amer (Amber) Fort",
    "hindiName": "आमेर का किला",
    "stateId": "rajasthan",
    "stateName": "Rajasthan",
    "coords": {
      "lat": 26.9855,
      "lng": 75.8513
    },
    "mapPosition": {
      "x": 230,
      "y": 220
    },
    "yearBuilt": "From 1592 CE; expanded by later rulers",
    "architecturalStyle": "Rajput palace-fort architecture in sandstone and marble",
    "description": "Above Maota Lake, Amer Fort unfolds through gateways, courtyards, gardens, and royal halls. The hilltop palace near Jaipur is known for the ornate Ganesh Pol and the mirror decoration of the Sheesh Mahal.",
    "historicalSignificance": "Part of the Hill Forts of Rajasthan UNESCO World Heritage property. Its successive courtyards connect public ceremony with the private life of the royal household.",
    "thumbnailUrl": import.meta.env.BASE_URL + 'assets/amber-fort.svg',
    "panoramicSceneId": "amber-fort-360",
    "category": "Fort & Palace",
    "keyHighlights": [
      "Ganesh Pol",
      "Sheesh Mahal",
      "Diwan-i-Aam",
      "Maota Lake"
    ],
    "elevationMeters": 450
  },
  {
    "id": "meenakshi-temple",
    "name": "Meenakshi Amman Temple",
    "hindiName": "मीनाक्षी अम्मन मंदिर",
    "stateId": "tamil-nadu",
    "stateName": "Tamil Nadu",
    "coords": {
      "lat": 9.9195,
      "lng": 78.1193
    },
    "mapPosition": {
      "x": 265,
      "y": 700
    },
    "yearBuilt": "6th Century BCE (Rebuilt 16th-17th Century CE)",
    "architecturalStyle": "Dravidian Architecture (Monumental Multi-Tiered Gopurams)",
    "description": "A historic Hindu temple complex located on the southern bank of the Vaigai River in Madurai. Dominating the skyline with 14 colossal gateway towers (gopurams) adorned with thousands of vibrant mythological stucco sculptures.",
    "historicalSignificance": "Dedicated to Goddess Meenakshi (a form of Parvati) and Sundareswarar (Shiva). Features the renowned Hall of Thousand Pillars (Ayiram Kaal Mandapam) carved from single granite stone blocks with musical resonance.",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/f/f3/Meenakshi_Amman_Temple.jpg",
    "panoramicSceneId": "meenakshi-360",
    "category": "Temple",
    "keyHighlights": [
      "14 Towering Sculpted Gopurams",
      "Hall of Thousand Monolithic Pillars",
      "Golden Lotus Sacred Tank (Potramarai Kulam)",
      "Musical Pillars producing 7 Swaras"
    ],
    "elevationMeters": 136
  },
  {
    "id": "konark-sun-temple",
    "name": "Konark Sun Temple",
    "hindiName": "कोणार्क सूर्य मंदिर",
    "stateId": "odisha",
    "stateName": "Odisha",
    "coords": {
      "lat": 19.8876,
      "lng": 86.0945
    },
    "mapPosition": {
      "x": 470,
      "y": 440
    },
    "yearBuilt": "1250 CE",
    "architecturalStyle": "Kalinga Architecture (Khondalite Stone Colossus)",
    "description": "A colossal 13th-century stone temple conceived as the gigantic chariot of Surya, the Sun God. Fitted with 24 intricately carved stone wheels drawn by seven spirited horses, situated by the Bay of Bengal.",
    "historicalSignificance": "UNESCO World Heritage Site built by King Narasimhadeva I of the Eastern Ganga Dynasty. The wheels function as precise sundials, capable of calculating time down to minutes using cast shadows.",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/9/97/Konark_Sun_Temple.jpg",
    "panoramicSceneId": "konark-360",
    "category": "Temple",
    "keyHighlights": [
      "24 Astronomical Sundial Wheels",
      "7 Sculpted Chariot Horses of Dawn",
      "Nata Mandira (Hall of Celestial Dancers)",
      "Chlorite Stone Deities of Surya"
    ],
    "elevationMeters": 12
  },
  {
    "id": "ellora-caves",
    "name": "Kailasa Temple (Ellora Caves)",
    "hindiName": "कैलाश मंदिर (एलोरा गुफाएँ)",
    "stateId": "maharashtra",
    "stateName": "Maharashtra",
    "coords": {
      "lat": 20.0258,
      "lng": 75.178
    },
    "mapPosition": {
      "x": 215,
      "y": 450
    },
    "yearBuilt": "756 - 774 CE",
    "architecturalStyle": "Rock-Cut Dravidian Monolith (Top-Down Excavation from Basalt Cliff)",
    "description": "The world’s largest single monolithic rock excavation. Carved completely top-to-bottom out of a single basalt cliff face in the Charanandri hills, scooping out over 200,000 tonnes of solid volcanic rock with hand chisels alone.",
    "historicalSignificance": "Commissioned by Rashtrakuta King Krishna I to replicate Mount Kailash, the abode of Lord Shiva. An unprecedented engineering feat that defies conventional architectural logic.",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1f/Ellora_Caves.jpg",
    "panoramicSceneId": "ellora-360",
    "category": "Cave & Rock-Cut",
    "keyHighlights": [
      "Single Monolithic Basalt Cliff Carving",
      "200,000 Tonnes Hand-Excavated Rock",
      "Life-Sized Stone Elephants & Stambhas",
      "Ravana Shaking Mount Kailash Relief"
    ],
    "elevationMeters": 585
  },
  {
    "id": "victoria-memorial",
    "name": "Victoria Memorial",
    "hindiName": "विक्टोरिया मेमोरियल",
    "stateId": "west-bengal",
    "stateName": "West Bengal",
    "coords": {
      "lat": 22.5448,
      "lng": 88.3426
    },
    "mapPosition": {
      "x": 535,
      "y": 365
    },
    "yearBuilt": "1906 - 1921 CE",
    "architecturalStyle": "Indo-Saracenic & British Classical (Makrana Marble)",
    "description": "A grand white marble building in the heart of Kolkata, surrounded by 64 acres of landscaped gardens and water bodies. Conceived by Lord Curzon and designed by Sir William Emerson using Makrana marble from Rajasthan.",
    "historicalSignificance": "Now houses 25 galleries containing historic oil paintings, royal artifacts, rare colonial manuscripts, and Indian freedom struggle archives.",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/2/2d/Victoria_Memorial.jpg",
    "panoramicSceneId": "victoria-memorial-360",
    "category": "Memorial",
    "keyHighlights": [
      "16-Foot Bronze Angel of Victory",
      "64 Acres of Mughal-British Water Gardens",
      "White Makrana Marble Central Dome",
      "Royal Gallery of Rare Historical Paintings"
    ],
    "elevationMeters": 9
  },
  {
    "id": "varanasi-ghats",
    "name": "Varanasi Ghats & Kashi Vishwanath",
    "hindiName": "काशी विश्वनाथ व वाराणसी घाट",
    "stateId": "uttar-pradesh",
    "stateName": "Uttar Pradesh",
    "coords": {
      "lat": 25.3109,
      "lng": 83.0107
    },
    "mapPosition": {
      "x": 395,
      "y": 295
    },
    "yearBuilt": "Continuously inhabited since 1200 BCE",
    "architecturalStyle": "Ancient Riverfront Terraced Stone Ghats & Golden Temple Spire",
    "description": "One of the oldest continuously inhabited cities in human history. 84 stepped stone ghats stretch along the crescent curve of the holy River Ganga, where the mesmerizing evening Ganga Aarti illuminates the night.",
    "historicalSignificance": "The spiritual capital of India. Mark Twain wrote: \"Benares is older than history, older than tradition, older even than legend, and looks twice as old as all of them put together.\"",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/b/b7/Varanasi_Ghats.jpg",
    "panoramicSceneId": "varanasi-360",
    "category": "Sacred Ghat",
    "keyHighlights": [
      "Evening Grand Ganga Aarti at Dashashwamedh",
      "Golden Shikhara of Kashi Vishwanath",
      "Dawn Boat Rides across the Misty Ganga",
      "Assi & Manikarnika Sacred Ghats"
    ],
    "elevationMeters": 80
  },
  {
    "id": "qutub-minar",
    "name": "Qutub Minar",
    "hindiName": "कुतुब मीनार",
    "stateId": "delhi",
    "stateName": "Delhi",
    "coords": {
      "lat": 28.5245,
      "lng": 77.1855
    },
    "mapPosition": {
      "x": 252,
      "y": 210
    },
    "yearBuilt": "1193 - 1368 CE",
    "architecturalStyle": "Indo-Islamic Tower Architecture (Red Sandstone and Marble)",
    "description": "Qutub Minar rises as one of the finest examples of early Indo-Islamic architecture, built in five distinct storeys with intricate calligraphy, geometric motifs, and decorative inlay work.",
    "historicalSignificance": "A UNESCO World Heritage Site and one of Delhi’s most iconic ancient monuments, representing the arrival of Islamic architecture in the Indian subcontinent.",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/8/8b/Qutb_Minar.jpg",
    "category": "Monument",
    "keyHighlights": [
      "Five tapering storeys",
      "Intricate Arabic inscriptions",
      "Iron pillar complex nearby",
      "UNESCO-listed heritage monument"
    ],
    "elevationMeters": 72
  },
  {
    "id": "khajuraho-temples",
    "name": "Khajuraho Temples",
    "hindiName": "खजुराहो मंदिर",
    "stateId": "madhya-pradesh",
    "stateName": "Madhya Pradesh",
    "coords": {
      "lat": 24.8539,
      "lng": 79.9198
    },
    "mapPosition": {
      "x": 330,
      "y": 330
    },
    "yearBuilt": "950 - 1050 CE",
    "architecturalStyle": "Nagara Temple Architecture with Sculptural Ornamentation",
    "description": "The Khajuraho group of temples is renowned for their exceptional sculptural detail, expressive carvings, and elegant temple planning in the heart of Central India.",
    "historicalSignificance": "A UNESCO World Heritage Site, these temples celebrate artistic, spiritual, and philosophical traditions through a remarkable language of stone sculpture.",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/2/2c/Khajuraho_Dulhadeo_Temple_2010.jpg",
    "category": "Temple",
    "keyHighlights": [
      "Temple complex with diverse deities",
      "Masterful stone carving",
      "UNESCO world heritage site",
      "Architecture of the Chandela dynasty"
    ],
    "elevationMeters": 260
  },
  {
    "id": "sanchi-stupa",
    "name": "Sanchi Stupa",
    "hindiName": "साँची स्तूप",
    "stateId": "madhya-pradesh",
    "stateName": "Madhya Pradesh",
    "coords": {
      "lat": 23.4821,
      "lng": 77.7389
    },
    "mapPosition": {
      "x": 305,
      "y": 360
    },
    "yearBuilt": "3rd Century BCE - 12th Century CE",
    "architecturalStyle": "Buddhist Stupa Architecture with Toranas",
    "description": "Sanchi Stupa is one of the oldest and most revered Buddhist monuments in India, marked by its hemispherical dome, carved gateways, and sacred meditative calm.",
    "historicalSignificance": "A UNESCO World Heritage Site, it stands as a key early monument of Buddhist architecture and the spread of Buddhist thought through the subcontinent.",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/1/1f/Sanchi_Stupa.jpg",
    "category": "Stupa",
    "keyHighlights": [
      "Buddhist relic chamber",
      "Decorated toranas",
      "Ancient stone railings",
      "UNESCO heritage monument"
    ],
    "elevationMeters": 445
  },
  {
    "id": "gateway-of-india",
    "name": "Gateway of India",
    "hindiName": "भारत का प्रवेश द्वार",
    "stateId": "maharashtra",
    "stateName": "Maharashtra",
    "coords": {
      "lat": 18.9218,
      "lng": 72.8345
    },
    "mapPosition": {
      "x": 320,
      "y": 500
    },
    "yearBuilt": "1911 CE",
    "architecturalStyle": "Indo-Saracenic Triumphal Architecture",
    "description": "The Gateway of India stands on the waterfront of Mumbai as an enduring monument of colonial-era architecture and a symbol of India’s movement into a new chapter of history.",
    "historicalSignificance": "It commemorates the visit of King George V and Queen Mary, and later became a symbolic departure point for British rule in India.",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4b/Gateway_of_India_2015.jpg",
    "category": "Memorial",
    "keyHighlights": [
      "Waterfront architecture",
      "Colonial heritage landmark",
      "Historic ceremonial gate",
      "Mumbai city icon"
    ],
    "elevationMeters": 6
  },
  {
    "id": "hampi",
    "name": "Hampi Ruins",
    "hindiName": "हम्पी",
    "stateId": "karnataka",
    "stateName": "Karnataka",
    "coords": {
      "lat": 15.335,
      "lng": 76.46
    },
    "mapPosition": {
      "x": 335,
      "y": 640
    },
    "yearBuilt": "14th - 16th Century CE",
    "architecturalStyle": "Vijayanagara Ruins & Temple Architecture",
    "description": "Hampi was once the imperial capital of the Vijayanagara Empire, spread across a vast granite landscape of temples, royal enclosures, bazaar streets, and sacred tanks.",
    "historicalSignificance": "A UNESCO World Heritage Site, Hampi is one of India’s greatest archaeological landscapes and a living reminder of the grandeur of the Deccan kingdoms.",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/9/95/Hampi_virupaksha_temple_1.jpg",
    "category": "Temple",
    "keyHighlights": [
      "Vijayanagara imperial ruins",
      "Granite temple architecture",
      "Sacred tanks and bazaars",
      "UNESCO heritage landscape"
    ],
    "elevationMeters": 467
  },
  {
    "id": "mysore-palace",
    "name": "Mysore Palace",
    "hindiName": "मैसूर महल",
    "stateId": "karnataka",
    "stateName": "Karnataka",
    "coords": {
      "lat": 12.3051,
      "lng": 76.6551
    },
    "mapPosition": {
      "x": 305,
      "y": 695
    },
    "yearBuilt": "1912 CE (rebuilt)",
    "architecturalStyle": "Indo-Saracenic Palace Architecture with Gothic Influences",
    "description": "Mysore Palace, one of the largest palaces in India, is celebrated for its grand halls, bright domes, and regal ceremonial spaces rich with royal heritage.",
    "historicalSignificance": "The palace remains a living symbol of the Wadiyar dynasty and a major center of royal tradition, culture, and public celebration in Karnataka.",
    "thumbnailUrl": "https://upload.wikimedia.org/wikipedia/commons/3/3d/Mysore_Palace.jpg",
    "category": "Fort & Palace",
    "keyHighlights": [
      "Grand ceremonial halls",
      "Gilded architecture",
      "Royal Wadiyar legacy",
      "Festival decorated palace"
    ],
    "elevationMeters": 760
  }
];
