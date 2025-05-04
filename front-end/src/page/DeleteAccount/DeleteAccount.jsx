import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const DeleteAccount = () => {
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));
    const navigate = useNavigate();

    // Hàm xóa tài khoản
    const handleDeleteAccount = async () => {
        if (!currentUser) {
            Swal.fire('Lỗi', 'Bạn chưa đăng nhập!', 'error');
            return;
        }

        // Xác nhận xóa tài khoản
        const confirmDelete = await Swal.fire({
            title: 'Bạn có chắc muốn xóa tài khoản?',
            text: 'Tất cả dữ liệu liên quan đến tài khoản này sẽ bị xóa vĩnh viễn!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xóa',
            cancelButtonText: 'Hủy',
        });

        if (confirmDelete.isConfirmed) {
            try {
                // Xóa ví của người dùng
                const walletsRes = await axios.get(`http://localhost:3000/wallets?userId=${currentUser.id}`);
                const wallets = walletsRes.data;
                for (let wallet of wallets) {
                    await axios.delete(`http://localhost:3000/wallets/${wallet.id}`);
                }

                // ✅ Xóa tài khoản
                await axios.delete(`http://localhost:3000/users/${currentUser.id}`);


                localStorage.removeItem('user');
                Swal.fire('Thành công', 'Tài khoản của bạn đã được xóa.', 'success').then(() => {
                    navigate('/login');
                });



            } catch (error) {
                console.error('Lỗi khi xóa tài khoản:', error);
                Swal.fire('Lỗi', 'Không thể xóa tài khoản!', 'error');
            }
        }
    };

    return (
        <div className="delete-account">
            <h2>Xóa tài khoản</h2>
            <button onClick={handleDeleteAccount} className="btn btn-danger">
                Xóa tài khoản
            </button>
        </div>
    );
};

export default DeleteAccount;
