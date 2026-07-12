import { mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '../..');
const launchPath = path.join(rootDir, 'planning/launch-tutorials.json');
const tutorialsDir = path.join(rootDir, 'src/content/tutorials');
const guidesDir = path.join(rootDir, 'src/content/guides');

const guideSlugs = [
  'basic-shapes',
  'line-control',
  'proportions',
  'shading',
  'perspective',
  'pencil-techniques',
];

const categoryGuideMap = {
  'flower-drawings': ['basic-shapes', 'line-control', 'shading'],
  'animal-drawings': ['basic-shapes', 'proportions', 'pencil-techniques'],
  'bird-drawings': ['basic-shapes', 'proportions', 'line-control'],
  'insect-drawings': ['basic-shapes', 'line-control', 'proportions'],
  'sea-animal-drawings': ['basic-shapes', 'line-control', 'shading'],
  'nature-drawings': ['basic-shapes', 'shading', 'perspective'],
  'vehicle-drawings': ['basic-shapes', 'proportions', 'perspective'],
  'sports-drawings': ['basic-shapes', 'line-control', 'shading'],
  'seasonal-drawings': ['basic-shapes', 'line-control', 'shading'],
  'fantasy-drawings': ['basic-shapes', 'proportions', 'pencil-techniques', 'shading'],
  'symbol-drawings': ['line-control', 'basic-shapes', 'shading'],
};

const relatedCategoryMap = {
  'flower-drawings': ['nature-drawings', 'seasonal-drawings'],
  'animal-drawings': ['bird-drawings', 'sea-animal-drawings', 'fantasy-drawings'],
  'bird-drawings': ['animal-drawings', 'insect-drawings'],
  'insect-drawings': ['bird-drawings', 'flower-drawings'],
  'sea-animal-drawings': ['animal-drawings', 'nature-drawings'],
  'nature-drawings': ['flower-drawings', 'seasonal-drawings', 'vehicle-drawings'],
  'vehicle-drawings': ['sports-drawings', 'nature-drawings'],
  'sports-drawings': ['symbol-drawings', 'vehicle-drawings'],
  'seasonal-drawings': ['nature-drawings', 'symbol-drawings', 'flower-drawings'],
  'fantasy-drawings': ['animal-drawings', 'symbol-drawings'],
  'symbol-drawings': ['sports-drawings', 'seasonal-drawings', 'nature-drawings'],
};

