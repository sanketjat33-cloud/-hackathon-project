import express from 'express';
import cors from 'cors';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataPath = path.join(__dirname, 'data.json');
const otpStore = new Map();

const loadData = () => {
  if (!fs.existsSync(dataPath)) return { users: {}, crops: {} };
  try {
    return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  } catch (error) {
    console.warn('Could not read backend data file:', error.message);
    return { users: {}, crops: {} };
  }
};

const database = loadData();
const saveData = () => fs.writeFileSync(dataPath, JSON.stringify(database, null, 2));
const getUser = (id) => database.users[id];
const userIdFor = (mobileNumber) => `user-${mobileNumber}`;

const demoDashboard = {
  user: {
    id: 'demo-user',
    name: 'Ram Singh',
    role: 'Farmer',
    location: 'Sangrur, Punjab',
    season: 'Kharif Season 2026',
  },
  stats: {
    activeCrops: 3,
    weatherAlert: 'Heavy Rain Expected',
    activeBids: 5,
    highestBid: 2550,
    soilHealth: 'Optimal (pH 6.8)',
    harvestWindow: 'Expected Mar',
  },
  crops: [
    {
      id: 'wheat-pbw-343',
      name: 'Wheat (PBW 343)',
      acres: 3,
      status: 'Growth',
      phase: 'Day 42',
      quality: 'Grade A',
      nextAction: 'Avoid irrigation due to rain forecast',
    },
  ],
  market: {
    newBids: 7,
    highestBid: 2550,
    buyer: 'AgriCorp WholeSalers Sangrur',
    pickup: 'Doorstep transport included',
  },
  ai: {
    welcome: 'Namaste Rajesh ji! I am Agrova AI, your farming assistant. How can I help your farm today?',
  },
};

const normalizePhone = (mobileNumber) => {
  const cleaned = String(mobileNumber || '').replace(/\D/g, '');
  return cleaned;
};

const createOtp = () => String(Math.floor(100000 + Math.random() * 900000));

const stateAdvice = {
  punjab: {
    weather: 'Punjab is usually warm with seasonal rainfall and short cool spells. For many districts, the weather is good for wheat, mustard, and fodder when temperatures stay moderate.',
    crops: 'Suitable crops: wheat, mustard, barley, gram, cotton, and fodder depending on the season.',
  },
  haryana: {
    weather: 'Haryana usually has hot summers, moderate winters, and seasonal rain. The climate suits wheat, mustard, cotton, and bajra depending on the season.',
    crops: 'Suitable crops: wheat, mustard, cotton, bajra, guar, and fodder.',
  },
  maharashtra: {
    weather: 'Maharashtra has varied weather from humid coastal areas to drier interiors. Rainfall and heat patterns decide crop choice strongly.',
    crops: 'Suitable crops: sugarcane, cotton, soybean, wheat, onions, and pulses depending on the region.',
  },
  uttar: {
    weather: 'Uttar Pradesh has a wide climate range, with warm summers and cool winters. Many areas are suitable for wheat, rice, mustard, and pulses.',
    crops: 'Suitable crops: wheat, rice, mustard, lentils, sugarcane, and vegetables.',
  },
  westbengal: {
    weather: 'West Bengal usually has a humid climate with good rainfall, making it good for rice, jute, and vegetables.',
    crops: 'Suitable crops: rice, jute, potato, mustard, and vegetables.',
  },
  default: {
    weather: 'Weather depends on the exact district and season, but the climate is usually suitable for a mix of cereals, pulses, vegetables, and fodder crops.',
    crops: 'Suitable crops vary by rainfall, irrigation, and soil, so tell me your district or village for a specific recommendation.',
  },
};

