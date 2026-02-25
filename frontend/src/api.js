const API_BASE = 'http://localhost:8000/api';

export const api = {
  async getMails() {
    const res = await fetch(`${API_BASE}/mails/`);
    if (!res.ok) throw new Error('Failed to fetch mails');
    return res.json();
  },
};