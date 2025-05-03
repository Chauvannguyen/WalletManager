import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import "./walletmanager.css";
import Swal from 'sweetalert2';
import {NavLink, useNavigate} from "react-router";
import {API_URL} from "../../api/API";

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

                console.log(user);
                const res = await axios.get('http://localhost:3000/wallets?userId=' + user.id);

                // const res = await axios.get(`${API_URL}/wallets`);

                setWallets(res.data);
            } catch (err) {
                console.error('Lỗi khi fetch wallets:', err);
            }
        };
        if(user){
            fetchWallets();
        }

    }, [user]);

    // Đăng xuất
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
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
                await axios.delete(`http://localhost:3000/wallets/${id}`);
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
            <Row className="bg-light p-2 align-items-center border-bottom">
                <Col><strong>Logo</strong></Col>
                <Col className="text-end d-flex justify-content-end align-items-center gap-2">
                    <img
                        src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/11/avatar-dep-30.jpg"
                        alt="avatar"
                        className="rounded-circle"
                        width="40"
                        height="40"
                    />
                    <Dropdown>
                        <Dropdown.Toggle variant="light" id="dropdown-basic">
                            {user?.name || user?.email || 'Người dùng'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#">Cài đặt</Dropdown.Item>
                            <Dropdown.Item href="#">Thông tin cá nhân</Dropdown.Item>
                            <Dropdown.Item onClick={handleLogout}>Đăng xuất</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

            {/* Sidebar & Content */}
            <Row>
                <Col md={2} className="bg-light border-end vh-100 p-3">
                    <Table bordered hover size="sm">
                        <tbody>
                        <tr className="bg-primary text-white">
                            <td>
                                <NavLink to="/home" className="text-white text-decoration-none d-block">
                                    Quản lý ví
                                </NavLink>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <a href="#" onClick={() => navigate('/CreateWallet')}
                                   className="text-dark text-decoration-none d-block">
                                    Tạo ví mới
                                </a>
                            </td>
                        </tr>
                        </tbody>
                    </Table>
                </Col>

                <Col md={10} className="p-3 main-content">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5>Quản lý ví</h5>
                        <Button variant="primary" onClick={() => navigate('/create')}>
                            Tạo ví
                        </Button>
                    </div>

                    <Table striped bordered hover>
                        <thead>
                        <tr>
                            <th style={{ width: "1%" }}>STT</th>
                            <th>Tên ví</th>
                            <th style={{ width: "20%" }}>Số tiền hiện có</th>
                            <th style={{ width: "11%" }}>Hành động</th>
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
                                        variant="secondary"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => navigate(`/edit/${w.id}`)}  // Điều hướng đến trang sửa ví
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
