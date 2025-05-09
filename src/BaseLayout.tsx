
import { Outlet} from "react-router-dom";
import styles from './BaseLayout.module.css'
import Header from "./components/header/header.tsx";

function BaseLayout() {


    return (
        <>
            <Header/>
            <main className={styles.content}>
                <Outlet />
            </main>
        </>
    );
}




export default BaseLayout;