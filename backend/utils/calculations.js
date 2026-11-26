/**
 * Scientific Fitness Calculations
 * Standardized formulas used across IRONPULSE backend
 */

// 1. BMI Calculation
export const calculateBMI = (weightKg, heightCm) => {
  if (!weightKg || !heightCm || heightCm <= 0 || weightKg <= 0) {
    throw new Error('Valid weight in kg and height in cm are required');
  }

  const heightM = heightCm / 100;
  const bmi = Number((weightKg / (heightM * heightM)).toFixed(1));

  let category = 'Normal';
  let healthRisk = 'Low';

  if (bmi < 18.5) {
    category = 'Underweight';
    healthRisk = 'Moderate';
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    category = 'Normal';
    healthRisk = 'Very Low';
  } else if (bmi >= 25 && bmi <= 29.9) {
    category = 'Overweight';
    healthRisk = 'Increased';
  } else {
    category = 'Obese';
    healthRisk = 'High';
  }

  const minNormalWeight = Number((18.5 * heightM * heightM).toFixed(1));
  const maxNormalWeight = Number((24.9 * heightM * heightM).toFixed(1));

  return {
    bmi,
    category,
    healthRisk,
    healthyWeightRange: {
      min: minNormalWeight,
      max: maxNormalWeight,
      unit: 'kg',
    },
    disclaimer: 'Calculations are estimates for educational and athletic orientation, not a medical diagnosis.',
  };
};

// 2. BMR Calculation (Mifflin-St Jeor)
export const calculateBMR = (weightKg, heightCm, age, gender = 'male') => {
  if (!weightKg || !heightCm || !age) {
    throw new Error('Weight, height and age are required');
  }

  let bmr = 10 * Number(weightKg) + 6.25 * Number(heightCm) - 5 * Number(age);
  if (gender.toLowerCase() === 'female') {
    bmr -= 161;
  } else {
    bmr += 5;
  }

  return {
    bmr: Math.round(bmr),
    formula: 'Mifflin-St Jeor Equation',
    unit: 'kcal/day',
    disclaimer: 'Basal Metabolic Rate reflects energy expenditure at complete rest.',
  };
};

// 3. TDEE Activity Multipliers
export const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,       // Little to no exercise
  light: 1.375,         // Exercise 1-3 days/week
  moderate: 1.55,       // Exercise 3-5 days/week
  very_active: 1.725,   // Heavy exercise 6-7 days/week
  extra_active: 1.9,    // Very intense exercise / physical job
};

export const calculateTDEE = (bmr, activityLevel = 'moderate') => {
  if (!bmr || bmr <= 0) {
    throw new Error('Valid BMR is required');
  }

  const factor = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
  const tdee = Math.round(bmr * factor);

  return {
    tdee,
    activityLevel,
    activityFactor: factor,
    targets: {
      aggressiveCut: Math.round(tdee - 500),
      mildCut: Math.round(tdee - 300),
      maintenance: tdee,
      leanBulk: Math.round(tdee + 300),
      heavyBulk: Math.round(tdee + 500),
    },
    disclaimer: 'Calculations are estimated energy expenditures based on standard multipliers.',
  };
};

// 4. Protein Target Calculation
export const calculateProtein = (weightKg, goal = 'muscle_gain') => {
  if (!weightKg || weightKg <= 0) {
    throw new Error('Valid body weight in kg is required');
  }

  let minPerKg = 1.6;
  let maxPerKg = 2.2;

  switch (goal) {
    case 'fat_loss':
      minPerKg = 2.0;
      maxPerKg = 2.4;
      break;
    case 'muscle_gain':
    case 'strength':
      minPerKg = 1.8;
      maxPerKg = 2.2;
      break;
    case 'endurance':
      minPerKg = 1.4;
      maxPerKg = 1.8;
      break;
    case 'maintenance':
    default:
      minPerKg = 1.2;
      maxPerKg = 1.6;
      break;
  }

  const minGrams = Math.round(weightKg * minPerKg);
  const maxGrams = Math.round(weightKg * maxPerKg);
  const recommendedGrams = Math.round((minGrams + maxGrams) / 2);

  return {
    goal,
    weightKg: Number(weightKg),
    ratio: `${minPerKg} - ${maxPerKg} g/kg`,
    recommendedGrams,
    range: { min: minGrams, max: maxGrams },
    unit: 'grams/day',
    disclaimer: 'Higher protein preserves nitrogen balance in caloric deficits and supports myofibrillar synthesis.',
  };
};

