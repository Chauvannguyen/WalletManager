import WalletManager from './page/Trang chủ/WalletManager.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, Router, Routes} from "react-router";
import Login from "./page/Login/Login.jsx";
import Register from "./page/Register/register.jsx";
import CreateWallet from "./page/Create/CreateWallet.jsx";


function App() {
    return (
        <>
            <Routes>
                <Route path="/Login" element={<Login />} />
                 <Route path="/register" element={<Register />} />
                 <Route path="/home" element={<WalletManager />} />
                <Route path="/create" element={<CreateWallet />} />
            </Routes>
        </>
    );
}


export default App;
