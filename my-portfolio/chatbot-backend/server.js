const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const portfolioData = require('./portfolio-data');

// Middleware
app.use(cors());
app.use(express.json());

// Global Error Handling
process.on('uncaughtException', (err) => console.error(`[${new Date().toISOString()}] Uncaught Exception:`, err));
process.on('unhandledRejection', (reason, promise) => console.error(`[${new Date().toISOString()}] Unhandled Rejection at:`, promise, 'reason:', reason));

// Health Check
app.get('/health', (req, res) => res.status(200).json({ status: 'ok', uptime: process.uptime() }));

// System Prompt
const SYSTEM_PROMPT = `You are a helpful assistant for Kanishk Singh's portfolio website. 
Here is the detailed context about Kanishk's professional experience, projects, skills, and case studies:
${JSON.stringify(portfolioData)}

Answer questions based on this context. 
If the answer is not in the context, state that clearly and briefly (e.g. "I don't have information about that in Kanishk's portfolio").
IMPORTANT: Provide your response in plain text only. Do not use Markdown, bullet points, or bold text. Keep it conversational.`;

// Timeout Wrapper
const fetchWithTimeout = (url, options, timeout = 60000) => {
    return Promise.race([
        fetch(url, options),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), timeout))
    ]);
};

// API Call Helpers
async function callGroq(message, apiKey) {
    if (!apiKey) throw new Error("Missing Groq API Key");
    console.log(`[${new Date().toISOString()}] Calling Groq (Llama 3)...`);

    const response = await fetchWithTimeout('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "llama3-70b-8192",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: message }
            ]
        })
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(`Groq Error ${response.status}: ${err.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response from Groq.";
}

async function callGemini(message, apiKey) {
    if (!apiKey) throw new Error("Missing Gemini API Key");
    console.log(`[${new Date().toISOString()}] Calling Gemini (Fallback)...`);

    const model = "gemini-1.5-flash"; // Using a stable, fast model for fallback
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetchWithTimeout(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: [{ parts: [{ text: message }] }]
        })
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(`Gemini Error ${response.status}: ${err.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from Gemini.";
}

// Main Chat Endpoint
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    const geminiKey = process.env.GEMINI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;

    if (!message) return res.status(400).json({ error: 'Message is required' });

    try {
        // 1. Try Groq (Llama 3) First
        try {
            const reply = await callGroq(message, groqKey);
            return res.json({ reply });
        } catch (groqError) {
            console.error(`[${new Date().toISOString()}] Groq Failed:`, groqError.message);
            // Fallthrough to Gemini
        }

        // 2. Fallback to Gemini
        const reply = await callGemini(message, geminiKey);
        return res.json({ reply });

    } catch (finalError) {
        console.error(`[${new Date().toISOString()}] All models failed:`, finalError.message);
        res.status(503).json({
            error: "I'm currently experiencing heavy traffic. Please try again in 30 seconds."
        });
    }
});

app.listen(PORT, () => {
    console.log(`Chatbot Server running on http://localhost:${PORT}`);
});
