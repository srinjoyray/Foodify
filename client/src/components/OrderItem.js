import React, { useEffect, useState } from 'react'
import { getRestaurantById } from '../actions/seller';
import styles from '../styles/OrderItem.module.css';

const OrderItem = ({order}) => {
    const [restaurant,setRestaurant] = useState();
    useEffect(async()=>{
        const data = await getRestaurantById(order?.sellerId);
        setRestaurant(data);
    },[])
    return (
        <div className={styles.order}>
            <div className={styles.restaurantRow}>
                <div className={styles.restaurantDetails}>
                    <img
                        src={process.env.REACT_APP_SERVER_URL + restaurant?.coverPhoto}
                        alt="Pic"
                        width={100}
                        height={100}
                        className={styles.thumbnail}
                    />
                    <span className={styles.name}>{restaurant?.restaurantName}</span>
                </div>
                <span className={styles.price}>₹{order?.price}</span>
            </div>
            <div className={styles.detailsRow}>
                <p className={styles.label}>Items</p>
                <div className={styles.items}>
                    {
                        order?.items?.map((item,index)=>
                            { 
                                return(

                                    index === 0 ? <span>{item?.quantity} × {item?.name}</span>
                                    :
                                    <span> , {item?.quantity} × {item?.name}</span>
                                )
                            }
                        )
                    }
                </div>
                <p className={styles.label}>Ordered on</p>
                <div className={styles.time}>
                    {new Date(Date.parse(order?.time))?.toLocaleString('en-in', { weekday:"short", year:"numeric", month:"short", day:"numeric", hour: 'numeric',minute: 'numeric', second: 'numeric' , hour12 : false}) }
                </div>
            </div>
            <div className={styles.statusRow}>
                <span className={styles.status}>{order.currentStatus}</span>
            </div>
        </div>
    )
}

export default OrderItem