const profiles = {
  'flower-drawing': {
    subject: 'flower',
    titleSubject: 'Flower',
    article: 'a',
    entities: ['petals', 'stem', 'leaves', 'center disk', 'bud', 'sepals', 'veins', 'overlap', 'blossom'],
    construction: 'round center, soft petal ring, and gently bending stem',
    texture: 'petal veins and leaf edges',
    setting: 'garden sketch page',
    silhouette: 'open bloom with a light stem curve',
    detail: 'alternate petal lengths around the center so the blossom does not look stamped',
  },
  'rose-drawing': {
    subject: 'rose',
    titleSubject: 'Rose',
    article: 'a',
    entities: ['spiral center', 'outer petals', 'rosebud', 'stem', 'thorns', 'leaflets', 'sepals', 'folded edges', 'petal cup'],
    construction: 'small spiral, cupped petal layers, and a narrow supporting stem',
    texture: 'folded petal lips and serrated leaflets',
    setting: 'single bloom study',
    silhouette: 'rounded rose head with petals opening outward',
    detail: 'let each petal tuck partly behind another so the bloom feels layered',
  },
  'sunflower-drawing': {
    subject: 'sunflower',
    titleSubject: 'Sunflower',
    article: 'a',
    entities: ['seed disk', 'ray petals', 'stalk', 'broad leaves', 'petal tips', 'seed pattern', 'bracts', 'leaf veins', 'flower head'],
    construction: 'large circular seed disk, long ray petals, and a sturdy stalk',
    texture: 'seed dots and broad leaf veins',
    setting: 'summer garden study',
    silhouette: 'wide flower head with a tall vertical stem',
    detail: 'stagger the ray petals so the crown feels full without becoming crowded',
  },
  'hibiscus-flower-drawing': {
    subject: 'hibiscus flower',
    titleSubject: 'Hibiscus Flower',
    article: 'a',
    entities: ['ruffled petals', 'stamen column', 'anthers', 'petal veins', 'calyx', 'folds', 'throat', 'leaf blade', 'tropical bloom'],
    construction: 'five broad petals, a long stamen column, and visible petal folds',
    texture: 'ruffled petal rims and fine throat veins',
    setting: 'tropical botanical sketch',
    silhouette: 'open star-like flower with a forward stamen',
    detail: 'curve the petal edges differently so the hibiscus keeps its loose tropical shape',
  },
  'tulip-drawing': {
    subject: 'tulip',
    titleSubject: 'Tulip',
    article: 'a',
    entities: ['cup petals', 'stem', 'long leaves', 'petal seam', 'inner bloom', 'leaf curve', 'bulb shape', 'folded rim', 'flower cup'],
    construction: 'oval cup, overlapping petal seams, and long ribbon-like leaves',
    texture: 'smooth petal seams and tapering leaf veins',
    setting: 'spring flower sketch',
    silhouette: 'simple cup flower with a clean upright stem',
    detail: 'keep the cup narrow at the base and wider near the folded rim',
  },
  'cat-drawing': {
    subject: 'cat',
    titleSubject: 'Cat',
    article: 'a',
    entities: ['ears', 'muzzle', 'whiskers', 'paws', 'tail', 'fur tufts', 'eyes', 'nose bridge', 'shoulders'],
    construction: 'oval head, compact body, triangular ears, and curled tail',
    texture: 'short fur strokes and whisker roots',
    setting: 'seated pet pose',
    silhouette: 'alert ears with a relaxed sitting body',
    detail: 'place the muzzle low on the face so the eyes have enough room above it',
  },
  'dog-drawing': {
    subject: 'dog',
    titleSubject: 'Dog',
    article: 'a',
    entities: ['snout', 'floppy ears', 'collar', 'paws', 'tail', 'chest', 'nose', 'fur patches', 'brow'],
    construction: 'rounded head, soft snout, sturdy chest, and friendly paws',
    texture: 'fur patches and nose shine',
    setting: 'front-facing pet portrait',
    silhouette: 'friendly face with balanced ears and paws',
    detail: 'angle the snout slightly downward to give the dog a gentle expression',
  },
  'horse-drawing': {
    subject: 'horse',
    titleSubject: 'Horse',
    article: 'a',
    entities: ['mane', 'muzzle', 'withers', 'hooves', 'tail', 'fetlocks', 'chest', 'leg joints', 'neck arch'],
    construction: 'long neck, barrel body, angled legs, and tapered muzzle',
    texture: 'flowing mane and hoof edges',
    setting: 'standing side-view study',
    silhouette: 'strong neck arc over a long body',
    detail: 'mark the knee and hock joints before drawing the lower legs',
  },
  'lion-drawing': {
    subject: 'lion',
    titleSubject: 'Lion',
    article: 'a',
    entities: ['mane', 'muzzle', 'nose', 'ears', 'paws', 'tail tuft', 'brow ridge', 'whisker pads', 'chest fur'],
    construction: 'large mane mass, squared muzzle, and powerful front paws',
    texture: 'mane locks and short muzzle fur',
    setting: 'calm lion portrait',
    silhouette: 'round mane framing a strong face',
    detail: 'build the mane as layered locks rather than one flat circle',
  },
  'bunny-drawing': {
    subject: 'bunny',
    titleSubject: 'Bunny',
    article: 'a',
    entities: ['long ears', 'round cheeks', 'nose', 'whiskers', 'hind feet', 'tail puff', 'front paws', 'fur', 'eye shine'],
    construction: 'round head, oval body, long ears, and small tucked paws',
    texture: 'soft fur fluff and tail puff',
    setting: 'quiet sitting pose',
    silhouette: 'rounded body with tall gentle ears',
    detail: 'tilt one ear a little to keep the pose natural and relaxed',
  },
  'fox-drawing': {
    subject: 'fox',
    titleSubject: 'Fox',
    article: 'a',
    entities: ['pointed ears', 'narrow muzzle', 'bushy tail', 'white chest', 'paws', 'mask markings', 'nose', 'fur tufts', 'leg taper'],
    construction: 'triangular face, slim body, pointed ears, and oversized tail',
    texture: 'tail fur and cheek tufts',
    setting: 'woodland side pose',
    silhouette: 'sharp ears balanced by a sweeping tail',
    detail: 'use angular cheek lines to separate the fox mask from the muzzle',
  },
  'bird-drawing': {
    subject: 'bird',
    titleSubject: 'Bird',
    article: 'a',
    entities: ['beak', 'wing', 'tail feathers', 'perch', 'eye', 'breast', 'feet', 'flight feathers', 'crown'],
    construction: 'teardrop body, small head, pointed beak, and folded wing',
    texture: 'feather groups and tiny feet',
    setting: 'bird on a perch',
    silhouette: 'small rounded body with a neat tail angle',
    detail: 'divide the wing into simple feather bands before adding individual marks',
  },
  'owl-drawing': {
    subject: 'owl',
    titleSubject: 'Owl',
    article: 'an',
    entities: ['facial disk', 'large eyes', 'beak', 'ear tufts', 'wings', 'talons', 'feather spots', 'belly', 'branch'],
    construction: 'wide head, oval body, facial disk, and short curved beak',
    texture: 'speckled feathers and talon hooks',
    setting: 'owl perched on a branch',
    silhouette: 'wide-eyed body with compact wings',
    detail: 'center the beak between the eyes so the facial disk stays symmetrical',
  },
  'butterfly-drawing': {
    subject: 'butterfly',
    titleSubject: 'Butterfly',
    article: 'a',
    entities: ['upper wings', 'lower wings', 'antennae', 'body segments', 'wing veins', 'spots', 'symmetry line', 'thorax', 'pattern bands'],
    construction: 'straight body axis, paired wings, and mirrored pattern bands',
    texture: 'wing veins and decorative spots',
    setting: 'symmetry practice page',
    silhouette: 'balanced open wings around a slim body',
    detail: 'draw matching landmarks on both wings before filling the patterns',
  },
  'bee-drawing': {
    subject: 'bee',
    titleSubject: 'Bee',
    article: 'a',
    entities: ['wings', 'stripes', 'antennae', 'thorax', 'abdomen', 'legs', 'pollen basket', 'stinger', 'compound eyes'],
    construction: 'round head, striped abdomen, small thorax, and clear wings',
    texture: 'fuzzy thorax and transparent wing veins',
    setting: 'garden insect study',
    silhouette: 'plump striped body with light oval wings',
    detail: 'curve the stripes around the abdomen so the bee looks rounded',
  },
  'fish-drawing': {
    subject: 'fish',
    titleSubject: 'Fish',
    article: 'a',
    entities: ['tail fin', 'dorsal fin', 'gill cover', 'scales', 'eye', 'mouth', 'belly line', 'pectoral fin', 'lateral line'],
    construction: 'oval body, triangular tail fin, gill curve, and simple fins',
    texture: 'scale rows and fin rays',
    setting: 'side-view aquarium sketch',
    silhouette: 'streamlined oval body with a crisp tail',
    detail: 'align the fins to the body curve so they feel attached, not pasted on',
  },
  'shark-drawing': {
    subject: 'shark',
    titleSubject: 'Shark',
    article: 'a',
    entities: ['dorsal fin', 'tail fin', 'gill slits', 'snout', 'belly', 'pectoral fins', 'eye', 'mouth line', 'body taper'],
    construction: 'torpedo body, tall dorsal fin, pointed snout, and crescent tail',
    texture: 'gill slits and subtle belly plane',
    setting: 'moving ocean predator pose',
    silhouette: 'long tapered body with sharp fins',
    detail: 'keep the belly line slightly curved so the shark has weight and motion',
  },
  'dolphin-drawing': {
    subject: 'dolphin',
    titleSubject: 'Dolphin',
    article: 'a',
    entities: ['beak', 'dorsal fin', 'flippers', 'tail flukes', 'melon', 'belly curve', 'eye', 'smile line', 'body arc'],
    construction: 'smooth body arc, rounded melon, beak, flippers, and flukes',
    texture: 'clean water-sleek shading',
    setting: 'leaping ocean pose',
    silhouette: 'curved body with lifted flukes',
    detail: 'let the top line flow from the melon through the dorsal fin without a hard break',
  },
  'tree-drawing': {
    subject: 'tree',
    titleSubject: 'Tree',
    article: 'a',
    entities: ['trunk', 'branches', 'canopy', 'roots', 'bark texture', 'leaf clusters', 'branch forks', 'shadow base', 'crown'],
    construction: 'tapered trunk, branching limbs, root flare, and grouped canopy',
    texture: 'bark marks and clustered leaves',
    setting: 'simple landscape study',
    silhouette: 'stable trunk with a broad leafy crown',
    detail: 'vary the canopy edge with small bumps instead of one smooth cloud shape',
  },
  'cloud-drawing': {
    subject: 'cloud',
    titleSubject: 'Cloud',
    article: 'a',
    entities: ['puffy lobes', 'base shadow', 'soft edges', 'highlight', 'overlap', 'vapor mass', 'sky space', 'value gradient', 'rim'],
    construction: 'overlapping puffy lobes, a flatter base, and soft shadow shapes',
    texture: 'soft edge transitions and vapor shadows',
    setting: 'open sky sketch',
    silhouette: 'layered puffs with a quiet underside',
    detail: 'keep the lower edge calmer than the top so the cloud has believable weight',
  },
  'sunset-drawing': {
    subject: 'sunset',
    titleSubject: 'Sunset',
    article: 'a',
    entities: ['horizon line', 'sun disk', 'cloud bands', 'water reflection', 'silhouette', 'gradient', 'distant hills', 'sky glow', 'foreground'],
    construction: 'low horizon, round sun disk, layered clouds, and simple silhouettes',
    texture: 'sky gradient and reflected light bands',
    setting: 'evening landscape scene',
    silhouette: 'wide horizon with glowing sky bands',
    detail: 'place the darkest silhouettes after the glow so the contrast stays clean',
  },
  'mountain-drawing': {
    subject: 'mountain',
    titleSubject: 'Mountain',
    article: 'a',
    entities: ['ridge line', 'peak', 'slope', 'snow cap', 'tree line', 'valley', 'rock planes', 'foreground', 'shadow side'],
    construction: 'main peak, uneven ridge, angled slopes, and foreground base',
    texture: 'rock planes and snow cap edges',
    setting: 'quiet alpine landscape',
    silhouette: 'jagged ridge with a broad lower slope',
    detail: 'break the ridge into unequal angles so the mountain avoids a triangle look',
  },
  'car-drawing': {
    subject: 'car',
    titleSubject: 'Car',
    article: 'a',
    entities: ['wheelbase', 'tires', 'windshield', 'hood', 'roofline', 'bumper', 'headlights', 'door seam', 'axles'],
    construction: 'low body box, measured wheelbase, arched roofline, and two even tires',
    texture: 'tire rims and window reflections',
    setting: 'side-view vehicle sketch',
    silhouette: 'long body with balanced wheels and roof',
    detail: 'measure the wheel centers first so the body does not drift forward or back',
  },
  'plane-drawing': {
    subject: 'plane',
    titleSubject: 'Plane',
    article: 'a',
    entities: ['fuselage', 'wings', 'tail fin', 'cockpit', 'nose cone', 'engine', 'landing gear', 'windows', 'wing tips'],
    construction: 'long fuselage, swept wings, cockpit, tail fin, and nose cone',
    texture: 'window row and panel seams',
    setting: 'simple aircraft side angle',
    silhouette: 'sleek fuselage with clear wing shapes',
    detail: 'line up the tail fin with the fuselage center so the plane feels balanced',
  },
  'train-drawing': {
    subject: 'train',
    titleSubject: 'Train',
    article: 'a',
    entities: ['engine cab', 'wheels', 'smokestack', 'cowcatcher', 'windows', 'rails', 'carriage', 'boiler', 'headlamp'],
    construction: 'engine block, round wheels, cab, smokestack, and rail line',
    texture: 'metal panels and wheel spokes',
    setting: 'classic engine on tracks',
    silhouette: 'boxy engine with repeated wheels',
    detail: 'keep the wheel bottoms on one rail line before adding the cab and boiler',
  },
  'volleyball-drawing': {
    subject: 'volleyball',
    titleSubject: 'Volleyball',
    article: 'a',
    entities: ['sphere', 'curved panels', 'seams', 'highlight', 'shadow crescent', 'panel bands', 'center axis', 'rim curve', 'cast shadow'],
    construction: 'clean circle, curved panel seams, and a small cast shadow',
    texture: 'panel curves and light surface grain',
    setting: 'sports ball study',
    silhouette: 'round ball with sweeping seam panels',
    detail: 'wrap each seam around the sphere instead of drawing flat stripes',
  },
  'soccer-ball-drawing': {
    subject: 'soccer ball',
    titleSubject: 'Soccer Ball',
    article: 'a',
    entities: ['sphere', 'pentagons', 'hexagons', 'panels', 'seams', 'center patch', 'curved grid', 'highlight', 'cast shadow'],
    construction: 'large circle, central pentagon, surrounding panels, and curved seams',
    texture: 'stitched seams and shaded panels',
    setting: 'sports geometry sketch',
    silhouette: 'round ball with clear panel structure',
    detail: 'bend the outer panels with the circle so the pattern sits on a sphere',
  },
  'christmas-tree-drawing': {
    subject: 'christmas tree',
    titleSubject: 'Christmas Tree',
    article: 'a',
    entities: ['evergreen tiers', 'star topper', 'ornaments', 'trunk', 'garland', 'branches', 'needles', 'tree skirt', 'lights'],
    construction: 'stacked evergreen tiers, narrow trunk, star topper, and ornaments',
    texture: 'needle edges and garland curves',
    setting: 'holiday decoration sketch',
    silhouette: 'tiered triangle tree with festive details',
    detail: 'offset the branch tiers so the tree looks full rather than perfectly flat',
  },
  'pumpkin-drawing': {
    subject: 'pumpkin',
    titleSubject: 'Pumpkin',
    article: 'a',
    entities: ['ribs', 'stem', 'vine curl', 'oval lobes', 'shadow base', 'skin grooves', 'highlight', 'leaf', 'squat form'],
    construction: 'wide oval, curved ribs, short stem, and soft base shadow',
    texture: 'skin grooves and stem ridges',
    setting: 'autumn still life sketch',
    silhouette: 'squat round form with a bent stem',
    detail: 'make the center ribs taller and the side ribs narrower to show roundness',
  },
  'snowman-drawing': {
    subject: 'snowman',
    titleSubject: 'Snowman',
    article: 'a',
    entities: ['snowballs', 'carrot nose', 'coal buttons', 'scarf', 'hat', 'stick arms', 'mittens', 'snow base', 'face'],
    construction: 'three stacked snowballs, carrot nose, scarf, hat, and stick arms',
    texture: 'soft snow edges and scarf folds',
    setting: 'winter character sketch',
    silhouette: 'stacked round body with cozy accessories',
    detail: 'overlap the snowballs slightly so the snowman feels stacked, not separated',
  },
  'dragon-drawing': {
    subject: 'dragon',
    titleSubject: 'Dragon',
    article: 'a',
    entities: ['horns', 'wings', 'scales', 'snout', 'claws', 'tail', 'spines', 'chest plates', 'jaw'],
    construction: 'serpentine neck, horned head, folded wings, claws, and tapering tail',
    texture: 'scale rows and wing membranes',
    setting: 'fantasy creature pose',
    silhouette: 'arched neck with wings and a sweeping tail',
    detail: 'separate the chest plates from the side scales so the body has structure',
  },
  'unicorn-drawing': {
    subject: 'unicorn',
    titleSubject: 'Unicorn',
    article: 'a',
    entities: ['horn', 'mane', 'muzzle', 'ears', 'hooves', 'tail', 'neck arch', 'forelock', 'leg joints'],
    construction: 'horse-like head, spiral horn, arched neck, mane, and slim legs',
    texture: 'flowing mane and horn spiral',
    setting: 'gentle fantasy portrait',
    silhouette: 'graceful horse form with a single horn',
    detail: 'draw the horn on the forehead centerline before adding the mane around it',
  },
  'heart-drawing': {
    subject: 'heart',
    titleSubject: 'Heart',
    article: 'a',
    entities: ['center line', 'lobes', 'point', 'curve', 'highlight', 'shadow edge', 'symmetry', 'rounded top', 'valley notch'],
    construction: 'center guideline, two rounded lobes, a clean notch, and tapered point',
    texture: 'smooth line weight and tiny highlight',
    setting: 'symbol practice sketch',
    silhouette: 'balanced lobes meeting in a neat point',
    detail: 'compare both lobes before darkening the outline so the symbol stays even',
  },
  'star-drawing': {
    subject: 'star',
    titleSubject: 'Star',
    article: 'a',
    entities: ['five points', 'center guide', 'angles', 'inner valleys', 'outline', 'highlight', 'symmetry', 'line weight', 'shadow'],
    construction: 'center guide, five points, inner valleys, and crisp outline',
    texture: 'clean angles and light edge shadow',
    setting: 'shape accuracy practice',
    silhouette: 'five balanced points around a center',
    detail: 'check the inner valleys as carefully as the tips to keep the star steady',
  },
  'eye-drawing': {
    subject: 'eye',
    titleSubject: 'Eye',
    article: 'an',
    entities: ['iris', 'pupil', 'eyelids', 'tear duct', 'lashes', 'brow bone', 'waterline', 'highlight', 'sclera'],
    construction: 'almond eyelids, round iris, pupil, tear duct, and brow shadow',
    texture: 'iris spokes and eyelash taper',
    setting: 'facial feature study',
    silhouette: 'almond shape with a centered iris',
    detail: 'leave the catchlight clean while building the pupil and iris values around it',
  },
};

