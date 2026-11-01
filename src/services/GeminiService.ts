import type { DashboardMetrics } from '@/types';
import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateDashboardSummary = async (metrics: DashboardMetrics): Promise<string> => {
    // Graceful fallback if no API key is provided
    if (!ai) {
        return 'No API key is provided.';
    }

    const prompt = `
        You are the AI analyst for "Boki Passport", an educational platform where users take exams to level up from Level 1 to Level 4.
        Analyze these live platform statistics and provide a concise 2-sentence executive summary highlighting user engagement and one key area of improvement:
        - Total Registered Users: ${metrics.userCount}
        - Active Users: ${metrics.activeUsers}
        - Inactive Users: ${metrics.inactiveUsers}
        - Level 1 (Beginner): ${metrics.levelCounts.lvl1}
        - Level 2 (Intermediate): ${metrics.levelCounts.lvl2}
        - Level 3 (Advanced): ${metrics.levelCounts.lvl3}
        - Level 4 (Master): ${metrics.levelCounts.lvl4}
        - Total Courses: ${metrics.courseCount}

        Keep the tone professional, encouraging, and concise (under 50 words).
    `;

    try {
        const interaction  = await ai.interactions.create({
            model: "gemini-3.5-flash-lite",
            input: prompt,
        });
        return interaction.output_text || 'Summary could not be generated at this time.';
    } catch (error) {
        console.error('Failed to communicate with Google AI Studio:', error);
        return 'An error occurs while communicate with AI, Summary cannot be generated.';
    }
};