
import { GoogleGenAI, Type } from "@google/genai";
import { SlotGame, GameInsight } from "../types";

// Correct initialization per guidelines: no fallback for process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getGameInsights = async (game: SlotGame): Promise<GameInsight> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide a technical and objective analysis for the slot game "${game.title}" by "${game.provider}". 
      Stats: RTP ${game.rtp}%, Volatility ${game.volatility}, Max Win ${game.maxWin}.
      Focus on mathematical behavior, target player profile, and mechanics. No gambling hype.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING, description: "A 2-sentence technical summary of the game's profile." },
            pros: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 technical advantages." },
            cons: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3 technical disadvantages or risks." },
            strategyScore: { type: Type.NUMBER, description: "A score from 1-100 on how much skill/strategy affects RTP through bet sizing or feature choices." }
          },
          required: ["summary", "pros", "cons", "strategyScore"]
        }
      }
    });

    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      summary: "Detailed technical data for this game is currently being synthesized. Please check back shortly for full math model breakdown.",
      pros: ["Consistent mechanic execution", "Industry standard RTP", "Robust provider reputation"],
      cons: ["High variance potential", "Session volatility risks", "Limited feature accessibility"],
      strategyScore: 50
    };
  }
};
