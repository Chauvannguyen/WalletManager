import axios from 'axios';

export const API_URL = 'http://localhost:3000';

export const loginUser = async (email, password) => {
    try {
        const res = await axios.get(`${API_URL}/users`, {
            params: { email, password }
        });
        return res.data;
    } catch (error) {
        throw new Error('Lỗi khi kết nối server');
    }
};
