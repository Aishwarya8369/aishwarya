// Mock API functions that would normally connect to a backend

// Mock product data
const mockProducts = [
  {
    id: 1,
    title: "Iron Man Armor Tech Graphic Tee",
    description:
      "Showcase Tony Stark's innovative genius with this Iron Man Armor Tech t-shirt featuring glowing arc reactor design and armor schematics.",
    price: 1299,
    stock: 15,
    discount: 0,
    tshirtType: "Graphic Printed",
    themeCategory: "Marvel Universe",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.8,
    isFeatured: true,
    isNew: true,
    isTrending: false,
    isBestseller: true,
    color: "#ff0000",
    design: "ironman",
    createdAt: "2023-05-15T10:30:00Z",
  },
  {
    id: 2,
    title: "Batman Dark Knight Oversized Tee",
    description:
      "Embrace the darkness with this oversized Batman t-shirt inspired by The Dark Knight trilogy, featuring a minimalist bat symbol.",
    price: 1499,
    stock: 8,
    discount: 15,
    tshirtType: "Oversized",
    themeCategory: "DC Comics",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.5,
    isFeatured: true,
    isNew: false,
    isTrending: true,
    isBestseller: false,
    color: "#000000",
    design: "batman",
    createdAt: "2023-06-20T14:45:00Z",
  },
  {
    id: 3,
    title: "Spider-Man Web-Slinger Acid Wash",
    description:
      "Swing into action with this unique acid wash Spider-Man t-shirt featuring a distressed web pattern design that stands out from the crowd.",
    price: 1399,
    stock: 12,
    discount: 0,
    tshirtType: "Acid Wash",
    themeCategory: "Marvel Universe",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.7,
    isFeatured: false,
    isNew: false,
    isTrending: false,
    isBestseller: true,
    color: "#0000ff",
    design: "spiderman",
    createdAt: "2023-07-05T09:15:00Z",
  },
  {
    id: 4,
    title: "Wonder Woman Warrior Sleeveless",
    description:
      "Channel your inner Amazon warrior with this sleeveless Wonder Woman t-shirt featuring the iconic emblem and Themysciran designs.",
    price: 999,
    stock: 20,
    discount: 0,
    tshirtType: "Sleeveless",
    themeCategory: "DC Comics",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.6,
    isFeatured: false,
    isNew: true,
    isTrending: false,
    isBestseller: false,
    color: "#ff0000",
    design: "wonderwoman",
    createdAt: "2023-07-12T11:30:00Z",
  },
  {
    id: 5,
    title: "Naruto Sage Mode Long Sleeve",
    description:
      "Master the sage arts with this Naruto-inspired long sleeve t-shirt featuring sage mode patterns and symbols from the hit anime series.",
    price: 1599,
    stock: 7,
    discount: 10,
    tshirtType: "Long Sleeve",
    themeCategory: "Anime Superheroes",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.9,
    isFeatured: true,
    isNew: false,
    isTrending: true,
    isBestseller: false,
    color: "#ffa500",
    design: "naruto",
    createdAt: "2023-08-03T16:20:00Z",
  },
  {
    id: 6,
    title: "Superman Classic Logo Polo",
    description:
      "Look professional while showing your superhero side with this Superman logo polo shirt, perfect for casual Fridays at the office.",
    price: 1799,
    stock: 0,
    discount: 0,
    tshirtType: "Polo T-Shirts",
    themeCategory: "Classic Comics",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.3,
    isFeatured: false,
    isNew: false,
    isTrending: false,
    isBestseller: false,
    color: "#0000ff",
    design: "superman",
    createdAt: "2023-08-18T13:45:00Z",
  },
  {
    id: 7,
    title: "Black Panther Vibranium Tech Henley",
    description:
      "Wakanda Forever! This henley t-shirt features vibranium-inspired patterns and Black Panther tribal designs for a royal look.",
    price: 1899,
    stock: 5,
    discount: 0,
    tshirtType: "Henley",
    themeCategory: "Marvel Universe",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.7,
    isFeatured: false,
    isNew: false,
    isTrending: false,
    isBestseller: true,
    color: "#000000",
    design: "blackpanther",
    createdAt: "2023-09-01T10:10:00Z",
  },
  {
    id: 8,
    title: "Star Wars Mandalorian Hooded Tee",
    description:
      "This is the way. Stylish Mandalorian-inspired hooded t-shirt for Star Wars fans featuring Beskar steel patterns and Mandalorian symbols.",
    price: 1999,
    stock: 9,
    discount: 20,
    tshirtType: "Hooded",
    themeCategory: "Sci-Fi & Fantasy",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.8,
    isFeatured: false,
    isNew: true,
    isTrending: true,
    isBestseller: false,
    color: "#808080",
    design: "mandalorian",
    createdAt: "2023-09-15T15:30:00Z",
  },
  {
    id: 9,
    title: "Harley Quinn Chaos Crop Top",
    description:
      "Puddin'! This Harley Quinn inspired crop top is perfect for fans of the chaotic anti-hero, featuring diamond patterns and playful designs.",
    price: 899,
    stock: 14,
    discount: 0,
    tshirtType: "Crop Tops",
    themeCategory: "DC Comics",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.5,
    isFeatured: false,
    isNew: false,
    isTrending: false,
    isBestseller: false,
    color: "#ff0000",
    design: "harleyquinn",
    createdAt: "2023-09-28T12:15:00Z",
  },
  {
    id: 10,
    title: "Goku Ultra Instinct Solid Tee",
    description:
      "Achieve your ultimate form with this Dragon Ball inspired solid color t-shirt featuring subtle Ultra Instinct Goku design elements.",
    price: 1299,
    stock: 11,
    discount: 0,
    tshirtType: "Solid Color",
    themeCategory: "Anime Superheroes",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.6,
    isFeatured: false,
    isNew: false,
    isTrending: true,
    isBestseller: false,
    color: "#c0c0c0",
    design: "goku",
    createdAt: "2023-10-05T09:45:00Z",
  },
  {
    id: 11,
    title: "Zelda Triforce Graphic Tee",
    description:
      "Embark on your own adventure with this Legend of Zelda inspired t-shirt featuring the iconic Triforce and Hylian symbols.",
    price: 1399,
    stock: 8,
    discount: 15,
    tshirtType: "Graphic Printed",
    themeCategory: "Video Game Characters",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.7,
    isFeatured: false,
    isNew: false,
    isTrending: false,
    isBestseller: true,
    color: "#008000",
    design: "zelda",
    createdAt: "2023-10-12T14:20:00Z",
  },
  {
    id: 12,
    title: "Custom Superhero Mashup Tee",
    description:
      "A unique fan art design combining elements from multiple superhero universes in one amazing t-shirt that's sure to turn heads.",
    price: 1499,
    stock: 6,
    discount: 0,
    tshirtType: "Graphic Printed",
    themeCategory: "Custom Fan Art",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.9,
    isFeatured: false,
    isNew: true,
    isTrending: false,
    isBestseller: false,
    color: "#800080",
    design: "mashup",
    createdAt: "2023-10-20T11:30:00Z",
  },
  {
    id: 13,
    title: "Demon Slayer Tanjiro Graphic Tee",
    description:
      "Channel the power of water breathing with this Demon Slayer inspired t-shirt featuring Tanjiro's iconic patterns and symbols.",
    price: 1299,
    stock: 18,
    discount: 0,
    tshirtType: "Graphic Printed",
    themeCategory: "Anime Superheroes",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.8,
    isFeatured: false,
    isNew: true,
    isTrending: true,
    isBestseller: false,
    color: "#006400",
    design: "tanjiro",
    createdAt: "2023-11-05T10:30:00Z",
  },
  {
    id: 14,
    title: "Joker Chaos Acid Wash Tee",
    description:
      "Embrace chaos with this Joker-inspired acid wash t-shirt featuring distressed patterns and the iconic smile that will make you stand out.",
    price: 1599,
    stock: 7,
    discount: 10,
    tshirtType: "Acid Wash",
    themeCategory: "DC Comics",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.6,
    isFeatured: false,
    isNew: false,
    isTrending: true,
    isBestseller: false,
    color: "#800080",
    design: "joker",
    createdAt: "2023-11-15T14:45:00Z",
  },
  {
    id: 15,
    title: "Captain America Shield Oversized Tee",
    description:
      "Show your patriotic side with this oversized Captain America t-shirt featuring the iconic shield design and vintage Americana elements.",
    price: 1499,
    stock: 12,
    discount: 0,
    tshirtType: "Oversized",
    themeCategory: "Marvel Universe",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.7,
    isFeatured: false,
    isNew: false,
    isTrending: false,
    isBestseller: true,
    color: "#0000ff",
    design: "captainamerica",
    createdAt: "2023-11-25T09:15:00Z",
  },
  {
    id: 16,
    title: "Attack on Titan Survey Corps Sleeveless",
    description:
      "Join the fight against Titans with this Survey Corps inspired sleeveless t-shirt featuring the Wings of Freedom emblem.",
    price: 999,
    stock: 15,
    discount: 0,
    tshirtType: "Sleeveless",
    themeCategory: "Anime Superheroes",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.5,
    isFeatured: false,
    isNew: false,
    isTrending: false,
    isBestseller: false,
    color: "#008000",
    design: "aot",
    createdAt: "2023-12-05T11:30:00Z",
  },
  {
    id: 17,
    title: "Flash Lightning Speed Long Sleeve",
    description:
      "Feel the Speed Force with this Flash-inspired long sleeve t-shirt featuring lightning bolt patterns and dynamic design elements.",
    price: 1699,
    stock: 9,
    discount: 0,
    tshirtType: "Long Sleeve",
    themeCategory: "DC Comics",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.6,
    isFeatured: false,
    isNew: true,
    isTrending: false,
    isBestseller: false,
    color: "#ff0000",
    design: "flash",
    createdAt: "2023-12-15T13:45:00Z",
  },
  {
    id: 18,
    title: "Witcher Medallion Henley",
    description:
      "Toss a coin to your Witcher with this Henley t-shirt featuring the iconic Wolf medallion and subtle Witcher symbols.",
    price: 1899,
    stock: 6,
    discount: 15,
    tshirtType: "Henley",
    themeCategory: "Video Game Characters",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.8,
    isFeatured: false,
    isNew: false,
    isTrending: true,
    isBestseller: false,
    color: "#808080",
    design: "witcher",
    createdAt: "2023-12-25T10:10:00Z",
  },
  {
    id: 19,
    title: "Hulk Smash Solid Color Tee",
    description:
      "Unleash your inner rage with this Hulk-inspired solid color t-shirt featuring subtle gamma radiation patterns and iconic Hulk elements.",
    price: 1199,
    stock: 20,
    discount: 0,
    tshirtType: "Solid Color",
    themeCategory: "Marvel Universe",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.4,
    isFeatured: false,
    isNew: false,
    isTrending: false,
    isBestseller: false,
    color: "#008000",
    design: "hulk",
    createdAt: "2024-01-05T15:30:00Z",
  },
  {
    id: 20,
    title: "Sailor Moon Magical Crop Top",
    description:
      "Transform with the power of the moon with this Sailor Moon inspired crop top featuring celestial patterns and magical girl elements.",
    price: 999,
    stock: 10,
    discount: 0,
    tshirtType: "Crop Tops",
    themeCategory: "Anime Superheroes",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.7,
    isFeatured: false,
    isNew: true,
    isTrending: true,
    isBestseller: false,
    color: "#ffc0cb",
    design: "sailormoon",
    createdAt: "2024-01-15T12:15:00Z",
  },
  // Adding more products to expand the catalog
  {
    id: 21,
    title: "Thor Thunder God Oversized Tee",
    description:
      "Harness the power of thunder with this Thor-inspired oversized t-shirt featuring Mjolnir and Asgardian runes.",
    price: 1599,
    stock: 14,
    discount: 0,
    tshirtType: "Oversized",
    themeCategory: "Marvel Universe",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.6,
    isFeatured: false,
    isNew: true,
    isTrending: false,
    isBestseller: false,
    color: "#4169e1",
    design: "thor",
    createdAt: "2024-01-20T09:30:00Z",
  },
  {
    id: 22,
    title: "Aquaman Ocean King Acid Wash",
    description:
      "Rule the seven seas with this Aquaman-inspired acid wash t-shirt featuring Atlantean patterns and oceanic designs.",
    price: 1499,
    stock: 8,
    discount: 10,
    tshirtType: "Acid Wash",
    themeCategory: "DC Comics",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.3,
    isFeatured: false,
    isNew: false,
    isTrending: true,
    isBestseller: false,
    color: "#00ffff",
    design: "aquaman",
    createdAt: "2024-01-25T14:15:00Z",
  },
  {
    id: 23,
    title: "My Hero Academia Plus Ultra Graphic Tee",
    description:
      "Go beyond with this My Hero Academia inspired graphic t-shirt featuring the iconic Plus Ultra motto and hero academy emblem.",
    price: 1299,
    stock: 16,
    discount: 0,
    tshirtType: "Graphic Printed",
    themeCategory: "Anime Superheroes",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.8,
    isFeatured: false,
    isNew: true,
    isTrending: true,
    isBestseller: false,
    color: "#ff4500",
    design: "mha",
    createdAt: "2024-01-30T11:45:00Z",
  },
  {
    id: 24,
    title: "Green Lantern Corps Solid Tee",
    description:
      "In brightest day, in blackest night, wear this Green Lantern inspired solid t-shirt featuring the Corps emblem and oath.",
    price: 1199,
    stock: 12,
    discount: 0,
    tshirtType: "Solid Color",
    themeCategory: "DC Comics",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.4,
    isFeatured: false,
    isNew: false,
    isTrending: false,
    isBestseller: false,
    color: "#008000",
    design: "greenlantern",
    createdAt: "2024-02-05T10:30:00Z",
  },
  {
    id: 25,
    title: "Halo Master Chief Polo",
    description:
      "Finish the fight in style with this Halo-inspired polo shirt featuring UNSC insignia and Spartan design elements.",
    price: 1899,
    stock: 7,
    discount: 0,
    tshirtType: "Polo T-Shirts",
    themeCategory: "Video Game Characters",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.7,
    isFeatured: false,
    isNew: true,
    isTrending: false,
    isBestseller: false,
    color: "#556b2f",
    design: "halo",
    createdAt: "2024-02-10T13:15:00Z",
  },
  {
    id: 26,
    title: "One Punch Man Saitama Sleeveless",
    description:
      "Train like a hero with this One Punch Man inspired sleeveless t-shirt featuring Saitama's iconic bald head and cape.",
    price: 999,
    stock: 18,
    discount: 0,
    tshirtType: "Sleeveless",
    themeCategory: "Anime Superheroes",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.9,
    isFeatured: false,
    isNew: false,
    isTrending: true,
    isBestseller: true,
    color: "#ffff00",
    design: "onepunchman",
    createdAt: "2024-02-15T09:45:00Z",
  },
  {
    id: 27,
    title: "Doctor Strange Mystic Arts Long Sleeve",
    description:
      "Master the mystic arts with this Doctor Strange inspired long sleeve t-shirt featuring the Eye of Agamotto and magical runes.",
    price: 1799,
    stock: 9,
    discount: 15,
    tshirtType: "Long Sleeve",
    themeCategory: "Marvel Universe",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.6,
    isFeatured: false,
    isNew: true,
    isTrending: false,
    isBestseller: false,
    color: "#800020",
    design: "drstrange",
    createdAt: "2024-02-20T14:30:00Z",
  },
  {
    id: 28,
    title: "Assassin's Creed Brotherhood Henley",
    description:
      "Nothing is true, everything is permitted. This Assassin's Creed inspired henley features the Brotherhood insignia and hidden blade designs.",
    price: 1799,
    stock: 11,
    discount: 0,
    tshirtType: "Henley",
    themeCategory: "Video Game Characters",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.5,
    isFeatured: false,
    isNew: false,
    isTrending: true,
    isBestseller: false,
    color: "#ffffff",
    design: "assassinscreed",
    createdAt: "2024-02-25T11:15:00Z",
  },
  {
    id: 29,
    title: "Venom Symbiote Hooded Tee",
    description:
      "Embrace the symbiote with this Venom-inspired hooded t-shirt featuring tendrils and the iconic white spider symbol.",
    price: 1899,
    stock: 8,
    discount: 0,
    tshirtType: "Hooded",
    themeCategory: "Marvel Universe",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.8,
    isFeatured: false,
    isNew: true,
    isTrending: true,
    isBestseller: false,
    color: "#000000",
    design: "venom",
    createdAt: "2024-03-01T10:30:00Z",
  },
  {
    id: 30,
    title: "Sailor Jupiter Crop Top",
    description:
      "Harness the power of thunder and lightning with this Sailor Jupiter inspired crop top featuring rose and lightning motifs.",
    price: 1099,
    stock: 14,
    discount: 10,
    tshirtType: "Crop Tops",
    themeCategory: "Anime Superheroes",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.6,
    isFeatured: false,
    isNew: false,
    isTrending: false,
    isBestseller: false,
    color: "#008000",
    design: "sailorjupiter",
    createdAt: "2024-03-05T13:45:00Z",
  },
  {
    id: 31,
    title: "Cyberpunk 2077 Neon Graphic Tee",
    description:
      "Light up the night with this Cyberpunk 2077 inspired graphic t-shirt featuring neon designs and futuristic Night City elements.",
    price: 1499,
    stock: 10,
    discount: 0,
    tshirtType: "Graphic Printed",
    themeCategory: "Video Game Characters",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.7,
    isFeatured: false,
    isNew: true,
    isTrending: true,
    isBestseller: false,
    color: "#ff00ff",
    design: "cyberpunk",
    createdAt: "2024-03-10T09:15:00Z",
  },
  {
    id: 32,
    title: "Watchmen Rorschach Acid Wash",
    description:
      "Who watches the watchmen? This Rorschach-inspired acid wash t-shirt features the iconic shifting inkblot pattern.",
    price: 1599,
    stock: 6,
    discount: 0,
    tshirtType: "Acid Wash",
    themeCategory: "Classic Comics",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.9,
    isFeatured: false,
    isNew: false,
    isTrending: false,
    isBestseller: true,
    color: "#000000",
    design: "watchmen",
    createdAt: "2024-03-15T14:30:00Z",
  },
  {
    id: 33,
    title: "Hawkeye Archer Solid Tee",
    description:
      "Never miss your target with this Hawkeye-inspired solid t-shirt featuring arrow designs and bullseye patterns.",
    price: 1199,
    stock: 15,
    discount: 0,
    tshirtType: "Solid Color",
    themeCategory: "Marvel Universe",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.3,
    isFeatured: false,
    isNew: false,
    isTrending: false,
    isBestseller: false,
    color: "#800080",
    design: "hawkeye",
    createdAt: "2024-03-20T11:45:00Z",
  },
  {
    id: 34,
    title: "Shazam Lightning Oversized Tee",
    description:
      "Say the word and transform with this Shazam-inspired oversized t-shirt featuring lightning bolt designs and magical symbols.",
    price: 1499,
    stock: 12,
    discount: 15,
    tshirtType: "Oversized",
    themeCategory: "DC Comics",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.5,
    isFeatured: false,
    isNew: true,
    isTrending: false,
    isBestseller: false,
    color: "#ff0000",
    design: "shazam",
    createdAt: "2024-03-25T10:30:00Z",
  },
  {
    id: 35,
    title: "Final Fantasy VII Cloud Strife Sleeveless",
    description:
      "Channel your inner SOLDIER with this Cloud Strife inspired sleeveless t-shirt featuring the Buster Sword and Mako energy designs.",
    price: 1099,
    stock: 9,
    discount: 0,
    tshirtType: "Sleeveless",
    themeCategory: "Video Game Characters",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.8,
    isFeatured: false,
    isNew: false,
    isTrending: true,
    isBestseller: false,
    color: "#4169e1",
    design: "finalfantasy",
    createdAt: "2024-03-30T13:15:00Z",
  },
  {
    id: 36,
    title: "Jujutsu Kaisen Gojo Polo",
    description:
      "Limitless style with this Satoru Gojo inspired polo shirt featuring cursed technique patterns and Jujutsu High designs.",
    price: 1799,
    stock: 7,
    discount: 0,
    tshirtType: "Polo T-Shirts",
    themeCategory: "Anime Superheroes",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.9,
    isFeatured: false,
    isNew: true,
    isTrending: true,
    isBestseller: false,
    color: "#ffffff",
    design: "jjk",
    createdAt: "2024-04-05T09:45:00Z",
  },
  {
    id: 37,
    title: "Scarlet Witch Chaos Magic Long Sleeve",
    description:
      "Harness chaos magic with this Scarlet Witch inspired long sleeve t-shirt featuring hex patterns and mystical designs.",
    price: 1699,
    stock: 11,
    discount: 10,
    tshirtType: "Long Sleeve",
    themeCategory: "Marvel Universe",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.7,
    isFeatured: false,
    isNew: false,
    isTrending: false,
    isBestseller: true,
    color: "#8b0000",
    design: "scarletwitch",
    createdAt: "2024-04-10T14:30:00Z",
  },
  {
    id: 38,
    title: "Sandman Dream Henley",
    description:
      "Enter the Dreaming with this Sandman inspired henley featuring the Endless symbols and dream-like patterns.",
    price: 1899,
    stock: 5,
    discount: 0,
    tshirtType: "Henley",
    themeCategory: "Classic Comics",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.8,
    isFeatured: false,
    isNew: true,
    isTrending: false,
    isBestseller: false,
    color: "#000000",
    design: "sandman",
    createdAt: "2024-04-15T11:15:00Z",
  },
  {
    id: 39,
    title: "Darth Vader Sith Lord Hooded Tee",
    description:
      "Join the dark side with this Darth Vader inspired hooded t-shirt featuring Imperial insignia and Sith designs.",
    price: 1999,
    stock: 8,
    discount: 0,
    tshirtType: "Hooded",
    themeCategory: "Sci-Fi & Fantasy",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.9,
    isFeatured: false,
    isNew: false,
    isTrending: true,
    isBestseller: true,
    color: "#000000",
    design: "darthvader",
    createdAt: "2024-04-20T10:30:00Z",
  },
  {
    id: 40,
    title: "Black Widow Avenger Crop Top",
    description: "Deadly style with this Black Widow inspired crop top featuring hourglass symbol and SHIELD designs.",
    price: 1099,
    stock: 13,
    discount: 0,
    tshirtType: "Crop Tops",
    themeCategory: "Marvel Universe",
    images: ["/placeholder.svg", "/placeholder.svg"],
    modelUrl: "/models/tshirt.glb",
    rating: 4.6,
    isFeatured: false,
    isNew: true,
    isTrending: false,
    isBestseller: false,
    color: "#000000",
    design: "blackwidow",
    createdAt: "2024-04-25T13:45:00Z",
  },
]

