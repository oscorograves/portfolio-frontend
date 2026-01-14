const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const portfolioData = require('./portfolio-data');

// Middleware
app.use(cors());
app.use(express.json());

// Global Error Handling
process.on('uncaughtException', (err) => {
    console.error(`[${new Date().toISOString()}] Uncaught Exception:`, err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error(`[${new Date().toISOString()}] Unhandled Rejection at:`, promise, 'reason:', reason);
});

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Constants
const SYSTEM_PROMPT = `You are a helpful assistant for Kanishk Singh's portfolio website. 
Here is the detailed context about Kanishk's professional experience, projects, skills, and case studies:
${JSON.stringify(portfolioData)}

Answer questions based on this context. 
If the answer is not in the context, state that clearly and briefly.
IMPORTANT: Provide your response in plain text only. Do not use Markdown formatting, bullet points, asterisks (*), or bold text. Use simple numbering (1, 2, 3) or dashes (-) for lists if absolutely necessary, but prefer paragraph format.`;

const MODELS = ["gemini-3-pro-preview", "gemini-3-flash-preview", "gemini-2.5-flash", "groq-llama3"];

// Helper: Dynamic Fetch
const getFetch = async () => {
    const { default: fetch } = await import('node-fetch');
    return fetch;
};

// Helper: Call Gemini
async function callGemini(model, message, apiKey, signal) {
    const fetch = await getFetch();
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
            contents: [{ parts: [{ text: message }] }]
        }),
        signal
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw { status: response.status, message: errorData.error?.message || response.statusText };
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
}

// Helper: Call Groq
async function callGroq(message, apiKey, signal) {
    const fetch = await getFetch();
    const url = 'https://api.groq.com/openai/v1/chat/completions';

    const response = await fetch(url, {
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
        }),
        signal
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw { status: response.status, message: errorData.error?.message || response.statusText };
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "No response generated.";
}

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    const geminiKey = process.env.GEMINI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;

    if (!message) return res.status(400).json({ error: 'Message is required' });
    if (!geminiKey) return res.status(500).json({ error: 'Server configuration error (Missing Gemini API Key)' });

    let lastError = null;

    for (const model of MODELS) {
        console.log(`[${new Date().toISOString()}] Attempting with model: ${model}`);

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 35000); // 35s timeout

        try {
            let reply;
            if (model === 'groq-llama3') {
                if (!groqKey) {
                    console.warn('Skipping Groq: Missing API Key');
                    continue;
                }
                reply = await callGroq(message, groqKey, controller.signal);
            } else {
                reply = await callGemini(model, message, geminiKey, controller.signal);
            }

            clearTimeout(timeoutId);
            console.log(`[${new Date().toISOString()}] Success: ${model}`);
            return res.json({ reply });

        } catch (error) {
            clearTimeout(timeoutId);

            const isTimeout = error.name === 'AbortError';
            const status = error.status || (isTimeout ? 504 : 500);
            const errMsg = error.message || (isTimeout ? 'Timeout' : 'Unknown Error');

            console.warn(`[${new Date().toISOString()}] Failed: ${model} (${status} - ${errMsg})`);

            lastError = { status, message: errMsg };

            // Should we retry? 429 (Too Many Requests) or 503 (Service Unavailable) or 504 (Timeout) -> YES/Continue
            // 400 (Bad Request) -> NO/Break (but we'll just continue to be safe in this fallback loop)
        }
    }

    console.error(`[${new Date().toISOString()}] All models failed.`);
    res.status(lastError?.status || 500).json({
        error: "I'm having trouble connecting right now. Please try again in a moment."
    });
});

app.listen(PORT, () => {
    console.log(`Chatbot Server running on http://localhost:${PORT}`);
});
