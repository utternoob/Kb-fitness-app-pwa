function fitnessApp() {
  return {
    activeDay: 0,
    schedule: WORKOUT_SCHEDULE,
    completedSets: JSON.parse(localStorage.getItem('kb_completed_sets') || '{}'),
    syncStatus: 'Sync',
    
    // Rest Timer
    timerActive: false,
    timeLeft: 0,
    timerInterval: null,

    // AI Pose Vision Tracking
    cameraActive: false,
    repCount: 0,
    feedbackMsg: '',
    exerciseState: 'UP',
    tracker: null,

    initApp() {
      initGoogleDriveSync(APP_CONFIG.CLIENT_ID);
    },

    syncData() {
      triggerDriveSync(this.completedSets, (status) => this.syncStatus = status);
    },

    toggleSet(day, ex, set) {
      const key = `${day}-${ex}-${set}`;
      this.completedSets[key] = !this.completedSets[key];
      localStorage.setItem('kb_completed_sets', JSON.stringify(this.completedSets));
    },

    isSetComplete(day, ex, set) {
      return !!this.completedSets[`${day}-${ex}-${set}`];
    },

    startRestTimer(seconds) {
      clearInterval(this.timerInterval);
      this.timeLeft = seconds;
      this.timerActive = true;
      this.timerInterval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.stopTimer();
          this.playBeep();
        }
      }, 1000);
    },

    stopTimer() {
      clearInterval(this.timerInterval);
      this.timerActive = false;
    },

    addTime(sec) {
      this.timeLeft += sec;
    },

    formatTime(seconds) {
      const m = Math.floor(seconds / 60);
      const s = seconds % 60;
      return `${m}:${s < 10 ? '0' : ''}${s}`;
    },

    playBeep() {
      try {
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = ctx.createOscillator();
        osc.connect(ctx.destination);
        osc.frequency.value = 880;
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } catch(e) {}
    },

    startCamera(exerciseIcon) {
      this.cameraActive = true;
      this.repCount = 0;
      this.exerciseState = 'UP';
      this.feedbackMsg = 'Align yourself in frame...';

      this.$nextTick(() => {
        const video = document.getElementById('webcam');
        this.tracker = new PoseTracker((results) => this.processPose(results, exerciseIcon));
        this.tracker.start(video);
      });
    },

    stopCamera() {
      if (this.tracker) {
        this.tracker.stop();
      }
      this.cameraActive = false;
    },

    processPose(results, exerciseIcon) {
      if (!results.poseLandmarks) return;

      const landmarks = results.poseLandmarks;
      const canvas = document.getElementById('poseCanvas');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      // Track joint angles based on movement
      if (exerciseIcon === 'squat') {
        const kneeAngle = PoseTracker.calculateAngle(landmarks[24], landmarks[26], landmarks[28]); // Hip-Knee-Ankle
        if (kneeAngle < 100 && this.exerciseState === 'UP') {
          this.exerciseState = 'DOWN';
          this.feedbackMsg = 'Good Depth! Drive Up';
        } else if (kneeAngle > 160 && this.exerciseState === 'DOWN') {
          this.exerciseState = 'UP';
          this.repCount++;
          this.feedbackMsg = 'Rep Complete!';
        }
      } else if (exerciseIcon === 'press') {
        const elbowAngle = PoseTracker.calculateAngle(landmarks[12], landmarks[14], landmarks[16]); // Shoulder-Elbow-Wrist
        if (elbowAngle > 155 && this.exerciseState === 'DOWN') {
          this.exerciseState = 'UP';
          this.repCount++;
          this.feedbackMsg = 'Full Lockout!';
        } else if (elbowAngle < 85 && this.exerciseState === 'UP') {
          this.exerciseState = 'DOWN';
          this.feedbackMsg = 'Press Up';
        }
      } else {
        this.feedbackMsg = 'Tracking Active';
      }
    }
  }
}
