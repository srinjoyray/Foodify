import { useEffect, useState } from 'react';
import {CircularProgress} from '@mui/material';
import styles from '../styles/SellerProfile.module.css';
import {Snackbar,Alert} from '@mui/material';
import { addFood, deleteFood, getRestaurantById, updateFood, updateRestaurant } from '../actions/seller';
import SellerHeader from './SellerHeader';
import FoodItemSeller from './FoodItemSeller';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faPlus } from '@fortawesome/free-solid-svg-icons'
import { Modal,Box } from '@mui/material';
import Footer from './Footer';

const FoodModal = ({open , handleClose , seller , foodItem , setFoodItem , handleOpenSnackbar , setSnackbarText }) => {
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [isVeg,setIsVeg] = useState(false);
    const [isSpeciality,setIsSpeciality] = useState(false);
    const [picture,setPicture] = useState('');
    const [error,setError] = useState('');
    useEffect(() => {
        if(foodItem){
            setName(foodItem.name);
            setPrice(foodItem.price);
            setIsVeg(foodItem.veg);
            setIsSpeciality(foodItem.speciality);
            setError('');
            setPicture('');
        }
        else{
            setName('');
            setPrice('');
            setIsVeg(false);
            setIsSpeciality(false);
            setError('');
            setPicture('');
        }
        
    }, [open])
    const handleSubmit = async() => {
        if(!name || !price || !picture){
            setError('Please fill all the fields');
            return;
        }

        var formdata = new FormData();
        formdata.append('picture', picture, picture.name);
        formdata.append('name' , name);
        formdata.append('price' , price);
        formdata.append('veg' , isVeg);
        formdata.append('speciality' , isSpeciality);
        
        if(!foodItem){
            const data = await addFood({ sellerId : seller._id , formdata });
            setSnackbarText('Food item added');
        }
        else{
            const data = await updateFood({sellerId : seller._id , formdata  , foodId : foodItem._id});
            setSnackbarText('Food item updated');
        }
        
        setFoodItem(null);
        handleClose();
        handleOpenSnackbar();
    }

    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={styles.box}>
                <div className={styles.field}>
                    <label>Name: </label>
                    <input type="text" placeholder='Name' value={name} onChange={(e)=>setName(e.target.value)} required />
                </div>
                <div className={styles.field}>
                    <label>Price: </label>
                    <input type="number"  min="0" placeholder='Price' value={price} onChange={(e)=>setPrice(e.target.value)} required />
                </div>
                <div className={styles.checkField}>
                    <label>Veg: </label>
                    <input type="checkbox" placeholder='Veg' checked={isVeg} onChange={(e)=>setIsVeg(e.target.checked)} required />
                </div>
                <div className={styles.checkField}>
                    <label>Speciality: </label>
                    <input type="checkbox" placeholder='Speciality' checked={isSpeciality} onChange={(e)=>setIsSpeciality(e.target.checked)} required />
                </div>
                <div className={styles.field}>
                    <label>Picture: </label>
                    <input type="file" placeholder='Picture' onChange={(e)=>setPicture(e.target.files[0])} required />
                </div>

                <div className={styles.field}>
                    {
                        error.length>0 ? <span className={styles.error}>{error}!!</span> : null
                    }
                </div>

                <div className={styles.submit} >
                    <button className={styles.buttonModal} onClick={handleSubmit}>Submit</button>
                </div>
            </Box>
        </Modal>
    )
}

