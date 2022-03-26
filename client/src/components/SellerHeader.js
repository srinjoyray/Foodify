import { style } from '@mui/system';
import { Link } from 'react-router-dom'
import styles from '../styles/SellerHeader.module.css'

const SellerHeader = ({seller,setSeller}) => {

    const handleLogout = ()=>{
        localStorage.removeItem('seller');
        setSeller(null);
    }

    return (
        <div className={styles.header}>
            <Link to="/seller">
                <div className={styles.brand}>
                    FOODIFY Business
                </div>
            </Link>
            <div className={styles.items}>
                {
                    seller ?
                    <button onClick={handleLogout} className={styles.button}>
                        Logout
                    </button>
                    :     
                    <Link to='/seller/auth'>
                        <button className={styles.button}>
                            Login
                        </button>
                    </Link>
                }
            </div>
        </div>
    )
}

export default SellerHeader
