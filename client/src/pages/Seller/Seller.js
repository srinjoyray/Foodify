import { Link } from 'react-router-dom';
import SellerHeader from '../../components/SellerHeader';
import styles from '../../styles/Seller.module.css'
import Footer from '../../components/Footer';
// import BurgerPic from '../../assets/Burger.jpg';
import BurgerPic from '../../assets/Burger2.png';
import UserLink from '../../components/UserLink';
const Seller = ({seller,setSeller}) => {
    return (
        <div className={styles.seller}>
            <SellerHeader seller={seller} setSeller={setSeller} />
            <div className={styles.body}>
                
                <div className={styles.main}>
                    <h3>Partner with Foodify</h3>
                    <p>Get listed on India's leading online food delivery marketplace today</p>
                    
                    <div className={styles.link}>
                        <Link to="/seller/dashboard" >
                            <button className={styles.button}>Go to Dashboard</button>    
                        </Link>
                    </div>
                </div>
                
                <div className={styles.imageDiv}>
                    <img 
                        src={BurgerPic}
                        className={styles.image}
                        />
                </div>

            </div>
            <UserLink />
            <Footer />
        
        </div>
    )
}

export default Seller

