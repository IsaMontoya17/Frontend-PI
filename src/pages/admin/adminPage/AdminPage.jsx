import HeaderAdmin from '../../../components/headerAdmin/HeaderAdmin';
import Sidebar from '../../../components/sidebar/Sidebar';
import styles from './AdminPage.module.css';

const AdminPage = ({ children }) => {
    return (
        <div className={styles.adminLayout}>
            <HeaderAdmin />
            <div className={styles.adminBody}>
                <Sidebar />
                <main className={styles.adminContent}>
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminPage;
