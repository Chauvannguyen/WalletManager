import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button, Form, Table } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../../api/API';

const ShowWallet = () => {
    const { id } = useParams();
    const [wallet, setWallet] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [form, setForm] = useState({ name: '', amount: '', date: '' });
    const [editingExpense, setEditingExpense] = useState(null);

    useEffect(() => {
        const fetchWallet = async () => {
            const res = await axios.get(`${API_URL}/wallets/${id}`);
            setWallet(res.data);
        };

        const fetchExpenses = async () => {
            const res = await axios.get(`${API_URL}/expenses`, {
                params: { walletId: id },
            });
            setExpenses(res.data);
        };

        fetchWallet();
        fetchExpenses();
    }, [id]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!form.name || !form.amount || !form.date) {
            Swal.fire('Lỗi', 'Vui lòng điền đầy đủ thông tin.', 'error');
            return;
        }

        const amount = parseInt(form.amount);

        try {
            if (editingExpense) {
                // Sửa
                const res = await axios.put(`${API_URL}/expenses/${editingExpense.id}`, {
                    ...form,
                    amount,
                    walletId: id,
                });

                const difference = amount - editingExpense.amount;
                const newPrice = wallet.price - difference;

                await axios.patch(`${API_URL}/wallets/${id}`, { price: newPrice });
                setWallet({ ...wallet, price: newPrice });

                setExpenses(expenses.map(e => e.id === editingExpense.id ? res.data : e));
                Swal.fire('Đã cập nhật khoản chi!', '', 'success');
            } else {
                // Thêm mới
                const res = await axios.post(`${API_URL}/expenses`, {
                    ...form,
                    amount,
                    walletId: id,
                });

                const newPrice = wallet.price - amount;
                await axios.patch(`${API_URL}/wallets/${id}`, { price: newPrice });
                setWallet({ ...wallet, price: newPrice });

                setExpenses([...expenses, res.data]);
                Swal.fire('Đã thêm khoản chi!', '', 'success');
            }

            setForm({ name: '', amount: '', date: '' });
            setEditingExpense(null);
        } catch (err) {
            console.error(err);
            Swal.fire('Lỗi', 'Không thể xử lý.', 'error');
        }
    };

    const handleEdit = (expense) => {
        setForm({
            name: expense.name,
            amount: expense.amount.toString(),
            date: expense.date,
        });
        setEditingExpense(expense);
    };

    const handleDelete = async (expenseId) => {
        const result = await Swal.fire({
            title: 'Bạn có chắc muốn xóa khoản chi?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy'
        });

        if (result.isConfirmed) {
            try {
                const deleted = expenses.find(e => e.id === expenseId);
                await axios.delete(`${API_URL}/expenses/${expenseId}`);

                const newPrice = wallet.price + deleted.amount;
                await axios.patch(`${API_URL}/wallets/${id}`, { price: newPrice });
                setWallet({ ...wallet, price: newPrice });

                setExpenses(expenses.filter(e => e.id !== expenseId));
                Swal.fire('Đã xóa!', '', 'success');
            } catch (err) {
                console.error(err);
                Swal.fire('Lỗi', 'Không thể xóa.', 'error');
            }
        }
    };

    if (!wallet) return <p>Đang tải...</p>;

    return (
        <Container className="py-4">
            <Card className="mb-4">
                <Card.Body>
                    <h3>{wallet.title}</h3>
                    <p>Số tiền hiện có: <strong>{wallet.price.toLocaleString()} đ</strong></p>
                </Card.Body>
            </Card>

            <Card className="mb-4">
                <Card.Body>
                    <h5>{editingExpense ? 'Sửa khoản chi' : 'Thêm khoản chi'}</h5>
                    <Form>
                        <Form.Group className="mb-2">
                            <Form.Label>Tên khoản chi</Form.Label>
                            <Form.Control
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Số tiền</Form.Label>
                            <Form.Control
                                name="amount"
                                type="number"
                                value={form.amount}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Form.Group className="mb-2">
                            <Form.Label>Ngày chi</Form.Label>
                            <Form.Control
                                name="date"
                                type="date"
                                value={form.date}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        <Button onClick={handleSubmit}>
                            {editingExpense ? 'Cập nhật' : 'Thêm'}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>

            <Card>
                <Card.Body>
                    <h5>Danh sách khoản chi</h5>
                    <Table bordered hover>
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên khoản chi</th>
                            <th>Số tiền</th>
                            <th>Ngày</th>
                            <th>Hành động</th>
                        </tr>
                        </thead>
                        <tbody>
                        {expenses.map((e, idx) => (
                            <tr key={e.id}>
                                <td>{idx + 1}</td>
                                <td>{e.name}</td>
                                <td>{e.amount.toLocaleString()} đ</td>
                                <td>{e.date}</td>
                                <td>
                                    <Button size="sm" variant="warning" onClick={() => handleEdit(e)} className="me-2">Sửa</Button>
                                    <Button size="sm" variant="danger" onClick={() => handleDelete(e.id)}>Xóa</Button>
                                </td>
                            </tr>
                        ))}
                        {expenses.length === 0 && (
                            <tr>
                                <td colSpan="5" className="text-center">Chưa có khoản chi</td>
                            </tr>
                        )}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ShowWallet;
