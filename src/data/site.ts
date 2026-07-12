export const SITE = {
  name: 'Drawinging',
  domain: 'https://drawinging.com',
  tagline: 'Learn to draw, one clear step at a time',
  description:
    'Drawinging offers organized step-by-step drawing tutorials, beginner-friendly lessons, category collections, and printable worksheets.',
  email: 'hello@drawinging.com',
  locale: 'en_US',
  twitter: '@drawinging',
  author: 'Drawinging Editorial',
} as const;

export const NAV_PRIMARY = [
  { label: 'Home', href: '/' },
  { label: 'Drawing Tutorials', href: '/drawing-tutorials/' },
  { label: 'Categories', href: '/#categories', mega: true },
  { label: 'Easy Drawings', href: '/easy-drawings/' },
  { label: 'Worksheets', href: '/worksheets/' },
  { label: 'Learn Drawing', href: '/learn-drawing/' },
  { label: 'Search', href: '/search/' },
] as const;

export const CATEGORY_META: Record<
  string,
  { name: string; permalink: string; focus: string; description: string; icon: string }
> = {
  'flower-drawings': {
    name: 'Flower Drawings',
    permalink: '/flower-drawings/',
    focus: 'flower drawing tutorials',
    description:
      'Browse flower drawing tutorials by subject and difficulty. Use this hub to find rose, sunflower, tulip, and more flower lessons with worksheets.',
    icon: '/icons/flower.svg',
  },
  'animal-drawings': {
    name: 'Animal Drawings',
    permalink: '/animal-drawings/',
    focus: 'animal drawing tutorials',
    description:
      'Explore animal drawing tutorials for cats, dogs, horses, lions, and other friendly subjects with clear construction steps.',
    icon: '/icons/animal.svg',
  },
  'bird-drawings': {
    name: 'Bird Drawings',
    permalink: '/bird-drawings/',
    focus: 'bird drawing tutorials',
    description:
      'Bird drawing tutorials that break wings, beaks, and posture into simple shapes before adding detail.',
    icon: '/icons/bird.svg',
  },
  'insect-drawings': {
    name: 'Insect Drawings',
    permalink: '/insect-drawings/',
    focus: 'insect drawing tutorials',
    description:
      'Learn insect drawing with symmetry-friendly lessons for butterflies, bees, and related subjects.',
    icon: '/icons/insect.svg',
  },
  'sea-animal-drawings': {
    name: 'Sea Animal Drawings',
    permalink: '/sea-animal-drawings/',
    focus: 'sea animal drawing tutorials',
    description:
      'Sea animal drawing tutorials covering fish, sharks, dolphins, and smooth underwater forms.',
    icon: '/icons/sea.svg',
  },
  'nature-drawings': {
    name: 'Nature Drawings',
    permalink: '/nature-drawings/',
    focus: 'nature drawing tutorials',
    description:
      'Nature drawing tutorials for trees, clouds, mountains, sunsets, and outdoor scenes.',
    icon: '/icons/nature.svg',
  },
  'vehicle-drawings': {
    name: 'Vehicle Drawings',
    permalink: '/vehicle-drawings/',
    focus: 'vehicle drawing tutorials',
    description:
      'Vehicle drawing tutorials that teach proportion, wheel placement, and simple perspective.',
    icon: '/icons/vehicle.svg',
  },
  'sports-drawings': {
    name: 'Sports Drawings',
    permalink: '/sports-drawings/',
    focus: 'sports drawing tutorials',
    description:
      'Sports drawing tutorials for balls and gear with clean geometry and panel patterns.',
    icon: '/icons/sports.svg',
  },
  'seasonal-drawings': {
    name: 'Seasonal Drawings',
    permalink: '/seasonal-drawings/',
    focus: 'seasonal drawing tutorials',
    description:
      'Seasonal drawing tutorials for holidays and celebrations, from Christmas trees to pumpkins.',
    icon: '/icons/seasonal.svg',
  },
  'fantasy-drawings': {
    name: 'Fantasy Drawings',
    permalink: '/fantasy-drawings/',
    focus: 'fantasy drawing tutorials',
    description:
      'Fantasy drawing tutorials for dragons, unicorns, and imaginative creatures built from solid basics.',
    icon: '/icons/fantasy.svg',
  },
  'symbol-drawings': {
    name: 'Symbol Drawings',
    permalink: '/symbol-drawings/',
    focus: 'symbol drawing tutorials',
    description:
      'Symbol drawing tutorials for hearts, stars, eyes, and other icons with clean line control.',
    icon: '/icons/symbol.svg',
  },
};

export const LEARN_GUIDES = [
  {
    slug: 'basic-shapes',
    title: 'Basic Shapes for Drawing',
    description: 'Build any subject from circles, ovals, boxes, and simple guidelines.',
  },
  {
    slug: 'line-control',
    title: 'Line Control Practice',
    description: 'Steady your hand with pressure, speed, and confident contour drills.',
  },
  {
    slug: 'proportions',
    title: 'Drawing Proportions',
    description: 'Compare sizes and distances so features land in the right place.',
  },
  {
    slug: 'shading',
    title: 'Pencil Shading Basics',
    description: 'Learn value scales, soft edges, and simple light direction.',
  },
  {
    slug: 'perspective',
    title: 'Simple Perspective',
    description: 'Use horizon lines and vanishing points for believable depth.',
  },
  {
    slug: 'pencil-techniques',
    title: 'Pencil Techniques',
    description: 'Hatching, layering, erasing, and line weight for clearer drawings.',
  },
] as const;
