
const BASE_URL = 'http://localhost:8000/api/v1';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
    const token = localStorage.getItem('store_admin_token');

    const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        ...((options.headers as any) || {}),
    };

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
    getDashboard: () => apiFetch('/store-admin/dashboard'),
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
    getCustomers: () => apiFetch('/store-admin/customers'),
    getUser: () => apiFetch('/store-admin/user'),
};
