import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error('GEMINI_API_KEY が設定されていません。.env ファイルを確認してください。');
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

const prompt = process.argv[2] || '青空と積乱雲、気象観測のイメージ、水彩画風、日本の空';
const outputName = process.argv[3] || 'generated-hero.jpg';

console.log(`画像生成中: "${prompt}"`);

const response = await ai.models.generateContent({
  model: 'gemini-2.5-flash-image',
  contents: prompt,
  config: {
    responseModalities: ['IMAGE', 'TEXT'],
  },
});

const imagePart = response.candidates[0].content.parts.find(p => p.inlineData);
const imageData = imagePart.inlineData.data;
const outputPath = path.join(__dirname, '../src/assets', outputName);
fs.writeFileSync(outputPath, Buffer.from(imageData, 'base64'));

console.log(`保存完了: src/assets/${outputName}`);
