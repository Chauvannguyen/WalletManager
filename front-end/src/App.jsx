import React from 'react';
import WalletManager from './page/Trang chủ/WalletManager.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './page/Login/Login.jsx';
import Register from './page/Register/register.jsx';
import CreateWallet from './page/Create/CreateWallet.jsx';
import EditWallet from "./page/Edit/EditWallet.jsx";
import ProfileDetall from "./page/profiledetall/Profiledetall.jsx";
import ChangePassword from "./page/ChangePassword/ChangePassword.jsx";
import DeleteAccount from "./page/DeleteAccount/DeleteAccount.jsx";
import ShowWallet from "./page/ShowWallet/ShowWallet.jsx";


function App() {
    return (
        <>
            <Routes>

                <Route path="/" element={<Navigate to="/login" replace/>}/>

                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/home" element={<WalletManager/>}/>
                <Route path="/create" element={<CreateWallet/>}/>
                <Route path="/edit/:id" element={<EditWallet/>}/>
                <Route path="/ProfileDetall" element={<ProfileDetall/>}/>
                <Route path="/changepassword" element={<ChangePassword />} />
                <Route path="/delete-account" element={<DeleteAccount />} />
                {/*<Route path="/showWallet" element={<ShowWallet />} />*/}
                <Route path="/showWallet/:id" element={<ShowWallet />} />



            </Routes>
        </>
    );
}

export default App;
