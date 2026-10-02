/**
 * Fonte única de conteúdo do veículo.
 * Trocar o carro = editar este arquivo + os assets em src/assets/.
 */
import { media, type ImageAsset } from './assets';

export const brand = {
  name: 'Orvane',
  tagline: 'Precision, in motion.',
};

export const car = {
  name: 'VX6',
  fullName: 'Orvane VX6',
  year: 2026,
  bodyStyle: 'Grand Coupé',
  heroSubtitle: 'The next generation of performance.',
  heroStatement: 'The most advanced grand coupé we have ever built — engineered to push boundaries and redefine performance.',

  acceleration: '3.6s',
  topSpeed: '285 km/h',
  power: '639 HP',

  metrics: [
    { label: '0–100 km/h', value: 3.6, decimals: 1, unit: 'sec' },
    { label: 'Top speed', value: 285, decimals: 0, unit: 'km/h' },
    { label: 'Power', value: 639, decimals: 0, unit: 'hp' },
  ],

  intro: {
    headline: ['Engineered', 'without', 'compromise.'],
    body: 'Every line of the VX6 answers to a single brief: remove whatever stands between driver and road. A hybrid V8 delivers instant torque, an adaptive chassis reads the surface a hundred times a second, and a cabin built around the driver keeps every decision within reach. Nothing added for effect. Nothing left to chance.',
  },

  performance: {
    title: 'Performance',
    subtitle: 'Built for the moment.',
    body: 'A 4.0-litre twin-turbo V8 paired with an axial-flux electric motor. Power arrives the instant you ask for it — and keeps arriving.',
  },

  form: ['Form', 'meets', 'function.'],

  design: [
    {
      id: 'exterior',
      index: '01',
      title: 'Exterior',
      body: 'A single unbroken line runs from the headlight to the ducktail. Wide haunches, a low glasshouse and a full-width light signature give the VX6 a stance that reads as speed — even at rest.',
      image: media.design.exterior,
      alt: 'Orvane VX6 in Ember Red, side profile in a grey studio',
    },
    {
      id: 'interior',
      index: '02',
      title: 'Interior',
      body: 'Hand-stitched leather, open-pore carbon and a curved 14.5-inch driver display. Every surface you touch is real; every control sits exactly where your hand expects it.',
      image: media.design.interior,
      alt: 'Orvane VX6 cockpit with red leather trim and curved display',
    },
  ] satisfies DesignBlock[],

  technology: {
    headline: ['Technology', 'that moves', 'with you.'],
    features: [
      {
        title: 'Digital Cockpit',
        body: 'A curved, anti-glare display shows only what matters for the moment — from track telemetry to a single quiet speed reading.',
      },
      {
        title: 'Intelligent Drive',
        body: 'Predictive assistance reads the road ahead, adjusting torque split and steering response before you reach the corner.',
      },
      {
        title: 'Adaptive Dynamics',
        body: 'Active anti-roll, rear-axle steering and magnetic dampers re-tune the chassis 1,000 times per second.',
      },
      {
        title: 'Connected Experience',
        body: 'Your profile, routes and drive settings follow you — from phone to car, and from car to car.',
      },
    ],
  },

  finalCta: {
    headline: ['Ready to', 'experience', 'the new VX6?'],
    button: 'Explore the model',
  },
};

export interface DesignBlock {
  id: string;
  index: string;
  title: string;
  body: string;
  image: ImageAsset;
  alt: string;
}

/* ───────────── Configurator ───────────── */
export const configurator = {
  exterior: [
    { id: 'black', name: 'Obsidian Black', swatch: '#141416' },
    { id: 'white', name: 'Glacier White', swatch: '#e2e1dc' },
    { id: 'red', name: 'Ember Red', swatch: '#7c0d14' },
    { id: 'silver', name: 'Mercury Silver', swatch: '#9a9ea3' },
  ],
  wheels: [
    { id: '20', name: '20" Aero forged' },
    { id: '21', name: '21" Performance forged' },
  ],
  interior: [
    { id: 'black', name: 'Onyx Leather', swatch: '#1b1c1e' },
    { id: 'red', name: 'Rosso Leather', swatch: '#6d0b11' },
    { id: 'carbon', name: 'Carbon Weave', swatch: 'repeating-linear-gradient(45deg,#26282d 0 4px,#141518 4px 8px)' },
  ],
} as const;

export type Paint = (typeof configurator.exterior)[number]['id'];
export type Wheels = (typeof configurator.wheels)[number]['id'];
export type Trim = (typeof configurator.interior)[number]['id'];

/* ───────────── Gallery ───────────── */
export interface GalleryItem {
  id: string;
  image: ImageAsset;
  alt: string;
  caption: string;
  /** layout slot — see Gallery.tsx */
  slot: 'large' | 'small' | 'wide' | 'tall' | 'horizontal' | 'inset' | 'full';
}

export const gallery: GalleryItem[] = [
  { id: 'avenue', image: media.street, alt: 'White VX6 driving down a palm-lined avenue', caption: 'Avenue, late afternoon', slot: 'large' },
  { id: 'wheel', image: media.detail.wheel, alt: 'Close-up of the 21-inch forged wheel and red brake caliper', caption: '21" Performance forged wheel', slot: 'small' },
  { id: 'headlight', image: media.detail.headlight, alt: 'Full-width headlight signature glowing in darkness', caption: 'Light signature', slot: 'wide' },
  { id: 'profile', image: media.detail.profile, alt: 'Silver VX6 roofline and glasshouse in a studio', caption: 'Mercury Silver', slot: 'horizontal' },
  { id: 'approach', image: media.streetTall, alt: 'White VX6 approaching under the palms', caption: 'Glacier White', slot: 'tall' },
  { id: 'carbon', image: media.interior('carbon'), alt: 'Cockpit trimmed in carbon weave', caption: 'Carbon Weave interior', slot: 'inset' },
  { id: 'night', image: media.nightHero, alt: 'Obsidian Black VX6 lit only by its lights', caption: 'Obsidian Black', slot: 'full' },
];

/* ───────────── Navigation ───────────── */
export const nav = [
  { label: 'Model', href: '#top' },
  { label: 'Performance', href: '#performance' },
  { label: 'Design', href: '#design' },
  { label: 'Technology', href: '#technology' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Configure', href: '#configure' },
  { label: 'Contact', href: '#contact' },
];

export const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'YouTube', href: '#' },
  { label: 'LinkedIn', href: '#' },
];
