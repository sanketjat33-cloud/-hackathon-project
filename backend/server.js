import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const otpStore = new Map();

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

const buildAiReply = (message = '', language = 'en') => {
  const text = String(message || '').toLowerCase();
  const lang = language || 'en';

  const replies = {
    en: {
      bid: 'Highest bid for your wheat produce in Sangrur today is ₹2,550/q by AgriCorp Traders. 7 buyers are currently bidding.',
      scheme: 'You qualify for PM-Kisan 17th installment and a tractor subsidy under SMAM. Please review your scheme eligibility in the dashboard.',
      weather: 'Heavy rain is expected in 2 days. It is advisable to postpone irrigation for your wheat crop to avoid waterlogging.',
      crop: 'For Wheat (PBW 343) at Day 42, maintain soil moisture near 40% and monitor for fungus after rainfall.',
      default: 'For Wheat (PBW 343) at Day 42, maintain soil moisture at 40% and review the weather alert before irrigation.',
    },
    hi: {
      bid: 'आज संगरूर में आपकी गेहूं फसल की सबसे ऊँची बोली ₹2,550/q है, जो AgriCorp Traders द्वारा दी गई है। 7 खरीदार अभी बोली लगा रहे हैं।',
      scheme: 'आप PM-Kisan की 17वीं किस्त और SMAM के तहत ट्रैक्टर सब्सिडी के लिए योग्य हैं। कृपया अपने योजना पात्रता की समीक्षा करें।',
      weather: '2 दिनों में भारी बारिश की संभावना है। जलभराव से बचने के लिए गेहूं की फसल की सिंचाई स्थगित करना उचित है।',
      crop: 'गेहूँ (PBW 343) के लिए Day 42 पर मिट्टी की नमी लगभग 40% रखें और बारिश के बाद फफूंद की निगरानी करें।',
      default: 'गेहूँ (PBW 343) के लिए Day 42 पर मिट्टी की नमी 40% रखें और सिंचाई से पहले मौसम अलर्ट का अवलोकन करें।',
    },
    pa: {
      bid: 'ਅੱਜ ਸੰਗਰੂਰ ਵਿੱਚ ਤੁਹਾਡੀ ਗਾਹੂੰ ਫਸਲ ਦੀ ਸਭ ਤੋਂ ਉੱਚੀ ਬੋਲੀ ₹2,550/q ਹੈ, ਜੋ AgriCorp Traders ਵਲੋਂ ਦਿੱਤੀ ਗਈ ਹੈ। 7 ਖਰੀਦਦਾਰ ਅਜੇ ਬੋਲੀ ਲਗਾ ਰਹੇ ਹਨ।',
      scheme: 'ਤੁਸੀਂ PM-Kisan ਦੀ 17ਵੀਂ ਕਿੱਤ ਅਤੇ SMAM ਅਨੁਸਾਰ ਟਰੈਕਟਰ ਸਬਸਿਡੀ ਲਈ ਯੋਗ ਹੋ। ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਯੋਜਨਾ ਦੀ ਯੋਗਤਾ ਦੀ ਸਮੀਖਿਆ ਕਰੋ।',
      weather: '2 ਦਿਨਾਂ ਵਿੱਚ ਭਾਰੀ ਬਰਸ਼ ਦੀ ਸੰਭਾਵਨਾ ਹੈ। ਜਲਭਰਾਵ ਤੋਂ ਬਚਣ ਲਈ ਗਾਹੂੰ ਦੀ ਫਸਲ ਦੀ ਸਿੰਚਾਈ ਨੂੰ ਮੁਲਤਵੀ ਕਰਨਾ ਉਚਿਤ ਹੈ।',
      crop: 'ਗਾਹੂੰ (PBW 343) ਲਈ Day 42 ਤੇ ਮਿੱਟੀ ਦੀ ਨਮੀ ਲਗਭਗ 40% ਰੱਖੋ ਅਤੇ ਬਰਸ਼ ਤੋਂ ਬਾਅਦ ਫੰਫੂਦ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ।',
      default: 'ਗਾਹੂੰ (PBW 343) ਲਈ Day 42 ਤੇ ਮਿੱਟੀ ਦੀ ਨਮੀ 40% ਰੱਖੋ ਅਤੇ ਸਿੰਚਾਈ ਤੋਂ ਪਹਿਲਾਂ ਮੌਸਮ ਅਲਰਟ ਦੀ ਸਮੀਖਿਆ ਕਰੋ।',
    },
  };

  const regionalReplies = {
    mr: {
      weather: 'दोन दिवसांत मुसळधार पावसाची शक्यता आहे. पाणी साचू नये म्हणून गव्हाची सिंचन प्रक्रिया पुढे ढकलणे योग्य आहे.',
      default: 'गहू (PBW 343) साठी जमिनीतील ओलावा 40% ठेवा आणि सिंचनापूर्वी हवामान सूचना तपासा.',
    },
    gu: {
      weather: '2 દિવસમાં ભારે વરસાદની શક્યતા છે. પાણી ભરાવાથી બચવા ઘઉંના પાકનું સિંચાઈ કાર્ય મુલતવી રાખો.',
      default: 'ઘઉં (PBW 343) માટે જમીનની ભેજ 40% રાખો અને સિંચાઈ પહેલાં હવામાન ચેતવણી તપાસો.',
    },
    bn: {
      weather: '২ দিনের মধ্যে ভারী বৃষ্টির সম্ভাবনা আছে। জল জমা এড়াতে গমের সেচ পিছিয়ে দিন।',
      default: 'গমের (PBW 343) জন্য মাটির আর্দ্রতা ৪০% রাখুন এবং সেচের আগে আবহাওয়ার সতর্কতা দেখুন।',
    },
    ta: {
      weather: '2 நாட்களில் கனமழை எதிர்பார்க்கப்படுகிறது. நீர் தேங்குவதைத் தவிர்க்க கோதுமைக்கு நீர்ப்பாசனத்தைத் தள்ளிப் போடுங்கள்.',
      default: 'கோதுமைக்கு (PBW 343) மண் ஈரப்பதத்தை 40% வைத்திருந்து நீர்ப்பாசனத்திற்கு முன் வானிலை எச்சரிக்கையைப் பாருங்கள்.',
    },
    te: {
      weather: '2 రోజుల్లో భారీ వర్షం వచ్చే అవకాశం ఉంది. నీరు నిలవకుండా గోధుమ పంటకు నీటిపారుదలను వాయిదా వేయండి.',
      default: 'గోధుమ (PBW 343) కోసం నేల తేమను 40% ఉంచి నీటిపారుదల ముందు వాతావరణ హెచ్చరికను చూడండి.',
    },
    kn: {
      weather: '2 ದಿನಗಳಲ್ಲಿ ಭಾರಿ ಮಳೆಯ ನಿರೀಕ್ಷೆಯಿದೆ. ನೀರು ನಿಲ್ಲುವುದನ್ನು ತಪ್ಪಿಸಲು ಗೋಧಿಯ ನೀರಾವರಿಯನ್ನು ಮುಂದೂಡಿ.',
      default: 'ಗೋಧಿ (PBW 343)ಗೆ ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು 40% ಇಟ್ಟು ನೀರಾವರಿ ಮಾಡುವ ಮೊದಲು ಹವಾಮಾನ ಎಚ್ಚರಿಕೆ ನೋಡಿ.',
    },
    ml: {
      weather: '2 ദിവസത്തിനുള്ളിൽ കനത്ത മഴ പ്രതീക്ഷിക്കുന്നു. വെള്ളക്കെട്ട് ഒഴിവാക്കാൻ ഗോതമ്പിന്റെ ജലസേചനം മാറ്റിവയ്ക്കുക.',
      default: 'ഗോതമ്പിന് (PBW 343) മണ്ണിലെ ഈർപ്പം 40% ആയി നിലനിർത്തി ജലസേചനത്തിന് മുമ്പ് കാലാവസ്ഥാ മുന്നറിയിപ്പ് പരിശോധിക്കുക.',
    },
    or: {
      weather: '2 ଦିନ ମଧ୍ୟରେ ପ୍ରବଳ ବର୍ଷାର ସମ୍ଭାବନା ଅଛି। ଜଳବନ୍ଦୀ ରୋକିବା ପାଇଁ ଗହମର ଜଳସେଚନ ବିଳମ୍ବ କରନ୍ତୁ।',
      default: 'ଗହମ (PBW 343) ପାଇଁ ମାଟିର ଆର୍ଦ୍ରତା 40% ରଖନ୍ତୁ ଏବଂ ଜଳସେଚନ ପୂର୍ବରୁ ପାଣିପାଗ ସତର୍କତା ଦେଖନ୍ତୁ।',
    },
    as: {
      weather: '২ দিনৰ ভিতৰত ধাৰাসাৰ বৰষুণৰ সম্ভাৱনা আছে। পানী জমা নহ’বলৈ ঘেঁহুৰ জলসিঞ্চন পিছুৱাই দিয়ক।',
      default: 'ঘেঁহুৰ (PBW 343) বাবে মাটিৰ আৰ্দ্ৰতা ৪০% ৰাখক আৰু জলসিঞ্চনৰ আগতে বতৰৰ সতৰ্কতা চাওক।',
    },
  };

  const selected = replies[lang] || { ...replies.en, ...regionalReplies[lang] };

  if (text.includes('bid') || text.includes('price') || text.includes('sell')) {
    return selected.bid;
  }

  if (text.includes('scheme') || text.includes('gov') || text.includes('subsidy')) {
    return selected.scheme;
  }

  if (text.includes('weather') || text.includes('rain') || text.includes('irrigation')) {
    return selected.weather;
  }

  if (text.includes('wheat') || text.includes('crop')) {
    return selected.crop;
  }

  return selected.default;
};

