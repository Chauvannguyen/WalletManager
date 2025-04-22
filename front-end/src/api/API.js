import axios from 'axios';

const API_URL = 'http://localhost:3000/users';

export const loginUser = async (email, password) => {
    try {
        const res = await axios.get(API_URL, {
            params: { email, password }
        });
        return res.data;
    } catch (error) {
        throw new Error('Lỗi khi kết nối server');
    }
};
