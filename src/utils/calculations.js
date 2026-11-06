/**
 * Fitness & Body Metrics Calculations
 * Science-backed standard formulas for IronPulse
 */

// 1. BMI Calculator
export function calculateBMI(weightKg, heightCm) {
  if (!weightKg || !heightCm || heightCm <= 0 || weightKg <= 0) return null;
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const rounded = Number(bmi.toFixed(1));

  let category = 'Normal';
  let color = 'text-green-400';
  let description = 'Healthy weight range. Keep maintaining your nutrition and active lifestyle!';

  if (rounded < 18.5) {
    category = 'Underweight';
    color = 'text-blue-400';
    description = 'Below the recommended range. Focus on calorie-dense, nutrient-rich foods to build healthy mass.';
  } else if (rounded >= 18.5 && rounded <= 24.9) {
    category = 'Normal';
    color = 'text-neon';
    description = 'Optimal weight range according to WHO standards. Great foundation for strength & athletic conditioning.';
  } else if (rounded >= 25 && rounded <= 29.9) {
    category = 'Overweight';
    color = 'text-yellow-400';
    description = 'Slightly above standard range. Note that high muscle mass can elevate BMI. Consider body fat metrics.';
  } else {
    category = 'Obese';
    color = 'text-red-400';
    description = 'Significantly elevated. A structured deficit with cardiovascular and resistance training is recommended.';
  }

  // Ideal weight range for height
  const minIdeal = Number((18.5 * heightM * heightM).toFixed(1));
  const maxIdeal = Number((24.9 * heightM * heightM).toFixed(1));

  return {
    bmi: rounded,
    category,
    color,
    description,
    idealRange: `${minIdeal} - ${maxIdeal} kg`
  };
}

// 2. BMR Calculator (Mifflin-St Jeor Equation)
export function calculateBMR(weightKg, heightCm, age, gender = 'male') {
  if (!weightKg || !heightCm || !age) return null;
  
  let bmr = 10 * weightKg + 6.25 * heightCm - 5 * age;
  if (gender.toLowerCase() === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }

  return Math.round(bmr);
}

// 3. TDEE Calculator
export const ACTIVITY_MULTIPLIERS = {
  sedentary: { label: 'Sedentary (Desk job, little exercise)', factor: 1.2 },
  light: { label: 'Lightly Active (Workouts 1-3 days/wk)', factor: 1.375 },
  moderate: { label: 'Moderately Active (Workouts 3-5 days/wk)', factor: 1.55 },
  very: { label: 'Very Active (Intense training 6-7 days/wk)', factor: 1.725 },
  athlete: { label: 'Extremely Active (Athletic doubles / heavy physical labor)', factor: 1.9 }
};

export function calculateTDEE(bmr, activityLevel = 'moderate') {
  if (!bmr) return null;
  const factor = ACTIVITY_MULTIPLIERS[activityLevel]?.factor || 1.55;
  const tdee = Math.round(bmr * factor);

  return {
    tdee,
    cutting: Math.round(tdee - 500),
    mildCut: Math.round(tdee - 300),
    maintenance: tdee,
    leanBulk: Math.round(tdee + 300),
    heavyBulk: Math.round(tdee + 500)
  };
}

// 4. Protein Calculator
export function calculateProtein(weightKg, goal = 'muscle_gain', activityLevel = 'moderate') {
  if (!weightKg || weightKg <= 0) return null;

  let minGPerKg = 1.6;
  let maxGPerKg = 2.2;

  switch (goal) {
    case 'fat_loss':
      // Higher protein preserves lean mass in caloric deficit
      minGPerKg = 2.0;
      maxGPerKg = 2.4;
      break;
    case 'strength':
    case 'muscle_gain':
      minGPerKg = 1.8;
      maxGPerKg = 2.2;
      break;
    case 'endurance':
      minGPerKg = 1.4;
      maxGPerKg = 1.8;
      break;
    case 'maintenance':
    default:
      minGPerKg = 1.2;
      maxGPerKg = 1.6;
      break;
  }

  const minGrams = Math.round(weightKg * minGPerKg);
  const maxGrams = Math.round(weightKg * maxGPerKg);
  const targetGrams = Math.round((minGrams + maxGrams) / 2);

  return {
    minGrams,
    maxGrams,
    targetGrams,
    perKg: `${minGPerKg} - ${maxGPerKg} g/kg`
  };
}