const guideProfiles = {
  'basic-shapes': {
    title: 'Basic Shapes for Drawing',
    metaTitle: 'Basic Shapes for Drawing | Drawinging',
    description:
      'Learn how circles, ovals, boxes, cylinders, and triangles become stronger drawing starts for animals, flowers, vehicles, and symbols.',
    focusKeyword: 'basic shapes for drawing',
    h1: 'Basic Shapes for Drawing Clear Tutorials',
    relatedTutorials: ['flower-drawing', 'cat-drawing', 'car-drawing', 'star-drawing'],
    body: [
      'Most drawings become easier when the first marks describe structure instead of decoration. Basic shapes give you a quiet way to test size, direction, and placement before the outline becomes important. A flower can begin as a center circle with petal ovals. A cat can begin as a head oval, body bean, and triangle ears. A car can begin as a long box over two measured wheels. These shapes are not meant to stay visible; they are a temporary map.',
      'Start with the largest form and keep the marks light. Look for circles, ovals, boxes, cylinders, triangles, and simple wedges. If a subject feels complicated, squint at it and name the biggest shape you see. Then place a centerline or axis so the smaller parts have somewhere to attach. On round subjects such as pumpkins, balls, and eyes, curved guidelines help details wrap around the form. On boxy subjects such as trains and cars, straight guides keep the corners and wheelbase organized.',
      'A useful practice page is to choose one tutorial subject and redraw only its construction shapes five times. Do not add texture, shading, or final outlines. Change the size each time and notice which proportions still feel correct. This exercise trains your eye to solve the drawing before you invest time in details.',
      'When the basic shapes look balanced, refine from general to specific. Replace stiff circles with softer contours, trim construction lines that no longer help, and connect overlapping forms with confident strokes. The best shape sketch is light, readable, and easy to adjust. If the early shapes are off, fix them before moving forward; it is much simpler than repairing a finished outline.',
    ],
  },
  'line-control': {
    title: 'Line Control Practice',
    metaTitle: 'Line Control Practice | Drawinging',
    description:
      'Practice steady outlines, tapered strokes, smooth curves, and confident sketch lines for clearer step-by-step drawing tutorials.',
    focusKeyword: 'line control practice',
    h1: 'Line Control Practice for Cleaner Drawing',
    relatedTutorials: ['heart-drawing', 'butterfly-drawing', 'cloud-drawing', 'tulip-drawing'],
    body: [
      'Line control is the habit of choosing how a mark starts, travels, and stops. It affects every tutorial on Drawinging, from the soft edge of a cloud to the sharp point of a star. Good control does not mean every line is perfect. It means the line has a purpose: light searching marks for planning, smoother strokes for contours, and darker lines only where the final edge needs emphasis.',
      'Warm up with rows of straight lines, C-curves, S-curves, loops, and tapered strokes. Move from the shoulder for longer marks and from the wrist for small details. Keep the pencil pressure low at first. If a curve looks shaky, draw it as several light passes, then choose the best path for the final outline. Rotating the paper is allowed; a comfortable hand angle often creates cleaner curves.',
      'For subject practice, match the stroke to the form. Petals need soft arcs. Animal fur often uses short broken strokes. Vehicle edges need straighter lines with deliberate corners. Eyes and symbols need smooth outlines because small wobbles are noticeable. Try tracing over your own light sketch with three line weights: thin for interior construction, medium for most contours, and dark for overlapping edges or cast shadows.',
      'The most common mistake is pressing hard too early. Heavy planning lines make corrections messy and can flatten delicate subjects. Keep the sketch pale until the proportions feel settled. Then commit slowly, using fewer strokes. Over time, line control becomes less about a perfectly steady hand and more about patient decisions.',
    ],
  },
  proportions: {
    title: 'Drawing Proportions',
    metaTitle: 'Drawing Proportions | Drawinging',
    description:
      'Use measuring habits, comparison lines, center marks, and spacing checks to keep drawing proportions believable from the first sketch.',
    focusKeyword: 'drawing proportions',
    h1: 'Drawing Proportions Without Guesswork',
    relatedTutorials: ['horse-drawing', 'dog-drawing', 'plane-drawing', 'unicorn-drawing'],
    body: [
      'Proportion is the relationship between sizes. It answers questions such as how long a horse neck is compared with the body, how far a dog nose sits below the eyes, or where a plane wing attaches to the fuselage. A drawing can have simple details and still look convincing when the proportions are clear. It can also have beautiful shading but feel wrong if the main measurements drift.',
      'Begin by choosing one unit of measurement. On a face, the eye width may become the unit. On a vehicle, the wheel diameter may guide the body height and wheelbase. On an animal, the head size often helps place the body, legs, and tail. Lightly mark the top, bottom, left, and right edges of the subject before adding details. These boundary marks prevent the sketch from growing unevenly across the page.',
      'Use comparison lines often. Check whether two eyes sit on the same angle, whether both sides of a heart curve reach the same height, or whether a soccer ball panel stays centered. For standing animals and vehicles, horizontal ground lines keep feet or wheels aligned. For flowers and symbols, a centerline helps balance left and right halves.',
      'If something feels off, cover the details and look only at the large shapes. Correct the biggest proportion problem first. Smaller features are easier to move after the main structure is stable. With practice, measuring becomes quick and quiet, almost like punctuation between drawing steps.',
    ],
  },
  shading: {
    title: 'Pencil Shading Basics',
    metaTitle: 'Pencil Shading Basics | Drawinging',
    description:
      'Learn pencil shading basics for value, light direction, soft edges, cast shadows, texture, and simple form in beginner drawings.',
    focusKeyword: 'pencil shading basics',
    h1: 'Pencil Shading Basics for Step-by-Step Art',
    relatedTutorials: ['rose-drawing', 'pumpkin-drawing', 'eye-drawing', 'mountain-drawing'],
    body: [
      'Shading turns a flat outline into a form with light, weight, and surface. The first decision is light direction. Choose where the light comes from before adding value. If the light is above left, the lower right side of a pumpkin rib, animal muzzle, or mountain slope will usually be darker. A small arrow in the page corner can remind you to keep the shadows consistent.',
      'Build value gradually. Use pale layers first, then deepen selected areas. A simple value scale from one to five helps: white paper, light gray, middle gray, dark gray, and near black. Most beginner drawings do not need every value. A clear light side, shadow side, and cast shadow are often enough to describe the subject. Keep highlights clean by shading around them instead of trying to erase them later.',
      'Edges matter as much as darkness. A cloud needs soft transitions. A car tire or star edge can use a sharper shadow. Fur, bark, petals, scales, and fabric all need different marks. Try hatching for direction, small circular strokes for soft texture, and layered side-of-pencil shading for larger areas. Blend lightly only when the subject asks for softness.',
      'Avoid covering the entire drawing with the same gray. Let some paper stay bright. Place the darkest values where forms overlap, under objects, inside pupils, beneath petals, or near the base of a snowman. Controlled contrast guides the viewer and keeps the tutorial sketch readable.',
    ],
  },
  perspective: {
    title: 'Simple Perspective',
    metaTitle: 'Simple Perspective | Drawinging',
    description:
      'Understand simple perspective with horizon lines, vanishing points, overlap, scale changes, and depth cues for clearer scenes.',
    focusKeyword: 'simple perspective',
    h1: 'Simple Perspective for Drawing Depth',
    relatedTutorials: ['car-drawing', 'train-drawing', 'sunset-drawing', 'mountain-drawing'],
    body: [
      'Perspective is how drawings show depth on a flat page. Not every tutorial needs formal vanishing points, but every scene benefits from basic depth cues. A road, train track, car body, sunset horizon, or mountain valley becomes clearer when the viewer understands what is near and what is far. The simplest tool is the horizon line, which represents eye level.',
      'For one-point perspective, choose a vanishing point on the horizon and aim receding edges toward it. Train rails, road edges, and rows of windows can all narrow as they move away. For two-point perspective, box-like forms such as cars and buildings angle toward two different points. Keep the vertical lines upright unless you are intentionally drawing a dramatic viewpoint.',
      'Depth also comes from overlap, size, placement, and value. A tree in front of a mountain overlaps the slope. A close cloud can appear larger than distant cloud bands. Objects lower on the page often feel closer in a landscape. Far shapes usually have lighter contrast and fewer details. These cues work even when you are drawing a simple beginner scene.',
      'Use perspective lightly at first. Mark the horizon, place the biggest forms, and check whether repeated parts shrink consistently. If a vehicle wheel, train window, or fence post breaks the spacing pattern, adjust the guide before refining. Simple perspective is not a cage; it is a set of quiet rails that keep depth believable.',
    ],
  },
  'pencil-techniques': {
    title: 'Pencil Techniques',
    metaTitle: 'Pencil Techniques | Drawinging',
    description:
      'Improve drawings with pencil techniques for hatching, layering, erasing, line weight, texture, pressure control, and clean finishes.',
    focusKeyword: 'pencil techniques',
    h1: 'Pencil Techniques for Better Tutorial Sketches',
    relatedTutorials: ['dragon-drawing', 'lion-drawing', 'bee-drawing', 'tree-drawing'],
    body: [
      'A pencil can make many different marks without changing tools. Pressure, angle, speed, and point sharpness all affect the result. A sharp point is useful for eyelashes, whiskers, seams, and wing veins. The side of the pencil covers larger shadows on clouds, mountains, pumpkins, and animal bodies. A light grip keeps construction lines erasable, while a firmer grip can finish important outlines.',
      'Hatching uses parallel strokes to create value. Cross-hatching adds a second direction. Layering builds darkness slowly, which is safer than pressing hard in one pass. Small circular strokes can soften cheeks, petals, and snowballs. Short broken strokes are helpful for fur, bark, grass, and feather texture. Each technique should follow the form; marks on a round pumpkin rib curve differently from marks on a flat train panel.',
      'Erasers are drawing tools too. A kneaded eraser can lift graphite from highlights in an eye, glossy nose, or shiny ornament. A sharper eraser edge can clean the rim of a star or brighten a water reflection. Brush crumbs away with a scrap cloth or soft brush instead of your hand to avoid smearing the page.',
      'Finish by choosing where the viewer should look first. Darken focal lines, soften leftover construction marks, and add a cast shadow only if it supports the form. The goal is not to use every pencil technique in one sketch. Choose the few marks that describe the subject clearly.',
    ],
  },
};

