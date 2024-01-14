import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import "./Home.css";
import { initializeApp } from "firebase/app";
import { getAnalytics, logEvent } from "firebase/analytics";
function Home() {
    const firebaseConfig = {
        apiKey: "AIzaSyD0YPFk2JTtrT8HG8uGb8s2V1AfI4P7-dA",
        authDomain: "lhdemo-4d7dd.firebaseapp.com",
        projectId: "lhdemo-4d7dd",
        storageBucket: "lhdemo-4d7dd.appspot.com",
        messagingSenderId: "41015206470",
        appId: "1:41015206470:web:19c26d967ca4d4bb376047",
        measurementId: "G-ZHQ55X16NC"
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

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
                <div className="menu" onClick={() => logEvent(analytics, "shakegame")}>
                    <p className="menuText">เกมเขย่า</p>
                </div>
            </Link>
            <Link to="/dotgame">
                <div className="menu" onClick={() => logEvent(analytics, "dotgame")}>
                    <p className="menuText">กดจุด</p>
                </div>
            </Link>
            <Link to="/drawing" onClick={() => logEvent(analytics, "drawing")}>
                <div className="menu">
                    <p className="menuText">เกมวาด</p>
                </div>
            </Link>
            <Link to="/longestgame" onClick={() => logEvent(analytics, "longestgame")}>
                <div className="menu">
                    <p className="menuText">เกมพูด</p>
                </div>
            </Link>
            </div>

        </>)

}
export default Home