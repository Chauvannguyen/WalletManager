import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../api/API';

const ProfileDetail = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        avatar: '',
        phone: ''
    });
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Lấy currentUser từ localStorage và fetch thông tin
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('user'));
        if (!stored) {
            navigate('/login');
            return;
        }

        axios.get(`${API_URL}/users/${stored.id}`)
            .then(res => {
                setForm({
                    name: res.data.name,
                    avatar: res.data.avatar || '',
                    phone: res.data.phone || ''
                });
            })
            .catch(err => {
                console.error('Lỗi khi load profile:', err);
                Swal.fire('Lỗi', 'Không thể tải thông tin cá nhân.', 'error');
            })
            .finally(() => setLoading(false));
    }, [navigate]);

    // Xử lý thay đổi input
    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    // Submit form
    const handleSubmit = async e => {
        e.preventDefault();
        const stored = JSON.parse(localStorage.getItem('user'));
        if (!stored) {
            navigate('/login');
            return;
        }

        try {
            await axios.patch(`${API_URL}/users/${stored.id}`, form);
            // Cập nhật localStorage
            localStorage.setItem('user', JSON.stringify({ ...stored, ...form }));

            Swal.fire('Thành công', 'Cập nhật thông tin thành công!', 'success').then(() => {
                navigate('/home');
            });
        } catch (err) {
            console.error('Lỗi khi cập nhật profile:', err);
            Swal.fire('Lỗi', 'Không thể cập nhật thông tin.', 'error');
        }
    };

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
                <Spinner animation="border" />
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <Card className="p-4 shadow-sm">
                        <Card.Title className="mb-4 text-center">Thông tin cá nhân</Card.Title>
                        <Form onSubmit={handleSubmit}>
                            {/* Avatar */}
                            <Form.Group className="mb-3" controlId="avatar">
                                <Form.Label>Avatar (URL hoặc Base64)</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="avatar"
                                    value={form.avatar}
                                    onChange={handleChange}
                                    placeholder="Nhập link ảnh hoặc chuỗi Base64"
                                />
                                {form.avatar && (
                                    <div className="text-center mt-2">
                                        <img
                                            src={form.avatar}
                                            alt="avatar preview"
                                            style={{ width: 100, height: 100, borderRadius: '50%' }}
                                        />
                                    </div>
                                )}
                            </Form.Group>

                            {/* Phone */}
                            <Form.Group className="mb-3" controlId="phone">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="tel"
                                    name="phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    placeholder="Nhập số điện thoại"
                                />
                            </Form.Group>

                            {/* Name */}
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label>Họ và tên</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>


                            <Button variant="primary" type="submit" className="w-100">
                                Lưu thay đổi
                            </Button>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileDetail;