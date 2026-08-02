export interface Product {
  id: string;
  name: string;
  code: string;
  category: string;
  series: string;
  description: string;
  features: string[];
  specs: {
    base: string;
    mechanism: string;
    upholstery: string;
    castors: string;
  };
  isFeatured?: boolean;
}

export const CATEGORIES = [
  {
    id: "executive",
    name: "Executive Chairs",
    description: "High-back leadership seating crafted in premium cognac leather and polished chrome.",
    image: "/images/hero_designer.jpg",
  },
  {
    id: "director",
    name: "Director Chairs",
    description: "Editorial ergonomic designs matching aesthetic harmony with posture support.",
    image: "/images/hero_designer.jpg",
  },
  {
    id: "mesh",
    name: "Mesh Chairs",
    description: "Highly breathable high-performance mesh chairs engineered for intensive work.",
    image: "/images/hero_designer.jpg",
  },
  {
    id: "visitor",
    name: "Visitor Chairs",
    description: "Premium cantilever base seating for corporate suites and lounges.",
    image: "/images/hero_designer.jpg",
  },
  {
    id: "conference",
    name: "Conference Chairs",
    description: "Sleek low-back design with torsion bar mechanism for boardroom discussions.",
    image: "/images/hero_designer.jpg",
  },
  {
    id: "workstation",
    name: "Workstation Chairs",
    description: "Mid-back task seating designed for modern agile workforces.",
    image: "/images/hero_designer.jpg",
  },
  {
    id: "cafe",
    name: "Café Seating",
    description: "Vibrant and sculptural lounge seating designed for collaborative breakout zones.",
    image: "/images/hero_designer.jpg",
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "platinum-101",
    name: "Platinum 101",
    code: "PL-101",
    category: "Director Chairs",
    series: "Platinum Series",
    description: "Our flagship executive seating designed for the modern board leader. A pure passion for high-quality, natural materials and best workmanship.",
    features: [
      "Extra high-back posture support",
      "Multilock synchro knee-tilt mechanism",
      "Padded leather-wrapped chrome armrests",
      "Heavy duty aluminum alloy base"
    ],
    specs: {
      base: "Polished Aluminum Alloy (BIFMA Certified)",
      mechanism: "Knee-tilt Synchro Mechanism with 4 Lock Positions",
      upholstery: "Nappa Leather / Premium Cognac Leather Option",
      castors: "65mm Noise-free PU Castors"
    },
    isFeatured: true
  },
  {
    id: "gold-103",
    name: "Gold 103",
    code: "GD-103",
    category: "Director Chairs",
    series: "Platinum Series",
    description: "Developed according to the latest ergonomic findings, providing a seamless interaction between the user and the chair.",
    features: [
      "Adjustable active lumbar support",
      "Pneumatic gas lift height adjustment",
      "Genuine leather front with breathable backing",
      "Premium padding with high-resilience foam"
    ],
    specs: {
      base: "Reinforced Chrome Plated Steel Base",
      mechanism: "Center-tilt Synchro Mechanism",
      upholstery: "Premium Leatherette / Genuine Leather Front",
      castors: "Anti-skid Nylon Castors"
    },
    isFeatured: true
  },
  {
    id: "diamond-106",
    name: "Diamond 106",
    code: "DM-106",
    category: "Executive Chairs",
    series: "Director Series",
    description: "A design that projects ergonomic functionality and aesthetic harmony, perfect for executive cabins and corporate suites.",
    features: [
      "Waterfall seat design reduces leg strain",
      "Padded headrest integrated into back frame",
      "3D adjustable armrests (Height, Angle, Depth)",
      "Brushed steel finish details"
    ],
    specs: {
      base: "Polished Diecast Aluminum Base",
      mechanism: "Self-weight Adjusting Synchro-tilt",
      upholstery: "Italian Top-Grain Leather",
      castors: "High-durability Twin Wheel PU Castors"
    },
    isFeatured: true
  },
  {
    id: "lotus-114",
    name: "Lotus 114",
    code: "LT-114",
    category: "Director Chairs",
    series: "Director Series",
    description: "A premium high-back posture chair offering full-body support, aesthetic elegance, and exceptional durability.",
    features: [
      "S-curved back design mimicking spine anatomy",
      "Integrated flexible headrest support",
      "Chrome accented side panels",
      "Torsion bar tilt stiffness adjuster"
    ],
    specs: {
      base: "Premium Polish Chrome Base",
      mechanism: "Tilt Lock Synchro Mechanism",
      upholstery: "Soft-touch Premium Fabric / Leather Options",
      castors: "Dual Wheel Castors"
    },
    isFeatured: true
  },
  {
    id: "heaven-125",
    name: "Heaven 125",
    code: "HV-125",
    category: "Mesh Chairs",
    series: "Mesh Series",
    description: "Timeless design and advanced technical capability delivering ergonomic excellence for intensive working environments.",
    features: [
      "Korean high-elastic mesh backing",
      "Fully adjustable 2D lumbar pad",
      "Depth-adjustable sliding seat panel",
      "Padded 4D armrests"
    ],
    specs: {
      base: "Designer Nylon Base with Color Accent",
      mechanism: "Advanced Synchro Slide-tilt",
      upholstery: "Breathable Mesh Back + High Density Fabric Seat",
      castors: "Nylon Alloy Castors"
    },
    isFeatured: true
  },
  {
    id: "cafe-flexi",
    name: "Flexi 134",
    code: "FX-134",
    category: "Café Seating",
    series: "Café Series",
    description: "Vibrant, lightweight, and modern sculptural seating designed to add aesthetic flair to collaboration zones and breakout areas.",
    features: [
      "Ergonomically contoured single-piece shell",
      "Solid ash wood legs with steel brackets",
      "Stackable up to 4 chairs",
      "Available in customized brand colors"
    ],
    specs: {
      base: "Solid Hardwood Legs with Anti-scratch Glides",
      mechanism: "Fixed Lounge Shell",
      upholstery: "Molded Polypropylene with Soft-padded Seat",
      castors: "None (Fixed Glides)"
    },
    isFeatured: true
  }
];

