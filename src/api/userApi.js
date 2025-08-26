import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : new Error('Erro de conexão com a API');
    }
};