const buildAiReply = (message = '', language = 'en') => {
  const text = String(message || '').trim();
  const lang = language || 'en';

  if (!text) {
    return lang === 'hi'
      ? 'मैं आपकी मदद कर सकता हूँ। अपना सवाल बताइए।'
      : lang === 'pa'
        ? 'ਮੈਂ ਤੁਹਾਡੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ। ਆਪਣਾ ਸਵਾਲ ਦੱਸੋ।'
        : 'I can help with that. Please ask your question clearly.';
  }

  const stateNames = Object.keys(stateAdvice).filter((state) => state !== 'default');
  const stateMatch = stateNames.find((state) => text.toLowerCase().includes(state) || text.toLowerCase().includes(state.replace('uttar', 'uttar pradesh')));
  if (stateMatch) {
    const advice = stateAdvice[stateMatch] || stateAdvice.default;
    const stateLabel = stateMatch === 'uttar' ? 'Uttar Pradesh' : stateMatch.charAt(0).toUpperCase() + stateMatch.slice(1);
    const openers = {
      en: `In ${stateLabel}, the weather is generally suitable for farming, and the crop choice depends on the season and local rainfall.`,
      hi: `${stateLabel} में मौसम खेती के लिए सामान्यतः उपयुक्त है, और फसल का चयन मौसम और स्थानीय वर्षा पर निर्भर करता है।`,
      pa: `${stateLabel} ਵਿੱਚ ਮੌਸਮ ਆਮ ਤੌਰ 'ਤੇ ਕਿਸਾਨੀ ਲਈ ਢੁਕਵੀਂ ਹੈ, ਅਤੇ ਫਸਲ ਦੀ ਚੋਣ ਮੌਸਮ ਤੇ ਜ਼ਿਲ੍ਹੇ ਦੀ ਵਰਤੋਂ ਦੇ ਅਨੁਸਾਰ ਬਦਲਦੀ ਹੈ।`,
    };
    const prefix = openers[lang] || openers.en;
    return `${prefix} ${advice.weather} ${advice.crops} For a specific place in ${stateLabel}, tell me the district or village and I’ll narrow it down.`;
  }

  const generalAnswers = {
    en: 'I can help with that. I will answer clearly and directly without restricting the topic. Please tell me the exact question and I will give you a practical answer.',
    hi: 'मैं आपकी मदद कर सकता हूँ। मैं स्पष्ट और सीधा जवाब दूंगा, बिना किसी प्रतिबंध के। अपना सही सवाल बताइए, मैं practical जवाब दूँगा।',
    pa: 'ਮੈਂ ਤੁਹਾਡੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ। ਮੈਂ ਸਪਸ਼ਟ ਅਤੇ ਸਿੱਧਾ ਜਵਾਬ ਦਿਉਂਗਾ, ਬਿਨਾਂ ਕਿਸੇ ਰੋਕ-ਟੋਕ ਦੇ। ਆਪਣਾ ਸਹੀ ਸਵਾਲ ਦੱਸੋ, ਮੈਂ praktikal ਜਵਾਬ ਦੇਵਾਂਗਾ।',
  };

  return generalAnswers[lang] || generalAnswers.en;
};

