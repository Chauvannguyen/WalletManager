import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/API';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            const users = await loginUser(email, password);
            if (users.length > 0) {
                localStorage.setItem('user', JSON.stringify(users[0]));
                navigate('/home'); // Chuyển sang trang chủ sau khi đăng nhập thành công
            } else {
                setError('Email hoặc mật khẩu không đúng');
            }
        } catch (err) {
            setError('Lỗi khi đăng nhập');
        }
    };

    return (
        <div className="login-container">
            <h2>Đăng nhập</h2>
            <form onSubmit={handleLogin}>
                <input type="email" name="email" placeholder="Nhập email" required/>
                <input type="password" name="password" placeholder="Nhập mật khẩu" required/>
                <button type="submit">Đăng nhập</button>
                {error && <p className="error">{error}</p>}
                <div className="login-link">
                    Nếu chưa có tài khoản? <a href="../Register">Đăng ký</a>
                </div>
            </form>
        </div>
    );
}

export default Login;
