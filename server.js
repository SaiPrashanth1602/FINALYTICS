import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from 'cors';
import 'dotenv/config';

const app = express();
app.use(cors());
app.use(express.json());

// Get your free key from: https://aistudio.google.com/
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
  const { message, context } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
      You are the BitWars Strategic Advisor (Cyberpunk Financial AI).
      BUSINESS CONTEXT:
      - Revenue: ₹${context.totalRevenue}
      - Profit: ₹${context.profit}
      - Runway: ${context.runwayMonths} months
      
      USER QUESTION: ${message}
      
      INSTRUCTIONS: 
      - Use a tactical, futuristic tone. 
      - Be direct and data-driven.
      - Keep it under 3 sentences.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    res.json({ reply: response.text() });
  } catch (error) {
    res.status(500).json({ error: "Neural link failed." });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));