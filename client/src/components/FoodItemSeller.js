import { useEffect, useState } from 'react';
import StarIcon from '@mui/icons-material/Star';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'

import styles from '../styles/FoodItemSeller.module.css'


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


const FoodItemSeller = ({item , handleDelete , setFoodItem , handleOpen }) => {
    const handleEdit = async() => {
        setFoodItem(item);
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
                
                <div className={styles.buttonDiv}>
                    <FontAwesomeIcon icon={faEdit} onClick={handleEdit} className={styles.button} />
                    <FontAwesomeIcon icon={faTrash} onClick={() => handleDelete(item._id)} className={styles.button} />
                </div>
               
            </div>
            
            <div className={styles.imageDiv}>
                <img
                    src={process.env.REACT_APP_SERVER_URL + item.picture}
                    alt="Pic"
                    className={styles.image}
                />
            </div>

        </div>
    )
}

export default FoodItemSeller
