import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const models = await ai.models.list();
for await (const model of models) {
  if (model.name.includes('image') || model.name.includes('imagen') ||
      (model.supportedActions && model.supportedActions.some(a => a.includes('image')))) {
    console.log(model.name, model.supportedActions);
  }
}
