import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });
dotenv.config();
import Exercise from '../models/Exercise.js';
import DietPlan from '../models/DietPlan.js';
import Blog from '../models/Blog.js';
import CommunityPost from '../models/CommunityPost.js';
import Workout from '../models/Workout.js';

dotenv.config();

const SEED_EXERCISES = [
  // CHEST
  {
    name: 'Barbell Bench Press',
    category: 'Chest',
    targetMuscle: 'Pectoralis Major (Mid/Lower)',
    secondaryMuscles: ['Triceps Brachii', 'Anterior Deltoids'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    defaultSets: 4,
    defaultReps: '6-8',
    restSeconds: 120,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    description: 'The definitive compound movement for upper body pressing power and pectoral hypertrophy.',
    instructions: [
      'Lie flat on the bench with eyes positioned directly under the barbell.',
      'Grip the bar slightly wider than shoulder-width with wrists straight.',
      'Plant your feet firmly into the floor, retract your shoulder blades, and unrack the bar.',
      'Inhale and lower the bar in a controlled arc to the mid-chest level.',
      'Drive powerfully through your feet and press the barbell back up to lockout while exhaling.',
    ],
    tips: 'Do not bounce the bar off your ribcage. Maintain lat and core tension throughout.',
    commonMistakes: 'Flaring elbows out at 90 degrees; lifting buttocks off the bench.',
  },
  {
    name: 'Incline Dumbbell Press',
    category: 'Chest',
    targetMuscle: 'Clavicular Pectoralis (Upper Chest)',
    secondaryMuscles: ['Anterior Deltoids', 'Triceps'],
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: '8-12',
    restSeconds: 90,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    description: 'Targets upper chest fibers to create a full, aesthetic chest shelf with natural dumbbell range of motion.',
    instructions: [
      'Set an adjustable bench to a 30-degree incline.',
      'Sit back holding dumbbells at shoulder height with palms facing forward.',
      'Press dumbbells upward and slightly inward until arms are extended.',
      'Lower weights slowly until feeling a deep stretch across upper pectorals.',
    ],
    tips: 'Avoid bench angles higher than 45 degrees which shift tension to anterior shoulders.',
    commonMistakes: 'Banging dumbbells together; rushing the eccentric phase.',
  },
  {
    name: 'High-to-Low Cable Flye',
    category: 'Chest',
    targetMuscle: 'Pectoralis Major (Lower/Sternal Head)',
    secondaryMuscles: ['Anterior Deltoids'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: '12-15',
    restSeconds: 60,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    description: 'Provides constant continuous tension throughout the full range of motion with peak contraction.',
    instructions: [
      'Attach D-handles to high cable pulleys.',
      'Step forward in a staggered stance with slight torso forward lean.',
      'Bring hands down and forward in a hugging arc until hands meet at hip level.',
      'Squeeze chest hard for 1 second at peak contraction before opening back slowly.',
    ],
    tips: 'Imagine wrapping your arms around a large tree trunk.',
    commonMistakes: 'Pressing instead of maintaining fixed elbow angle.',
  },
  // BACK
  {
    name: 'Conventional Barbell Deadlift',
    category: 'Back',
    targetMuscle: 'Erector Spinae, Glutes, Hamstrings',
    secondaryMuscles: ['Latissimus Dorsi', 'Trapezius', 'Forearms', 'Core'],
    equipment: 'Barbell',
    difficulty: 'Advanced',
    defaultSets: 4,
    defaultReps: '4-6',
    restSeconds: 180,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    description: 'The ultimate test of total body posterior chain strength, spinal integrity, and raw pulling power.',
    instructions: [
      'Stand with mid-foot directly under barbell, feet hip-width apart.',
      'Hinge hips back and grip bar just outside shins.',
      'Pull chest proud, engage lats, pull slack out of the bar, brace core.',
      'Drive floor away with legs while keeping the bar close to body.',
      'Lock out at top by squeezing glutes without hyperextending lower back.',
    ],
    tips: 'Push the floor away rather than pulling with the lower spine.',
    commonMistakes: 'Rounding the lumbar spine; bar drifting forward away from shins.',
  },
  {
    name: 'Wide-Grip Lat Pulldown',
    category: 'Back',
    targetMuscle: 'Latissimus Dorsi',
    secondaryMuscles: ['Biceps Brachii', 'Rhomboids', 'Rear Deltoids'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    defaultSets: 4,
    defaultReps: '10-12',
    restSeconds: 75,
    image: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&w=800&q=80',
    description: 'Builds wide back wings (V-taper) and vertical pulling strength with manageable spinal loading.',
    instructions: [
      'Sit comfortably with thighs secured snugly under padded rollers.',
      'Grip the wide bar slightly wider than shoulder-width with overhand grip.',
      'Lean back 10-15 degrees and pull bar smoothly to upper chest.',
      'Squeeze lats hard at bottom before slowly extending back to top stretch.',
    ],
    tips: 'Lead the movement by driving elbows down into your back pockets.',
    commonMistakes: 'Swinging backward excessively using momentum; pulling bar behind neck.',
  },
  {
    name: 'Bent-Over Barbell Row',
    category: 'Back',
    targetMuscle: 'Latissimus Dorsi, Rhomboids, Middle Traps',
    secondaryMuscles: ['Posterior Deltoids', 'Biceps', 'Erectors'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    defaultSets: 4,
    defaultReps: '8-10',
    restSeconds: 90,
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
    description: 'Essential horizontal pulling builder for back thickness, spinal erector density, and posture.',
    instructions: [
      'Hinge forward at hips until torso is approximately 45 degrees to the floor.',
      'Hold barbell with overhand grip, arms hanging below shoulders.',
      'Row the barbell up toward lower ribcage/navel, elbows tucked.',
      'Pinch shoulder blades tightly at top, lower under control.',
    ],
    tips: 'Maintain neutral spine and soft knees to protect lower back.',
    commonMistakes: 'Jerking torso up and down to cheat weight; standing too upright.',
  },
  // SHOULDERS
  {
    name: 'Standing Overhead Barbell Press',
    category: 'Shoulders',
    targetMuscle: 'Anterior and Lateral Deltoids',
    secondaryMuscles: ['Triceps', 'Upper Trapezius', 'Core'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    defaultSets: 4,
    defaultReps: '6-8',
    restSeconds: 120,
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    description: 'The golden standard for vertical pressing, shoulder cap thickness, and overhead structural stability.',
    instructions: [
      'Rest barbell on clavicles with grip just outside shoulders.',
      'Brace abdominal core, squeeze glutes, tuck chin slightly.',
      'Press bar straight up vertically, clearing forehead.',
      'Lock out overhead with arms aligned over ears.',
    ],
    tips: 'Maintain rigid core brace; avoid arching lower spine.',
    commonMistakes: 'Bending knees into a push-press; excessive backward arch.',
  },
  {
    name: 'Dumbbell Lateral Raise',
    category: 'Shoulders',
    targetMuscle: 'Lateral Deltoids (Side Delts)',
    secondaryMuscles: ['Supraspinatus', 'Trapezius'],
    equipment: 'Dumbbell',
    difficulty: 'Beginner',
    defaultSets: 4,
    defaultReps: '12-15',
    restSeconds: 60,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    description: 'The premier exercise for broadening the silhouette and crafting three-dimensional shoulder caps.',
    instructions: [
      'Stand tall holding dumbbells at sides with slight forward lean.',
      'Keep slight bend in elbows.',
      'Raise dumbbells out to sides until arms are parallel to floor.',
      'Lower weights slowly through eccentric phase.',
    ],
    tips: 'Lead with your elbows and focus strictly on lateral delt contraction.',
    commonMistakes: 'Shrugging traps; using hip swing momentum.',
  },
  // LEGS
  {
    name: 'Barbell Back Squat',
    category: 'Legs',
    targetMuscle: 'Quadriceps, Gluteus Maximus',
    secondaryMuscles: ['Hamstrings', 'Adductors', 'Calves', 'Core'],
    equipment: 'Barbell',
    difficulty: 'Advanced',
    defaultSets: 4,
    defaultReps: '6-8',
    restSeconds: 150,
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    description: 'The king of lower body compounds for quad development, glute power, and systemic growth stimulus.',
    instructions: [
      'Place barbell across upper traps (high bar) or rear delts (low bar).',
      'Step back with feet shoulder-width, toes turned 15-30 degrees out.',
      'Take deep breath, brace core with Valsalva maneuver.',
      'Break at hips and knees together, descend until hip crease is below knee level.',
      'Drive powerfully through midfoot back to standing.',
    ],
    tips: 'Keep knees tracking directly in line with toes.',
    commonMistakes: 'Knees caving inward (valgus collapse); heels lifting off floor.',
  },
  {
    name: 'Dumbbell Romanian Deadlift (RDL)',
    category: 'Legs',
    targetMuscle: 'Hamstrings & Gluteus Maximus',
    secondaryMuscles: ['Erector Spinae', 'Forearms'],
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: '10-12',
    restSeconds: 90,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    description: 'Premier hamstring elongation movement promoting hypertrophy through lengthened eccentric stretch.',
    instructions: [
      'Stand holding dumbbells against front of thighs.',
      'Keep knees soft and push hips backward toward wall behind you.',
      'Slide dumbbells along shins until deep stretch is felt in hamstrings.',
      'Drive hips forward and contract glutes to return.',
    ],
    tips: 'Movement is horizontal hip hinge, not a vertical squat.',
    commonMistakes: 'Rounding lower back; bending knees excessively.',
  },
  // ARMS & CORE
  {
    name: 'Standing EZ-Bar Bicep Curl',
    category: 'Biceps',
    targetMuscle: 'Biceps Brachii (Both Heads)',
    secondaryMuscles: ['Forearm Flexors'],
    equipment: 'Barbell',
    difficulty: 'Beginner',
    defaultSets: 4,
    defaultReps: '8-10',
    restSeconds: 75,
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=800&q=80',
    description: 'Classic mass builder that allows heavy progressive overload for overall upper arm thickness.',
    instructions: [
      'Hold EZ-curl bar with underhand grip on cambered curves.',
      'Tuck elbows into ribcage, brace core.',
      'Curl bar up toward chest, flexing biceps hard at top.',
      'Lower under steady resistance to full elbow extension.',
    ],
    tips: 'Do not swing hips or lean back at the top.',
    commonMistakes: 'Elbows floating forward removing tension from biceps.',
  },
  {
    name: 'Cable Tricep Pushdown',
    category: 'Triceps',
    targetMuscle: 'Triceps Brachii (Lateral & Medial Heads)',
    secondaryMuscles: ['Anconeus'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    defaultSets: 4,
    defaultReps: '12-15',
    restSeconds: 60,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    description: 'Isolates the triceps with smooth constant tension, maximizing the horseshoe shape on outer arm.',
    instructions: [
      'Attach straight bar or rope to high pulley.',
      'Tuck elbows into ribs with knees slightly bent.',
      'Push handle down until arms are straight.',
      'Lock out and squeeze triceps for 1 second before controlling up to 90 degrees.',
    ],
    tips: 'Keep upper arms completely stationary.',
    commonMistakes: 'Allowing elbows to flare outward or travel up and down.',
  },
  {
    name: 'Isometric Core Plank',
    category: 'Abs',
    targetMuscle: 'Transverse Abdominis & Rectus Abdominis',
    secondaryMuscles: ['Internal/External Obliques', 'Glutes', 'Serratus'],
    equipment: 'Bodyweight',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: '45-60 sec',
    restSeconds: 60,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80',
    description: 'Gold standard isometric anti-extension core exercise for bracing power and rock-hard midsection stability.',
    instructions: [
      'Place forearms on ground with elbows directly under shoulders.',
      'Extend legs straight, resting on balls of feet.',
      'Tuck pelvis into posterior tilt, squeeze glutes, pull navel to spine.',
      'Hold rigid line from crown of head to heels without sagging hips.',
    ],
    tips: 'Actively pull elbows toward toes to generate maximum abdominal tension.',
    commonMistakes: 'Sagging lower back or hiking hips too high in the air.',
  },
];

const SEED_BLOGS = [
  {
    title: 'The Biological Laws of Progressive Overload: Science Beyond Adding Weight',
    category: 'Muscle Building',
    readTime: '6 min read',
    summary: 'Discover how mechanical tension, range of motion, and eccentric control can trigger muscular adaptation even without constantly loading more plates onto the barbell.',
    author: 'Dr. Marcus Vance, PhD, CSCS',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    content: [
      {
        heading: 'Mechanical Tension: The Primary Hypertrophy Stimulus',
        text: 'Mechanical tension is recognized in sports science as the chief initiator of muscle protein synthesis. High-threshold motor units recruited under slow contraction velocities trigger intramuscular mTORC1 signaling pathways.',
      },
      {
        heading: 'Avenues of Progression Without Adding Weight',
        text: 'Progressive overload encompasses increasing Reps In Reserve (RIR) execution quality, slowing eccentric tempo to 3-4 seconds, sinking active ranges of motion deeper, and reducing rest intervals.',
      },
    ],
    takeaways: [
      'Adding load is just one of four verified progressive overload vectors.',
      'Training within 1-3 reps of muscular failure delivers optimal hypertrophic stimulus.',
      'Eccentric control in the lengthened stretch triggers superior adaptation.',
    ],
    tags: ['hypertrophy', 'muscle building', 'progressive overload'],
  },
  {
    title: 'Debunking the 30-Minute Anabolic Window: Optimal Daily Protein Distribution',
    category: 'Nutrition',
    readTime: '5 min read',
    summary: 'Does chugging a protein shake 3 minutes after your last set really matter? Modern nutritional research reveals what actually drives protein synthesis.',
    author: 'Elena Rostova, Sports Dietitian',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1000&q=80',
    content: [
      {
        heading: 'The Myth of the 30-Minute Window',
        text: 'Muscle sensitivity to amino acids remains elevated for 24 to 48 hours post-exercise. Hitting total daily protein targets (1.6 to 2.2 g/kg) accounts for approximately 80% of dietary results.',
      },
    ],
    takeaways: [
      'Total daily protein intake far outweighs immediate post-workout micro-timing.',
      'Distribute protein across 3 to 5 meals to hit the 2.5-3.0g leucine threshold repeatedly.',
    ],
    tags: ['nutrition', 'protein', 'diet'],
  },
];

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('❌ MONGODB_URI is not set in backend/.env');
      process.exit(1);
    }

    console.log('🔄 Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to MongoDB.');

    // Clear existing data
    console.log('🧹 Cleaning existing test collections...');
    await Promise.all([
      User.deleteMany({}),
      Exercise.deleteMany({}),
      DietPlan.deleteMany({}),
      Blog.deleteMany({}),
      CommunityPost.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    // Seed Demo Users
    console.log('🌱 Seeding users...');
    const demoUser = await User.create({
      name: 'Alex Mercer',
      email: 'alex.mercer@ironpulse.io',
      password: 'IronPulse#2026',
      age: 26,
      gender: 'male',
      height: 180,
      weight: 78.5,
      goal: 'muscle_gain',
      fitnessExperience: 'intermediate',
      dietaryPreference: 'vegetarian',
      role: 'user',
      streakDays: 14,
      workoutsCompleted: 48,
    });

    const adminUser = await User.create({
      name: 'IRONPULSE Admin',
      email: 'admin@ironpulse.io',
      password: 'AdminPulse#2026',
      role: 'admin',
      goal: 'strength',
      dietaryPreference: 'non_vegetarian',
    });

    console.log(`👤 Users seeded: Alex Mercer (${demoUser.email}) and Admin (${adminUser.email})`);

    // Seed Exercises
    console.log('🌱 Seeding exercise library...');
    const exercises = await Exercise.insertMany(SEED_EXERCISES);
    console.log(`🏋️ Seeded ${exercises.length} verified exercises.`);

    // Seed Curated Diet Plans
    console.log('🌱 Seeding curated diet plans...');
    await DietPlan.create([
      {
        planName: 'Anabolic Mass & Hypertrophy Blueprint',
        fitnessGoal: 'muscle_gain',
        dietaryPreference: 'vegetarian',
        dailyCalorieTarget: 3050,
        proteinTarget: 195,
        carbohydrateTarget: 360,
        fatTarget: 82,
        description: 'Designed to sustain progressive resistance training while maximizing glycogen stores and protein synthesis with Indian vegetarian staples.',
        isTemplate: true,
        mealSchedule: [
          {
            title: 'Power Breakfast',
            timing: '08:00 AM',
            calories: 720,
            protein: 42,
            carbs: 88,
            fats: 22,
            items: ['80g Rolled Oats with 250ml Toned Milk', '1 Scoop Whey Isolate', '1 Banana sliced', '15g Almonds'],
          },
          {
            title: 'Champion Lunch',
            timing: '01:30 PM',
            calories: 840,
            protein: 55,
            carbs: 105,
            fats: 20,
            items: ['150g Pan-seared Paneer', '200g Brown Rice', '1 Bowl Yellow Dal Tadka', 'Green Salad'],
          },
          {
            title: 'Recovery Dinner',
            timing: '08:30 PM',
            calories: 580,
            protein: 38,
            carbs: 52,
            fats: 22,
            items: ['50g Soya Chunks Curry', '2 Multigrain Rotis', '1 Cup Low-fat Yogurt'],
          },
        ],
      },
      {
        planName: 'Precision Thermogenic Shred',
        fitnessGoal: 'fat_loss',
        dietaryPreference: 'non_vegetarian',
        dailyCalorieTarget: 1850,
        proteinTarget: 175,
        carbohydrateTarget: 145,
        fatTarget: 52,
        description: 'High-protein, high-fiber, low-calorie density protocol designed to preserve lean muscle mass during a calibrated deficit.',
        isTemplate: true,
        mealSchedule: [
          {
            title: 'Lean Start Breakfast',
            timing: '08:30 AM',
            calories: 380,
            protein: 36,
            carbs: 28,
            fats: 12,
            items: ['3 Egg Whites + 1 Whole Egg Omelette with spinach', '1 Slice Sprouted Toast', 'Green Tea'],
          },
          {
            title: 'Fiber-Loaded Lunch',
            timing: '01:30 PM',
            calories: 510,
            protein: 48,
            carbs: 45,
            fats: 14,
            items: ['160g Grilled Chicken Breast', '100g Boiled Quinoa', 'Steamed Broccoli and Zucchini'],
          },
        ],
      },
    ]);
    console.log('🥗 Curated diet plans seeded.');

    // Seed Blogs
    console.log('🌱 Seeding scientific blog articles...');
    await Blog.insertMany(SEED_BLOGS);
    console.log('📚 Blog articles seeded.');

    // Seed Community Posts
    console.log('🌱 Seeding community feed...');
    await CommunityPost.create([
      {
        user: demoUser._id,
        title: '6-Month Calisthenics & Heavy Compound Shred (+12kg muscle, -6% body fat)',
        content: 'Started at 84kg feeling sluggish. Switched to IronPulse PPL program and tracked my daily protein faithfully at 170g per day. Hit a new deadlift PR today at 200kg for 3 clean reps! Strength meets science is real. Keep putting in the work team!',
        tag: 'Transformation',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
        workoutShare: {
          name: 'Heavy Pull Day A',
          exercises: 'Deadlifts 200kg x 3, Barbell Rows 90kg, Lat Pulldowns 85kg',
          duration: '65 mins',
          volume: '11,400 kg',
        },
      },
    ]);
    console.log('💬 Community posts seeded.');

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding failed: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