function titleCase(value) {
  return value.replace(/\b\w/g, (char) => char.toUpperCase());
}

function wordCount(value) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function countKeywordUses(value, keyword) {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return (value.match(new RegExp(`\\b${escaped}\\b`, 'gi')) || []).length;
}

function yamlScalar(value) {
  if (typeof value === 'string') {
    return JSON.stringify(value);
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  throw new TypeError(`Unsupported YAML scalar: ${value}`);
}

function toYaml(value, indent = 0) {
  const space = ' '.repeat(indent);

  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '[]';
    }

    return value
      .map((item) => {
        if (item && typeof item === 'object' && !Array.isArray(item)) {
          const entries = Object.entries(item);
          const [firstKey, firstValue] = entries[0];
          const firstLine =
            firstValue && typeof firstValue === 'object'
              ? `${space}- ${firstKey}:\n${toYaml(firstValue, indent + 4)}`
              : `${space}- ${firstKey}: ${yamlScalar(firstValue)}`;
          const rest = entries
            .slice(1)
            .map(([key, nestedValue]) => {
              if (nestedValue && typeof nestedValue === 'object') {
                return `${space}  ${key}:\n${toYaml(nestedValue, indent + 4)}`;
              }
              return `${space}  ${key}: ${yamlScalar(nestedValue)}`;
            })
            .join('\n');
          return rest ? `${firstLine}\n${rest}` : firstLine;
        }

        return `${space}- ${yamlScalar(item)}`;
      })
      .join('\n');
  }

  if (value && typeof value === 'object') {
    return Object.entries(value)
      .map(([key, nestedValue]) => {
        if (Array.isArray(nestedValue)) {
          return `${space}${key}:\n${toYaml(nestedValue, indent + 2)}`;
        }

        if (nestedValue && typeof nestedValue === 'object') {
          return `${space}${key}:\n${toYaml(nestedValue, indent + 2)}`;
        }

        return `${space}${key}: ${yamlScalar(nestedValue)}`;
      })
      .join('\n');
  }

  return `${space}${yamlScalar(value)}`;
}

