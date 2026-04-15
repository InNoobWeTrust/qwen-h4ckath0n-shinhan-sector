/**
 * Shinhan Soft POS - API Client
 * 
 * Local dev:   VITE_DEV=true VITE_API_URL=http://localhost:8787/api npm run dev
 * Production:   API served from same origin as frontend (/api)
 */

const isLocal = typeof import !== 'undefined' && import.meta && import.meta.env && import.meta.env.VITE_DEV;
const API_BASE = (isLocal && import.meta.env.VITE_API_URL) 
  ? import.meta.env.VITE_API_URL 
  : '/api';
const API_KEY = 'Bearer shinhan-pos-demo-key-2024';

function authHeaders() {
  return {
    'Authorization': API_KEY,
    'Content-Type': 'application/json',
  };
}

function multipartHeaders() {
  return {
    'Authorization': API_KEY,
  };
}

async function handleResponse(res) {
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const body = await res.json();
      msg = body.error || msg;
    } catch {}
    throw new Error(msg);
  }
  if (res.status === 204) return null;
  return res.json();
}

// ── Merchant ──────────────────────────────────────────────

export const merchantApi = {
  getMerchant: async () => {
    const res = await fetch(`${API_BASE}/merchants`, { headers: authHeaders() });
    return handleResponse(res);
  },
};

// ── Products / Inventory ─────────────────────────────────

export const productsApi = {
  getProducts: async () => {
    const res = await fetch(`${API_BASE}/products`, { headers: authHeaders() });
    return handleResponse(res);
  },

  getProduct: async (id) => {
    const res = await fetch(`${API_BASE}/products/${encodeURIComponent(id)}`, { headers: authHeaders() });
    return handleResponse(res);
  },

  createProduct: async (product) => {
    const res = await fetch(`${API_BASE}/products`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(product),
    });
    return handleResponse(res);
  },

  updateProduct: async (id, fields) => {
    const res = await fetch(`${API_BASE}/products/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify(fields),
    });
    return handleResponse(res);
  },

  updateStock: async (id, stock) => {
    return productsApi.updateProduct(id, { stock });
  },

  deleteProduct: async (id) => {
    const res = await fetch(`${API_BASE}/products/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: authHeaders(),
    });
    return handleResponse(res);
  },
};

// ── Orders ────────────────────────────────────────────────

export const ordersApi = {
  getOrders: async ({ channel, status, limit = 50, offset = 0 } = {}) => {
    const params = new URLSearchParams();
    if (channel) params.set('channel', channel);
    if (status) params.set('status', status);
    params.set('limit', String(limit));
    params.set('offset', String(offset));
    const qs = params.toString();
    const url = `${API_BASE}/orders${qs ? '?' + qs : ''}`;
    const res = await fetch(url, { headers: authHeaders() });
    return handleResponse(res);
  },

  getOrder: async (id) => {
    const res = await fetch(`${API_BASE}/orders/${encodeURIComponent(id)}`, { headers: authHeaders() });
    return handleResponse(res);
  },

  createOrder: async ({ channel, items, customer_name, customer_phone, notes, discount }) => {
    const res = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ channel, items, customer_name, customer_phone, notes, discount }),
    });
    return handleResponse(res);
  },

  updateOrder: async (id, fields) => {
    const res = await fetch(`${API_BASE}/orders/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: authHeaders(),
      body: JSON.stringify(fields),
    });
    return handleResponse(res);
  },

  settleOrder: async (id) => {
    return ordersApi.updateOrder(id, { settled: 1 });
  },
};

// ── Staff ─────────────────────────────────────────────────

export const staffApi = {
  getStaff: async () => {
    const res = await fetch(`${API_BASE}/staff`, { headers: authHeaders() });
    return handleResponse(res);
  },

  createStaff: async (staff) => {
    const res = await fetch(`${API_BASE}/staff`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify(staff),
    });
    return handleResponse(res);
  },
};

// ── Shifts ────────────────────────────────────────────────

export const shiftsApi = {
  getActiveShift: async () => {
    const res = await fetch(`${API_BASE}/shifts/active`, { headers: authHeaders() });
    return handleResponse(res);
  },

  createShift: async ({ staff_id }) => {
    const res = await fetch(`${API_BASE}/shifts`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ staff_id }),
    });
    return handleResponse(res);
  },

  closeShift: async (id) => {
    const res = await fetch(`${API_BASE}/shifts/${encodeURIComponent(id)}/close`, {
      method: 'PATCH',
      headers: authHeaders(),
    });
    return handleResponse(res);
  },
};

// ── Receipts ──────────────────────────────────────────────

export const receiptsApi = {
  getReceipts: async () => {
    const res = await fetch(`${API_BASE}/receipts`, { headers: authHeaders() });
    return handleResponse(res);
  },

  getDownloadUrl: async (id) => {
    // Returns the R2 key; frontend should call /api/receipts/:id/download to stream
    return `${API_BASE}/receipts/${encodeURIComponent(id)}/download`;
  },

  uploadReceipt: async (orderId, file) => {
    const formData = new FormData();
    formData.append('order_id', orderId);
    formData.append('file', file);
    const res = await fetch(`${API_BASE}/receipts`, {
      method: 'POST',
      headers: multipartHeaders(),
      body: formData,
    });
    return handleResponse(res);
  },
};

// ── Health check ───────────────────────────────────────────

export const healthApi = {
  check: async () => {
    const res = await fetch(`${API_BASE}/health`);
    return handleResponse(res);
  },
};
