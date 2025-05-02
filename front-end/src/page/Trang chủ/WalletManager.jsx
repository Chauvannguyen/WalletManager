import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import Header from "../../components/layout/Header.jsx";
import Sidebar from "../../components/layout/Sidebar.jsx";
import Content from "../../components/layout/Content.jsx";
import Footer from "../../components/layout/Footer.jsx";



const WalletManager = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [wallets, setWallets] = useState([]);

    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            setUser(JSON.parse(stored));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchWallets = async () => {
            try {
                const res = await axios.get(`http://localhost:3000/wallets?userId=${user.id}`);
                setWallets(res.data);
            } catch (err) {
                console.error('Lỗi khi fetch wallets:', err);
            }
        };
        if (user) {
            fetchWallets();
        }
    }, [user]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    };

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
            <Header user={user} onLogout={handleLogout} />
            <Row>
                <Col md={2} className="bg-light border-end vh-100 p-3">
                    <Sidebar />
                </Col>
                <Col md={10}>
                    <Content wallets={wallets} handleDelete={handleDelete} />
                </Col>
            </Row>
            <Footer />
        </Container>
    );
};

export default WalletManager;