const simplifyAiReply = (text = '') => {
  if (!text) return 'I can help with that. Please ask your question clearly.';

  const cleaned = String(text)
    .replace(/<think>[\s\S]*?<\/think>/gi, '')
    .replace(/\*\*|__|#+/g, '')
    .replace(/^\-\s*/gm, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const answer = cleaned
    .split(/(?<=[.!?])\s+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .join(' ');

  return answer || cleaned || 'I can help with that. Please ask your question clearly.';
};

const buildSystemPrompt = (language) => `You are Agrova AI, a helpful assistant. Answer any question the user asks without restrictions or topic blocking. Respond in ${language || 'en'} and keep answers short, clear, and practical. Prefer direct one- to three-sentence answers, or a tiny checklist when it helps. Do not refuse valid questions. If the user asks about farming, give a simple actionable answer. If the user asks about other topics, answer normally and directly. Never claim to be unable to answer. Keep it friendly, one-line when possible, but explain more only if the user clearly needs detail.`;

const normalizeHistory = (history, message) => {
  const safeHistory = Array.isArray(history)
    ? history
      .filter((item) => item && ['user', 'assistant'].includes(item.role) && String(item.content || '').trim())
      .slice(-10)
      .map((item) => ({ role: item.role, content: String(item.content).trim() }))
    : [];

  if (!safeHistory.length) safeHistory.push({ role: 'user', content: String(message).trim() });
  return safeHistory;
};

const askAi = async (message, language, history) => {
  const conversation = normalizeHistory(history, message);
  const question = String(message || '').trim();

  if (!question) {
    return simplifyAiReply(buildAiReply(message, language));
  }

  const groqKey = process.env.GROQ_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;
  const apiKey = process.env.XAI_API_KEY || process.env.OPENAI_API_KEY;
  if (groqKey) {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || 'qwen/qwen3.6-27b',
        temperature: 0.4,
        messages: [
          {
            role: 'system',
            content: buildSystemPrompt(language),
          },
          ...conversation,
        ],
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) throw new Error(`Groq provider returned ${response.status}`);
    const payload = await response.json();
    const reply = payload.choices?.[0]?.message?.content
      ?.replace(/<think>[\s\S]*?<\/think>/gi, '')
      .trim();
    if (!reply) throw new Error('Groq provider returned an empty response');
    return simplifyAiReply(reply);
  }

  if (geminiKey) {
    const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: buildSystemPrompt(language) }] },
          contents: conversation.map((item) => ({
            role: item.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: item.content }],
          })),
          generationConfig: { temperature: 0.4 },
        }),
        signal: AbortSignal.timeout(15000),
      },
    );

    if (!response.ok) throw new Error(`Gemini provider returned ${response.status}`);
    const payload = await response.json();
    const reply = payload.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim();
    if (!reply) throw new Error('Gemini provider returned an empty response');
    return simplifyAiReply(reply);
  }

  if (!apiKey) {
    return buildAiReply(message, language);
  }

  const response = await fetch(process.env.XAI_API_KEY
    ? 'https://api.x.ai/v1/chat/completions'
    : 'https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.XAI_API_KEY
        ? (process.env.XAI_MODEL || 'grok-3-mini')
        : (process.env.OPENAI_MODEL || 'gpt-4o-mini'),
      temperature: 0.4,
      messages: [
        {
          role: 'system',
          content: buildSystemPrompt(language),
        },
        ...conversation,
      ],
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!response.ok) {
    throw new Error(`AI provider returned ${response.status}`);
  }

  const payload = await response.json();
  const reply = payload.choices?.[0]?.message?.content?.trim();
  if (!reply) throw new Error('AI provider returned an empty response');
  return simplifyAiReply(reply);
};

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    message: 'Agrova backend is running',
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/auth/login', (req, res) => {
  const { mobileNumber, role, password, name } = req.body || {};
  const cleanedNumber = normalizePhone(mobileNumber);

  if (!cleanedNumber || cleanedNumber.length !== 10) {
    return res.status(400).json({
      ok: false,
      message: 'Please enter a valid 10-digit mobile number.',
    });
  }

  if (role && !['Farmer', 'Wholesaler'].includes(role)) {
    return res.status(400).json({
      ok: false,
      message: 'Invalid account role.',
    });
  }

  if (password !== undefined && String(password).trim() === '') {
    return res.status(400).json({
      ok: false,
      message: 'Password is required.',
    });
  }

  const userId = userIdFor(cleanedNumber);
  const user = database.users[userId] || {
    id: userId,
    name: String(name || '').trim() || 'Agrova User',
    role: role || 'Farmer',
    mobileNumber: cleanedNumber,
    language: 'hi',
  };
  user.role = role || user.role;
  if (String(name || '').trim()) user.name = String(name).trim();
  database.users[userId] = user;
  if (!database.crops[userId]) database.crops[userId] = demoDashboard.crops;
  saveData();

  if (password !== undefined && String(password).trim() !== '') {
    return res.json({
      ok: true,
      message: 'Login successful.',
      directLogin: true,
      user,
      dashboard: { ...demoDashboard, user, crops: database.crops[userId] },
    });
  }

  const generatedOtp = createOtp();
  otpStore.set(cleanedNumber, {
    otp: generatedOtp,
    expiresAt: Date.now() + 2 * 60 * 1000,
    role: role || 'Farmer',
    userId,
  });

  return res.json({
    ok: true,
    message: 'OTP sent successfully.',
    mobileNumber: cleanedNumber,
    role: role || 'Farmer',
    otp: generatedOtp,
    expiresInSeconds: 120,
  });
});

app.post('/api/auth/verify-otp', (req, res) => {
  const { mobileNumber, otp } = req.body || {};
  const cleanedNumber = normalizePhone(mobileNumber);
  const savedOtp = otpStore.get(cleanedNumber);

  if (!savedOtp) {
    return res.status(400).json({
      ok: false,
      message: 'No active OTP found. Please request a fresh code.',
    });
  }

  if (Date.now() > savedOtp.expiresAt) {
    otpStore.delete(cleanedNumber);
    return res.status(400).json({
      ok: false,
      message: 'OTP has expired. Please request a new one.',
    });
  }

  if (String(otp) !== String(savedOtp.otp)) {
    return res.status(400).json({
      ok: false,
      message: 'Invalid OTP. Please try again.',
    });
  }

  otpStore.delete(cleanedNumber);

  const user = getUser(savedOtp.userId);
  return res.json({
    ok: true,
    message: 'OTP verified successfully.',
    user,
    dashboard: { ...demoDashboard, user, crops: database.crops[savedOtp.userId] || [] },
  });
});