// 5. Daily Calorie & Macro Target Calculator
export function calculateDailyCalories({ weightKg, heightCm, age, gender, activityLevel, goal }) {
  const bmr = calculateBMR(weightKg, heightCm, age, gender);
  if (!bmr) return null;
  const tdeeData = calculateTDEE(bmr, activityLevel);
  if (!tdeeData) return null;

  let targetCalories = tdeeData.maintenance;
  if (goal === 'fast_fat_loss') targetCalories = tdeeData.cutting;
  else if (goal === 'fat_loss') targetCalories = tdeeData.mildCut;
  else if (goal === 'muscle_gain') targetCalories = tdeeData.leanBulk;
  else if (goal === 'heavy_bulk') targetCalories = tdeeData.heavyBulk;

  // Macros calculation
  // Protein: ~2g per kg
  const proteinGrams = Math.round(weightKg * 2.0);
  const proteinCals = proteinGrams * 4;

  // Fats: ~25% of target calories
  const fatCals = targetCalories * 0.25;
  const fatGrams = Math.round(fatCals / 9);

  // Remaining calories for Carbs
  const carbCals = Math.max(0, targetCalories - proteinCals - fatCals);
  const carbGrams = Math.round(carbCals / 4);

  return {
    bmr,
    tdee: tdeeData.maintenance,
    targetCalories,
    protein: proteinGrams,
    carbs: carbGrams,
    fats: fatGrams,
    proteinPercent: Math.round((proteinCals / targetCalories) * 100),
    carbsPercent: Math.round((carbCals / targetCalories) * 100),
    fatsPercent: Math.round((fatCals / targetCalories) * 100),
  };
}

// 6. Body Fat Calculator (U.S. Navy Method)
export function calculateBodyFat({ gender = 'male', heightCm, neckCm, waistCm, hipCm = 0 }) {
  if (!heightCm || !neckCm || !waistCm) return null;
  if (gender === 'female' && !hipCm) return null;

  let bodyFat = 0;
  if (gender.toLowerCase() === 'male') {
    // Men: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
    const diff = waistCm - neckCm;
    if (diff <= 0) return null;
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(diff) + 0.15456 * Math.log10(heightCm)) - 450;
  } else {
    // Women: 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
    const sumDiff = waistCm + hipCm - neckCm;
    if (sumDiff <= 0) return null;
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(sumDiff) + 0.22100 * Math.log10(heightCm)) - 450;
  }

  const rounded = Math.max(3, Math.min(60, Number(bodyFat.toFixed(1))));

  let category = 'Fitness';
  if (gender === 'male') {
    if (rounded < 6) category = 'Essential Fat';
    else if (rounded <= 13) category = 'Athletes / Shredded';
    else if (rounded <= 17) category = 'Fitness / Lean';
    else if (rounded <= 24) category = 'Average';
    else category = 'High Body Fat';
  } else {
    if (rounded < 14) category = 'Essential Fat';
    else if (rounded <= 20) category = 'Athletes / Toned';
    else if (rounded <= 24) category = 'Fitness';
    else if (rounded <= 31) category = 'Average';
    else category = 'High Body Fat';
  }

  return {
    bodyFat: rounded,
    category
  };
}

// 7. Ideal Weight Calculator (Multi-formula average: Devine, Robinson, Miller)
export function calculateIdealWeight(heightCm, gender = 'male') {
  if (!heightCm || heightCm < 120) return null;
  const inches = heightCm / 2.54;
  const inchesOver5Ft = Math.max(0, inches - 60);

  let devine = 0;
  let robinson = 0;
  let miller = 0;

  if (gender.toLowerCase() === 'male') {
    devine = 50.0 + 2.3 * inchesOver5Ft;
    robinson = 52.0 + 1.9 * inchesOver5Ft;
    miller = 56.2 + 1.41 * inchesOver5Ft;
  } else {
    devine = 45.5 + 2.3 * inchesOver5Ft;
    robinson = 49.0 + 1.7 * inchesOver5Ft;
    miller = 53.1 + 1.36 * inchesOver5Ft;
  }

  const avgWeight = Math.round((devine + robinson + miller) / 3);
  const heightM = heightCm / 100;
  const minNormal = Number((18.5 * heightM * heightM).toFixed(1));
  const maxNormal = Number((24.9 * heightM * heightM).toFixed(1));

  return {
    devine: Number(devine.toFixed(1)),
    robinson: Number(robinson.toFixed(1)),
    miller: Number(miller.toFixed(1)),
    recommended: avgWeight,
    healthyRange: `${minNormal} - ${maxNormal} kg`
  };
}

// 8. Water Intake Calculator
export function calculateWaterIntake(weightKg, workoutMinutes = 45, climate = 'moderate') {
  if (!weightKg || weightKg <= 0) return null;

  // Baseline: 35ml per kg
  let ml = weightKg * 35;

  // Workout addition: 350ml per 30 mins
  if (workoutMinutes > 0) {
    ml += (workoutMinutes / 30) * 350;
  }

  // Climate modifier
  if (climate === 'hot') {
    ml += 500;
  }

  const liters = Number((ml / 1000).toFixed(1));
  const glasses = Math.round(ml / 250); // 250ml glass

  return {
    liters,
    ml: Math.round(ml),
    glasses
  };
}

