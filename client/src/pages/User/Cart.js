import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import {Snackbar,Alert,CircularProgress} from '@mui/material';

import { placeOrder, razorpay } from '../../actions/order';
import { addToCart, decrementCart, getCart, getUserById, removeFromCart } from '../../actions/user';
import CartItem from '../../components/CartItem';
import styles from '../../styles/Cart.module.css'
import Footer from '../../components/Footer';
const Cart = ({userId,setUserId}) => {
  const [user,setUser] = useState();
  const [cart,setCart] = useState(null);
	const [cartSellerId,setCartSellerId] = useState();
	const history = useHistory();

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

  useEffect(async() => {
    let data = await getCart(userId);
    setCart(data);
		setCartSellerId(data.cartSellerId);
    data = await getUserById(userId);
    setUser(data);
  }, [])
  
  const handleMinus = async({item,handleOpen}) => {
    item.userId = user?._id;
    await decrementCart(item);
    const data = await getCart(user?._id);
    setCart(data);
    handleOpen();
  }
  const handleDelete = async({item}) => {
    item.userId = user?._id;
    await removeFromCart(item);
    const data = await getCart(user?._id);
    handleOpen();
    setCart(data);
  }
  const handleAdd = async({item,handleOpen}) => {
    item.userId = user?._id;
    await addToCart(item);
    const data = await getCart(user?._id);
    setCart(data);
    handleOpen();
  }
  console.log(cart);


  function loadScript(src) {
      return new Promise((resolve) => {
          const script = document.createElement('script')
          script.src = src
          script.onload = () => {
              resolve(true)
          }
          script.onerror = () => {
              resolve(false)
          }
          document.body.appendChild(script)
      })
  }

  const displayRazorpay = async() => {

    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
      alert('Razorpay SDK failed to load. Are you online?')
      return
    }

    const data = await razorpay({userId : user?._id});
    console.log(data)

    const options = {
      key: 'rzp_test_KXTtswDbgfMp4K',
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: 'Foodify',
      description: 'Complete your payment',
      // image: 'http://localhost:1337/logo.svg',
      handler:async function (response) {
        if(response.razorpay_payment_id && response.razorpay_order_id && response.razorpay_signature){
          const razorpay = {paymentId : response.razorpay_payment_id , orderId : response.razorpay_order_id , signature : response.razorpay_signature};

          const res = await placeOrder({razorpay , userId : user?._id, sellerId : cartSellerId });

          history.push('/profile')
        }
      },
      prefill: {
        name : user?.name,
        email: user?.email,
        phone : user?.phone
      }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  return (
    <div className={styles.cart}>
      {
        cart ? 
        <div className={styles.main}>
        {cart?.cartList?.length==0 ? 
          <p className={styles.heading}>No items in Cart</p>
          :
          <>
            <p className={styles.heading}>Cart</p>
            <div className={styles.body}>
              <div className={styles.cartList}>
                {
                  cart?.cartList?.map((item)=>(
                    <CartItem item={item} handleAdd={handleAdd} handleDelete={handleDelete} handleMinus={handleMinus}  key={item._id}/>
                    ))
                  }
              </div>
              <div className={styles.checkout}>
                  <h3>Bill Details</h3>
                  <div className={styles.row}>
                    <span>Item Total</span> <span>₹{cart?.cartValue}</span>
                  </div>
                  <div className={[styles.row,styles.delivery].join(' ')}>
                    <span>Delivery Charge</span> <span>₹20</span>
                  </div>
                  
                  <div className={[styles.row,styles.netAmount].join(' ')}>
                    <span>Net Amount</span> <span>₹{cart?.cartValue + 20}</span>
                  </div>

                  <button className={styles.button} onClick={displayRazorpay}>Proceed to checkout</button>
              </div>
            </div>
            
            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                  <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                      Item removed!
                  </Alert>
            </Snackbar>

          </>
        }
        </div>
        :
        <div className={styles.loader}>
          <CircularProgress style={{width:100,height:100,display:'flex',margin:'5rem auto'}}  />
        </div>
      }
      <Footer/>
    </div>
  )
}

export default Cart