import React from 'react';
import { Row, Col, Dropdown } from 'react-bootstrap';

const Header = ({ user, onLogout }) => (
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
                    <Dropdown.Item onClick={onLogout}>Đăng xuất</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Col>
    </Row>
);

export default Header;
