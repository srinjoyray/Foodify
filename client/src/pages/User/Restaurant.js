import { useEffect, useState } from 'react';
import {CircularProgress} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { getAllRestaurants, getRestaurantsBySearch } from '../../actions/seller';
import RestaurantItem from '../../components/RestaurantItem';
import styles from '../../styles/Restaurant.module.css'
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const Restaurant = ({userId,setUserId}) => {
    const [restaurants,setRestaurants] = useState(null);

    useEffect(async() => {
      const data = await getAllRestaurants();
      setRestaurants(data);
    }, []);


    const handleSearch = async(e) => {
        if(e.target.value === ''){
            const data = await getAllRestaurants();
            setRestaurants(data);
        }
        else{
            const data = await getRestaurantsBySearch(e.target.value);
            setRestaurants(data);
        }
    }
    console.log(restaurants);
    return (
        <div className={styles.restaurant} >
            <div className={styles.page}>

                <div className={styles.searchItem}>
                    <div className={styles.searchBox}>
                        <input type="text" className={styles.searchInput}
                            placeholder="Search Restaurant"
                            onChange={(e)=>handleSearch(e)}
                        />
                        <SearchIcon className={styles.searchIcon} />
                    </div>
                    
                </div>
            
                <div className={styles.body}>
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
                </div>
            
            </div>
            <Footer />
            
        </div>
    )
}

export default Restaurant
