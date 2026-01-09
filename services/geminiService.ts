
import { GoogleGenAI, Type, Modality, GenerateContentResponse } from "@google/genai";

// Always use process.env.API_KEY directly as per guidelines
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeSafetyPhoto = async (imageBuffer: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: [
        { inlineData: { data: imageBuffer, mimeType: 'image/jpeg' } },
        { text: "Analiza esta imagen desde la perspectiva de seguridad industrial en el sector hidrocarburos. Identifica riesgos potenciales y cumplimiento de EPP." }
      ]
    },
    config: {
      thinkingConfig: { thinkingBudget: 32768 }
    }
  });
  return response.text;
};

export const generateQualityResponse = async (prompt: string) => {
  const ai = getAI();
  // Using gemini-3-pro-preview for complex reasoning tasks as per guidelines
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction: "Eres un experto en Sistemas de Gestión para Laboratorios de Ensayo y Calibración bajo la norma ISO/IEC 17025, aplicado a la industria de hidrocarburos en Perú. Responde de manera profesional, técnica y precisa."
    }
  });
  return response.text;
};

export const generateTTS = async (text: string): Promise<string | undefined> => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash-preview-tts",
    contents: [{ parts: [{ text: `Dilo de forma profesional: ${text}` }] }],
    config: {
      responseModalities: [Modality.AUDIO],
      speechConfig: {
        voiceConfig: {
          prebuiltVoiceConfig: { voiceName: 'Kore' },
        },
      },
    },
  });
  return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
};

export const generateImagePro = async (prompt: string, size: "1K" | "2K" | "4K", aspectRatio: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: { parts: [{ text: prompt }] },
    config: {
      imageConfig: {
        aspectRatio: aspectRatio as any,
        imageSize: size as any
      }
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

export const generateVeoVideo = async (prompt: string, aspectRatio: "16:9" | "9:16", imageBase64?: string) => {
  const ai = getAI();
  const config: any = {
    model: 'veo-3.1-fast-generate-preview',
    prompt: prompt,
    config: {
      numberOfVideos: 1,
      resolution: '720p',
      aspectRatio: aspectRatio
    }
  };

  if (imageBase64) {
    config.image = {
      imageBytes: imageBase64,
      mimeType: 'image/jpeg'
    };
  }

  let operation = await ai.models.generateVideos(config);
  
  while (!operation.done) {
    await new Promise(resolve => setTimeout(resolve, 10000));
    operation = await ai.operations.getVideosOperation({ operation: operation });
  }

  const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
  const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
  const blob = await response.blob();
  return URL.createObjectURL(blob);
};