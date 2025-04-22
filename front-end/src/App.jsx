import React from 'react';
import WalletManager from './page/Trang chủ/WalletManager.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './page/Login/Login.jsx';
import Register from './page/Register/register.jsx';
import CreateWallet from './page/Create/CreateWallet.jsx';

function App() {
    return (
        <>
            <Routes>

                <Route path="/" element={<Navigate to="/login" replace />} />

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<WalletManager />} />
                <Route path="/create" element={<CreateWallet />} />
            </Routes>
        </>
    );
}

export default App;