const askAi = async (message, language) => {
  const apiKey = process.env.XAI_API_KEY || process.env.OPENAI_API_KEY;
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
          content: `You are Agrova AI, a concise and practical farming assistant. Answer the user's question in language code ${language || 'en'}. Use this context when relevant: the farmer is in Sangrur, Punjab; current crop is Wheat PBW 343, Day 42; heavy rain is expected in 2 days; current highest bid is ₹2,550/q. If a question is unrelated to farming, answer helpfully but keep the response concise.`,
        },
        { role: 'user', content: String(message).trim() },
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
  return reply;
};

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    message: 'Agrova backend is running',
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/auth/login', (req, res) => {
  const { mobileNumber, role, password } = req.body || {};
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

  if (password !== undefined && String(password).trim() !== '') {
    return res.json({
      ok: true,
      message: 'Login successful.',
      directLogin: true,
      user: {
        id: 'demo-user',
        name: 'Ram Singh',
        role: role || 'Farmer',
        mobileNumber: cleanedNumber,
      },
      dashboard: demoDashboard,
    });
  }

  const generatedOtp = createOtp();
  otpStore.set(cleanedNumber, {
    otp: generatedOtp,
    expiresAt: Date.now() + 2 * 60 * 1000,
    role: role || 'Farmer',
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

  return res.json({
    ok: true,
    message: 'OTP verified successfully.',
    user: {
      id: 'demo-user',
      name: 'Ram Singh',
      role: savedOtp.role,
      mobileNumber: cleanedNumber,
    },
    dashboard: demoDashboard,
  });
});

app.get('/api/dashboard/:userId?', (req, res) => {
  res.json({
    ok: true,
    dashboard: demoDashboard,
  });
});

app.post('/api/ai/chat', async (req, res) => {
  const { message = '', language = 'en' } = req.body || {};

  if (!String(message).trim()) {
    return res.status(400).json({
      ok: false,
      message: 'Please ask a valid question.',
    });
  }

  try {
    return res.json({
      ok: true,
      reply: await askAi(message, language),
      source: apiKey ? 'model' : 'local',
    });
  } catch (error) {
    console.warn('AI provider unavailable, using local fallback:', error.message);
    return res.json({
      ok: true,
      reply: buildAiReply(message, language),
      source: 'local-fallback',
    });
  }
});

app.listen(port, () => {
  console.log(`Agrova backend running on http://localhost:${port}`);
});