function buildFrontmatter(data) {
  return `---\n${toYaml(data)}\n---`;
}

function publishedDate(priority) {
  const date = new Date(Date.UTC(2026, 2, priority));
  return date.toISOString().slice(0, 10);
}

function estimateTime(difficulty) {
  if (difficulty === 'advanced') {
    return '55-70 minutes';
  }
  if (difficulty === 'intermediate') {
    return '35-50 minutes';
  }
  return '25-35 minutes';
}

function stepCountFor(difficulty) {
  if (difficulty === 'advanced') {
    return 12;
  }
  if (difficulty === 'intermediate') {
    return 10;
  }
  return 7;
}

function buildDescription(item, profile) {
  const base = `Learn ${item.focus} with clear steps for ${profile.entities[0]}, ${profile.entities[1]}, and ${profile.entities[2]}. Build from simple shapes, refine details, and finish with light shading cues.`;
  const extra = ` Keep the lesson calm, practical, and pencil friendly.`;
  const compact = `Draw ${profile.article} ${profile.subject} with clear steps for ${profile.entities[0]}, ${profile.entities[1]}, and ${profile.entities[2]}. Build simple shapes, refine details, and finish with light shading cues.`;

  let description = base;
  if (description.length < 140) {
    description += extra;
  }
  if (description.length > 160) {
    description = compact;
  }
  if (description.length < 140) {
    description += ' Practice clean lines and balanced forms.';
  }
  if (description.length > 160) {
    description = description.slice(0, 157).replace(/\s+\S*$/, '') + '.';
  }

  return description;
}

