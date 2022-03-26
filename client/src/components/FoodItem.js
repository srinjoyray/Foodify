import { useEffect, useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {Snackbar,Alert} from '@mui/material';

import styles from '../styles/FoodItem.module.css'
import { useHistory } from 'react-router-dom';
import { addToCart } from '../actions/user';

const Badge = ({veg}) =>{
    return(
        <>
            {
                veg ? 
                <FiberManualRecordIcon  className={styles.vegBadge}/>
                :
                <FiberManualRecordIcon  className={styles.nonVegBadge}/>
            }
        </>
    )
}

const Speciality = () => (
    <div className={styles.speciality}>
        <StarIcon className={styles.starIcon}/> Speciality
    </div>
)


const FoodItem = ({item,userId,sellerId}) => {
    // console.log(item);
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

    const history = useHistory();

    const handleAddCart = async() => {
       
        if(!userId){
            history.push('/auth');
            return;
        }
        const cartItem = {name : item.name , price : item.price , veg : item.veg , speciality : item.speciality , picture : item.picture , foodId : item._id  , userId : userId , sellerId  };
        await addToCart(cartItem);

        handleOpen();
    }
    return (
        <div className={styles.item}>
            
            <div className={styles.description}>
                <div className={styles.badge}>
                    <Badge veg={item.veg} />
                    {
                        item.speciality ? <Speciality/> : null
                    }
                </div>
                <div className={styles.text}>
                    <div className={styles.name}>{item.name}</div>
                    <div className={styles.price}>₹{item.price}</div>
                </div>

                <button className={styles.addButton} onClick={handleAddCart}>Add <AddIcon className={styles.addButtonIcon} /></button>
            </div>
            
            <div className={styles.imageDiv}>
                <img
                    src={process.env.REACT_APP_SERVER_URL + item.picture}
                    alt="Pic"
                    className={styles.image}
                />
            </div>

            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Item added to cart!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default FoodItem
