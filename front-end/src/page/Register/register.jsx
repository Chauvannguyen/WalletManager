import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './register.css';

const Register = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Kiểm tra các trường rỗng
        if (!form.name || !form.email || !form.password) {
            alert("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        try {
            // Gửi yêu cầu đăng ký
            await axios.post('http://localhost:3000/users', form);
            alert("Đăng ký thành công! Vui lòng đăng nhập.");
            navigate('/login');
        } catch (error) {
            console.error('Lỗi đăng ký:', error);
            alert("Đăng ký thất bại.");
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h3 className="mb-4">Đăng ký tài khoản</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập họ và tên"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Nhập email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formPassword">
                            <Form.Label>Mật khẩu</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Nhập mật khẩu"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Đăng ký
                        </Button>
                        <div className="login-link">
                            Nếu đã có tài khoản? <a href="../Login">Đăng nhập</a>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
