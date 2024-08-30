import React, { useState } from 'react';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        onLogin(username);  // 로그인 상태 설정
        navigate('/');      // 로그인 후 메인 페이지로 이동
    };

    return (
        <div className="login-container">
            <h1 className="login-title">Login Page</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <div>
                    <label className="login-label">Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="login-input"
                    />
                </div>
                <div>
                    <label className="login-label">Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="login-input"
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
}

export default Login;
