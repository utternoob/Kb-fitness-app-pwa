const WORKOUT_SCHEDULE = [
  {
    id: 'day-1',
    title: 'Day 1: Upper Body Push & Core Focus',
    durationMin: 35,
    warmup: [
      { 
        name: 'Arm Circles & Cross Hugs', 
        durationSec: 45, 
        target: 'Shoulder Joint & Chest', 
        icon: 'arm_circles', 
        instructions: 'Extend arms straight to sides. Make smooth forward circles, then reverse direction. Follow with dynamic horizontal arm hugs.', 
        tip: 'Keep shoulder blades down and back.' 
      },
      { 
        name: 'Torso Twists / Windmills', 
        durationSec: 45, 
        target: 'Thoracic Spine & Obliques', 
        icon: 'torso_twist', 
        instructions: 'Stand with feet shoulder-width apart. Rotate your torso smoothly left and right while letting arms swing naturally.', 
        tip: 'Pivot on your back toe to protect knee joints.' 
      },
      { 
        name: 'Cat-Cow Stretch', 
        durationSec: 45, 
        target: 'Spinal Mobility & Core', 
        icon: 'cat_cow', 
        instructions: 'On hands and knees, arch back upward while tucking chin (Cat), then extend spine downward while lifting chest (Cow).', 
        tip: 'Inhale on Cow, exhale deeply on Cat.' 
      },
      { 
        name: 'Bodyweight Hip Hinge', 
        durationSec: 45, 
        target: 'Hamstrings & Glutes', 
        icon: 'hip_hinge', 
        instructions: 'Hands behind head or on hips. Soft knees, push hips back with flat spine until hamstrings stretch, then snap hips forward.', 
        tip: 'Focus on reaching hips toward the wall behind you.' 
      },
      { 
        name: 'Bodyweight Air Squats', 
        durationSec: 45, 
        target: 'Quads & Hip Mobility', 
        icon: 'air_squat', 
        instructions: 'Feet slightly wider than hip-width. Squat down with chest tall until thighs are parallel to ground, then stand through heels.', 
        tip: 'Track knees in line with your second toe.' 
      }
    ],
    mainWorkout: [
      { name: 'Single-Arm KB Overhead Press', sets: 3, reps: '8 / side', restSec: 60, target: 'Shoulders & Triceps', icon: 'press', instructions: 'Rack kettlebell at shoulder. Brace glutes and abs, press bell straight overhead to lockout without leaning back.', tip: 'Keep wrist straight and vertical.' },
      { name: 'Push-Ups (Standard or Incline)', sets: 3, reps: '10-12 reps', restSec: 60, target: 'Chest & Core', icon: 'pushup', instructions: 'Plank posture with hands under shoulders. Lower chest to floor, elbows at 45-degree angle, then press up cleanly.', tip: 'Do not allow hips to sag.' },
      { name: 'KB Goblet Thrusters', sets: 3, reps: '8-10 reps', restSec: 60, target: 'Legs & Shoulders', icon: 'squat', instructions: 'Hold kettlebell at chest in goblet hold. Perform deep squat, then explosively drive up and press bell overhead in one motion.', tip: 'Use leg drive to launch kettlebell overhead.' },
      { name: 'Plank Hold', sets: 3, reps: '45 sec', restSec: 60, target: 'Core', icon: 'plank', instructions: 'Forearms on floor, shoulders over elbows. Keep hips aligned with shoulders and pull belly button toward spine.', tip: 'Squeeze glutes and quads for maximum tension.' },
      { name: 'Kettlebell Halo', sets: 3, reps: '10 reps', restSec: 60, target: 'Shoulder Mobility', icon: 'press', instructions: 'Hold kettlebell bottom-up by horns at chest. Orbit bell closely around head, rotating past ears without moving head position.', tip: 'Keep core tight so hips stay still.' }
    ]
  },
  {
    id: 'day-2',
    title: 'Day 2: Lower Body & Kettlebell Swings',
    durationMin: 35,
    warmup: [
      { name: 'Torso Twists', durationSec: 45, target: 'Thoracic Spine', icon: 'torso_twist', instructions: 'Rotate torso left and right with relaxed arms.', tip: 'Pivot feet as you twist.' },
      { name: 'Hip Hinge / Good Mornings', durationSec: 45, target: 'Posterior Chain', icon: 'hip_hinge', instructions: 'Hinge forward at hips with flat back, pushing glutes backward.', tip: 'Keep spine neutral throughout.' },
      { name: 'Air Squats', durationSec: 45, target: 'Quads & Hips', icon: 'air_squat', instructions: 'Perform bodyweight squats with full depth.', tip: 'Keep heels grounded.' }
    ],
    mainWorkout: [
      { name: 'Two-Handed KB Swings', sets: 4, reps: '15-20 reps', restSec: 90, target: 'Glutes & Hamstrings', icon: 'swing', instructions: 'Hinge hips back, hike bell between legs, and snap hips forward explosively to drive bell to chest height.', tip: 'It is a hip hinge, not a squat!' },
      { name: 'KB Goblet Squats', sets: 4, reps: '10-12 reps', restSec: 60, target: 'Quads & Glutes', icon: 'squat', instructions: 'Hold bell at chest, descend between knees with chest proud, drive through heels to stand.', tip: 'Keep elbows tucked.' },
      { name: 'Bulgarian Split Squats', sets: 3, reps: '8 / leg', restSec: 60, target: 'Single-Leg Balance', icon: 'squat', instructions: 'Rear foot elevated on bench/chair. Lower back knee toward floor, keeping front knee stable.', tip: 'Keep weight on front heel.' },
      { name: 'KB Romanian Deadlifts', sets: 3, reps: '10-12 reps', restSec: 60, target: 'Posterior Chain', icon: 'swing', instructions: 'Hold bell with both hands, hinge hips back with slight knee bend until hamstrings engage.', tip: 'Keep bell close to shins.' }
    ]
  },
  {
    id: 'day-3',
    title: 'Day 3: Upper Body Pull & Balance',
    durationMin: 35,
    warmup: [
      { name: 'Arm Circles', durationSec: 45, target: 'Shoulder Joint', icon: 'arm_circles', instructions: 'Forward and reverse arm circles.', tip: 'Gradually increase circle size.' },
      { name: 'Cat-Cow Stretch', durationSec: 45, target: 'Spine', icon: 'cat_cow', instructions: 'Arch and round spine smoothly.', tip: 'Coordinate with deep breathing.' }
    ],
    mainWorkout: [
      { name: 'Single-Arm KB Row', sets: 3, reps: '10 / side', restSec: 60, target: 'Lats & Upper Back', icon: 'row', instructions: 'Hinge forward with one hand supported. Pull kettlebell elbow past torso toward hip.', tip: 'Avoid rotating shoulders at top.' },
      { name: 'Reverse Lunges', sets: 3, reps: '10 / leg', restSec: 60, target: 'Legs & Balance', icon: 'squat', instructions: 'Step backward into lunge position, lowering back knee near ground.', tip: 'Keep front torso upright.' },
      { name: 'KB Suitcase Carry', sets: 3, reps: '45 sec / side', restSec: 60, target: 'Obliques & Core', icon: 'swing', instructions: 'Hold kettlebell in one hand at side like a suitcase. Walk with upright posture without leaning.', tip: 'Resist sideways tilt.' },
      { name: 'Dead Bug', sets: 3, reps: '12 total', restSec: 60, target: 'Core Stability', icon: 'plank', instructions: 'Lie on back, lower opposite arm and leg toward floor while pressing lower back into ground.', tip: 'Move slowly under control.' }
    ]
  },
  {
    id: 'day-4',
    title: 'Day 4: Full-Body HIIT Circuit',
    durationMin: 30,
    warmup: [
      { name: 'Full Dynamic Warmup', durationSec: 180, target: 'Full Body Prep', icon: 'full_warmup', instructions: 'Combine arm circles, torso twists, air squats, and light jumping jacks for 3 full minutes.', tip: 'Gradually raise heart rate.' }
    ],
    mainWorkout: [
      { name: 'Kettlebell Swings', sets: 4, reps: '40s Work / 20s Rest', restSec: 20, target: 'Power & Cardio', icon: 'swing', instructions: 'Explosive hip snaps for full 40-second interval.', tip: 'Pace yourself through reps.' },
      { name: 'Mountain Climbers', sets: 4, reps: '40s Work / 20s Rest', restSec: 20, target: 'Core', icon: 'plank', instructions: 'High plank position, drive knees to chest rapidly.', tip: 'Keep hips low.' },
      { name: 'KB Goblet Sumo Squats', sets: 4, reps: '40s Work / 20s Rest', restSec: 20, target: 'Inner Thighs & Glutes', icon: 'squat', instructions: 'Wide stance with toes pointed outward, squat deeply.', tip: 'Push knees outward over toes.' },
      { name: 'Bear Crawl Hold', sets: 4, reps: '40s Work / 20s Rest', restSec: 20, target: 'Full Body Tension', icon: 'plank', instructions: 'On hands and knees, hover knees 2 inches off floor.', tip: 'Keep back flat like a tabletop.' }
    ]
  }
];