function buildIntro(item, profile) {
  const openings = [
    `This lesson begins with ${profile.article} ${profile.subject} reduced to ${profile.construction}.`,
    `For this page, the first goal is not detail; it is a steady plan for ${profile.article} ${profile.subject}.`,
    `A clear sketch starts when the largest parts of ${profile.article} ${profile.subject} are placed before the outline is darkened.`,
    `The subject works best when you slow down at the construction stage and compare each large shape.`,
  ];
  const opening = openings[(item.priority - 1) % openings.length];

  return `${opening} You will use light pencil lines to place the ${profile.entities[0]}, ${profile.entities[1]}, and ${profile.entities[2]} before adding smaller accents. The ${item.focus} tutorial keeps the process practical: block in the silhouette, check the spacing, refine the contour, then add selected texture. Spend a moment checking how the ${profile.silhouette} sits on the page, because early balance makes every later detail easier to judge. Keep an eraser nearby, but treat early marks as guides instead of mistakes. By the end, your page should show the subject clearly without relying on heavy outlines or crowded detail.`;
}

function buildBeforeYouStart(profile) {
  return `Set the page so there is room for the full ${profile.silhouette}. Use an HB pencil for the first pass, keep the pressure pale, and mark the largest direction lines before drawing ${profile.texture}. A small scrap sheet is useful for testing curves and shadows.`;
}

function buildRefine(profile) {
  return `Refine the ${profile.subject} by comparing the outer silhouette against the inner landmarks. Clean the construction lines that cross ${profile.entities[0]} and ${profile.entities[1]}, then strengthen only the edges that describe overlap, weight, or the main focal area.`;
}

function buildShading(profile) {
  return `Shade lightly from one direction so the ${profile.entities[0]}, ${profile.entities[1]}, and ${profile.entities[2]} share the same light source. Deepen small contact shadows and leave highlights open on the most forward forms.`;
}

function buildBeginnerVariation(profile) {
  return `For an easy simple version, skip the smallest texture marks and draw ${profile.article} ${profile.subject} with only the main ${profile.construction}. Use one clean outline, one shadow shape, and no background details.`;
}

function buildDetailedVariation(profile) {
  return `For a more detailed study, add secondary overlaps, vary the line weight around the ${profile.silhouette}, and spend extra time on ${profile.detail}. Keep the added marks lighter than the main contour.`;
}

function buildMistakes(profile) {
  return [
    `Starting the ${profile.subject} with final dark outlines before the ${profile.construction} is placed.`,
    `Making the ${profile.entities[0]} and ${profile.entities[1]} the same size when the subject needs clear variation.`,
    `Forgetting to connect the ${profile.entities[2]} to the main form with believable overlap.`,
    `Adding ${profile.texture} before the large silhouette reads as ${profile.article} ${profile.subject}.`,
    `Shading every area evenly instead of separating the light side from the shadow side.`,
  ];
}

function buildTips(profile) {
  return [
    `Use a centerline or axis to keep the ${profile.subject} balanced while the sketch is still light.`,
    `Name the largest shape first, then attach the ${profile.entities[0]} and ${profile.entities[1]}.`,
    `Rotate the paper whenever a curve around the ${profile.entities[2]} feels awkward.`,
    `Leave small gaps in texture so the drawing does not become noisy.`,
    `Compare negative space around the ${profile.silhouette} before darkening the outline.`,
    `Place the darkest marks only where forms overlap or turn away from the light.`,
  ];
}

function buildFaqs(item, profile) {
  return [
    {
      question: `What is the easiest way to start ${item.focus}?`,
      answer: `Start with ${profile.construction}. Keep the shapes light, check the main silhouette, and add ${profile.texture} only after the structure feels steady.`,
    },
    {
      question: `How can I make my ${profile.subject} look less flat?`,
      answer: `Use overlap around the ${profile.entities[0]} and ${profile.entities[1]}, then add one light source so shadows sit consistently across the form.`,
    },
    {
      question: `Which pencil should I use for ${profile.article} ${profile.subject} sketch?`,
      answer: `An HB pencil is best for construction, while a 2B pencil can darken the final contour, contact shadows, and selected ${profile.texture}.`,
    },
    {
      question: `How do I fix uneven ${profile.entities[0]} in this drawing?`,
      answer: `Return to the guide shapes, compare both sides of the ${profile.silhouette}, and redraw the uneven part with pale strokes before erasing the extra lines.`,
    },
    {
      question: `Should I add background details around the ${profile.subject}?`,
      answer: `Keep the background minimal until the subject is finished. A simple ground, perch, sky mark, or cast shadow is enough for this tutorial style.`,
    },
  ];
}

function buildStepImages(item, count) {
  return Array.from({ length: count }, (_, index) => {
    const stepNumber = index + 1;
    return {
      src: `/images/tutorials/${item.slug}/${item.slug}-step-${stepNumber}.webp`,
      alt: `${item.focus} step ${stepNumber}`,
      title: `${titleCase(item.focus)} Step ${stepNumber}`,
      width: 900,
      height: 900,
    };
  });
}

