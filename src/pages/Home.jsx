import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./Home.css";
function Home() {
    return (
        <>

            <div className="background-img" />
            <div className="greeting-text-container">
                <p className="greeting-text">อรุณสวัสดิ์ยามเช้า</p>
                <p className="greeting-text">คุณ user101</p>
            </div>
            <div className="profile" />

            <div className="container-menu">
            <Link to="/shakegame">
                <div className="menu">
                    <p className="menuText">เกมเขย่า</p>
                </div>
            </Link>
            <Link to="/dotgame">
                <div className="menu">
                    <p className="menuText">กดจุด</p>
                </div>
            </Link>
            <Link to="/">
                <div className="menu">
                    <p className="menuText">เกมวาด</p>
                </div>
            </Link>
            <Link to="/longestgame">
                <div className="menu">
                    <p className="menuText">เกมพูด</p>
                </div>
            </Link>
            </div>

        </>)

}
export default Home