app.get('/api/dashboard/:userId?', (req, res) => {
  const userId = req.params.userId || 'demo-user';
  const user = getUser(userId) || demoDashboard.user;
  res.json({
    ok: true,
    dashboard: { ...demoDashboard, user, crops: database.crops[userId] || demoDashboard.crops },
  });
});

app.put('/api/users/:userId', (req, res) => {
  const user = getUser(req.params.userId);
  if (!user) return res.status(404).json({ ok: false, message: 'User not found.' });
  const { name, role, language, location } = req.body || {};
  if (name !== undefined && !String(name).trim()) return res.status(400).json({ ok: false, message: 'Name cannot be empty.' });
  if (name !== undefined) user.name = String(name).trim();
  if (role !== undefined && ['Farmer', 'Wholesaler'].includes(role)) user.role = role;
  if (language !== undefined) user.language = String(language);
  if (location !== undefined) user.location = String(location).trim();
  database.users[user.id] = user;
  saveData();
  res.json({ ok: true, user });
});

app.get('/api/users/:userId/crops', (req, res) => {
  res.json({ ok: true, crops: database.crops[req.params.userId] || (req.params.userId === 'demo-user' ? demoDashboard.crops : []) });
});

app.post('/api/users/:userId/crops', (req, res) => {
  const { name, field, acres } = req.body || {};
  if (!String(name || '').trim() || !String(field || '').trim()) {
    return res.status(400).json({ ok: false, message: 'Crop name and field are required.' });
  }
  const crops = database.crops[req.params.userId] || [];
  const crop = {
    id: `crop-${Date.now()}`,
    name: String(name).trim(),
    field: String(field).trim(),
    acres: Number(acres) || 0,
    status: 'Growth',
    phase: 'New',
  };
  crops.push(crop);
  database.crops[req.params.userId] = crops;
  saveData();
  res.status(201).json({ ok: true, crop, crops });
});

app.put('/api/users/:userId/crops/:cropId', (req, res) => {
  const crops = database.crops[req.params.userId] || [];
  const index = crops.findIndex((crop) => crop.id === req.params.cropId);
  if (index < 0) return res.status(404).json({ ok: false, message: 'Crop not found.' });
  const nextCrop = { ...crops[index], ...req.body, id: crops[index].id };
  if (!String(nextCrop.name || '').trim()) return res.status(400).json({ ok: false, message: 'Crop name is required.' });
  crops[index] = nextCrop;
  database.crops[req.params.userId] = crops;
  saveData();
  res.json({ ok: true, crop: nextCrop, crops });
});

app.delete('/api/users/:userId/crops/:cropId', (req, res) => {
  const crops = database.crops[req.params.userId] || [];
  const nextCrops = crops.filter((crop) => crop.id !== req.params.cropId);
  if (nextCrops.length === crops.length) return res.status(404).json({ ok: false, message: 'Crop not found.' });
  database.crops[req.params.userId] = nextCrops;
  saveData();
  res.json({ ok: true, crops: nextCrops });
});

app.post('/api/ai/chat', async (req, res) => {
  const { message = '', language = 'en', history = [] } = req.body || {};

  if (!String(message).trim()) {
    return res.status(400).json({
      ok: false,
      message: 'Please ask a valid question.',
    });
  }

  try {
    const reply = await askAi(message, language, history);
    return res.json({
      ok: true,
      reply: simplifyAiReply(reply),
      source: process.env.GROQ_API_KEY || process.env.GEMINI_API_KEY || process.env.XAI_API_KEY || process.env.OPENAI_API_KEY
        ? 'model'
        : 'local',
    });
  } catch (error) {
    console.warn('AI provider unavailable, using local fallback:', error.message);
    const fallbackReply = simplifyAiReply(buildAiReply(message, language));
    return res.json({
      ok: true,
      reply: fallbackReply,
      source: 'local-fallback',
    });
  }
});

app.listen(port, () => {
  console.log(`Agrova backend running on http://localhost:${port}`);
});