function buildSteps(item, profile, count) {
  const stepTemplates = [
    {
      title: 'Place the main construction shapes',
      body: `Sketch the first structure with pale lines: ${profile.construction}. Keep the marks loose and look at the whole page rather than one detail. This is the only place where the full ${item.focus} phrase needs attention; after that, the drawing can grow from landmarks. Leave enough margin around the ${profile.silhouette} so later refinements do not feel cramped.`,
      tip: `Use the side of the pencil for soft construction lines.`,
    },
    {
      title: `Block in the ${profile.entities[0]}`,
      body: `Add the ${profile.entities[0]} using simple curves that follow the first shape. Compare their size to the main body before adding detail. If the spacing feels uneven, redraw the guide rather than forcing the final outline. Lightly mark where the ${profile.entities[1]} will sit so the parts relate to each other and the silhouette stays readable.`,
      tip: `Check the largest spacing before erasing any guide lines.`,
    },
    {
      title: `Set the ${profile.entities[1]} and ${profile.entities[2]}`,
      body: `Place the ${profile.entities[1]} next, then attach the ${profile.entities[2]} with a clean overlap. Watch for tangents where two edges only touch; a small overlap usually looks more natural. Keep the new lines lighter than the main contour. The goal is to show how the features connect to the form, not to finish every small texture mark yet.`,
      tip: `Overlap forms clearly so each part feels attached.`,
    },
    {
      title: 'Refine the outside contour',
      body: `Trace around the outer edge slowly and turn the basic shapes into a more specific contour. Use longer strokes on calm areas and shorter strokes where the form changes direction. Adjust the ${profile.silhouette} before adding texture. If one side feels too heavy, compare the empty space around it and shave the line back with light erasing.`,
      tip: `Darken only the contour you are sure about.`,
    },
    {
      title: `Add subject details`,
      body: `Work on ${profile.texture} with small marks that follow the surface. Keep the details grouped instead of spreading identical marks everywhere. Add a few accents near the focal area, then leave quieter spaces so the drawing can breathe. The ${profile.entities[3]} and ${profile.entities[4]} should support the structure rather than distract from the main shape.`,
      tip: `Cluster detail near the focal point and simplify the edges.`,
    },
    {
      title: 'Clean the guide lines',
      body: `Erase construction lines that cut through finished features, especially around the ${profile.entities[0]} and ${profile.entities[2]}. Do not scrub the paper; lift graphite slowly and redraw any softened edges afterward. This cleanup stage is also a good time to correct small proportion issues. Step back from the page and check whether the subject still reads clearly at a glance.`,
      tip: `Use a kneaded eraser if the paper surface is delicate.`,
    },
    {
      title: 'Add light shading and finish',
      body: `Choose one light direction and place gentle shadows where forms overlap or turn away. Add a cast shadow only if it helps ground the ${profile.subject} in the ${profile.setting}. For this ${item.focus}, keep highlights open and avoid covering the whole sketch with gray. Finish by strengthening the most important contour lines and softening any leftover construction marks.`,
      tip: `One consistent light source is better than many scattered shadows.`,
    },
    {
      title: `Build richer ${profile.entities[5]} texture`,
      body: `For a fuller version, add secondary texture around the ${profile.entities[5]} and ${profile.entities[6]}. Let the marks change length and pressure so they do not form a repeated pattern. Follow the direction of the form: curve strokes around round areas and angle them along flat planes. Stop before the texture covers the drawing's clean construction.`,
      tip: `Vary stroke length to avoid a stamped texture.`,
    },
    {
      title: 'Strengthen depth and overlap',
      body: `Deepen the small shadows under overlapping parts and near the base of the subject. The ${profile.entities[6]} should sit behind or in front of nearby shapes with clear edge priority. Use slightly darker line weight where one form crosses another. These contrast choices make the drawing feel layered without adding unnecessary background detail.`,
      tip: `Darker overlap lines create depth quickly.`,
    },
    {
      title: 'Review proportions before final lines',
      body: `Before the final pass, compare the main height, width, and angle of the sketch. Look at the ${profile.entities[7]} in relation to the full silhouette and correct any drift with pale marks. A stronger ${item.focus} comes from these quiet checks. Once the structure feels balanced, redraw the final contour with confident pressure and keep interior lines lighter.`,
      tip: `A final proportion check prevents heavy corrections later.`,
    },
    {
      title: 'Add advanced surface variation',
      body: `Add smaller accents that describe surface changes without cluttering the page. On this subject, ${profile.detail}. Use broken lines, tapered marks, and small value shifts instead of outlining every tiny part. Let the viewer's eye complete some areas. This makes the advanced sketch feel finished while preserving the clarity of the earlier construction.`,
      tip: `Suggest small forms instead of outlining all of them.`,
    },
    {
      title: 'Polish the presentation',
      body: `Finish by cleaning smudges, sharpening the focal edges, and balancing the darkest values. Add a tiny note of environment from the ${profile.setting} only if it frames the subject. Check the drawing in a mirror or from a distance to catch leaning shapes. The final ${item.focus} should show strong construction, selective detail, and a calm pencil finish.`,
      tip: `View the page from farther away before calling it done.`,
    },
  ];

  return stepTemplates.slice(0, count);
}

function relatedTutorialsFor(item, launchItems) {
  const related = [];
  const add = (slug) => {
    if (slug !== item.slug && !related.includes(slug)) {
      related.push(slug);
    }
  };

  launchItems
    .filter((candidate) => candidate.category === item.category)
    .sort((a, b) => a.priority - b.priority)
    .forEach((candidate) => add(candidate.slug));

  for (const category of relatedCategoryMap[item.category] || []) {
    launchItems
      .filter((candidate) => candidate.category === category)
      .sort((a, b) => a.priority - b.priority)
      .forEach((candidate) => add(candidate.slug));
    if (related.length >= 6) {
      break;
    }
  }

  launchItems
    .sort((a, b) => a.priority - b.priority)
    .forEach((candidate) => {
      if (related.length < 4) {
        add(candidate.slug);
      }
    });

  return related.slice(0, 8);
}

