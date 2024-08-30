import React from "react";
import '../styles/Modal.css';

const Modal = ({ show, onClose, onLogout }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>로그아웃 하시겠습니까?</h3>
                <button className="modal-button" onClick={onLogout}>로그아웃</button>
                <button className="modal-button" onClick={onClose}>취소</button>
            </div>
        </div>
    );
};

export default Modal;
