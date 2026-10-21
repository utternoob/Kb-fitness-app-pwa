const WORKOUT_SCHEDULE = [
  {
    id: 'day-1',
    title: 'Day 1: Upper Body Push & Core Focus',
    durationMin: 35,
    warmup: [
      { name: 'Arm Circles & Cross Hugs', durationSec: 45 },
      { name: 'Torso Twists / Windmills', durationSec: 45 },
      { name: 'Cat-Cow Stretch', durationSec: 45 },
      { name: 'Bodyweight Hip Hinge', durationSec: 45 },
      { name: 'Bodyweight Air Squats', durationSec: 45 }
    ],
    mainWorkout: [
      { name: 'Single-Arm KB Overhead Press', sets: 3, reps: '8 / side', restSec: 60, target: 'Shoulders & Triceps', icon: 'press' },
      { name: 'Push-Ups (Standard or Incline)', sets: 3, reps: '10-12 reps', restSec: 60, target: 'Chest & Core', icon: 'pushup' },
      { name: 'KB Goblet Thrusters', sets: 3, reps: '8-10 reps', restSec: 60, target: 'Legs & Shoulders', icon: 'squat' },
      { name: 'Plank Hold', sets: 3, reps: '45 sec', restSec: 60, target: 'Core', icon: 'plank' },
      { name: 'Kettlebell Halo', sets: 3, reps: '10 reps', restSec: 60, target: 'Shoulder Mobility', icon: 'press' }
    ]
  },
  {
    id: 'day-2',
    title: 'Day 2: Lower Body & Kettlebell Swings',
    durationMin: 35,
    warmup: [
      { name: 'Torso Twists', durationSec: 45 },
      { name: 'Hip Hinge / Good Mornings', durationSec: 45 },
      { name: 'Air Squats', durationSec: 45 }
    ],
    mainWorkout: [
      { name: 'Two-Handed KB Swings', sets: 4, reps: '15-20 reps', restSec: 90, target: 'Glutes & Hamstrings', icon: 'swing' },
      { name: 'KB Goblet Squats', sets: 4, reps: '10-12 reps', restSec: 60, target: 'Quads & Glutes', icon: 'squat' },
      { name: 'Bulgarian Split Squats', sets: 3, reps: '8 / leg', restSec: 60, target: 'Single-Leg Balance', icon: 'squat' },
      { name: 'KB Romanian Deadlifts', sets: 3, reps: '10-12 reps', restSec: 60, target: 'Posterior Chain', icon: 'swing' }
    ]
  },
  {
    id: 'day-3',
    title: 'Day 3: Upper Body Pull & Balance',
    durationMin: 35,
    warmup: [
      { name: 'Arm Circles', durationSec: 45 },
      { name: 'Cat-Cow Stretch', durationSec: 45 }
    ],
    mainWorkout: [
      { name: 'Single-Arm KB Row', sets: 3, reps: '10 / side', restSec: 60, target: 'Lats & Upper Back', icon: 'row' },
      { name: 'Reverse Lunges', sets: 3, reps: '10 / leg', restSec: 60, target: 'Legs & Balance', icon: 'squat' },
      { name: 'KB Suitcase Carry', sets: 3, reps: '45 sec / side', restSec: 60, target: 'Obliques & Core', icon: 'swing' },
      { name: 'Dead Bug', sets: 3, reps: '12 total', restSec: 60, target: 'Core Stability', icon: 'plank' }
    ]
  },
  {
    id: 'day-4',
    title: 'Day 4: Full-Body HIIT Circuit',
    durationMin: 30,
    warmup: [
      { name: 'Full Dynamic Warmup', durationSec: 180 }
    ],
    mainWorkout: [
      { name: 'Kettlebell Swings', sets: 4, reps: '40s Work / 20s Rest', restSec: 20, target: 'Power & Cardio', icon: 'swing' },
      { name: 'Mountain Climbers', sets: 4, reps: '40s Work / 20s Rest', restSec: 20, target: 'Core', icon: 'plank' },
      { name: 'KB Goblet Sumo Squats', sets: 4, reps: '40s Work / 20s Rest', restSec: 20, target: 'Inner Thighs & Glutes', icon: 'squat' },
      { name: 'Bear Crawl Hold', sets: 4, reps: '40s Work / 20s Rest', restSec: 20, target: 'Full Body Tension', icon: 'plank' }
    ]
  }
];
