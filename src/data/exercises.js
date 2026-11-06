export const EXERCISES = [
  // CHEST
  {
    id: 'barbell-bench-press',
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
      'Drive powerfully through your feet and press the barbell back up to the lockout position while exhaling.'
    ],
    tips: 'Do not bounce the bar off your ribcage. Maintain tension in your lats and core throughout the movement.',
    commonMistakes: 'Flaring elbows out at 90 degrees; lifting buttocks off the bench.'
  },
  {
    id: 'incline-dumbbell-press',
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
      'Sit back holding a pair of dumbbells at shoulder height with palms facing forward.',
      'Press the dumbbells upwards and slightly inward until arms are nearly locked out.',
      'Lower the weights slowly until you feel a deep stretch in your upper pectorals.',
      'Pause for a fraction of a second at the bottom before driving up.'
    ],
    tips: 'Avoid setting the incline too high (>45 degrees) which shifts the focus primarily to front shoulders.',
    commonMistakes: 'Banging the dumbbells together at the top; uncontrolled descent.'
  },
  {
    id: 'cable-chest-flye',
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
    description: 'Provides constant continuous tension throughout the entire range of motion, emphasizing peak contraction.',
    instructions: [
      'Attach D-handles to the high pulleys of a cable crossover machine.',
      'Step forward in a staggered stance, keeping a slight bend in your elbows and leaning slightly forward.',
      'Bring both hands down and forward in a hugging arc until your hands meet in front of your hips.',
      'Squeeze your chest hard for 1 second at peak contraction.',
      'Slowly open your arms back to the starting stretch position.'
    ],
    tips: 'Keep your chest puffed out and squeeze your pecs like you are wrapping your arms around a wide barrel.',
    commonMistakes: 'Bending and straightening elbows like a press instead of maintaining fixed elbow angle.'
  },

  // BACK
  {
    id: 'conventional-deadlift',
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
      'Stand with mid-foot directly under the barbell, feet hip-width apart.',
      'Hinge hips back and grip the bar just outside your shins.',
      'Pull chest up, engage your lats, pull slack out of the barbell, and brace your core tightly.',
      'Drive the floor away with your legs while keeping the bar close to your body.',
      'Stand tall at the top by contracting glutes without hyperextending lower back.',
      'Reverse the hip hinge to lower the bar with control.'
    ],
    tips: 'Think of "pushing the earth away" rather than pulling the bar with your lower back.',
    commonMistakes: 'Rounding the lumbar spine; letting the barbell drift away from shins.'
  },
  {
    id: 'lat-pulldown',
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
    description: 'Builds wide, sweeping back wings (V-taper) and vertical pulling strength with manageable spinal loading.',
    instructions: [
      'Sit comfortably with your thighs secured snugly under the padded rollers.',
      'Take an overhand grip slightly wider than shoulder-width on the wide bar.',
      'Lean back slightly (10-15 degrees), depress your shoulder blades, and pull the bar smoothly to your upper chest.',
      'Squeeze your lats hard at the bottom.',
      'Slowly extend your arms back up to achieve a full stretch at the top.'
    ],
    tips: 'Lead the movement by driving your elbows down toward your back pockets.',
    commonMistakes: 'Swinging backward excessively to use momentum; pulling bar behind the neck.'
  },
  {
    id: 'bent-over-barbell-row',
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
    description: 'Essential horizontal pulling builder for back thickness, density, and postural reinforcement.',
    instructions: [
      'Hinge forward at hips until your torso is approximately 45 degrees to the floor.',
      'Hold the barbell with an overhand grip, arms hanging naturally below shoulders.',
      'Pull the barbell upward toward your lower ribcage/navel, keeping elbows tucked close to sides.',
      'Pinch your shoulder blades tightly together at the top.',
      'Lower the weight smoothly under full control without letting your lower back round.'
    ],
    tips: 'Maintain a neutral spine and knees slightly bent to protect your lower back.',
    commonMistakes: 'Jerking torso up and down to cheat weight; standing too upright.'
  },

  // SHOULDERS
  {
    id: 'overhead-shoulder-press',
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
      'Rest the barbell across your clavicles with an overhand grip just outside shoulders.',
      'Brace your abdominal core, squeeze your glutes, and tuck your chin slightly.',
      'Press the bar upward in a straight vertical line, clearing your forehead.',
      'Lock out overhead with arms aligned directly above your ears.',
      'Lower under control back to collarbone level.'
    ],
    tips: 'Do not arch your lower spine; maintain rock-solid abdominal brace throughout.',
    commonMistakes: 'Bending knees to turn it into a push-press; excessively leaning back.'
  },
  {
    id: 'dumbbell-lateral-raise',
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
    description: 'The premier exercise for broadening the silhouette and crafting that three-dimensional boulder shoulder look.',
    instructions: [
      'Stand upright holding dumbbells at your sides with a slight forward torso tilt.',
      'Keep a slight bend in your elbows.',
      'Raise dumbbells out to the sides until your arms are parallel to the floor.',
      'Lead with your elbows and slightly pour out imagined pitchers of water at the top.',
      'Lower the weights slowly through the negative phase.'
    ],
    tips: 'Use moderate weight and focus strictly on lateral delt contraction without swinging.',
    commonMistakes: 'Shrugging shoulders with upper traps; swinging dumbbells with hips.'
  },
  {
    id: 'face-pulls',
    name: 'Cable Face Pull with External Rotation',
    category: 'Shoulders',
    targetMuscle: 'Rear Deltoids & Rotator Cuff',
    secondaryMuscles: ['Rhomboids', 'Middle Traps'],
    equipment: 'Cable',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: '15-20',
    restSeconds: 60,
    image: 'https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=800&q=80',
    description: 'Crucial for shoulder health, posture restoration, and bulletproofing against pressing injuries.',
    instructions: [
      'Set a rope attachment at upper chest or eye level on a cable machine.',
      'Grip the rope with thumbs pointing back towards you and step back to create tension.',
      'Pull the center of the rope directly toward the bridge of your nose.',
      'As you pull, rotate your wrists backward so hands finish beside your ears in a double biceps pose.',
      'Hold the contraction for 1 full second before returning.'
    ],
    tips: 'Think about pulling your hands apart as you reach your face.',
    commonMistakes: 'Setting weight too heavy and turning it into a row.'
  },

  // LEGS
  {
    id: 'barbell-back-squat',
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
      'Position the barbell across your upper traps (high bar) or rear delts (low bar).',
      'Step back with feet shoulder-width apart, toes turned slightly out (15-30 degrees).',
      'Take a deep belly breath and brace your core with the Valsalva maneuver.',
      'Initiate by breaking at hips and knees simultaneously, descending until hip crease is below knee level.',
      'Drive powerfully out of the hole through midfoot, keeping chest high.'
    ],
    tips: 'Keep knees tracking in line with toes throughout both descent and ascent.',
    commonMistakes: 'Knees caving inward (valgus collapse); heels lifting off the ground.'
  },
  {
    id: 'romanian-deadlift',
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
    description: 'Premier hamstring elongation movement that promotes muscle fiber recruitment through eccentric stretch.',
    instructions: [
      'Stand tall holding dumbbells against the front of your thighs.',
      'Keep knees soft (slight bend) and unlock your hips.',
      'Push your hips backward towards the wall behind you while sliding dumbbells down along your shins.',
      'Stop when you feel a deep stretch across hamstrings (usually mid-shin level).',
      'Drive hips forward and squeeze glutes to return to standing.'
    ],
    tips: 'The movement is purely horizontal hip hinge, not a vertical squat.',
    commonMistakes: 'Rounding the lower back; bending knees too much turning it into a squat.'
  },
  {
    id: 'walking-lunges',
    name: 'Dumbbell Walking Lunges',
    category: 'Legs',
    targetMuscle: 'Quadriceps, Glutes, Hamstrings',
    secondaryMuscles: ['Calves', 'Core Stabilizers'],
    equipment: 'Dumbbell',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: '12 per leg',
    restSeconds: 75,
    image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?auto=format&fit=crop&w=800&q=80',
    description: 'Unilateral leg builder that addresses muscle imbalances, hip stability, and conditioning.',
    instructions: [
      'Hold a dumbbell in each hand at your sides with chest proud.',
      'Take an exaggerated step forward, landing heel-first.',
      'Lower your body until your front thigh is parallel to the ground and rear knee nearly taps the floor.',
      'Push through the front heel to step directly forward into the next lunge.'
    ],
    tips: 'Maintain upright torso posture and keep front knee tracked over midfoot.',
    commonMistakes: 'Taking steps too short causing excessive knee shearing.'
  },

  // BICEPS
  {
    id: 'incline-dumbbell-curl',
    name: 'Incline Dumbbell Bicep Curl',
    category: 'Biceps',
    targetMuscle: 'Biceps Brachii (Long Head)',
    secondaryMuscles: ['Brachialis', 'Brachioradialis'],
    equipment: 'Dumbbell',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: '10-12',
    restSeconds: 60,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    description: 'Places the long head of the biceps under maximum passive stretch for superior peak development.',
    instructions: [
      'Set an incline bench to 45-60 degrees and sit back with arms hanging straight down.',
      'Curl the dumbbells upward while supinating wrists (turning pinkies outward toward shoulders).',
      'Squeeze biceps firmly at the top without allowing elbows to swing forward.',
      'Lower the dumbbells slowly over 2-3 seconds back to dead hang.'
    ],
    tips: 'Keep elbows pinned stationary behind your torso throughout.',
    commonMistakes: 'Using torso momentum to rock weights up.'
  },
  {
    id: 'barbell-bicep-curl',
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
      'Hold an EZ-curl bar with an underhand grip on the cambered curves.',
      'Keep your elbows tucked into your ribcage and core tight.',
      'Curl the bar upward toward chest level, flexing biceps hard.',
      'Lower the bar under steady resistance to full elbow extension.'
    ],
    tips: 'Do not swing your hips or lean back at the top.',
    commonMistakes: 'Elbows floating forward removing tension from biceps.'
  },
  {
    id: 'hammer-curl',
    name: 'Dumbbell Hammer Curls',
    category: 'Biceps',
    targetMuscle: 'Brachialis & Brachioradialis',
    secondaryMuscles: ['Biceps Long Head'],
    equipment: 'Dumbbell',
    difficulty: 'Beginner',
    defaultSets: 3,
    defaultReps: '10-12',
    restSeconds: 60,
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    description: 'Expands the outer arm width and builds thick, dense forearms by overloading the brachialis muscle.',
    instructions: [
      'Hold dumbbells with a neutral grip (palms facing each other).',
      'Keep elbows pinned and curl the dumbbells straight up.',
      'Pause and flex at shoulder height.',
      'Lower with strict control back to starting position.'
    ],
    tips: 'Perform alternating or together for intense forearm burn.',
    commonMistakes: 'Turning wrists or rotating dumbbells inward.'
  },

  // TRICEPS
  {
    id: 'cable-tricep-pushdown',
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
    description: 'Isolates the triceps with smooth constant tension, maximizing the horseshoe shape on the outer arm.',
    instructions: [
      'Attach a straight bar or rope to a high cable pulley.',
      'Stand with feet hip-width, knees slightly bent, elbows tucked to your ribs.',
      'Push the handle down by extending elbows until arms are straight.',
      'Lock out and squeeze triceps for a split-second.',
      'Control the handle back up to chest level (90 degree elbow bend).'
    ],
    tips: 'Ensure your upper arms remain completely stationary throughout.',
    commonMistakes: 'Allowing elbows to flare or travel up and down.'
  },
  {
    id: 'skull-crushers',
    name: 'Lying EZ-Bar Skull Crushers',
    category: 'Triceps',
    targetMuscle: 'Triceps Brachii (Long Head)',
    secondaryMuscles: ['Anterior Deltoids'],
    equipment: 'Barbell',
    difficulty: 'Intermediate',
    defaultSets: 3,
    defaultReps: '8-12',
    restSeconds: 75,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    description: 'The heavyweight compound isolation builder for massive tricep meat and pressing lockout power.',
    instructions: [
      'Lie back on a flat bench holding an EZ-curl bar above your chest with arms extended.',
      'Angle your upper arms back slightly (10-15 degrees) toward your head to keep constant tension.',
      'Bend elbows to lower the bar towards the top of your forehead or just past the bench crown.',
      'Drive the bar back up by flexing triceps back into the locked position.'
    ],
    tips: 'Keep elbows tucked shoulder-width apart without flaring out.',
    commonMistakes: 'Dropping weight too quickly towards forehead; flaring elbows.'
  },

  // ABS / CORE
  {
    id: 'weighted-plank',
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
      'Place forearms on the ground with elbows aligned directly under shoulders.',
      'Extend legs straight behind you, resting on the balls of your feet.',
      'Tuck pelvis into posterior tilt, squeeze glutes hard, and pull belly button firmly toward your spine.',
      'Hold a rigid line from crown of head to heels without sagging hips.'
    ],
    tips: 'Actively pull elbows toward your toes to generate maximum tension.',
    commonMistakes: 'Sagging lower back or hiking hips too high in the air.'
  },
  {
    id: 'hanging-leg-raises',
    name: 'Hanging Leg Raises',
    category: 'Abs',
    targetMuscle: 'Lower Rectus Abdominis & Hip Flexors',
    secondaryMuscles: ['Obliques', 'Grip Strength'],
    equipment: 'Bodyweight',
    difficulty: 'Advanced',
    defaultSets: 3,
    defaultReps: '12-15',
    restSeconds: 60,
    image: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=800&q=80',
    description: 'Dynamic spinal flexion exercise that carves deep abdominal definition and reinforces grip strength.',
    instructions: [
      'Hang from a pull-up bar with an overhand grip, shoulders engaged.',
      'Without swinging, raise straight legs up until they are parallel to the floor (or touch bar).',
      'Roll your pelvis slightly upward at the top for maximum lower ab contraction.',
      'Lower legs back down slowly under strict eccentric control.'
    ],
    tips: 'Bend knees slightly if hamstring flexibility restricts straight-leg performance.',
    commonMistakes: 'Using hip swinging momentum to propel legs up.'
  },

  // FULL BODY / FUNCTIONAL
  {
    id: 'kettlebell-swings',
    name: 'Russian Kettlebell Swings',
    category: 'Full Body',
    targetMuscle: 'Glutes, Hamstrings, Posterior Chain',
    secondaryMuscles: ['Core', 'Shoulders', 'Lats'],
    equipment: 'Bodyweight',
    difficulty: 'Intermediate',
    defaultSets: 4,
    defaultReps: '15-20',
    restSeconds: 60,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    description: 'High-power ballistic hip hinge for explosive athletic power, conditioning, and cardiovascular shred.',
    instructions: [
      'Stand with feet slightly wider than shoulder-width, kettlebell one foot in front.',
      'Hinge hips back and grab the handle with both hands, tilting it back.',
      'Hike the kettlebell between your thighs like a football snap.',
      'Explosively snap hips forward and contract glutes, projecting kettlebell to chest height.',
      'Let the kettlebell swing back freely into the hinge and repeat fluidly.'
    ],
    tips: 'The swing is powered entirely by the hip snap, not lifting with arms.',
    commonMistakes: 'Squatting the bell instead of hinging hips; leaning backward at top.'
  },
  {
    id: 'barbell-clean-and-press',
    name: 'Power Clean & Strict Press',
    category: 'Full Body',
    targetMuscle: 'Entire Muscular System (Posterior Chain & Delts)',
    secondaryMuscles: ['Traps', 'Quadriceps', 'Core', 'Triceps'],
    equipment: 'Barbell',
    difficulty: 'Advanced',
    defaultSets: 4,
    defaultReps: '5',
    restSeconds: 120,
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    description: 'Classic Olympic-inspired athletic developer for explosive triple extension and overhead strength.',
    instructions: [
      'Start with barbell on floor in deadlift posture.',
      'Accelerate bar off floor, execute second pull by aggressively extending hips and shrugging.',
      'Catch the barbell smoothly on your front deltoids in a quarter squat.',
      'Stand tall, reset feet, and drive the barbell overhead in a strict military press.'
    ],
    tips: 'Keep the bar traveling close to your body in a tight vertical trajectory.',
    commonMistakes: 'Catching the bar with wrists bent backwards without deltoid shelf.'
  }
];

export const MUSCLE_CATEGORIES = [
  'All',
  'Chest',
  'Back',
  'Shoulders',
  'Biceps',
  'Triceps',
  'Legs',
  'Abs',
  'Full Body'
];

export const DIFFICULTY_LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];
export const EQUIPMENT_TYPES = ['All', 'Barbell', 'Dumbbell', 'Cable', 'Machine', 'Bodyweight'];