// 5. Daily Calorie & Macro Distribution
export const calculateDailyCalories = ({ weightKg, heightCm, age, gender, activityLevel = 'moderate', goal = 'muscle_gain' }) => {
  const { bmr } = calculateBMR(weightKg, heightCm, age, gender);
  const tdeeData = calculateTDEE(bmr, activityLevel);

  let targetCalories = tdeeData.tdee;
  if (goal === 'aggressive_cut') targetCalories = tdeeData.targets.aggressiveCut;
  else if (goal === 'fat_loss') targetCalories = tdeeData.targets.mildCut;
  else if (goal === 'muscle_gain') targetCalories = tdeeData.targets.leanBulk;
  else if (goal === 'heavy_bulk') targetCalories = tdeeData.targets.heavyBulk;

  // Protein: ~2g per kg
  const proteinGrams = Math.round(weightKg * 2.0);
  const proteinCalories = proteinGrams * 4;

  // Fats: ~25% of total calories
  const fatCalories = targetCalories * 0.25;
  const fatGrams = Math.round(fatCalories / 9);

  // Remainder: Carbohydrates
  const carbCalories = Math.max(0, targetCalories - proteinCalories - fatCalories);
  const carbGrams = Math.round(carbCalories / 4);

  return {
    bmr,
    tdee: tdeeData.tdee,
    targetCalories,
    macros: {
      protein: { grams: proteinGrams, calories: proteinCalories, percentage: Math.round((proteinCalories / targetCalories) * 100) },
      carbs: { grams: carbGrams, calories: Math.round(carbCalories), percentage: Math.round((carbCalories / targetCalories) * 100) },
      fats: { grams: fatGrams, calories: Math.round(fatCalories), percentage: Math.round((fatCalories / targetCalories) * 100) },
    },
    disclaimer: 'Nutritional distribution based on 4-4-9 caloric density model.',
  };
};

// 6. U.S. Navy Body Fat Estimation
export const calculateBodyFat = ({ gender = 'male', heightCm, neckCm, waistCm, hipCm = 0 }) => {
  if (!heightCm || !neckCm || !waistCm) {
    throw new Error('Height, neck and waist circumferences are required');
  }

  let bodyFat = 0;
  if (gender.toLowerCase() === 'male') {
    const diff = waistCm - neckCm;
    if (diff <= 0) throw new Error('Waist must be larger than neck');
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(diff) + 0.15456 * Math.log10(heightCm)) - 450;
  } else {
    if (!hipCm) throw new Error('Hip circumference is required for female body fat calculation');
    const sumDiff = waistCm + hipCm - neckCm;
    if (sumDiff <= 0) throw new Error('Waist + Hip must be larger than neck');
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(sumDiff) + 0.22100 * Math.log10(heightCm)) - 450;
  }

  const rounded = Math.max(3, Math.min(60, Number(bodyFat.toFixed(1))));

  let category = 'Fitness';
  if (gender.toLowerCase() === 'male') {
    if (rounded < 6) category = 'Essential Fat';
    else if (rounded <= 13) category = 'Athletes / Shredded';
    else if (rounded <= 17) category = 'Fitness';
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
    category,
    gender,
    disclaimer: 'U.S. Navy formula provides an estimate of body composition within ~3-4% margin of DXA.',
  };
};

// 7. Ideal Weight Calculation (Devine, Robinson, Miller)
export const calculateIdealWeight = (heightCm, gender = 'male') => {
  if (!heightCm || heightCm < 120) {
    throw new Error('Valid height in cm is required (>= 120cm)');
  }

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

  const average = Number(((devine + robinson + miller) / 3).toFixed(1));

  return {
    recommended: average,
    devine: Number(devine.toFixed(1)),
    robinson: Number(robinson.toFixed(1)),
    miller: Number(miller.toFixed(1)),
    unit: 'kg',
    disclaimer: 'Ideal weight models calculate median mass associated with statistical longevity.',
  };
};

// 8. Water Intake Calculation
export const calculateWaterIntake = (weightKg, workoutMinutes = 45, climate = 'moderate') => {
  if (!weightKg || weightKg <= 0) {
    throw new Error('Valid weight is required');
  }

  // 35ml per kg base
  let ml = weightKg * 35;

  if (workoutMinutes > 0) {
    ml += (workoutMinutes / 30) * 350;
  }

  if (climate === 'hot') {
    ml += 500;
  }

  const liters = Number((ml / 1000).toFixed(1));
  const glasses = Math.round(ml / 250);

  return {
    liters,
    ml: Math.round(ml),
    glasses,
    disclaimer: 'Hydration demands scale with perspiration rate, ambient temperature and training volume.',
  };
};
