import axios from 'axios';
import useTokenStore from '@/store';

const api = axios.create({
    baseURL: import.meta.env.VITE_PUBLIC_BACKEND_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config)=> {
    const token = useTokenStore.getState().token;

    if(token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

export const login = async (data: { email: string, password: string}) => {
    return api.post('/api/users/login', data);
}

export const register = async (data: { name: string, email: string, password: string}) => {
    return api.post('/api/users/register', data);
}

export const getBooks = async (page: number, limit: number) => api.get(`/api/books/getAll?page=${page}&limit=${limit}`);

export const createBook = async ({ formData }: {formData: FormData}) => api.post('/api/books/create', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    },
})

export const editBook = async ({formData, bookId}: { formData: FormData, bookId: string}) => api.patch(`/api/books/update/${bookId}`, formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    },
})

export const deleteBook = async (bookId: string) => api.delete(`/api/books/${bookId}`)