import { Link } from 'react-router-dom';
import styles from '../styles/Link.module.css'

const UserLink = () => {
    return (
        <div className={styles.business}>
            <div className={styles.header}>
                Foodify
            </div>
            <div className={styles.description}>
            Order food from favourite restaurants near you.
            </div>
            <Link to="/">
                <button className={styles.button}>
                    Get started
                </button>
            </Link>
            
        </div>
    )
}

export default UserLink