function buildTutorial(item, launchItems) {
  const profile = profiles[item.slug];
  if (!profile) {
    throw new Error(`Missing subject profile for ${item.slug}`);
  }

  const stepCount = stepCountFor(item.difficulty);
  const relatedGuides = [
    ...new Set([
      ...(categoryGuideMap[item.category] || ['basic-shapes', 'line-control']),
      ...(item.difficulty === 'advanced' ? ['pencil-techniques'] : []),
      ...(item.difficulty !== 'beginner' ? ['proportions'] : []),
    ]),
  ].slice(0, 4);

  return {
    title: `${profile.titleSubject} Drawing: Easy Step-by-Step Tutorial`,
    metaTitle: `${profile.titleSubject} Drawing Tutorial | Drawinging`,
    description: buildDescription(item, profile),
    focusKeyword: item.focus,
    secondaryKeywords: [
      `how to draw ${profile.article} ${profile.subject}`,
      `easy ${item.focus}`,
      `simple ${item.focus}`,
      `${profile.subject} drawing step by step`,
      `${profile.subject} sketch tutorial`,
    ],
    semanticEntities: profile.entities,
    slug: item.slug,
    permalink: `/${item.slug}/`,
    canonicalURL: `https://drawinging.com/${item.slug}/`,
    category: item.category,
    tags: [
      item.category,
      item.difficulty,
      `${profile.subject} tutorial`,
      'step-by-step drawing',
      'printable worksheet',
    ],
    difficulty: item.difficulty,
    estimatedTime: estimateTime(item.difficulty),
    stepCount,
    materials: [
      'HB pencil',
      '2B pencil',
      'eraser',
      'sharpener',
      'drawing paper',
      'ruler or scrap paper for measuring',
    ],
    featuredImage: `/images/tutorials/${item.slug}/${item.slug}.webp`,
    featuredImageAlt: item.focus,
    featuredImageTitle: item.focus,
    featuredImageWidth: 1200,
    featuredImageHeight: 800,
    stepImages: buildStepImages(item, stepCount),
    worksheet: {
      pdf: `/worksheets/${item.slug}/${item.slug}.pdf`,
      svg: `/worksheets/${item.slug}/${item.slug}.svg`,
      preview: `/worksheets/${item.slug}/${item.slug}-preview.webp`,
      title: `${profile.titleSubject} Drawing Worksheet`,
    },
    relatedTutorials: relatedTutorialsFor(item, launchItems),
    relatedGuides,
    faqs: buildFaqs(item, profile),
    publishedAt: publishedDate(item.priority),
    updatedAt: '2026-06-01',
    draft: false,
    noindex: false,
    schemaType: 'HowTo',
    author: 'Drawinging Editorial',
    h1: `How to Draw ${profile.article.toUpperCase() === 'A' ? 'a' : 'an'} ${profile.titleSubject}: ${titleCase(item.focus)} Tutorial`,
    intro: buildIntro(item, profile),
    beforeYouStart: buildBeforeYouStart(profile),
    refine: buildRefine(profile),
    shading: buildShading(profile),
    beginnerVariation: buildBeginnerVariation(profile),
    detailedVariation: buildDetailedVariation(profile),
    commonMistakes: buildMistakes(profile),
    tips: buildTips(profile),
    conclusion: `Keep the finished ${profile.subject} simple, clean, and readable. Save the construction marks you liked, then try a second version with lighter lines and more confident edges.`,
    steps: buildSteps(item, profile, stepCount),
  };
}

function buildGuide(slug) {
  const guide = guideProfiles[slug];
  if (!guide) {
    throw new Error(`Missing guide profile for ${slug}`);
  }

  return {
    frontmatter: {
      title: guide.title,
      metaTitle: guide.metaTitle,
      description: guide.description,
      focusKeyword: guide.focusKeyword,
      slug,
      permalink: `/${slug}/`,
      canonicalURL: `https://drawinging.com/${slug}/`,
      publishedAt: '2026-03-01',
      updatedAt: '2026-06-01',
      draft: false,
      noindex: false,
      h1: guide.h1,
      relatedTutorials: guide.relatedTutorials,
    },
    body: guide.body.join('\n\n'),
  };
}

async function cleanMarkdownDirectory(directory) {
  await mkdir(directory, { recursive: true });
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
      .map((entry) => rm(path.join(directory, entry.name)))
  );
}

function validateTutorial(tutorial) {
  const issues = [];
  const introWords = wordCount(tutorial.intro);
  if (introWords < 100 || introWords > 160) {
    issues.push(`${tutorial.slug}: intro is ${introWords} words`);
  }

  if (tutorial.description.length < 140 || tutorial.description.length > 160) {
    issues.push(`${tutorial.slug}: description is ${tutorial.description.length} characters`);
  }

  if (tutorial.stepImages.length !== tutorial.stepCount || tutorial.steps.length !== tutorial.stepCount) {
    issues.push(`${tutorial.slug}: step image or step count mismatch`);
  }

  for (const [index, step] of tutorial.steps.entries()) {
    const words = wordCount(step.body);
    if (words < 50 || words > 110) {
      issues.push(`${tutorial.slug}: step ${index + 1} body is ${words} words`);
    }
  }

  const combined = `${tutorial.intro} ${tutorial.steps.map((step) => step.body).join(' ')} ${tutorial.conclusion}`;
  const density = (countKeywordUses(combined, tutorial.focusKeyword) / Math.max(wordCount(combined), 1)) * 100;
  if (density < 0.4 || density > 0.8) {
    issues.push(`${tutorial.slug}: focus keyword density is ${density.toFixed(2)}%`);
  }

  return issues;
}

async function main() {
  const launchItems = JSON.parse(await readFile(launchPath, 'utf8'));
  const issues = [];

  if (launchItems.length !== 35) {
    issues.push(`launch list contains ${launchItems.length} tutorials, expected 35`);
  }

  await cleanMarkdownDirectory(tutorialsDir);
  await cleanMarkdownDirectory(guidesDir);

  const tutorials = launchItems
    .slice()
    .sort((a, b) => a.priority - b.priority)
    .map((item) => buildTutorial(item, launchItems));

  tutorials.forEach((tutorial) => issues.push(...validateTutorial(tutorial)));

  for (const tutorial of tutorials) {
    const frontmatter = buildFrontmatter(tutorial);
    const markdown = `${frontmatter}\n\nTutorial content is rendered from frontmatter.\n`;
    await writeFile(path.join(tutorialsDir, `${tutorial.slug}.md`), markdown, 'utf8');
  }

  for (const slug of guideSlugs) {
    const guide = buildGuide(slug);
    const frontmatter = buildFrontmatter(guide.frontmatter);
    await writeFile(path.join(guidesDir, `${slug}.md`), `${frontmatter}\n\n${guide.body}\n`, 'utf8');
  }

  const tutorialFiles = (await readdir(tutorialsDir)).filter((file) => file.endsWith('.md')).sort();
  const guideFiles = (await readdir(guidesDir)).filter((file) => file.endsWith('.md')).sort();
  const focusKeywords = tutorials.map((tutorial) => tutorial.focusKeyword);
  const h1s = tutorials.map((tutorial) => tutorial.h1);
  const duplicateFocusKeywords = focusKeywords.filter((keyword, index) => focusKeywords.indexOf(keyword) !== index);
  const duplicateH1s = h1s.filter((h1, index) => h1s.indexOf(h1) !== index);

  if (tutorialFiles.length !== 35) {
    issues.push(`generated ${tutorialFiles.length} tutorial files, expected 35`);
  }
  if (guideFiles.length !== 6) {
    issues.push(`generated ${guideFiles.length} guide files, expected 6`);
  }
  if (duplicateFocusKeywords.length > 0) {
    issues.push(`duplicate tutorial focusKeyword values: ${duplicateFocusKeywords.join(', ')}`);
  }
  if (duplicateH1s.length > 0) {
    issues.push(`duplicate tutorial h1 values: ${duplicateH1s.join(', ')}`);
  }

  const summary = {
    tutorialsCreated: tutorialFiles.length,
    guidesCreated: guideFiles.length,
    duplicateFocusKeywords: [...new Set(duplicateFocusKeywords)],
    duplicateH1s: [...new Set(duplicateH1s)],
    tutorialFiles: tutorialFiles.map((file) => `src/content/tutorials/${file}`),
    guideFiles: guideFiles.map((file) => `src/content/guides/${file}`),
    issues,
  };

  console.log(JSON.stringify(summary, null, 2));

  if (issues.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