// Get all products
export async function getProducts() {
  // In a real application, this would fetch from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockProducts)
    }, 500)
  })
}

// Get product by ID
export async function getProductById(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find((p) => p.id === Number(id))
      resolve(product || null)
    }, 300)
  })
}

// Search products
export async function searchProducts(query) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const lowercaseQuery = query.toLowerCase()
      const results = mockProducts.filter(
        (product) =>
          product.title.toLowerCase().includes(lowercaseQuery) ||
          product.description.toLowerCase().includes(lowercaseQuery) ||
          product.themeCategory.toLowerCase().includes(lowercaseQuery) ||
          product.tshirtType.toLowerCase().includes(lowercaseQuery),
      )
      resolve(results)
    }, 300)
  })
}

// Filter products by category
export async function filterProductsByCategory(filters) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = [...mockProducts]

      // Filter by T-shirt types
      if (filters.tshirtTypes && filters.tshirtTypes.length > 0) {
        results = results.filter((product) => filters.tshirtTypes.includes(product.tshirtType))
      }

      // Filter by themes
      if (filters.themes && filters.themes.length > 0) {
        results = results.filter((product) => filters.themes.includes(product.themeCategory))
      }

      // Filter by price range
      if (filters.priceRange) {
        results = results.filter((product) => {
          const finalPrice = product.discount ? product.price * (1 - product.discount / 100) : product.price
          return finalPrice >= filters.priceRange[0] && finalPrice <= filters.priceRange[1]
        })
      }

      // Filter by stock
      if (filters.inStock) {
        results = results.filter((product) => product.stock > 0)
      }

      // Sort products
      if (filters.sortBy) {
        switch (filters.sortBy) {
          case "priceAsc":
            results.sort((a, b) => {
              const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price
              const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price
              return priceA - priceB
            })
            break
          case "priceDesc":
            results.sort((a, b) => {
              const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price
              const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price
              return priceB - priceA
            })
            break
          case "popularity":
            results.sort((a, b) => b.rating - a.rating)
            break
          case "newest":
            results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            break
          default:
            break
        }
      }

      resolve(results)
    }, 300)
  })
}

