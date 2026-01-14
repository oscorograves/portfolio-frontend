const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI Route
app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const apiKey = process.env.GROQ_API_KEY;

        if (!apiKey) {
            console.error('Missing Groq API Key');
            return res.status(500).json({ error: 'Server configuration error (Missing API Key)' });
        }

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Dynamic import for node-fetch (ESM module)
        const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { role: "system", content: "You are a helpful assistant for Kanishk Singh's portfolio website. Answer questions about his experience, projects, and skills based on general knowledge or politely decline if unknown." },
                    { role: "user", content: message }
                ],
                temperature: 0.7
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Groq API Error:', data);
            return res.status(response.status).json({ error: data.error?.message || 'Error fetching from Groq' });
        }

        const botMessage = data.choices[0].message.content;
        res.json({ reply: botMessage });

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Chatbot Server running on http://localhost:${PORT}`);
});