const EditDetailsModal = ({open , handleClose , seller , handleOpenSnackbar, setSnackbarText }) => {
    const [restaurantName,setRestaurantName] = useState('');
    const [cuisine,setCuisine] = useState('');
    const [costForTwo,setCostForTwo] = useState('');
    const [address,setAddress] = useState('');
    const [phone,setPhone] = useState('');
    const [coverPhoto,setCoverPhoto] = useState('');
    const [error,setError] = useState('');

    useEffect(() => {
        setRestaurantName(seller?.restaurantName);
        setCuisine(seller?.cuisine);
        setCostForTwo(seller?.costForTwo);
        setAddress(seller?.address);
        setPhone(seller?.phone);
        setError('');

    }, [open])
    const handleSubmit = async() => {
        if(!restaurantName || !cuisine || !costForTwo || !address || !phone || !coverPhoto){
            setError('Please fill all the fields');
            return;
        }
        var formdata = new FormData();
        formdata.append('coverPhoto', coverPhoto, coverPhoto.name);
        formdata.append('restaurantName' , restaurantName);
        formdata.append('cuisine' , cuisine);
        formdata.append('costForTwo' , costForTwo);
        formdata.append('address' , address);
        formdata.append('phone' , phone);

        const data = await updateRestaurant({formdata,sellerId : seller._id});
        console.log(data);
        handleClose();

        setSnackbarText('Profile details updated');
        handleOpenSnackbar();
    }

    return(
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={styles.box}>

                <div className={styles.field}>
                    <label>Restaurant Name: </label>
                    <input type="text" value={restaurantName} placeholder='Restaurant Name' onChange={(e)=>setRestaurantName(e.target.value)} required />
                </div>

                <div className={styles.field}>
                    <label>Cuisine: </label>
                    <input type="text" value={cuisine} placeholder='Cuisine' onChange={(e)=>setCuisine(e.target.value)} required />
                </div>

                <div className={styles.field}>
                    <label>Cost For Two: </label>
                    <input type="number" value={costForTwo} placeholder='Cost For Two' onChange={(e)=>setCostForTwo(e.target.value)} required />
                </div>

                <div className={styles.field}>
                    <label>Address: </label>
                    <input type="text" value={address} placeholder='Address' onChange={(e)=>setAddress(e.target.value)} required />
                </div>

                <div className={styles.field}>
                    <label>Phone: </label>
                    <input type="text" value={phone} placeholder='Phone' onChange={(e)=>setPhone(e.target.value)} required />
                </div>

                <div className={styles.field}>
                    <label>Cover Photo: </label>
                    <input type="file" name="coverPhoto" placeholder='Cover Photo' onChange={(e)=>setCoverPhoto(e.target.files[0])} required />
                </div>

                

                <div className={styles.field}>
                    {
                        error.length>0 ? <span className={styles.error}>{error}!!</span> : null
                    }
                </div>

                <div className={styles.submit} >
                    <button className={styles.buttonModal} onClick={handleSubmit}>Submit</button>
                </div>
            </Box>
        </Modal>
    )
}


const SellerProfile = ({seller,setSeller}) => {    
    const [restaurant,setRestaurant] = useState();
    const [openFood, setOpenFood] = useState(false);
    const [openEdit , setOpenEdit] = useState(false);
    const [foodItem,setFoodItem] = useState(null);

    const handleOpenFood = () => setOpenFood(true);
    const handleCloseFood = () => {
        setOpenFood(false);
        setFoodItem(null);
    }
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarText,setSnackbarText] = useState('');
    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    };
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }
        setOpenSnackbar(false);
    };

    useEffect(async() => {
        const data = await getRestaurantById(seller?._id);
        setRestaurant(data);
    }, [openFood,openEdit])

    
    const handleAddItem = () =>{
        handleOpenFood();
    }

    const handleDelete = async(foodId) => {
        const id = {foodId , sellerId : seller._id};
        const response = await deleteFood(id);

        const data = await getRestaurantById(seller?._id);
        setRestaurant(data);
        setSnackbarText('Food item deleted');
        handleOpenSnackbar();
    }    

    return (
        <div className={styles.profile}>
            {
                restaurant ? 
                <div className={styles.body}>
                    <EditDetailsModal open={openEdit} handleClose={handleCloseEdit} seller={seller} handleOpenSnackbar={handleOpenSnackbar} setSnackbarText={setSnackbarText} />
                    <div className={styles.details}>    
                        <div className={styles.description}>
                            <p className={styles.name}>{restaurant?.restaurantName}</p>
                            <p className={styles.secondary}>{restaurant?.cuisine}</p>
                            <p className={styles.secondary}>₹{restaurant?.costForTwo} for two</p>
                            <p className={styles.secondary}>Address : {restaurant?.address}</p>
                            <p className={styles.secondary}>Phone :{restaurant?.phone}</p>

                            <button className={styles.button} onClick={handleOpenEdit} >
                                Edit Details <FontAwesomeIcon icon={faEdit} />
                            </button>
                            
                        </div>

                        <img
                            src={process.env.REACT_APP_SERVER_URL + restaurant?.coverPhoto}
                            alt="Pic"
                            width={400}
                            height={400}
                            className={styles.thumbnail}
                        />
                    </div>
                    <FoodModal open={openFood} handleClose={handleCloseFood} seller={seller} foodItem={foodItem} setFoodItem={setFoodItem} handleOpenSnackbar={handleOpenSnackbar} setSnackbarText={setSnackbarText}  />
                    
                    <div className={styles.addItem}>
                        <button  className={styles.button} onClick={handleAddItem}>
                            Add Item <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </div>
                
                    <div className={styles.itemGrid}>
                        {
                            restaurant?.foodItems?.map((item)=>(
                            <FoodItemSeller item={item} key={item._id} handleDelete={handleDelete} setFoodItem={setFoodItem} handleOpen={handleOpenFood}/>
                            ))
                        }
                    </div>

                </div>
                :
                <CircularProgress style={{width:100,height:100,display:'flex',margin:'5rem auto'}}  />

            }

            <Snackbar open={openSnackbar} autoHideDuration={2000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarText}!
                </Alert>
            </Snackbar>
            
        </div>
    )
}

export default SellerProfile
