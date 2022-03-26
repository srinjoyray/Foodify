import React, { useState } from 'react'
import { useHistory } from "react-router-dom";
import { signin, signup } from '../../actions/user';
import styles from '../../styles/Auth.module.css'

const Register = ({setIsNewUser,setUserId}) =>{
  const history = useHistory();
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [phone,setPhone] = useState('');
  const [address,setAddress] = useState('');
  const [password,setPassword] = useState('');
  const [confirmPassword,setConfirmPassword] = useState('');
  const [error,setError] = useState('');

  const handleRegister = async(e) => {
    e.preventDefault();
    if(!name || !email || !password || !confirmPassword || !phone || !address){
      setError('Please fill all the fields');
      return;
    }
    const response = await signup({name,email,phone,address,password,confirmPassword});
    console.log(response);
    const message = response?.response?.data?.message;
    
    if(message){
      setError(message);
      return;
    }

    setUserId(response?.result?._id);
    localStorage.setItem('user',JSON.stringify(response?.result?._id));
    history.push('/');
  }
  return (
    
    <form className={styles.form}>

      <h2>Register Now</h2>  

      <div className={styles.field}>
          <label htmlFor="name">Name: </label>
          <input type="text" placeholder='Enter Name' onChange={(e) => setName(e.target.value)} required/>
      </div>

      <div className={styles.field}>
          <label htmlFor="email">Email: </label>
          <input type="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className={styles.field}>
          <label htmlFor="phone">Phone No: </label>
          <input type="phone" placeholder='Enter Phone No' onChange={(e) => setPhone(e.target.value)} required />
      </div>
      <div className={styles.field}>
          <label htmlFor="address">Address: </label>
          <input type="text" placeholder='Enter Address' onChange={(e) => setAddress(e.target.value)} required />
      </div>
      <div className={styles.field}>
          <label htmlFor="password">Password: </label>
          <input type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)}  required/>
      </div>
      <div className={styles.field}>
          <label htmlFor="confirmPassword">Confirm Password: </label>
          <input type="password" placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} required/>
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
        Already have an account? <span onClick={() => setIsNewUser(false)} style={{ cursor: 'pointer' }}>Login</span>
      </p>
    </form>
  )
}

const Login = ({setIsNewUser,setUserId}) =>{
  const history = useHistory();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');

  const handleLogin = async(e) => {
    e.preventDefault();
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

    setUserId(response?.result?._id);
    localStorage.setItem('userId',JSON.stringify(response?.result?._id));
    history.push('/');
  }
  return (
    
    <form className={styles.form}>

      <h2>Login</h2>  

      

      <div className={styles.field}>
          <label htmlFor="email">Email: </label>
          <input type="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className={styles.field}>
          <label htmlFor="password">Password: </label>
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
          Don't have an account? <span onClick={() => setIsNewUser(true)} className={styles.switchButton} >Register</span>
      </p>
    </form>
  )
}

const Auth = ({userId,setUserId}) => {
    const [isNewUser,setIsNewUser] = useState(false);

    return(
      <div className={styles.auth}>
        {
          isNewUser ? 
          <Register setIsNewUser={setIsNewUser} setUserId={setUserId}/>
          :
          <Login setIsNewUser={setIsNewUser} setUserId={setUserId} />
        }
      </div>
    )
}

export default Auth