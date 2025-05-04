import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './register.css';

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        avatar: '',
        phone: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra các trường rỗng
        if (!form.name || !form.email || !form.password || !form.avatar || !form.phone) {
            toast.warning("Vui lòng nhập đầy đủ thông tin!", { position: "top-center" });
            return;
        }

        try {
            await axios.post('http://localhost:3000/users', form);
            toast.success("Đăng ký thành công! Vui lòng đăng nhập.", {
                position: "top-right",
                autoClose: 2000,
                onClose: () => navigate('/login')  // Chuyển trang sau khi toast đóng
            });
        } catch (error) {
            console.error('Lỗi đăng ký:', error);
            toast.error("Đăng ký thất bại. Email có thể đã được sử dụng!", {
                position: "top-right"
            });
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6} className="register-container">
                    <h3 className="mb-4">Đăng ký tài khoản</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Control
                                type="text"
                                placeholder="Nhập họ và tên"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Control
                                type="email"
                                placeholder="Nhập email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Control
                                type="password"
                                placeholder="Nhập mật khẩu"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formAvatar">
                            <Form.Control
                                type="text"
                                placeholder="Link ảnh đại diện (avatar)"
                                name="avatar"
                                value={form.avatar}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPhone">
                            <Form.Control
                                type="tel"
                                placeholder="Nhập số điện thoại"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Đăng ký
                        </Button>

                        <div className="login-link mt-3 text-center">
                            Nếu đã có tài khoản? <a href="../Login">Đăng nhập</a>
                        </div>
                    </Form>
                </Col>
            </Row>
            <ToastContainer />
        </Container>
    );
};

export default Register;