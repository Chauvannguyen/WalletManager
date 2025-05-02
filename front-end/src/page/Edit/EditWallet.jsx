import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditWallet = () => {
    const { id } = useParams(); // ID ví
    const [wallet, setWallet] = useState({ title: '', price: '', userId: null });
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState('');
    const navigate = useNavigate();

    // Load thông tin ví
    useEffect(() => {
        const fetchWallet = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/wallets/${id}`);
                if (res.data) {
                    setWallet({
                        title: res.data.title,
                        price: res.data.price.toString(),
                        userId: res.data.userId // giữ lại userId khi cập nhật
                    });
                } else {
                    setVariant('danger');
                    setMessage('Không tìm thấy ví.');
                }
            } catch (error) {
                console.error('Lỗi khi lấy ví:', error);
                setVariant('danger');
                setMessage('Không tìm thấy ví.');
            }
        };

        fetchWallet();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setWallet({ ...wallet, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!wallet.title.trim() || !wallet.price.trim()) {
            setVariant('danger');
            setMessage('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        try {
            await axios.put(`http://localhost:3000/wallets/${id}`, {
                title: wallet.title.trim(),
                price: parseFloat(wallet.price),
                userId: wallet.userId // giữ lại userId khi cập nhật
            });

            setVariant('success');
            setMessage('Cập nhật ví thành công!');
            setTimeout(() => navigate('/home'), 1000);
        } catch (error) {
            console.error('Lỗi khi cập nhật ví:', error);
            setVariant('danger');
            setMessage('Cập nhật thất bại!');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h3 className="mb-4">Chỉnh sửa ví</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Tên ví</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                placeholder="Nhập tên ví"
                                value={wallet.title}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPrice">
                            <Form.Label>Số tiền</Form.Label>
                            <Form.Control
                                type="number"
                                name="price"
                                placeholder="Nhập số tiền"
                                value={wallet.price}
                                onChange={handleChange}
                                min="0"
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Cập nhật
                        </Button>
                        <Button variant="secondary" className="ms-2" onClick={() => navigate('/home')}>
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
