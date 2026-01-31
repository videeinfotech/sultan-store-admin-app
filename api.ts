
export const formatPrice = (price: number | string) => {
    const num = typeof price === 'string' ? parseFloat(price) : price;
    return `₹${Math.round(num || 0).toLocaleString('en-IN')}`;
};

// Automatically detect if running locally or on production
const isLocalhost = window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '[::1]';

const BASE_URL = isLocalhost
    ? 'http://localhost:8000/api/v1'
    : 'https://sultan.quicdeal.in/api/v1';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('store_admin_token');

    const headers: any = {
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...((options.headers as any) || {}),
    };

    if (!(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (response.status === 401) {
        localStorage.removeItem('store_admin_token');
        window.location.reload();
    }

    const data = await response.json();

    if (!response.ok) {
        const error = new Error(data.message || 'Something went wrong') as any;
        error.errors = data.errors;
        throw error;
    }

    return data;
};

export const storeAdminApi = {
    login: (credentials: any) => apiFetch('/store-admin/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    }),
    getDashboard: (params: string = '') => apiFetch(`/store-admin/dashboard${params}`),
    getOrders: (params: string = '') => apiFetch(`/store-admin/orders${params}`),
    getOrder: (id: string) => apiFetch(`/store-admin/orders/${id}`),
    updateOrderStatus: (id: string, status: string) => apiFetch(`/store-admin/orders/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
    }),
    getProducts: (params: string = '') => apiFetch(`/store-admin/products${params}`),
    getProduct: (id: string) => apiFetch(`/store-admin/products/${id}`),
    updateProductStock: (id: string, quantity: number) => apiFetch(`/store-admin/products/${id}/stock`, {
        method: 'PATCH',
        body: JSON.stringify({ quantity }),
    }),
    getStaff: () => apiFetch('/store-admin/staff'),
    addStaff: (data: any) => apiFetch('/store-admin/staff', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    getCustomers: (params: string = '') => apiFetch(`/store-admin/customers${params}`),
    getUser: () => apiFetch('/store-admin/user'),
    updateProfile: (data: any) => apiFetch('/store-admin/profile', {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    updateAvatar: (formData: FormData) => apiFetch('/store-admin/avatar', {
        method: 'POST',
        body: formData,
    }),
    updatePassword: (data: any) => apiFetch('/store-admin/password', {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
    updateNotificationSettings: (data: any) => apiFetch('/store-admin/notification-settings', {
        method: 'PUT',
        body: JSON.stringify(data),
    }),
};
