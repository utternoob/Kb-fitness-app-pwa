
class GeminiCoach {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
  }

  async generateWorkoutDebrief(dayTitle, completedSets, totalRepsTracked) {
    if (!this.apiKey) {
      return "Please set your Gemini API key in configuration to unlock AI coaching insights.";
    }

    const prompt = `
You are an expert strength & conditioning coach specializing in kettlebell and bodyweight training.
Analyze the following completed workout session:

- Workout: ${dayTitle}
- Completed Sets Logged: ${JSON.stringify(completedSets)}
- Reps Tracked via Vision AI: ${totalRepsTracked}

Provide a concise, encouraging post-workout debrief in under 120 words covering:
1. Muscle groups targeted & key benefit.
2. 1 progressive overload recommendation for next session (e.g., add 2 reps, slow down eccentric phase, or increase weight).
3. 1 recovery or stretching tip.
Format with clean bullet points.
`;

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || "Coach insight unavailable right now.";
    } catch (err) {
      console.error("Gemini API Error:", err);
      return "Unable to connect to Gemini Coach. Please check your network or API key.";
    }
  }

  async askCoachQuestion(questionContext, workoutHistory) {
    if (!this.apiKey) {
      return "API Key required for Coach Chat.";
    }

    const prompt = `
You are a friendly, knowledgeable kettlebell fitness trainer inside the KB Fit Companion app.
The user asks: "${questionContext}"
Recent Workout Context: ${JSON.stringify(workoutHistory)}

Give a direct, concise, and safe answer in 2-3 sentences.
`;

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || "I'm not sure, please try asking again.";
    } catch (err) {
      return "Error fetching advice from Coach.";
    }
  }
}
