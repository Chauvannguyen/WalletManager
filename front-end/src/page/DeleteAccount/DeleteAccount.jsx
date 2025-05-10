
import axios from 'axios';
import Swal from 'sweetalert2';

const deleteAccount = async (currentUser, navigate) => {
    if (!currentUser) {
        Swal.fire('Lỗi', 'Bạn chưa đăng nhập!', 'error');
        return;
    }

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
            const walletsRes = await axios.get(`http://localhost:3000/wallets?userId=${currentUser.id}`);
            const wallets = walletsRes.data;
            for (let wallet of wallets) {
                await axios.delete(`http://localhost:3000/wallets/${wallet.id}`);
            }

            await axios.delete(`http://localhost:3000/users/${currentUser.id}`);
            localStorage.removeItem('user');

            await Swal.fire('Thành công', 'Tài khoản của bạn đã được xóa.', 'success');
            navigate('/login');

        } catch (error) {
            console.error('Lỗi khi xóa tài khoản:', error);
            Swal.fire('Lỗi', 'Không thể xóa tài khoản!', 'error');
        }
    }
};

export default deleteAccount;
