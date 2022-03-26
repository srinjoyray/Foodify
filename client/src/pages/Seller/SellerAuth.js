import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/seller';
import SellerHeader from '../../components/SellerHeader';
import styles from '../../styles/SellerAuth.module.css';

const Login = ({setIsNewSeller,setSeller}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const history = useHistory();
    const handleLogin = async(e) => {
        e.preventDefault();
        console.log(email,password);
        
        if(!email || !password ){
            setError('Please fill all the fields');
            return;
        }

        const response = await signin({email,password});          
        const message = response?.response?.data?.message;

        if(message){
            setError(message);
            return;
        }
    
        setSeller(response?.result);
        localStorage.setItem('seller',JSON.stringify(response));
        history.push('/seller/dashboard');
    }

    return(
        <form className={styles.form}>

            <h2>Login</h2>  

            

            <div className={styles.field}>
                <label htmlFor="email">Email: </label>
                <input type="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className={styles.field}>
                <label htmlFor="name">Password: </label>
                <input type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}  required/>
            </div>
            
            <div className={styles.field}>
                {
                    error.length>0 ? <span className={styles.error}>{error}!!</span> : null
                }
            </div>

            <div className={styles.submit} >
                <button className={styles.button} onClick={handleLogin}>Login</button>
            </div>

            <p className={styles.switch}>
                Don't have an account? <span onClick={() => setIsNewSeller(true)} className={styles.switchButton}>Register</span>
            </p>
        </form>
    )
}

const Register = ({setIsNewSeller,setSeller}) => {
  
    const initialState = { email:'',password:'',confirmPassword:'',restaurantName:'',cuisine:'',costForTwo:'',address:'',phone:'',coverPhoto:''}

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [confirmPassword , setConfirmPassword] = useState('');    
    const [restaurantName , setRestaurantName] = useState('');
    const [cuisine , setCuisine] = useState('');
    const [costForTwo , setCostForTwo] = useState('');
    const [address , setAddress] = useState('');
    const [phone , setPhone] = useState('');
    const [coverPhoto , setCoverPhoto ] = useState(null);

    const [error,setError] = useState('');
  
    const history = useHistory();

    const handleRegister = async(e) => {
        e.preventDefault();
        
        if(!email || !password || !confirmPassword || !restaurantName || !cuisine || !costForTwo || !address || !phone || !coverPhoto){
            setError('Please fill all the fields');
            return;
        }

        var formdata = new FormData();
        formdata.append('coverPhoto', coverPhoto, coverPhoto.name);
        formdata.append('email' , email);
        formdata.append('password' , password);
        formdata.append('confirmPassword' , confirmPassword);
        formdata.append('restaurantName' , restaurantName);
        formdata.append('cuisine' , cuisine);
        formdata.append('costForTwo' , costForTwo);
        formdata.append('address' , address);
        formdata.append('phone' , phone);

        const response = await signup(formdata);
        const message = response?.response?.data?.message;

        if(message){
            setError(message);
            return;
        }
    
        setSeller(response?.result);
        localStorage.setItem('seller',JSON.stringify(response));
        history.push('/seller/dashboard');
    }
   
    return(
        <form className={styles.form}>

            <h2>Register</h2>  

            <div className={styles.field}>
                <label>Restaurant Name: </label>
                <input type="text" name="restaurantName" placeholder='Restaurant Name' onChange={(e)=>setRestaurantName(e.target.value)} required />
            </div>

            <div className={styles.field}>
                <label>Cuisine: </label>
                <input type="text" name="cuisine" placeholder='Cuisine' onChange={(e)=>setCuisine(e.target.value)} required />
            </div>

            <div className={styles.field}>
                <label>Cost For Two: </label>
                <input type="text" name="costForTwo" placeholder='Cost For Two' onChange={(e)=>setCostForTwo(e.target.value)} required />
            </div>

            <div className={styles.field}>
                <label>Address: </label>
                <input type="text" name="address" placeholder='Address' onChange={(e)=>setAddress(e.target.value)} required />
            </div>

            <div className={styles.field}>
                <label>Phone: </label>
                <input type="text" name="phone" placeholder='Phone' onChange={(e)=>setPhone(e.target.value)} required />
            </div>

            <div className={styles.field}>
                <label>Cover Photo: </label>
                <input type="file" name="coverPhoto" placeholder='Cover Photo' onChange={(e)=>setCoverPhoto(e.target.files[0])} required />
            </div>

            <div className={styles.field}>
                <label>Business Email: </label>
                <input type="email" name="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} required />
            </div>

            <div className={styles.field}>
                <label>Password: </label>
                <input type="password" name="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}  required/>
            </div>
            
            <div className={styles.field}>
                <label>Confirm Password: </label>
                <input type="password" name="confirmPassword" placeholder='Confirm Password' onChange={(e)=>setConfirmPassword(e.target.value)}  required/>
            </div>
            <div className={styles.field}>
                {
                    error.length>0 ? <span className={styles.error}>{error}!!</span> : null
                }
            </div>
            <div className={styles.submit} >
                <button className={styles.button} onClick={handleRegister}>Register</button>
            </div>

            <p className={styles.switch}>
                Don't have an account? <span onClick={() => setIsNewSeller(false)} className={styles.switchButton}>Login</span>
            </p>
        </form>
        
    )
}

const SellerAuth = ({seller,setSeller}) => {
    const [isNewSeller,setIsNewSeller] = useState(false);

    return (
        <>
            <SellerHeader />
            <div className={styles.auth}>
                {
                    isNewSeller ? 
                    <Register setIsNewSeller={setIsNewSeller} setSeller={setSeller} />
                    :
                    <Login setIsNewSeller={setIsNewSeller} setSeller={setSeller} />
                }
            </div>
        </>
    )
}

export default SellerAuth