// Get products by category
export async function getCategoryProducts(category) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let results = []

      // Check if it's a t-shirt type
      const tshirtTypeResults = mockProducts.filter((p) => p.tshirtType.toLowerCase() === category.toLowerCase())

      if (tshirtTypeResults.length > 0) {
        results = tshirtTypeResults
      } else {
        // Check if it's a theme category
        const themeResults = mockProducts.filter(
          (p) => p.themeCategory.toLowerCase().replace(/\s+/g, "-") === category.toLowerCase(),
        )

        if (themeResults.length > 0) {
          results = themeResults
        }
      }

      resolve(results)
    }, 300)
  })
}

// Get related products
export async function getRelatedProducts(productId, category) {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Get products in the same category, excluding the current product
      let results = mockProducts.filter((p) => p.id !== Number(productId) && p.themeCategory === category)

      // If we don't have enough related products, add some from other categories
      if (results.length < 4) {
        const otherProducts = mockProducts.filter((p) => p.id !== Number(productId) && p.themeCategory !== category)

        // Randomly select products to fill up to 4
        while (results.length < 4 && otherProducts.length > 0) {
          const randomIndex = Math.floor(Math.random() * otherProducts.length)
          results.push(otherProducts.splice(randomIndex, 1)[0])
        }
      }

      // Limit to 4 products
      results = results.slice(0, 4)

      resolve(results)
    }, 300)
  })
}

// Create a new product
export async function createProduct(productData) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newProduct = {
        id: mockProducts.length + 1,
        ...productData,
        createdAt: new Date().toISOString(),
      }

      mockProducts.push(newProduct)
      resolve(newProduct)
    }, 500)
  })
}

// Update a product
export async function updateProduct(id, productData) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockProducts.findIndex((p) => p.id === Number(id))

      if (index === -1) {
        reject(new Error("Product not found"))
        return
      }

      mockProducts[index] = {
        ...mockProducts[index],
        ...productData,
        id: Number(id), // Ensure ID doesn't change
      }

      resolve(mockProducts[index])
    }, 500)
  })
}

// Delete a product
export async function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockProducts.findIndex((p) => p.id === Number(id))

      if (index === -1) {
        reject(new Error("Product not found"))
        return
      }

      const deletedProduct = mockProducts.splice(index, 1)[0]
      resolve(deletedProduct)
    }, 500)
  })
}
