# Agrova

Agrova is a smart agriculture platform connecting farmers and wholesalers through a digital experience for crop management, weather awareness, market access, and AI-powered guidance.

## Features
- Farmer and wholesaler login flow
- OTP verification flow
- Multi-language support
- AI assistant for farming and bidding guidance
- Responsive dashboard with agricultural data
- Express backend for demo auth and AI APIs

## Tech Stack
- React
- Vite
- JavaScript
- Tailwind CSS
- React Router
- Express
- Node.js

## Project Structure
```bash
project-root/
├── backend/
│   └── server.js
├── src/
│   ├── assets/
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── package.json
├── vite.config.js
├── index.html
├── README.md
└── .gitignore
```

## Installation
1. Clone the repository
2. Install dependencies:

```bash
npm install
```

## Run the app
Start the backend:

```bash
npm run server
```

Start the frontend:

```bash
npm run dev
```

Or run both together:

```bash
npm run dev:full
```

## Demo Notes
- OTP is demo-safe and shown in the UI for testing.
- AI responses are backend-driven and respond in the selected language.
- This is a working prototype and can be extended with real SMS, database, and authentication services.

## Build Verification
This project has been validated with:

```bash
npm run build
```

The build completes successfully.
