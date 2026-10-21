function fitnessApp() {
  return {
    activeDay: 0,
    schedule: WORKOUT_SCHEDULE,
    completedSets: JSON.parse(localStorage.getItem('kb_completed_sets') || '{}'),
    syncStatus: 'Sync',
    
    // UI Accordion Toggles
    warmupOpen: false,
    mainOpen: true,
    infoModalOpen: false,
    activeExerciseModal: null,

    // Active Workout Session State
    sessionActive: false,
    currentExIndex: 0,
    isPaused: false,
    repCount: 0,
    totalSessionReps: 0,
    feedbackMsg: '',
    exerciseState: 'UP',
    tracker: null,

    // Gemini Coach AI State
    coach: null,
    aiInsight: '',
    aiLoading: false,
    coachQuestion: '',
    coachAnswer: '',
    coachChatLoading: false,

    // Rest Timer State
    timerActive: false,
    timeLeft: 0,
    timerInterval: null,

    initApp() {
      if (typeof initGoogleDriveSync === 'function') {
        initGoogleDriveSync(APP_CONFIG.CLIENT_ID);
      }
      if (typeof GeminiCoach !== 'undefined' && APP_CONFIG.GEMINI_API_KEY) {
        this.coach = new GeminiCoach(APP_CONFIG.GEMINI_API_KEY);
      }
    },

    syncData() {
      if (typeof triggerDriveSync === 'function') {
        triggerDriveSync(this.completedSets, (status) => this.syncStatus = status);
      }
    },

    openInfo(exercise) {
      this.activeExerciseModal = exercise;
      this.infoModalOpen = true;
    },

    startSession() {
      this.sessionActive = true;
      this.currentExIndex = 0;
      this.repCount = 0;
      this.totalSessionReps = 0;
      this.feedbackMsg = 'Align in camera frame...';
      this.exerciseState = 'UP';
      this.isPaused = false;

      this.$nextTick(() => {
        const video = document.getElementById('webcam');
        if (typeof PoseTracker !== 'undefined' && video) {
          this.tracker = new PoseTracker((results) => this.processSessionPose(results));
          this.tracker.start(video);
        }
      });
    },

    async endSession() {
      if (this.tracker) {
        this.tracker.stop();
      }
      this.sessionActive = false;

      // Trigger Gemini AI Post-Workout Debrief
      if (this.coach) {
        this.aiLoading = true;
        const currentTitle = this.schedule[this.activeDay].title;
        this.aiInsight = await this.coach.generateWorkoutDebrief(currentTitle, this.completedSets, this.totalSessionReps);
        this.aiLoading = false;
      }
    },

    async askCoach() {
      if (!this.coachQuestion.trim() || !this.coach) return;
      this.coachChatLoading = true;
      this.coachAnswer = await this.coach.askCoachQuestion(this.coachQuestion, this.completedSets);
      this.coachChatLoading = false;
    },

    pauseSession() {
      this.isPaused = !this.isPaused;
      if (this.isPaused && this.tracker) {
        this.tracker.stop();
        this.feedbackMsg = 'Session Paused';
      } else if (!this.isPaused) {
        const video = document.getElementById('webcam');
        if (this.tracker && video) {
          this.tracker.start(video);
          this.feedbackMsg = 'Resumed tracking';
        }
      }
    },

    skipExercise() {
      this.repCount = 0;
      this.nextExercise();
    },

    nextExercise() {
      const currentList = this.schedule[this.activeDay].mainWorkout;
      this.totalSessionReps += this.repCount;

      if (this.currentExIndex < currentList.length - 1) {
        this.currentExIndex++;
        this.repCount = 0;
        this.feedbackMsg = `Switched to ${this.currentExerciseName()}`;
      } else {
        alert('Workout session completed! Generating AI Insights...');
        this.endSession();
      }
    },

    currentExerciseName() {
      const ex = this.schedule[this.activeDay].mainWorkout[this.currentExIndex];
      return ex ? ex.name : 'Workout Finished';
    },

    processSessionPose(results) {
      if (this.isPaused || !results.poseLandmarks) return;

      const landmarks = results.poseLandmarks;
      const currentEx = this.schedule[this.activeDay].mainWorkout[this.currentExIndex];
      if (!currentEx) return;

      if (currentEx.icon === 'squat') {
        const kneeAngle = PoseTracker.calculateAngle(landmarks[24], landmarks[26], landmarks[28]);
        if (kneeAngle < 100 && this.exerciseState === 'UP') {
          this.exerciseState = 'DOWN';
          this.feedbackMsg = 'Good Depth! Drive Up';
        } else if (kneeAngle > 160 && this.exerciseState === 'DOWN') {
          this.exerciseState = 'UP';
          this.repCount++;
          this.feedbackMsg = 'Rep Complete!';
        }
      } else if (currentEx.icon === 'press' || currentEx.icon === 'pushup') {
        const elbowAngle = PoseTracker.calculateAngle(landmarks[12], landmarks[14], landmarks[16]);
        if (elbowAngle > 155 && this.exerciseState === 'DOWN') {
          this.exerciseState = 'UP';
          this.repCount++;
          this.feedbackMsg = 'Full Extension!';
        } else if (elbowAngle < 85 && this.exerciseState === 'UP') {
          this.exerciseState = 'DOWN';
          this.feedbackMsg = 'Push Up';
        }
      } else {
        this.feedbackMsg = 'Form Tracking Active';
      }
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
    }
  }
}
