import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './ChangePassword.css'

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    // Lấy thông tin người dùng từ localStorage
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setCurrentUser(storedUser);
        }
    }, []);

    const handleChangePassword = async () => {
        if (!currentUser) {
            Swal.fire('Lỗi', 'Bạn chưa đăng nhập!', 'error');
            return;
        }

        try {
            const res = await axios.get(`http://localhost:3000/users/${currentUser.id}`);
            const user = res.data;

            // Kiểm tra mật khẩu cũ
            if (user.password !== oldPassword) {
                Swal.fire('Sai mật khẩu', 'Mật khẩu cũ không đúng!', 'error');
                return;
            }

            // Cập nhật mật khẩu mới
            await axios.patch(`http://localhost:3000/users/${currentUser.id}`, {
                password: newPassword
            });

            // Đăng xuất và chuyển hướng về trang đăng nhập
            localStorage.removeItem('user');
            Swal.fire('Thành công', 'Đổi mật khẩu thành công! Vui lòng đăng nhập lại.', 'success').then(() => {
                navigate('/login');
            });

        } catch (error) {
            console.error(error);
            Swal.fire('Lỗi', 'Không thể đổi mật khẩu!', 'error');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100 justify-content-center">
                <Col md={6} sm={12}>
                    <Card>
                        <Card.Body>
                            <Card.Title className="text-center">Đổi mật khẩu</Card.Title>
                            <Form>
                                {/* Mật khẩu cũ */}
                                <Form.Group controlId="oldPassword">
                                    <Form.Label>Mật khẩu cũ</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Nhập mật khẩu cũ"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                </Form.Group>

                                {/* Mật khẩu mới */}
                                <Form.Group controlId="newPassword">
                                    <Form.Label>Mật khẩu mới</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Nhập mật khẩu mới"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </Form.Group>

                                {/* Thông báo lỗi hoặc thành công */}
                                {message && <Alert variant="danger" className="mt-3">{message}</Alert>}

                                {/* Nút xác nhận */}
                                <Button variant="primary" className="w-100 mt-3" onClick={handleChangePassword}>
                                    Đổi mật khẩu
                                </Button>
                                <Button variant="success" className="w-100 mt-3" onClick={() => navigate('/home')} >
                                    Quay lại
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ChangePassword;
