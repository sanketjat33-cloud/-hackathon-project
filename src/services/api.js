const API_BASE = '/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload.message || 'Request failed');
  }

  return payload;
}

export const api = {
  health: () => request('/health'),
  login: (payload) => request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  verifyOtp: (payload) => request('/auth/verify-otp', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  getDashboard: (userId = 'demo-user') => request(`/dashboard/${userId}`),
  askAi: (payload) => request('/ai/chat', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
};

export default api;
