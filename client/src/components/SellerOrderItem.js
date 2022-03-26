import React, { useEffect, useState } from 'react'
import {Snackbar,Alert} from '@mui/material';
import { getOrdersBySellerId, updateStatus } from '../actions/order';
import { getRestaurantById } from '../actions/seller';
import styles from '../styles/SellerOrderItem.module.css';

const SellerOrderItem = ({order,setOrders}) => {
    const [restaurant,setRestaurant] = useState();

    const [open, setOpen] = useState(false);
    const [status,setStatus] = useState('');
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    useEffect(async()=>{
        const data = await getRestaurantById(order?.sellerId);
        setRestaurant(data);
    },[])
    const handleStatus = async() => {
        const data = await updateStatus(order._id);
        setStatus(order.nextStatus);
        const orderData = await getOrdersBySellerId(order.sellerId);
        setOrders(orderData);
        handleClick();
    }
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

                                    index === 0 ? <span key={index}>{item?.quantity} × {item?.name}</span>
                                    :
                                    <span key={index}> , {item?.quantity} × {item?.name}</span>
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
                {!order.isDelivered && 
                    <button className={styles.button} onClick={handleStatus}>{order.nextStatus}</button>
                }
                <span className={styles.status}>{order.currentStatus}</span>
            </div>

            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {status}!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default SellerOrderItem