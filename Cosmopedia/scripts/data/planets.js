/**
 * planets.js — Core data module for all 8 planets
 * Single source of truth for planet information used across the app
 */

export const PLANETS = [
  {
    id: "mercury",
    name: "Mercury",
    type: "rocky",
    tagline: "The Scorched Messenger",
    color: "#b5a09a",
    glowColor: "#c8a882",
    image: "assets/images/Mercury.jpg",
    audio: "assets/audios/mercury.mp3",
    description: `Mercury is the smallest and innermost planet in the Solar System. 
    Despite being closest to the Sun, it is not the hottest planet — that title belongs 
    to Venus. Mercury has no significant atmosphere to retain heat, causing dramatic 
    temperature swings between day and night.`,
    funFact: "A year on Mercury lasts only 88 Earth days, but a day lasts 59 Earth days.",
    stats: {
      distanceFromSun: "57.9 million km",
      orbitalPeriod: "88 days",
      rotationPeriod: "58.6 days",
      diameter: "4,880 km",
      moons: 0,
      gravity: "3.7 m/s²",
      temperature: "-180°C to 430°C",
      atmosphere: "Oxygen, Sodium, Hydrogen",
      type: "Terrestrial",
      rings: "None"
    },
    facts: [
      "Smallest planet in the solar system",
      "Has almost no atmosphere",
      "Surface covered in craters",
      "Named after Roman messenger god",
      "Second densest planet after Earth"
    ],
    moons: []
  },
  {
    id: "venus",
    name: "Venus",
    type: "rocky",
    tagline: "The Veiled Inferno",
    color: "#e8c56a",
    glowColor: "#f0a050",
    image: "assets/images/Venus.jpg",
    audio: "assets/audios/venus.mp3",
    description: `Venus is the second planet from the Sun and the hottest planet in 
    our solar system, despite not being the closest to the Sun. Its thick atmosphere 
    traps heat in a runaway greenhouse effect. Venus rotates in the opposite direction 
    to most planets and very slowly.`,
    funFact: "Venus rotates so slowly that a day on Venus is longer than its year.",
    stats: {
      distanceFromSun: "108.2 million km",
      orbitalPeriod: "225 days",
      rotationPeriod: "243 days (retrograde)",
      diameter: "12,104 km",
      moons: 0,
      gravity: "8.87 m/s²",
      temperature: "462°C (avg)",
      atmosphere: "Carbon Dioxide, Nitrogen",
      type: "Terrestrial",
      rings: "None"
    },
    facts: [
      "Hottest planet in the solar system",
      "Spins in reverse compared to most planets",
      "Often called Earth's twin in size",
      "Brightest object in night sky after Moon",
      "Atmospheric pressure 90x Earth's"
    ],
    moons: []
  },
  {
    id: "earth",
    name: "Earth",
    type: "rocky",
    tagline: "The Blue Marble",
    color: "#4a9eff",
    glowColor: "#3eca7a",
    image: "assets/images/Earth.jpg",
    audio: "assets/audios/earth.mp3",
    description: `Earth is the third planet from the Sun and the only known planet 
    to harbor life. With its liquid water, breathable atmosphere, and protective 
    magnetic field, Earth is uniquely suited for life. It is the densest planet in 
    the Solar System and the largest of the four terrestrial planets.`,
    funFact: "Earth is the only planet not named after a Greek or Roman deity.",
    stats: {
      distanceFromSun: "149.6 million km",
      orbitalPeriod: "365.25 days",
      rotationPeriod: "24 hours",
      diameter: "12,742 km",
      moons: 1,
      gravity: "9.8 m/s²",
      temperature: "-88°C to 58°C",
      atmosphere: "Nitrogen, Oxygen",
      type: "Terrestrial",
      rings: "None"
    },
    facts: [
      "Only known planet with life",
      "71% of surface is water",
      "Has one large natural satellite (Moon)",
      "Strongest magnetic field of rocky planets",
      "Plate tectonics shape its surface"
    ],
    moons: ["Moon"]
  },
  {
    id: "mars",
    name: "Mars",
    type: "rocky",
    tagline: "The Red Planet",
    color: "#cf4e2a",
    glowColor: "#e05a2b",
    image: "assets/images/Mars.jpg",
    audio: "assets/audios/mars.mp3",
    description: `Mars is the fourth planet from the Sun and the second-smallest 
    planet in the Solar System. Often called the Red Planet due to its reddish 
    appearance caused by iron oxide on its surface. Mars has the tallest volcano 
    and the longest canyon in the solar system.`,
    funFact: "Olympus Mons on Mars is the tallest volcano in the solar system — nearly 3x the height of Everest.",
    stats: {
      distanceFromSun: "227.9 million km",
      orbitalPeriod: "687 days",
      rotationPeriod: "24.6 hours",
      diameter: "6,779 km",
      moons: 2,
      gravity: "3.72 m/s²",
      temperature: "-125°C to 20°C",
      atmosphere: "Carbon Dioxide",
      type: "Terrestrial",
      rings: "None"
    },
    facts: [
      "Has the tallest volcano in the solar system",
      "Red color from iron oxide (rust)",
      "Home to Valles Marineris canyon system",
      "Has two small moons: Phobos & Deimos",
      "Most explored planet besides Earth"
    ],
    moons: ["Phobos", "Deimos"]
  },
  {
    id: "jupiter",
    name: "Jupiter",
    type: "gas_giant",
    tagline: "The Great Giant",
    color: "#c88b4a",
    glowColor: "#d4784a",
    image: "assets/images/Jupiter.jpg",
    audio: "assets/audios/jupiter.mp3",
    description: `Jupiter is the fifth planet from the Sun and the largest planet 
    in the Solar System. It is a gas giant with a mass more than twice that of all 
    other planets combined. Jupiter's iconic Great Red Spot is a persistent 
    anticyclonic storm larger than Earth.`,
    funFact: "Jupiter's Great Red Spot is a storm that has been raging for over 350 years.",
    stats: {
      distanceFromSun: "778.5 million km",
      orbitalPeriod: "12 years",
      rotationPeriod: "10 hours",
      diameter: "139,820 km",
      moons: 95,
      gravity: "24.79 m/s²",
      temperature: "-108°C (cloud tops)",
      atmosphere: "Hydrogen, Helium",
      type: "Gas Giant",
      rings: "Faint rings"
    },
    facts: [
      "Largest planet in the solar system",
      "Has at least 95 known moons",
      "Great Red Spot storm larger than Earth",
      "Acts as a cosmic vacuum cleaner",
      "Fastest rotating planet (10 hour day)"
    ],
    moons: ["Io", "Europa", "Ganymede", "Callisto", "+ 91 others"]
  },
  {
    id: "saturn",
    name: "Saturn",
    type: "gas_giant",
    tagline: "Lord of the Rings",
    color: "#e8d5a0",
    glowColor: "#d4b870",
    image: "assets/images/Saturn.jpg",
    audio: "assets/audios/saturn.mp3",
    description: `Saturn is the sixth planet from the Sun and the second-largest 
    in the Solar System. It is a gas giant with an average radius of about nine 
    and a half times that of Earth. Saturn is known for its spectacular ring system, 
    which consists of ice and rock particles.`,
    funFact: "Saturn is so light it could float on water — it's the least dense planet in the solar system.",
    stats: {
      distanceFromSun: "1.43 billion km",
      orbitalPeriod: "29 years",
      rotationPeriod: "10.7 hours",
      diameter: "116,460 km",
      moons: 146,
      gravity: "10.44 m/s²",
      temperature: "-138°C (avg)",
      atmosphere: "Hydrogen, Helium",
      type: "Gas Giant",
      rings: "Spectacular ring system"
    },
    facts: [
      "Most extensive ring system in solar system",
      "Least dense planet — would float on water",
      "Has 146 known moons",
      "Titan has a thick atmosphere & liquid methane",
      "Hexagonal storm at north pole"
    ],
    moons: ["Titan", "Enceladus", "Mimas", "Dione", "Rhea", "+ 141 others"]
  },
  {
    id: "uranus",
    name: "Uranus",
    type: "ice_giant",
    tagline: "The Tilted World",
    color: "#7de8e8",
    glowColor: "#5bc8d0",
    image: "assets/images/Uranus.jpg",
    audio: "assets/audios/uranus.mp3",
    description: `Uranus is the seventh planet from the Sun. It is an ice giant 
    with the third-largest planetary radius and fourth-largest planetary mass in 
    the Solar System. Uranus is unique in that it rotates on its side, with an 
    axial tilt of about 98 degrees.`,
    funFact: "Uranus rotates on its side — its axis is tilted 98 degrees, so it essentially rolls around the Sun.",
    stats: {
      distanceFromSun: "2.87 billion km",
      orbitalPeriod: "84 years",
      rotationPeriod: "17.2 hours",
      diameter: "50,724 km",
      moons: 27,
      gravity: "8.69 m/s²",
      temperature: "-224°C (avg)",
      atmosphere: "Hydrogen, Helium, Methane",
      type: "Ice Giant",
      rings: "13 known rings"
    },
    facts: [
      "Rotates on its side (98° tilt)",
      "Coldest planetary atmosphere in solar system",
      "Blue-green color from methane gas",
      "Has 27 known moons",
      "Winds can reach 900 km/h"
    ],
    moons: ["Miranda", "Ariel", "Umbriel", "Titania", "Oberon", "+ 22 others"]
  },
  {
    id: "neptune",
    name: "Neptune",
    type: "ice_giant",
    tagline: "The Stormy Deep",
    color: "#3a6fd8",
    glowColor: "#4488f0",
    image: "assets/images/Neptune.jpg",
    audio: "assets/audios/neptune.mp3",
    description: `Neptune is the eighth and farthest known Solar planet from the 
    Sun. It is the fourth-largest planet by diameter, the third-most-massive planet, 
    and the densest giant planet. Neptune has the strongest winds in the Solar System, 
    reaching speeds of 2,100 km/h.`,
    funFact: "Neptune's largest moon, Triton, orbits backwards and is slowly spiraling inward — it will eventually be torn apart.",
    stats: {
      distanceFromSun: "4.49 billion km",
      orbitalPeriod: "165 years",
      rotationPeriod: "16 hours",
      diameter: "49,244 km",
      moons: 16,
      gravity: "11.15 m/s²",
      temperature: "-214°C (avg)",
      atmosphere: "Hydrogen, Helium, Methane",
      type: "Ice Giant",
      rings: "5 known rings"
    },
    facts: [
      "Strongest winds in the solar system",
      "Takes 165 years to orbit the Sun",
      "Has a Great Dark Spot like Jupiter",
      "Triton orbits backwards (retrograde)",
      "Predicted mathematically before it was seen"
    ],
    moons: ["Triton", "Nereid", "Proteus", "+ 13 others"]
  }
];

// Helper to get a planet by ID
export function getPlanetById(id) {
  return PLANETS.find(p => p.id === id) || null;
}

// Comparison data keys mapped to display labels
export const COMPARISON_KEYS = {
  diameter: { label: "Diameter (km)", key: "diameter", numeric: true },
  moons: { label: "Number of Moons", key: "moons", numeric: true },
  gravity: { label: "Gravity (m/s²)", key: "gravity", numeric: true },
  orbitalPeriod: { label: "Orbital Period", key: "orbitalPeriod", numeric: false },
  temperature: { label: "Temperature", key: "temperature", numeric: false }
};
