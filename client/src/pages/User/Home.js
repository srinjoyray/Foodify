import { useEffect, useState } from 'react';
import {CircularProgress} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong } from '@fortawesome/free-solid-svg-icons'

import styles from '../../styles/Home.module.css'
import HomePic from '../../assets/Home.svg';
import RestaurantItem from '../../components/RestaurantItem';
import Footer from '../../components/Footer';
import BusinessLink from '../../components/BusinessLink';
// import { restaurants } from '../constants/restaurants';

import { getAllRestaurants } from '../../actions/seller';
import { Link } from 'react-router-dom';

export default function Home({userId,setUserId}) {
 
  const [restaurants,setRestaurants] = useState(null);
  
  useEffect(async() => {
    const data = await getAllRestaurants();
    setRestaurants(data);
  }, []);
  
  return (
    <div className={styles.home}>  
      
      <div className={styles.main}>
        
        <div className={styles.text}>
          <p className={styles.textHeading}></p>
          <p className={styles.textDescription}>Order food from favourite restaurants near you.</p>
          <Link to='/restaurant'>
            <button className={styles.button}>Find Restaurants</button>
          </Link>
        </div>

          
        <div className={styles.image}>
            <img
              src={HomePic}
              alt="Pic"
            />
        </div>
      </div>
      
      <div className={styles.restaurants}> 
        
        <h2 className={styles.restaurantHeading}>Featured restaurants</h2>
        {
          restaurants ? 
          <div className={styles.restaurantsGrid}>
            { 
              restaurants?.map((restaurant)=>(
                <RestaurantItem restaurant={restaurant} key={restaurant._id || restaurant.id} /> 
                ))
            }
          </div>
          :
          <CircularProgress style={{width:100,height:100,display:'flex',margin:'5rem auto'}}  />
        }
      
        <div className={styles.restaurantLink}> 
            <Link to='/restaurant'>
              <button className={styles.restaurantButton}>See all Restaurants <FontAwesomeIcon className={styles.buttonIcon} icon={faRightLong} /> </button>
            </Link>
        </div>
      </div>
      

      <BusinessLink/>
      <Footer/>
    </div>
  )
}
