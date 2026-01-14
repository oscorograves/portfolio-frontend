const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const portfolioData = require('./portfolio-data');

// Middleware
app.use(cors());
app.use(express.json());

// Global Error Handling: uncaughtException
process.on('uncaughtException', (err) => {
    console.error(`[${new Date().toISOString()}] Uncaught Exception:`, err);
    // In production, you might want to restart, but pm2 will handle that.
    // We log it so we know what happened.
});

// Global Error Handling: unhandledRejection
process.on('unhandledRejection', (reason, promise) => {
    console.error(`[${new Date().toISOString()}] Unhandled Rejection at:`, promise, 'reason:', reason);
});

// Health Check Route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// OpenAI Route
// --- System Prompt Construction ---
const SYSTEM_PROMPT = `You are a helpful assistant for Kanishk Singh's portfolio website. 
Here is the detailed context about Kanishk's professional experience, projects, skills, and case studies:
${JSON.stringify(portfolioData)}

Answer questions based on this context. 
If the answer is not in the context, state that clearly and briefly.
IMPORTANT: Provide your response in plain text only. Do not use Markdown formatting, bullet points, asterisks (*), or bold text. Use simple numbering (1, 2, 3) or dashes (-) for lists if absolutely necessary, but prefer paragraph format.`;

const MODELS = ["gemini-3-pro-preview", "gemini-3-flash-preview", "gemini-2.5-flash", "groq-llama3"];

app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    const geminiKey = process.env.GEMINI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    if (!geminiKey) {
        console.error('Missing Gemini API Key');
        return res.status(500).json({ error: 'Server configuration error (Missing Gemini API Key)' });
    }

    // Dynamic import for node-fetch (ESM module)
    const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

    let lastError = null;

    for (const model of MODELS) {
        try {
            console.log(`[${new Date().toISOString()}] Attempting with model: ${model}`);

            // --- GEMINI API CALL : With Timeout ---
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

            try {
                let response;

                if (model === 'groq-llama3') {
                    if (!groqKey) {
                        console.warn('Skipping Groq fallback: Missing GROQ_API_KEY');
                        continue;
                    }
                    // Groq API Call
                    response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${groqKey}`
                        },
                        body: JSON.stringify({
                            model: "llama3-70b-8192", // Using Llama 3 70B
                            messages: [
                                { role: "system", content: SYSTEM_PROMPT },
                                { role: "user", content: message }
                            ]
                        }),
                        signal: controller.signal
                    });

                } else {
                    // Gemini API Call
                    response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
                            contents: [{ parts: [{ text: message }] }]
                        }),
                        signal: controller.signal
                    });
                }

                clearTimeout(timeoutId);
                const data = await response.json();

                if (!response.ok) {
                    // Logic for retry on 429/503 applies to both providers
                    if (response.status === 429 || response.status === 503) {
                        console.warn(`[${new Date().toISOString()}] Model ${model} failed with status ${response.status}. Retrying with next model...`);
                        lastError = { status: response.status, message: data.error?.message || 'Quota exceeded or service unavailable' };
                        continue; // Try next model
                    }

                    console.error(`[${new Date().toISOString()}] API Error (${model}):`, data);
                    // For other errors, we might want to skip too, but let's stick to specific retry codes for now to avoid masking config errors
                    return res.status(response.status).json({ error: data.error?.message || 'Error fetching from AI provider' });
                }

                let replyText;
                if (model === 'groq-llama3') {
                    replyText = data.choices?.[0]?.message?.content || "No response generated.";
                } else {
                    replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
                }

                console.log(`[${new Date().toISOString()}] Success with ${model}. Responded to: ${message.substring(0, 20)}...`);
                return res.json({ reply: replyText });

            } catch (fetchError) {
                clearTimeout(timeoutId);
                if (fetchError.name === 'AbortError') {
                    console.error(`[${new Date().toISOString()}] API Timeout (${model})`);
                    lastError = { status: 504, message: 'Request to AI service timed out.' };
                    continue;
                }
                throw fetchError;
            }

        } catch (error) {
            console.error(`[${new Date().toISOString()}] Error with model ${model}:`, error);
            lastError = { status: 500, message: error.message };
            // Continue to next model on network error
        }
    }

    // If we exit the loop, it means all models failed
    console.error(`[${new Date().toISOString()}] All models failed.`);
    res.status(lastError?.status || 500).json({ error: lastError?.message || 'All AI models are currently unavailable. Please try again later.' });
});

app.listen(PORT, () => {
    console.log(`Chatbot Server running on http://localhost:${PORT}`);
});
