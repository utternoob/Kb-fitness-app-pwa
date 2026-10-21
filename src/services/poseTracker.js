class PoseTracker {
  constructor(onResultsCallback) {
    this.pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`
    });

    this.pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5
    });

    this.pose.onResults(onResultsCallback);
    this.camera = null;
  }

  start(videoElement) {
    this.camera = new Camera(videoElement, {
      onFrame: async () => {
        await this.pose.send({ image: videoElement });
      },
      width: 640,
      height: 480
    });
    this.camera.start();
  }

  stop() {
    if (this.camera) this.camera.stop();
  }

  static calculateAngle(a, b, c) {
    const radians = Math.atan2(c.y - b.y, c.x - b.x) - Math.atan2(a.y - b.y, a.x - b.x);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    return angle > 180.0 ? 360 - angle : angle;
  }
}
