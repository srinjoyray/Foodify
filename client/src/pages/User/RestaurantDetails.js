import { useEffect, useState } from 'react';
import { Link, useParams} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import {CircularProgress} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong } from '@fortawesome/free-solid-svg-icons'
// import { restaurantDetails } from "../../constants/restaurantDetails"
import styles from '../../styles/RestaurantDetails.module.css'
import FoodItem from '../../components/FoodItem';
import { getRestaurantById, getRestaurantItems, getRestaurantItemsBySearch } from '../../actions/seller';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const RestaurantDetails = ({userId,setUserId}) => {
    const {id} = useParams();
    const [restaurant,setRestaurant] = useState(null);
    const [foodItems , setFoodItems] = useState(null);

    useEffect(async() => {
        const data = await getRestaurantById(id);
        setRestaurant(data);
        setFoodItems(data.foodItems);
    }, []);

    const handleSearch = async(search) => {
        if(search === ''){
            const data = await getRestaurantItems(id);
            setFoodItems(data);
        }
        else{
            const data = await getRestaurantItemsBySearch({id,search});
            setFoodItems(data);
        }
    }

    return (
        <div className={styles.restaurantDetails}>
            <div className={styles.body}>
                {
                    restaurant ? 
                    <div className={styles.description}>
                        <div className={styles.textDescription}>
                            <h3>{restaurant?.restaurantName}</h3>
                            <p className={styles.cuisine}>{restaurant?.cuisine}</p>
                            <p className={styles.cost}>₹{restaurant?.costForTwo} for two</p>
                            <p>Address: {restaurant?.address}</p>
                            <p>Phone: +91 {restaurant?.phone}</p>
                        </div>

                        <img
                            src={process.env.REACT_APP_SERVER_URL + restaurant?.coverPhoto}
                            alt="Pic"
                            width={400}
                            height={400}
                            className={styles.thumbnail}
                        />
                    </div>
                    :
                    <div className={styles.loader}>
                        <CircularProgress style={{width:100,height:100,display:'flex',margin:'5rem auto'}}  />
                    </div>
                }

                <div className={styles.searchItem}>
                    <div className={styles.searchBox}>
                        <input type="text" className={styles.searchInput}
                            placeholder="Search Items"
                            onChange={(e)=>handleSearch(e.target.value)}
                        />
                        <SearchIcon className={styles.searchIcon} />
                    </div>
                    
                </div>
                
                {
                    foodItems ? 
                    <div className={styles.itemGrid}>
                        {
                            foodItems?.map((item)=>(
                            <FoodItem item={item} key={item?._id} userId={userId} sellerId={restaurant?._id}/> 
                            ))
                        }
                    </div>
                    :
                    <CircularProgress style={{width:100,height:100,display:'flex',margin:'5rem auto'}}  />      
                }
                
                <Link to="/cart">
                    <button className={styles.button}>
                        Go to Cart 
                        <FontAwesomeIcon className={styles.buttonIcon} icon={faRightLong} />
                    </button>
                </Link>
            </div>
            <Footer />
        </div>
    )
}

export default RestaurantDetails