export const SHOWCASE_COLLECTIONS = [
  {
    id: "platinum-101",
    title: "Platinum 101",
    description: "Our flagship executive seating designed for the modern board leader. A pure passion for high-quality, natural materials and best workmanship.",
    price: "499",
    image: "/images/platinum-101-black.png",
    features: ["Genuine Leather", "Synchro Mechanism", "Chrome Base"]
  },
  {
    id: "gold-series",
    title: "Gold Series",
    description: "Developed according to the latest ergonomic findings, providing a seamless interaction between the user and the chair.",
    price: "399",
    image: "/images/executive-chair-new.png",
    features: ["Active Lumbar", "Ergonomic Foam", "Adjustable Armrests"]
  },
  {
    id: "executive-series",
    title: "Executive Series",
    description: "A design that projects ergonomic functionality and aesthetic harmony, perfect for executive cabins and corporate suites.",
    price: "349",
    image: "/images/director-chair-new.png",
    features: ["Posture Support", "Waterfall Seat", "Polished Aluminum"]
  },
  {
    id: "director-series",
    title: "Director Series",
    description: "A premium high-back posture chair offering full-body support, aesthetic elegance, and exceptional durability.",
    price: "299",
    image: "/images/executive-chair-new.png",
    features: ["S-Curved Back", "Flexible Headrest", "Torsion Bar Tilt"]
  },
  {
    id: "mesh-collection",
    title: "Mesh Collection",
    description: "Highly breathable high-performance mesh chairs engineered for intensive work.",
    price: "249",
    image: "/images/blue-mesh-chair.png",
    features: ["Elastic Mesh", "2D Lumbar", "Slide-tilt"]
  },
  {
    id: "visitor-collection",
    title: "Visitor Collection",
    description: "Premium cantilever base seating for corporate suites and lounges.",
    price: "199",
    image: "/images/visitor-chair-new.png",
    features: ["Cantilever Base", "Leatherette", "Anti-skid Glides"]
  },
  {
    id: "conference-collection",
    title: "Conference Collection",
    description: "Sleek low-back design with torsion bar mechanism for boardroom discussions.",
    price: "229",
    image: "/images/conference-chair-new.png",
    features: ["Low-back Profile", "Torsion Bar", "Sleek Armrests"]
  },
  {
    id: "workstation-collection",
    title: "Workstation Collection",
    description: "Mid-back task seating designed for modern agile workforces.",
    price: "179",
    image: "/images/workstation-chair-transparent.png",
    features: ["Mid-back Support", "Agile Mobility", "Fabric Seat"]
  },
  {
    id: "cafe-collection",
    title: "Café Collection",
    description: "Vibrant, lightweight, and modern sculptural seating designed to add aesthetic flair to breakout areas.",
    price: "129",
    image: "/images/cafe-chair-new.png",
    features: ["Stackable", "Hardwood Legs", "Polypropylene Shell"]
  }
];
