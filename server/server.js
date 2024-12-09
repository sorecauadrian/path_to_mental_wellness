import dotenv from 'dotenv';
import express from 'express';
import { OpenAI } from 'openai';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.post('/generate-profile', async (req, res) => {
  const { selectedMoments } = req.body;

  if (!selectedMoments || !Array.isArray(selectedMoments) || selectedMoments.length === 0) {
    return res.status(400).json({ error: 'Invalid or empty selectedMoments' });
  }

  try {
    const text = `Based on the following moments, generate my profile:\n- ${selectedMoments.join('\n- ')}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }],
      max_tokens: 1000,
      temperature: 0.25,
    });

    res.json({ profile: response.choices[0].message.content });
        
  } catch (error) {
    console.error("Error in API call:", error.response ? error.response.data : error.message);
    return null;
  }
});

app.listen(process.env.SERVER_PORT, () => console.log(`API running on ${process.env.SERVER_URL}:${process.env.SERVER_PORT}`));
