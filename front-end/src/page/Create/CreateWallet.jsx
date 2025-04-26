import React, {useEffect, useState} from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Create.css';

const Create = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');
    const [variant, setVariant] = useState(''); // 'success' hoặc 'danger'
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            setUser(JSON.parse(stored));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title || !price) {
            setVariant('danger');
            setMessage('Vui lòng nhập đầy đủ thông tin!');

            return;
        }

        try {
            await axios.post('http://localhost:3000/wallets', {
                title,
                price: parseFloat(price),
                userId: user.id
            });

            setVariant('success');
            setMessage('Tạo ví thành công! Đang chuyển về trang chủ...');
            setTitle('');
            setPrice('');
            setTimeout(() => {
                navigate('/home');
            }, 2000);
        } catch (err) {
            console.error(err);
            setVariant('danger');
            setMessage('Tạo ví thất bại! Vui lòng thử lại.');
        }
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6}>
                    <h3 className="mb-4">Tạo ví mới</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Tên ví</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên ví"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPrice">
                            <Form.Label>Số tiền hiện có</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Nhập số tiền"
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Tạo ví
                        </Button>
                        <Button
                            variant="secondary"
                            className="ms-2"
                            onClick={() => navigate('/wallet')}
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

export default Create;
