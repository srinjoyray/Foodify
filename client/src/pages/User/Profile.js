import React, { useEffect, useState } from 'react'
import {CircularProgress} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCheck, faDeleteLeft, faEdit } from '@fortawesome/free-solid-svg-icons';
import {Modal} from '@mui/material';
import { getUserById, updateUser } from '../../actions/user';
import Header from '../../components/Header'
import styles from '../../styles/Profile.module.css';
import { getOrdersByUserId } from '../../actions/order';
import OrderItem from '../../components/OrderItem';
import Footer from '../../components/Footer';

const EditModal = ({open,handleClose,user}) =>{  
  const [name,setName] = useState('');
  const [phone,setPhone] = useState('');
  const [address,setAddress] = useState('');

  useEffect(() => {
      setName(user?.name);
      setPhone(user?.phone);
      setAddress(user?.address);
  }, [open])
  
  const handleEdit = async() => {
    let updatedUser = user;
    updatedUser.name = name;
    updatedUser.phone = phone;
    updatedUser.address = address;
    const data = await updateUser(updatedUser)
    console.log(data);
    handleClose();
  }

  return(
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={styles.modal}>
          <div className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="name">Name: </label>
              <input type="text" placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className={styles.field}>
              <label htmlFor="phone">Phone: </label>
              <input type="phone" placeholder='Enter Phone No' value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>

            <div className={styles.field}>
              <label htmlFor="address">Address: </label>
              <input type="text" placeholder='Enter Address' value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>

            <div className={styles.submit} >
              <button className={styles.button} onClick={handleClose} > <FontAwesomeIcon icon={faDeleteLeft} /> Cancel </button>
              <button className={styles.button} onClick={handleEdit} >Submit <FontAwesomeIcon icon={faCheck} /> </button>
            </div>

          </div>
        </div>
      </Modal>
  )
}

const Profile = ({userId,setUserId}) => {
  const [user,setUser] = useState(null);
  const [orders,setOrders] = useState(null);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  useEffect(async()=>{
    const userData = await getUserById(userId);
    setUser(userData);

    const orderData = await getOrdersByUserId(userId);
    setOrders(orderData);
  },[open]);

  
  return (
    <div>
      <div className={styles.profile}>
        <h2>Profile</h2>
        {
          user ? 
          <div className={styles.details}>
            <div className={styles.row}>
              <span className={styles.label}>Name</span>
              <span className={styles.value}>{user?.name}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Phone</span>
              <span className={styles.value}>{user?.phone}</span>
            </div>
            <div className={styles.row}>
              <span className={styles.label}>Address</span>
              <span className={styles.value}>{user?.address}</span>
            </div>
            <button className={styles.button} onClick={handleOpen}>Edit  <FontAwesomeIcon icon={faEdit} /> </button>
          </div>
          :
          <CircularProgress style={{width:100,height:100,display:'flex',margin:'5rem auto'}}  />

        }
        <EditModal open={open} handleClose={handleClose} user={user}/>
        <h2 className={styles.orderHeader}>My Orders</h2>

        {
          orders ? 
          <div className={styles.orders}>
            {
              orders?.map((order)=>
                <OrderItem order={order} key={order?._id}/>
              )
            }
          </div>
          :
          <CircularProgress style={{width:100,height:100,display:'flex',margin:'5rem auto'}}  />
          
        }
      </div>
      <Footer />
    </div>
  )
}

export default Profile