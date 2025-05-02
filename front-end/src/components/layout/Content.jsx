import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Content = ({ wallets, handleDelete }) => {
    const navigate = useNavigate();

    return (
        <div className="p-3">
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
        </div>
    );
};

export default Content;
