import React, { useState } from 'react';
import styles from '../styles/CartItem.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus,faMinus, faTrash } from '@fortawesome/free-solid-svg-icons'
import {Snackbar,Alert} from '@mui/material';

const CartItem = ({item,handleAdd,handleDelete,handleMinus}) => {    

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpen(false);
    };

    return (
        <div className={styles.item}>
            <div className={styles.imageDiv}>
                    <img
                        src={process.env.REACT_APP_SERVER_URL + item?.picture}
                        className={styles.image}
                    />
            </div>

            <div className={styles.description}>
                <div className={styles.text}>
                    <div className={styles.name}>{item.name}</div>
                    <div className={styles.price}>₹{item.price} × {item.quantity}
                        <div className={styles.totalPrice}>
                            ₹{item.quantity*item.price}
                        </div>
                    </div>
                </div>
                <div className={styles.action}>

                    <FontAwesomeIcon className={styles.button} icon={faMinus} onClick={()=>handleMinus({item,handleOpen})} />
                    <FontAwesomeIcon className={styles.button} icon={faPlus} onClick={()=>handleAdd({item,handleOpen})} />
                    <FontAwesomeIcon className={styles.button} icon={faTrash} onClick={()=>handleDelete({item})} />
                    
                </div>
            </div>

            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Item updated!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default CartItem