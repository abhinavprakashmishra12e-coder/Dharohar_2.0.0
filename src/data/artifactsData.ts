import { MuseumArtifact } from '../types/heritage';
import { heritageArtwork } from './artwork';

export const MUSEUM_ARTIFACTS: MuseumArtifact[] = [
  {
    id: 'chola-nataraja',
    name: 'Chola Nataraja (Lord of Cosmic Dance)',
    hindiName: 'चोल कांस्य नटराज',
    dynasty: 'Chola Dynasty',
    period: 'Medieval Indian Golden Age',
    circa: 'c. 950–1000 CE (10th Century)',
    originLocation: 'Thanjavur, Tamil Nadu',
    stateId: 'tamil-nadu',
    material: 'Panchaloha Bronze (Copper, Zinc, Lead, Tin, Silver)',
    dimensions: '96 cm (Height) × 82 cm (Width)',
    discoveredAt: 'Brihadisvara Temple environs, Tamil Nadu',
    currentLocation: 'National Museum, New Delhi (Bronze Gallery)',
    description: 'The supreme embodiment of Indian sculptural genius: Lord Shiva performing the Ananda Tandava (Dance of Bliss) within a fiery halo of prabhamandala, balancing the rhythms of cosmic creation, preservation, and dissolution.',
    culturalSignificance: 'Fritjof Capra and Carl Sagan famously compared the Chola Nataraja to modern subatomic quantum physics, where matter dances in continuous creation and destruction. A permanent bronze casting of this sculpture stands at CERN in Geneva.',
    category: 'Metalwork',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Nataraja_Bronze.jpg',
    visualDetails: [
      {
        title: 'Damaru (Drum of Creation)',
        explanation: 'Held in the upper right hand, its pulsating rhythm generates the primordial sound (Nada) from which the universe manifests.'
      },
      {
        title: 'Agni (Flame of Dissolution)',
        explanation: 'Cradled in the upper left palm, symbolizing the cyclic destruction of ignorance and physical form.'
      },
      {
        title: 'Abhaya Mudra (Gesture of Protection)',
        explanation: 'The lower right hand is raised facing outward, reassuring devotees with fearlessness and protection.'
      },
      {
        title: 'Apasmara Purusha (Demon of Ignorance)',
        explanation: 'Trampled beneath Shiva’s right foot, representing the triumph of divine awareness over human ego and spiritual illusion.'
      }
    ]
  },
  {
    id: 'ashoka-lion-capital',
    name: 'Lion Capital of Ashoka (National Emblem)',
    hindiName: 'अशोक सिंह चतुर्मुख स्तंभ शीर्ष',
    dynasty: 'Mauryan Empire (Emperor Ashoka the Great)',
    period: 'Ancient Classical Era',
    circa: 'c. 250 BCE (3rd Century BCE)',
    originLocation: 'Sarnath, Uttar Pradesh',
    stateId: 'uttar-pradesh',
    material: 'Single block of highly polished Chunar Sandstone',
    dimensions: '2.15 meters (7.1 ft) Height',
    discoveredAt: 'Sarnath Deer Park Excavation (where Buddha gave his first sermon)',
    currentLocation: 'Sarnath Archaeological Museum, Uttar Pradesh',
    description: 'Four magnificent lions standing back-to-back atop an abacus sculpted with four energetic animals (Lion, Elephant, Bull, Horse) separated by 24-spoke Dharma Chakras, resting on an inverted lotus.',
    culturalSignificance: 'Adopted on 26 January 1950 as the official National Emblem of the Republic of India. The central 24-spoke Ashoka Chakra adorns the center of the Indian National Flag, symbolizing truth, righteousness, and continuous motion.',
    category: 'Sculpture',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Lion_Capital_of_Ashoka.jpg',
    visualDetails: [
      {
        title: 'Mauryan Glass-Like Polish',
        explanation: 'The Chunar sandstone retains its legendary lustrous glaze after 2,300 years, an ancient chemical polishing technique lost to time.'
      },
      {
        title: 'Four Guardian Animals',
        explanation: 'The galloping Horse (West), Bull (South), Elephant (East), and Lion (North) represent the four cardinal directions and stages of spiritual mastery.'
      },
      {
        title: 'Ashoka Chakra (Wheel of Law)',
        explanation: '24 spokes signifying the 24 hours of righteous conduct, human virtues, and the continuous wheel of cosmic truth (Satya).'
      }
    ]
  },
  {
    id: 'dancing-girl',
    name: 'The "Dancing Girl" of Mohenjo-Daro',
    hindiName: 'सिंधु घाटी कांस्य नर्तकी',
    dynasty: 'Indus Valley (Harappan) Civilization',
    period: 'Bronze Age Antiquity',
    circa: 'c. 2300–1750 BCE (Over 4,300 Years Old)',
    originLocation: 'Mohenjo-Daro (Indus River Basin)',
    stateId: 'gujarat',
    material: 'Lost-Wax Cast Bronze (Cire Perdue)',
    dimensions: '10.5 cm (4.1 in) × 5 cm',
    discoveredAt: 'HR Area, Mohenjo-Daro excavation (1926 by Ernest Mackay)',
    currentLocation: 'National Museum, New Delhi (Harappan Gallery)',
    description: 'A world-famous Bronze Age masterpiece depicting a young woman standing in a dynamic, confident tribhanga pose with right hand resting on her hip and left arm stacked with 24 bangles.',
    culturalSignificance: 'Archaeologist Sir John Mortimer Wheeler remarked: "When I first saw her I found it hard to believe that it was prehistoric. She knows how to hold herself, with that insolent look... It is unprecedented in ancient art anywhere."',
    category: 'Metalwork',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Dancing_Girl_of_Mohenjo-daro.jpg',
    visualDetails: [
      {
        title: 'Lost-Wax Metallurgy (Cire Perdue)',
        explanation: 'Proves that Harappan metallurgists possessed advanced alloy casting techniques millennia before similar techniques arose in the classical West.'
      },
      {
        title: 'Terracotta & Shell Bangles',
        explanation: 'Her left arm is adorned from wrist to shoulder with 24 bangles, a traditional adornment still seen among Rabari women of Gujarat and Rajasthan today.'
      },
      {
        title: 'Tribhanga Stance',
        explanation: 'The three-fold body curvature (head, torso, and hips tilted) became the foundational aesthetic canon for all classical Indian dance forms.'
      }
    ]
  },
  {
    id: 'padmapani-bodhisattva',
    name: 'Bodhisattva Padmapani Cave Mural',
    hindiName: 'बोधिसत्व पद्मपाणि भित्तिचित्र (अजंता)',
    dynasty: 'Vakataka Empire (Contemporary with Gupta Golden Age)',
    period: 'Classical Buddhist Art',
    circa: 'c. 450–500 CE (Late 5th Century)',
    originLocation: 'Cave 1, Ajanta Caves, Maharashtra',
    stateId: 'maharashtra',
    material: 'Natural Mineral Pigments (Lapis lazuli, Ochre, Lime, Malachite) on Rock Plaster',
    dimensions: '2.2 m × 1.3 m Fresco',
    discoveredAt: 'Horseshoe Gorge, Waghora River, Maharashtra',
    currentLocation: 'Ajanta Cave 1 Interior Wall (In Situ UNESCO World Heritage)',
    description: 'The crowning jewel of ancient Asian painting: Bodhisattva Avalokiteshvara stands in graceful tribhanga posture holding a sacred blue lotus (utpala) in his right hand, radiating supreme compassion and peace.',
    culturalSignificance: 'Influenced Buddhist mural traditions across the Silk Road through Dunhuang (China), Sigiriya (Sri Lanka), and Horyu-ji (Japan). The three-dimensional modeling and soft shading anticipate European Renaissance chiaroscuro by a thousand years.',
    category: 'Manuscript & Painting',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Ajanta_Padshahnath.jpg',
    visualDetails: [
      {
        title: 'The Blue Lotus (Padma)',
        explanation: 'Symbolizes immaculate spiritual enlightenment blossoming pure and untouched out of muddy worldly attachments.'
      },
      {
        title: 'Bejeweled Royal Crown',
        explanation: 'Intricately painted with pearls, sapphires, and golden filigree, contrasting with his serene, inward-looking meditative eyes.'
      },
      {
        title: 'Natural Mineral Shading',
        explanation: 'Pigments ground from crushed lapis lazuli (imported from Badakhshan), green copper malachite, and red ochre, bonded with plant gum.'
      }
    ]
  },
  {
    id: 'mughal-falcon-dagger',
    name: 'Jahangir’s Falcon-Headed Nephrite Jade Dagger',
    hindiName: 'जहाँगीर की बाज मुखी जेड खंजर',
    dynasty: 'Mughal Empire',
    period: 'Mughal Imperial Era',
    circa: 'c. 1619–1625 CE',
    originLocation: 'Agra / Lahore Royal Karkhana',
    stateId: 'uttar-pradesh',
    material: 'Carved White Nephrite Jade, Watered Damascus Crucible Steel (Wootz), Rubies, Gold Kundan Inlay',
    dimensions: '34 cm Total Length',
    discoveredAt: 'Mughal Imperial Treasury',
    currentLocation: 'National Museum, New Delhi (Arms & Armour Gallery)',
    description: 'An extraordinary royal dagger (khanjar) crafted from a single piece of milky-white mutton-fat jade meticulously sculpted into the head of a hooded hunting falcon, with cabochon ruby eyes mounted in pure kundan gold.',
    culturalSignificance: 'Emperor Jahangir was a legendary naturalist and connoisseur of gemstones and falcons. The blade is forged from Indian Wootz crucible steel—famed worldwide for its wavy water-pattern (jauhar) and legendary razor sharpness.',
    category: 'Jewelry',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Jahangirs_Falcon_Headed_Dagger.jpg',
    visualDetails: [
      {
        title: 'Falcon Head Pummel',
        explanation: 'The raptor’s beak, feathers, and intense predatory gaze are carved with lifelike realism from unyielding nephrite jade.'
      },
      {
        title: 'Indian Wootz Crucible Steel',
        explanation: 'Pioneered in ancient southern India, high-carbon Wootz steel produced micro-carbide grain patterns and was coveted from Damascus to Samarkand.'
      },
      {
        title: 'Kundan Gemstone Setting',
        explanation: 'Hyper-refined 24-karat pure gold is burnished at room temperature to grip Burma rubies without claws or prongs.'
      }
    ]
  },
  {
    id: 'tanjore-krishna',
    name: 'Tanjore Royal Gold-Foil Krishna Painting',
    hindiName: 'तंजौर स्वर्ण पत्र कृष्ण चित्रकला',
    dynasty: 'Maratha Kingdom of Thanjavur (Under Raja Serfoji II)',
    period: 'Late Medieval / Early Modern',
    circa: 'c. 1780–1820 CE',
    originLocation: 'Thanjavur, Tamil Nadu',
    stateId: 'tamil-nadu',
    material: 'Teak Wood Plank, Pure 22-Karat Gold Leaf (Warq), Jaipur Cut Glass Gems, Gesso Chalk Paste',
    dimensions: '75 cm × 55 cm',
    discoveredAt: 'Saraswathi Mahal Library Collection, Thanjavur',
    currentLocation: 'Government Museum, Chennai',
    description: 'A radiant devotional icon depicting Child Krishna (Navanitha Krishna) with butter ball, seated beneath an ornate triumphal temple arch embossed with 22-karat pure gold leaf and shimmering semi-precious stones.',
    culturalSignificance: 'Tanjore painting is a unique classical art school distinguished by its high relief (gesso embossing) and glistening 22K gold foil that glows magically in oil lamp light inside temple shrines.',
    category: 'Manuscript & Painting',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Tanjore_painting.jpg',
    visualDetails: [
      {
        title: '22K Gold Leaf (Warq)',
        explanation: 'Ultra-thin beaten gold foil adheres to the gesso relief, ensuring the icon retains its brilliant unoxidized shine for centuries.'
      },
      {
        title: 'Embossed Gesso Arch',
        explanation: 'A paste of limestone powder and tamarind-seed gum (sukku) built up in three dimensions to sculpt temple columns and capitals.'
      },
      {
        title: 'Compassionate Lotus Eyes',
        explanation: 'Painted with almond-shaped, wide open eyes symbolizing the divine gaze (darshan) blessing the devotee.'
      }
    ]
  },
  {
    id: 'qutub-minar-panel',
    name: 'Qutub Minar Inscribed Sandstone Panel',
    hindiName: 'कुतुब मीनार पत्थर का अभिलेखित पैनल',
    dynasty: 'Delhi Sultanate',
    period: 'Early Medieval India',
    circa: 'c. 1193–1220 CE',
    originLocation: 'Qutub Complex, Delhi',
    stateId: 'delhi',
    material: 'Red Sandstone with Calligraphic Inlay',
    dimensions: '86 cm × 54 cm',
    discoveredAt: 'Qutub Minar Archaeological Complex',
    currentLocation: 'National Museum, New Delhi (Islamic Art Wing)',
    description: 'A masterfully carved sandstone panel from the Qutub complex, preserving the early language of Islamic ornament and calligraphy in India.',
    culturalSignificance: 'This fragment highlights how Delhi’s early sultanate architecture married Persian decorative traditions with local artisanship and monumental scale.',
    category: 'Architectural Relic',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Qutb_Minar_panel.jpg',
    visualDetails: [
      {
        title: 'Calligraphic Ornament',
        explanation: 'The inscription uses geometric balance and elegant script to transform stone into a readymade devotional and political statement.'
      },
      {
        title: 'Sandstone Craft',
        explanation: 'The panel demonstrates the high level of carving precision achieved in the early Delhi Sultanate workshops.'
      }
    ]
  },
  {
    id: 'khajuraho-figure',
    name: 'Khajuraho Temple Sculpted Figure',
    hindiName: 'खजुराहो मंदिर की नक्काशीदार आकृति',
    dynasty: 'Chandela Dynasty',
    period: 'Medieval Northern India',
    circa: 'c. 950–1050 CE',
    originLocation: 'Khajuraho, Madhya Pradesh',
    stateId: 'madhya-pradesh',
    material: 'Buff Sandstone',
    dimensions: '48 cm × 30 cm',
    discoveredAt: 'Khajuraho Temple Complex',
    currentLocation: 'Khajuraho Museum, Madhya Pradesh',
    description: 'A sculpted temple figure from Khajuraho, embodying the refined line, sensual grace, and rhythmic modeling that define the Chandela artistic vision.',
    culturalSignificance: 'Khajuraho’s iconography conveys devotion, cosmic energy, and the philosophical unity of life, fertility, and transcendence.',
    category: 'Sculpture',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/Khajuraho_figure.jpg',
    visualDetails: [
      {
        title: 'Stone Silhouette',
        explanation: 'The sculpted form captures movement and expression through a careful balance of contour and detail.'
      },
      {
        title: 'Chandela Craftsmanship',
        explanation: 'The carving reflects a highly developed temple workshop tradition that prized both aesthetics and symbolic clarity.'
      }
    ]
  },
  {
    id: 'sanchi-torana-fragment',
    name: 'Sanchi Stupa Torana Fragment',
    hindiName: 'साँची स्तूप तोरण खंड',
    dynasty: 'Mauryan and Post-Mauryan Traditions',
    period: 'Ancient Indian Buddhist Art',
    circa: 'c. 3rd Century BCE–1st Century CE',
    originLocation: 'Sanchi, Madhya Pradesh',
    stateId: 'madhya-pradesh',
    material: 'Stone with Traces of Pigment',
    dimensions: '58 cm × 42 cm',
    discoveredAt: 'Great Stupa, Sanchi',
    currentLocation: 'Sanchi Archaeological Museum, Madhya Pradesh',
    description: 'A carved torana fragment from Sanchi, showing the early Buddhist visual language of narrative relief and sacred symbolism.',
    culturalSignificance: 'Toranas served as ceremonial gateways and their carved scenes helped spread Buddhist stories and ideals across India, influencing later Indian temple traditions.',
    category: 'Architectural Relic',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Sanchi_Torana.jpg',
    visualDetails: [
      {
        title: 'Narrative Stone Relief',
        explanation: 'The carving turns sacred stories into visible pathways of faith, guiding worshippers through symbolic architecture.'
      },
      {
        title: 'Stupa Gate Symbolism',
        explanation: 'Toranas marked a threshold between worldly space and sacred presence, emphasizing devotion and transition.'
      }
    ]
  },
  {
    id: 'mysore-palace-panel',
    name: 'Mysore Palace Gilded Ceiling Panel',
    hindiName: 'मैसूर महल सुवर्ण जड़ित छत पैनल',
    dynasty: 'Wadiyar Dynasty',
    period: 'Early Modern South India',
    circa: 'c. 1910–1912 CE',
    originLocation: 'Mysore Palace, Karnataka',
    stateId: 'karnataka',
    material: 'Wood, Gesso, Gold Leaf, Painted Stucco',
    dimensions: '120 cm × 90 cm',
    discoveredAt: 'Mysore Palace Interior',
    currentLocation: 'Government Museum, Mysore, Karnataka',
    description: 'A richly decorated palace panel from Mysore, presenting the opulence and artistic refinement of the Wadiyar royal residences.',
    culturalSignificance: 'It reflects how palace architecture in Mysore merged local traditions with Indo-Saracenic influences, becoming a lasting image of royal craftsmanship.',
    category: 'Architectural Relic',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/58/Mysore_Palace_painting.jpg',
    visualDetails: [
      {
        title: 'Gilded Detailing',
        explanation: 'Gold leaf work and painted ornament create a layered visual richness that mirrors the palace’s ceremonial environment.'
      },
      {
        title: 'Royal Patronage',
        explanation: 'The panel demonstrates how courtly patronage transformed everyday architectural surfaces into works of art.'
      }
    ]
  }
];
