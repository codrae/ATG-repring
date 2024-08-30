import React, { useState } from "react";
import '../styles/Header.css';
import logo from '../assets/logo.png';
import logo2 from '../assets/logo2.png';
import {Link, useNavigate} from "react-router-dom";
import Modal from "../hook/Modal.jsx"; // 모달 컴포넌트 임포트

const Header = ({ isLoggedIn, username, onLogout}) => {
    const [modalVisible, setModalVisible] = useState(false);

    const handleLogoClick = () => {
        //onResetContent();  Content 상태 초기화
        winodw.location.reload();
    };

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    const handleLogout = () => {
        setModalVisible(false);
        onLogout();
    };

    return (
        <header className="header">
            <div className="header-left">
                <img src={logo} alt="ATG Logo" className="logo" />
                <img src={logo2} alt="SIMMTECH Logo" className="logo" />
            </div>
            <Link to="/" onClick={handleLogoClick}>
                <h2 id="headerMain">SIMMTECH Monitoring</h2>
            </Link>

            <div className="header-right">
                {isLoggedIn ? (
                    <div className="user-menu">
                        <span className="user-name" onClick={toggleModal}>
                            Hello, {username}
                        </span>
                        <span className="notification-icon">🔔</span> {/* 알림 아이콘 */}
                    </div>
                ) : (
                    <Link to="/Login">로그인</Link>
                )}
            </div>

            {/* 모달 표시 */}
            <Modal show={modalVisible} onClose={toggleModal} onLogout={handleLogout} />
        </header>
    );
}

export default Header;
