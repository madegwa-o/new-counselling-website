import { Route, Routes } from "react-router-dom";
import styles from './BaseLayout.module.css';
import Header from "./components/header/header.tsx";
import Navbar from "./components/navbar/navbar.tsx";
import Login from "./pages/login/login.tsx";
import HomePage from "./pages/home/homePage.tsx";

function BaseLayout() {
    return (
        <>
            <Header />
            <Navbar />
            <main className={styles.content}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </main>
        </>
    );
}

export default BaseLayout;
