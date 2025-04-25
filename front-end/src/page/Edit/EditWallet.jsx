import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditWallet = () => {
    const { id } = useParams();  // Lấy id ví từ URL
    const [wallet, setWallet] = useState({ title: '', price: '' });
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState(''); // 'success' hoặc 'danger'
    const navigate = useNavigate();

    // Fetch ví hiện tại để chỉnh sửa
    useEffect(() => {
        const fetchWallet = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/wallets/${id}`);
                // Kiểm tra nếu ví không tồn tại
                if (!res.data) {
                    setVariant('danger');
                    setMessage('Không tìm thấy ví.');
                    return;
                }
                // Đảm bảo giá trị price là số
                setWallet({
                    title: res.data.title,
                    price: res.data.price.toString() // Chuyển price thành chuỗi để dễ chỉnh sửa trong input
                });
            } catch (err) {
                console.error('Lỗi khi tải dữ liệu ví:', err);
                setVariant('danger');
                setMessage('Không tìm thấy ví.');
            }
        };
        fetchWallet();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!wallet.title || !wallet.price) {
            setVariant('danger');
            setMessage('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        try {
            // Gửi yêu cầu cập nhật ví
            await axios.put(`http://localhost:3000/wallets/${id}`, {
                title: wallet.title,
                price: parseFloat(wallet.price), // Đảm bảo giá trị price là số thực
            });

            // Hiện thông báo
            setVariant('success');
            setMessage('Cập nhật ví thành công!');

            setTimeout(() => {
                navigate('/home');
            }, 1000);
        } catch (err) {
            console.error(err);
            setVariant('danger');
            setMessage('Cập nhật ví thất bại! Vui lòng thử lại.');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h3 className="mb-4">Sửa ví</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Tên ví</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên ví"
                                value={wallet.title}
                                onChange={(e) => setWallet({ ...wallet, title: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPrice">
                            <Form.Label>Số tiền hiện có</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Nhập số tiền"
                                value={wallet.price}
                                onChange={(e) => setWallet({ ...wallet, price: e.target.value })}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Cập nhật ví
                        </Button>
                        <Button
                            variant="secondary"
                            className="ms-2"
                            onClick={() => navigate('/home')}
                            type="button"
                        >
                            Hủy
                        </Button>
                    </Form>

                    {message && (
                        <Alert className="mt-3" variant={variant}>
                            {message}
                        </Alert>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default EditWallet;
