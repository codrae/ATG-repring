import React, {useEffect, useState} from "react";
import './App.css';
import Header from "./layout/Header.jsx";
import Content from "./layout/Content.jsx";
import Footer from "./layout/Footer.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import axios from "axios";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [username, setUsername] = useState('Yong');
    const [selectedProcess, setSelectedProcess] = useState(""); // Content 상태 관리

    // 백엔드 연결 테스트
    const [hello, setHello] = useState('');

    useEffect(() => {
        axios.get('/api/test')
            .then((res) => {
                setHello(res.data);
            })  .catch((error) => {
            console.error("There was an error making the request!", error);
        });
    }, []);


    const handleLogin = (username) => {
        setIsLoggedIn(true);
        setUsername(username);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername('');
    };

    const handleResetContent = () => {
        setSelectedProcess(""); // Content 상태 초기화
    };

    return (
        <BrowserRouter>
            <Header isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout}
                    onResetContent={handleResetContent}/>
            
            <hr/>
                <h1>백엔드 연결 검증</h1>
            <div className={'App'}>
                백엔드 데이터 : {hello} </div>

            <Routes>
                <Route path="/"
                       element={<Content selectedProcess={selectedProcess} setSelectedProcess={setSelectedProcess}
                                         isLoggedIn={isLoggedIn}/>}/>
                <Route path="/Login" element={<Login onLogin={handleLogin}/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    );
}

export default App;
