export const COMMUNITY_POSTS = [
  {
    id: 'post_1',
    author: {
      name: 'Rohan Sharma',
      handle: '@rohan_iron',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      badge: 'PRO ATHLETE',
      badgeColor: 'bg-neon/20 text-neon border-neon/40'
    },
    timestamp: '2 hours ago',
    tag: 'Transformation',
    title: '6-Month Calisthenics & Heavy Compound Shred (+12kg muscle, -6% body fat)',
    content: 'Started at 84kg feeling sluggish. Switched to IronPulse PPL program and tracked my daily protein faithfully at 170g per day. Hit a new deadlift PR today at 200kg for 3 clean reps! Strength meets science is real. Keep putting in the work team!',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    likes: 142,
    hasLiked: false,
    workoutShare: {
      name: 'Heavy Pull Day A',
      exercises: 'Deadlifts 200kg x 3, Barbell Rows 90kg, Lat Pulldowns 85kg',
      duration: '65 mins',
      volume: '11,400 kg'
    },
    comments: [
      {
        id: 'c1',
        author: 'Maya Lin',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        text: 'Insane progress Rohan! What was your calorie deficit strategy towards the end?',
        timestamp: '1 hour ago'
      },
      {
        id: 'c2',
        author: 'Rohan Sharma',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
        text: 'Kept it at a modest 300 kcal deficit using the IronPulse TDEE calculator so I never lost strength!',
        timestamp: '45 mins ago'
      }
    ]
  },
  {
    id: 'post_2',
    author: {
      name: 'Dr. Sarah Lin',
      handle: '@dr_sarah_lifts',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      badge: 'COACH',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40'
    },
    timestamp: '5 hours ago',
    tag: 'Nutrition',
    title: 'Reminder for Plant-Based Lifters: Essential Amino Acid Leucine Threshold',
    content: 'If you rely heavily on plant proteins (lentils, chickpeas, tofu), remember that their leucine percentage is slightly lower than whey or dairy. Simply combine sources (e.g., Dal + Rice, or Soya Chunks + Oats) or consume 30-35g total protein per meal to trigger the maximum muscle protein synthesis threshold.',
    image: null,
    likes: 89,
    hasLiked: true,
    workoutShare: null,
    comments: [
      {
        id: 'c3',
        author: 'Vikram Joshi',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        text: 'Super helpful doc! Soya chunks have been an absolute game changer for my daily targets.',
        timestamp: '3 hours ago'
      }
    ]
  },
  {
    id: 'post_3',
    author: {
      name: 'Dave Henderson',
      handle: '@dave_power',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      badge: 'CENTURION',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40'
    },
    timestamp: '1 day ago',
    tag: 'PR Alert',
    title: 'Bench Press Milestone: Finally hit 140kg (3 plates)!',
    content: 'Two years ago I was stuck at 100kg. Fixed my scapular retraction, narrowed my grip slightly, and committed to progressive overload with the Upper/Lower 4-day split on IronPulse. Clean pause on the chest and explosive drive.',
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=800&q=80',
    likes: 215,
    hasLiked: false,
    workoutShare: {
      name: 'Upper Body Heavy Bench',
      exercises: 'Flat Barbell Bench 140kg x 1, Incline DB Press 45kg x 8, Weighted Dips +25kg',
      duration: '70 mins',
      volume: '9,850 kg'
    },
    comments: [
      {
        id: 'c4',
        author: 'Carlos Mendes',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
        text: 'Huge milestone brother! That pause makes it 100% legit.',
        timestamp: '18 hours ago'
      }
    ]
  }
];

export const FITNESS_CHALLENGES = [
  {
    id: 'ch_1',
    title: '30-Day 100 Push-ups Daily',
    participants: 1420,
    daysLeft: 12,
    difficulty: 'Intermediate',
    rewardBadge: 'Push Master',
    progress: 60, // percent
    description: 'Build dense pectoral armor and shoulder endurance by completing 100 disciplined push-ups every day.'
  },
  {
    id: 'ch_2',
    title: '10,000 Steps Daily Metabolic Burn',
    participants: 3840,
    daysLeft: 19,
    difficulty: 'All Levels',
    rewardBadge: 'Iron Pacer',
    progress: 75,
    description: 'Crush NEAT (Non-Exercise Activity Thermogenesis) by hitting at least 10k steps daily without missing a single day.'
  },
  {
    id: 'ch_3',
    title: '5-Minute Total Core Plank Challenge',
    participants: 890,
    daysLeft: 8,
    difficulty: 'Advanced',
    rewardBadge: 'Steel Core',
    progress: 40,
    description: 'Progressively build up your isometric anti-extension core strength to hold a continuous 5-minute plank.'
  }
];

export const LEADERBOARD = [
  {
    rank: 1,
    name: 'Vikram "Titan" Joshi',
    handle: '@vikram_titan',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    points: 9850,
    workoutsLogged: 34,
    tier: 'Gold',
    streak: 38
  },
  {
    rank: 2,
    name: 'Sarah Lin',
    handle: '@dr_sarah_lifts',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    points: 9420,
    workoutsLogged: 31,
    tier: 'Silver',
    streak: 30
  },
  {
    rank: 3,
    name: 'Dave Henderson',
    handle: '@dave_power',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    points: 8960,
    workoutsLogged: 29,
    tier: 'Bronze',
    streak: 26
  },
  {
    rank: 4,
    name: 'Alex Mercer (You)',
    handle: '@alex_mercer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    points: 8450,
    workoutsLogged: 27,
    tier: 'Iron',
    streak: 14
  },
  {
    rank: 5,
    name: 'Natasha Romanov',
    handle: '@natasha_fit',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    points: 7920,
    workoutsLogged: 25,
    tier: 'Iron',
    streak: 21
  }
];

export const BADGES = [
  { id: 'b1', name: 'Iron Will', description: 'Maintained a 14-day consecutive workout streak', icon: 'Flame', unlocked: true },
  { id: 'b2', name: 'Centurion Lifter', description: 'Logged over 100 total workouts on IronPulse', icon: 'Award', unlocked: true },
  { id: 'b3', name: 'Macro Master', description: 'Hit protein target 30 days in a row', icon: 'Target', unlocked: true },
  { id: 'b4', name: 'Heavyweight Club', description: 'Benched bodyweight x 1.5 or Squatted 2x bodyweight', icon: 'Dumbbell', unlocked: false },
  { id: 'b5', name: 'Early Bird', description: 'Logged 10 workouts before 7:00 AM', icon: 'Zap', unlocked: true },
  { id: 'b6', name: 'Hydration Deity', description: 'Hit 3.5L water daily for 21 days', icon: 'Droplet', unlocked: false }
];

