interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
    };
  }[];
}

class GeminiService {
  private apiKey: string | null = null;

  setApiKey(key: string) {
    this.apiKey = key;
  }

  async generateContent(prompt: string): Promise<string> {
    if (!this.apiKey) {
      throw new Error('Gemini API key not set');
    }

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topK: 40,
              topP: 0.95,
              maxOutputTokens: 1024,
            }
          })
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
        throw new Error('Invalid response from Gemini API');
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API error:', error);
      throw error;
    }
  }

  async generateProfessionalSummary(
    experience: string = '', 
    skills: string[] = [], 
    industry: string = ''
  ): Promise<string> {
    const prompt = `Create a compelling, ATS-friendly professional summary for a resume. 

Context:
- Experience level: ${experience || 'Professional'}
- Key skills: ${skills.length > 0 ? skills.join(', ') : 'Various technical and professional skills'}
- Industry/Field: ${industry || 'Technology/Business'}

Requirements:
- 3-4 sentences maximum
- ATS-friendly keywords
- Quantifiable achievements when possible
- Professional tone
- No first-person pronouns
- Focus on value proposition

Generate only the summary text, no additional formatting or explanations.`;

    return this.generateContent(prompt);
  }

  async generateJobDescription(
    jobTitle: string,
    company: string,
    industry: string = '',
    yearsOfExperience: string = ''
  ): Promise<string> {
    const prompt = `Generate ATS-friendly bullet points for a resume job description.

Job Details:
- Title: ${jobTitle}
- Company: ${company}
- Industry: ${industry}
- Experience Level: ${yearsOfExperience}

Requirements:
- 3-5 bullet points starting with action verbs
- Include quantifiable achievements (use realistic percentages/numbers)
- ATS-friendly keywords for ${jobTitle} role
- Focus on impact and results, not just responsibilities
- Professional format with bullet points (•)

Generate only the bullet points, no additional text or explanations.`;

    return this.generateContent(prompt);
  }

  async improveSummary(currentSummary: string): Promise<string> {
    const prompt = `Improve and refine this professional resume summary to be more ATS-friendly and impactful:

Current Summary:
"${currentSummary}"

Requirements:
- Maintain the core message but enhance clarity and impact
- Add ATS-friendly keywords
- Improve flow and readability
- Keep it professional and concise (3-4 sentences)
- Include quantifiable elements where appropriate
- No first-person pronouns

Generate only the improved summary text, no additional formatting or explanations.`;

    return this.generateContent(prompt);
  }
}

export const geminiService = new GeminiService();