function fitnessApp() {
  return {
    activeDay: 0,
    schedule: WORKOUT_SCHEDULE,
    completedSets: JSON.parse(localStorage.getItem('kb_completed_sets') || '{}'),
    syncStatus: 'Sync',
    cameraActive: false,
    repCount: 0,
    feedbackMsg: '',
    exerciseState: 'UP',
    tracker: null,

    initApp() {
      initGoogleDriveSync(APP_CONFIG.CLIENT_ID);
    },

    startCamera(exerciseType) {
      this.cameraActive = true;
      this.repCount = 0;
      this.feedbackMsg = 'Initializing Camera...';

      this.$nextTick(() => {
        const video = document.getElementById('webcam');
        this.tracker = new PoseTracker((results) => this.processPose(results, exerciseType));
        this.tracker.start(video);
      });
    },

    stopCamera() {
      if (this.tracker) this.tracker.stop();
      this.cameraActive = false;
    },

    processPose(results, type) {
      if (!results.poseLandmarks) return;

      const landmarks = results.poseLandmarks;
      
      // Calculate Knee Angle for Squats/Thrusters (Hip: 24, Knee: 26, Ankle: 28)
      const kneeAngle = PoseTracker.calculateAngle(landmarks[24], landmarks[26], landmarks[28]);

      if (type === 'squat') {
        if (kneeAngle < 95 && this.exerciseState === 'UP') {
          this.exerciseState = 'DOWN';
          this.feedbackMsg = 'Good Depth! Drive Up';
        } else if (kneeAngle > 160 && this.exerciseState === 'DOWN') {
          this.exerciseState = 'UP';
          this.repCount++;
          this.feedbackMsg = 'Rep Complete!';
        }
      }
    },

    toggleSet(day, ex, set) {
      const key = `${day}-${ex}-${set}`;
      this.completedSets[key] = !this.completedSets[key];
      localStorage.setItem('kb_completed_sets', JSON.stringify(this.completedSets));
    },

    isSetComplete(day, ex, set) {
      return !!this.completedSets[`${day}-${ex}-${set}`];
    },

    syncData() {
      triggerDriveSync(this.completedSets, (status) => this.syncStatus = status);
    }
  }
}
