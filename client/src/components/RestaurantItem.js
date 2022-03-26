import { Link } from 'react-router-dom';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import styles from '../styles/RestaurantItem.module.css'



const RestaurantItem = ({restaurant}) => {
    // console.log(restaurant);
    return (
        <>
            
            <Card sx={{ maxWidth: 360 , minWidth:320}} className={styles.card}>
                <CardMedia
                    component="img"
                    alt="Food Pic"
                    height="200"
                    
                    src={process.env.REACT_APP_SERVER_URL + restaurant?.coverPhoto}
                    
                />
                <CardContent className={styles.content}>
                    <div className={styles.title}>
                        {restaurant.restaurantName}
                    </div>
                    <div className={styles.description}>
                        <span>{restaurant.cuisine}</span>
                        <span>₹{restaurant.costForTwo} for two</span>
                    </div>
                </CardContent>
                <div className={styles.buttonDiv}>
                    <Link to={`/restaurant/${restaurant._id}`}>
                        <button className={styles.button}>Order Now</button>
                    </Link>
                </div>
            </Card>
        </>
        
    )
}

export default RestaurantItem

