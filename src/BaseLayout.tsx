
import { Outlet} from "react-router-dom";
import styles from './BaseLayout.module.css'
import Header from "./components/header/header.tsx";
import Navbar from "./components/navbar/navbar.tsx";

function BaseLayout() {


    return (
        <>
            <Header/>
            <Navbar/>
            <main className={styles.content}>
                <Outlet />
            </main>
        </>
    );
}




export default BaseLayout;