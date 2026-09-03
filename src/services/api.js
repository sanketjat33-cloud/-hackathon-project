const API_BASE = (import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/$/, '') : '') + '/api';

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
  updateUser: (userId, payload) => request(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  }),
  getCrops: (userId) => request(`/users/${userId}/crops`),
  addCrop: (userId, payload) => request(`/users/${userId}/crops`, {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  updateCrop: (userId, cropId, payload) => request(`/users/${userId}/crops/${cropId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  }),
  deleteCrop: (userId, cropId) => request(`/users/${userId}/crops/${cropId}`, {
    method: 'DELETE',
  }),
  getMarket: (query = {}) => request(`/market?${new URLSearchParams(query).toString()}`),
  createListing: (userId, payload) => request(`/users/${userId}/listings`, {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  getListings: (userId) => request(`/users/${userId}/listings`),
  getBids: (userId) => request(`/users/${userId}/bids`),
  acceptBid: (userId, bidId) => request(`/users/${userId}/bids/${bidId}/accept`, { method: 'POST' }),
  contactBuyer: (userId, bidId) => request(`/users/${userId}/bids/${bidId}/contact`, { method: 'POST' }),
  saveProgress: (userId, payload) => request(`/users/${userId}/progress`, {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  getProgress: (userId, cropId) => request(`/users/${userId}/progress${cropId ? `?cropId=${encodeURIComponent(cropId)}` : ''}`),
  submitSchemeApplication: (userId, payload) => request(`/users/${userId}/scheme-applications`, {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  matchSchemes: (payload) => request('/schemes/match', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  askAi: (payload) => request('/ai/chat', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
};

export default api;
