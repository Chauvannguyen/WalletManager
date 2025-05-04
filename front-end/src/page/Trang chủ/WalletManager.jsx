import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Dropdown, NavLink, Card } from 'react-bootstrap';
import axios from 'axios';
import "./walletmanager.css";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../api/API';


const WalletManager = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [wallets, setWallets] = useState([]);

    // Lấy thông tin user từ localStorage
    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            setUser(JSON.parse(stored));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    // Fetch danh sách ví từ API
    useEffect(() => {
        const fetchWallets = async () => {
            try {
                const res = await axios.get(`${API_URL}/wallets`, {
                    params: { userId: user.id }
                });
                setWallets(res.data);
            } catch (err) {
                console.error('Lỗi khi fetch wallets:', err);
            }
        };
        if (user) fetchWallets();
    }, [user]);

    // Đăng xuất
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleProfileDetall = () => {
        navigate('/Profiledetall');
    };

    // Xóa ví
    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Bạn có chắc muốn xóa ví này?',
            text: 'Hành động này không thể hoàn tác!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`${API_URL}/wallets/${id}`);
                setWallets(wallets.filter(w => w.id !== id));
                Swal.fire('Đã xóa!', 'Ví đã được xóa thành công.', 'success');
            } catch (err) {
                console.error('Lỗi khi xóa ví:', err);
                Swal.fire('Lỗi!', 'Xóa ví thất bại.', 'error');
            }
        }
    };

    return (
        <Container fluid>
            {/* Header */}
            <Row className="bg-dark p-3 text-white align-items-center border-bottom">
                <Col>
                    <strong>Logo</strong>
                </Col>
                <Col className="text-end d-flex justify-content-end align-items-center gap-2">
                    <img
                        src={user?.avatar || 'https://cellphones.com.vn/sforum/wp-content/uploads/2023/11/avatar-dep-30.jpg'}
                        alt="avatar"
                        className="rounded-circle"
                        width="40"
                        height="40"
                    />
                    <Dropdown>
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            {user?.name || user?.email}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={handleProfileDetall}>Thông tin cá nhân</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/changepassword')}>Đổi mật khẩu</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/delete-account')}>Xóa tài khoản</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

            {/* Sidebar & Content */}
            <Row>
                <Col md={3} className="bg-light border-end vh-100 p-3">
                    <Card className="mb-3">
                        <Card.Body>
                            <NavLink to="/home" className="text-dark text-decoration-none d-block mb-3">
                                <h5>Quản lý ví</h5>
                            </NavLink>
                            <Button
                                variant="primary"
                                className="w-100 mb-3"
                                onClick={() => navigate('/create')}
                            >
                                Tạo ví mới
                            </Button>

                            {/* Các ví dưới dạng card bấm được */}
                            <div className="d-flex flex-column">
                                {wallets.map((w, idx) => (
                                    <Card
                                        key={w.id}
                                        className="mb-2"
                                        bg="light"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => navigate(`/ShowWallet/${w.id}`)}  /* chuyển đến trang detail */
                                    >
                                        <Card.Body>
                                            <Card.Title className="mb-1" style={{ fontSize:'15px',}}>
                                                {idx + 1}. {w.title}
                                            </Card.Title>
                                            <Card.Text className="text-muted small" style={{ fontSize:'15px', whiteSpace: 'normal', wordWrap: 'break-word' }}>
                                                <span className="d-block">Số tiền hiện có: {w.price.toLocaleString()} đ
                                                </span>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>

                                ))}
                                {wallets.length === 0 && (
                                    <Card>
                                        <Card.Body>
                                            <Card.Text className="text-center text-muted">
                                                Chưa có ví nào
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                )}
                            </div>
                        </Card.Body>
                    </Card>
                </Col>




                <Col md={9} className="p-4 main-content">
                    <Card>

                        <Card.Body>
                            <div className="d-flex justify-content-end mb-3">
                                <Button variant="primary" onClick={() => navigate('/create')}>
                                    Tạo ví mới
                                </Button>
                            </div>

                            <Table striped bordered hover responsive>
                                <thead>
                                <tr>
                                    <th style={{width: "1%"}}>STT</th>
                                    <th>Tên ví</th>
                                    <th style={{width: "20%"}}>Số tiền hiện có</th>
                                    <th style={{width: "15%"}}>Hành động</th>
                                </tr>
                                </thead>
                                <tbody>
                                {wallets.map((w, idx) => (
                                    <tr key={w.id}>
                                        <td>{idx + 1}</td>
                                        <td>{w.title}</td>
                                        <td>{w.price.toLocaleString()}</td>
                                        <td>
                                            <Button
                                                variant="warning"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => navigate(`/edit/${w.id}`)}
                                            >
                                                Sửa
                                            </Button>
                                            <Button
                                                variant="danger"
                                                size="sm"
                                                onClick={() => handleDelete(w.id)}
                                            >
                                                Xóa
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {wallets.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="text-center">Chưa có ví nào</td>
                                    </tr>
                                )}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Footer */}
            <Row className="bg-light text-center py-3 border-top">
                <Col>
                    <small>&copy; 2025 Ví cá nhân - All rights reserved.</small>
                </Col>
            </Row>
        </Container>
    );
};

export default WalletManager;
