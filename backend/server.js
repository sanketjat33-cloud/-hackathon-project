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

  const selected = replies[lang] || replies.en;

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

app.post('/api/ai/chat', (req, res) => {
  const { message = '', language = 'en' } = req.body || {};

  if (!String(message).trim()) {
    return res.status(400).json({
      ok: false,
      message: 'Please ask a valid question.',
    });
  }

  return res.json({
    ok: true,
    reply: buildAiReply(message, language),
  });
});

app.listen(port, () => {
  console.log(`Agrova backend running on http://localhost:${port}`);
});
