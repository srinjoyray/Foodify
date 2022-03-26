import { Link } from 'react-router-dom';
import styles from '../styles/Link.module.css'

const BusinessLink = () => {
    return (
        <div className={styles.business}>
            <div className={styles.header}>
                Foodify for Business
            </div>
            <div className={styles.description}>
            Get listed on India's leading online food delivery marketplace today.
            </div>
            <Link to="/seller">
                <button className={styles.button}>
                    Get started
                </button>
            </Link>
            
        </div>
    )
}

export default BusinessLink

