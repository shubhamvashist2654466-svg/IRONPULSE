export const PRESET_SPLITS = {
  ppl: {
    id: 'ppl',
    name: 'Push Pull Legs (PPL)',
    description: 'Gold-standard frequency split targeting push muscles, pull muscles, and lower body sequentially.',
    frequency: '6 Days / Week (or 3-day cycle)',
    days: [
      {
        day: 'Monday',
        focus: 'Push A (Chest, Shoulders, Triceps)',
        exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: '6-8', rest: '120s' },
          { name: 'Incline Dumbbell Press', sets: 3, reps: '8-10', rest: '90s' },
          { name: 'Standing Overhead Barbell Press', sets: 3, reps: '8-10', rest: '90s' },
          { name: 'Dumbbell Lateral Raise', sets: 4, reps: '12-15', rest: '60s' },
          { name: 'Cable Tricep Pushdown', sets: 3, reps: '12-15', rest: '60s' }
        ]
      },
      {
        day: 'Tuesday',
        focus: 'Pull A (Back, Rear Delts, Biceps)',
        exercises: [
          { name: 'Conventional Barbell Deadlift', sets: 3, reps: '5', rest: '180s' },
          { name: 'Wide-Grip Lat Pulldown', sets: 4, reps: '10-12', rest: '75s' },
          { name: 'Bent-Over Barbell Row', sets: 3, reps: '8-10', rest: '90s' },
          { name: 'Cable Face Pull with External Rotation', sets: 3, reps: '15-20', rest: '60s' },
          { name: 'Standing EZ-Bar Bicep Curl', sets: 3, reps: '10-12', rest: '60s' }
        ]
      },
      {
        day: 'Wednesday',
        focus: 'Legs A (Quads, Hamstrings, Calves)',
        exercises: [
          { name: 'Barbell Back Squat', sets: 4, reps: '6-8', rest: '150s' },
          { name: 'Dumbbell Romanian Deadlift (RDL)', sets: 3, reps: '10-12', rest: '90s' },
          { name: 'Dumbbell Walking Lunges', sets: 3, reps: '12 per leg', rest: '75s' },
          { name: 'Isometric Core Plank', sets: 3, reps: '60s hold', rest: '60s' }
        ]
      },
      {
        day: 'Thursday',
        focus: 'Push B (Hypertrophy / Delts Focus)',
        exercises: [
          { name: 'Incline Dumbbell Press', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'High-to-Low Cable Flye', sets: 3, reps: '12-15', rest: '60s' },
          { name: 'Dumbbell Lateral Raise', sets: 4, reps: '15', rest: '60s' },
          { name: 'Lying EZ-Bar Skull Crushers', sets: 3, reps: '10-12', rest: '75s' }
        ]
      },
      {
        day: 'Friday',
        focus: 'Pull B (Lats / Biceps Peak)',
        exercises: [
          { name: 'Wide-Grip Lat Pulldown', sets: 4, reps: '10-12', rest: '75s' },
          { name: 'Bent-Over Barbell Row', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Incline Dumbbell Bicep Curl', sets: 3, reps: '12', rest: '60s' },
          { name: 'Dumbbell Hammer Curls', sets: 3, reps: '12', rest: '60s' }
        ]
      },
      {
        day: 'Saturday',
        focus: 'Legs B & Functional Conditioning',
        exercises: [
          { name: 'Barbell Back Squat', sets: 3, reps: '8-10', rest: '120s' },
          { name: 'Dumbbell Romanian Deadlift (RDL)', sets: 3, reps: '12', rest: '90s' },
          { name: 'Russian Kettlebell Swings', sets: 4, reps: '15-20', rest: '60s' },
          { name: 'Hanging Leg Raises', sets: 3, reps: '15', rest: '60s' }
        ]
      },
      {
        day: 'Sunday',
        focus: 'Active Rest & Mobility',
        exercises: [
          { name: 'Light 30min walk & foam rolling', sets: 1, reps: '30 mins', rest: 'N/A' },
          { name: 'Full body dynamic mobility stretch', sets: 1, reps: '15 mins', rest: 'N/A' }
        ]
      }
    ]
  },

  bro_split: {
    id: 'bro_split',
    name: 'Classic Bodybuilding (Bro Split)',
    description: 'Devotes an entire training session to one specific muscle group for maximum volume & pump.',
    frequency: '5 Days / Week',
    days: [
      {
        day: 'Monday',
        focus: 'Chest Annihilation',
        exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: '6-8', rest: '120s' },
          { name: 'Incline Dumbbell Press', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'High-to-Low Cable Flye', sets: 4, reps: '12-15', rest: '60s' },
          { name: 'Isometric Core Plank', sets: 3, reps: '60s', rest: '60s' }
        ]
      },
      {
        day: 'Tuesday',
        focus: 'Back Thickness & Width',
        exercises: [
          { name: 'Conventional Barbell Deadlift', sets: 4, reps: '5', rest: '180s' },
          { name: 'Wide-Grip Lat Pulldown', sets: 4, reps: '10-12', rest: '75s' },
          { name: 'Bent-Over Barbell Row', sets: 4, reps: '8-10', rest: '90s' }
        ]
      },
      {
        day: 'Wednesday',
        focus: 'Shoulders & Traps',
        exercises: [
          { name: 'Standing Overhead Barbell Press', sets: 4, reps: '8-10', rest: '90s' },
          { name: 'Dumbbell Lateral Raise', sets: 5, reps: '12-15', rest: '60s' },
          { name: 'Cable Face Pull with External Rotation', sets: 4, reps: '15-20', rest: '60s' }
        ]
      },
      {
        day: 'Thursday',
        focus: 'Leg Day Iron Foundation',
        exercises: [
          { name: 'Barbell Back Squat', sets: 4, reps: '6-8', rest: '150s' },
          { name: 'Dumbbell Romanian Deadlift (RDL)', sets: 4, reps: '10-12', rest: '90s' },
          { name: 'Dumbbell Walking Lunges', sets: 3, reps: '12 per leg', rest: '75s' }
        ]
      },
      {
        day: 'Friday',
        focus: 'Arm Hypertrophy (Biceps & Triceps Super-sets)',
        exercises: [
          { name: 'Standing EZ-Bar Bicep Curl', sets: 4, reps: '8-10', rest: '60s' },
          { name: 'Cable Tricep Pushdown', sets: 4, reps: '12-15', rest: '60s' },
          { name: 'Incline Dumbbell Bicep Curl', sets: 3, reps: '10-12', rest: '60s' },
          { name: 'Lying EZ-Bar Skull Crushers', sets: 3, reps: '10-12', rest: '60s' }
        ]
      },
      {
        day: 'Saturday',
        focus: 'Rest & Recovery',
        exercises: [{ name: 'Deep tissue recovery & hydration', sets: 1, reps: 'All day', rest: 'N/A' }]
      },
      {
        day: 'Sunday',
        focus: 'Rest & Mental Prep',
        exercises: [{ name: 'Meal prep & light mobility', sets: 1, reps: 'All day', rest: 'N/A' }]
      }
    ]
  },

  upper_lower: {
    id: 'upper_lower',
    name: 'Upper / Lower Split',
    description: 'Perfect balance of high frequency (2x per week each muscle) with ample recovery for athletic strength.',
    frequency: '4 Days / Week',
    days: [
      {
        day: 'Monday',
        focus: 'Upper Body Power',
        exercises: [
          { name: 'Barbell Bench Press', sets: 4, reps: '5-6', rest: '120s' },
          { name: 'Bent-Over Barbell Row', sets: 4, reps: '6-8', rest: '120s' },
          { name: 'Standing Overhead Barbell Press', sets: 3, reps: '6-8', rest: '90s' },
          { name: 'Standing EZ-Bar Bicep Curl', sets: 3, reps: '10', rest: '60s' }
        ]
      },
      {
        day: 'Tuesday',
        focus: 'Lower Body Strength',
        exercises: [
          { name: 'Barbell Back Squat', sets: 4, reps: '5-6', rest: '150s' },
          { name: 'Dumbbell Romanian Deadlift (RDL)', sets: 3, reps: '8-10', rest: '90s' },
          { name: 'Isometric Core Plank', sets: 3, reps: '60s', rest: '60s' }
        ]
      },
      {
        day: 'Wednesday',
        focus: 'Active Rest / Cardio',
        exercises: [{ name: 'Zone 2 Cardio & Mobility', sets: 1, reps: '30 mins', rest: 'N/A' }]
      },
      {
        day: 'Thursday',
        focus: 'Upper Body Hypertrophy',
        exercises: [
          { name: 'Incline Dumbbell Press', sets: 4, reps: '8-12', rest: '90s' },
          { name: 'Wide-Grip Lat Pulldown', sets: 4, reps: '10-12', rest: '75s' },
          { name: 'Dumbbell Lateral Raise', sets: 4, reps: '12-15', rest: '60s' },
          { name: 'Cable Tricep Pushdown', sets: 3, reps: '12-15', rest: '60s' }
        ]
      },
      {
        day: 'Friday',
        focus: 'Lower Body Volume',
        exercises: [
          { name: 'Dumbbell Walking Lunges', sets: 3, reps: '12 per leg', rest: '75s' },
          { name: 'Russian Kettlebell Swings', sets: 4, reps: '15-20', rest: '60s' },
          { name: 'Hanging Leg Raises', sets: 3, reps: '12', rest: '60s' }
        ]
      },
      {
        day: 'Saturday',
        focus: 'Rest & Mobility',
        exercises: [{ name: 'Rest and recovery', sets: 1, reps: 'All day', rest: 'N/A' }]
      },
      {
        day: 'Sunday',
        focus: 'Rest',
        exercises: [{ name: 'Weekly nutrition reset', sets: 1, reps: 'All day', rest: 'N/A' }]
      }
    ]
  },

  full_body: {
    id: 'full_body',
    name: '3-Day Full Body Compound Focus',
    description: 'High-efficiency full-body stimulation 3x per week. Maximum bang-for-buck for busy lifters.',
    frequency: '3 Days / Week',
    days: [
      {
        day: 'Monday',
        focus: 'Full Body Heavy A',
        exercises: [
          { name: 'Barbell Back Squat', sets: 3, reps: '6-8', rest: '150s' },
          { name: 'Barbell Bench Press', sets: 3, reps: '6-8', rest: '120s' },
          { name: 'Bent-Over Barbell Row', sets: 3, reps: '8', rest: '90s' },
          { name: 'Cable Face Pull with External Rotation', sets: 3, reps: '15', rest: '60s' }
        ]
      },
      {
        day: 'Tuesday',
        focus: 'Rest & Recovery',
        exercises: [{ name: 'Rest / Light Walk', sets: 1, reps: '30 mins', rest: 'N/A' }]
      },
      {
        day: 'Wednesday',
        focus: 'Full Body Explosive B',
        exercises: [
          { name: 'Conventional Barbell Deadlift', sets: 3, reps: '5', rest: '180s' },
          { name: 'Standing Overhead Barbell Press', sets: 3, reps: '6-8', rest: '120s' },
          { name: 'Wide-Grip Lat Pulldown', sets: 3, reps: '10-12', rest: '75s' },
          { name: 'Isometric Core Plank', sets: 3, reps: '60s', rest: '60s' }
        ]
      },
      {
        day: 'Thursday',
        focus: 'Rest & Recovery',
        exercises: [{ name: 'Rest / Light Walk', sets: 1, reps: '30 mins', rest: 'N/A' }]
      },
      {
        day: 'Friday',
        focus: 'Full Body Hypertrophy C',
        exercises: [
          { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '90s' },
          { name: 'Dumbbell Romanian Deadlift (RDL)', sets: 3, reps: '10-12', rest: '90s' },
          { name: 'Dumbbell Lateral Raise', sets: 4, reps: '12-15', rest: '60s' },
          { name: 'Standing EZ-Bar Bicep Curl', sets: 3, reps: '10', rest: '60s' },
          { name: 'Cable Tricep Pushdown', sets: 3, reps: '12', rest: '60s' }
        ]
      },
      {
        day: 'Saturday',
        focus: 'Rest & Outdoor Activity',
        exercises: [{ name: 'Hiking / Swimming / Rest', sets: 1, reps: 'Outdoor', rest: 'N/A' }]
      },
      {
        day: 'Sunday',
        focus: 'Complete Rest',
        exercises: [{ name: 'Recovery sleep', sets: 1, reps: '8 hours', rest: 'N/A' }]
      }
    ]
  }
};

