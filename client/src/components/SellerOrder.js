import React, { useEffect, useState } from 'react'
import {CircularProgress} from '@mui/material';
import { getOrdersBySellerId } from '../actions/order';
import styles from '../styles/SellerOrder.module.css';
import SellerOrderItem from './SellerOrderItem';
const SellerOrder = ({seller,setSeller}) => {
    const [orders,setOrders] = useState(null);
    
    useEffect(async()=>{
        const order = await getOrdersBySellerId(seller?._id);
        setOrders(order);
    },[]);
    console.log(orders);
    return (
        <>
            {
                orders ? 
                <div className={styles.orders}>
                    
                    {
                        orders?.map((order)=>
                        <SellerOrderItem order={order} key={order?._id} setOrders={setOrders} />
                        )
                    }
                    
                

                </div>
                :    
                <CircularProgress style={{width:100,height:100,display:'flex',margin:'5rem auto'}}  />
            }

        </>
    )
}

export default SellerOrder