import React from 'react';
import { Table } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const Sidebar = () => (
    <Table bordered hover size="sm">
        <tbody>
        <tr>
            <td>
                <NavLink
                    to="/home"
                    className={({ isActive }) =>
                        `d-block text-decoration-none px-2 py-1 rounded ${
                            isActive ? 'bg-secondary text-white' : 'text-dark'
                        }`
                    }
                >
                    Quản lý ví
                </NavLink>
            </td>
        </tr>
        <tr>
            <td>
                <NavLink
                    to="/CreateWallet"
                    className={({ isActive }) =>
                        `d-block text-decoration-none px-2 py-1 rounded ${
                            isActive ? 'bg-secondary text-white' : 'text-dark'
                        }`
                    }
                >
                    Tạo ví mới
                </NavLink>
            </td>
        </tr>
        </tbody>
    </Table>
);

export default Sidebar;
