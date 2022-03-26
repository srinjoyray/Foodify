const express = require('express');
const { userSignup, userSignin, getUserById, updateUser, deleteUser, getAllUsers, addToCart, removeFromCart, decrementCart, emptyCart, getCart } = require('../controllers/user');


// const auth = require('../middleware/auth.js');

const router = express.Router();

router.post('/signin',userSignin);
router.post('/signup',userSignup);

router.get('/',getAllUsers);
router.get('/:id',getUserById);
router.get('/:id/cart',getCart)

router.patch('/update/:id',updateUser);
router.delete('/delete/:id',deleteUser);

router.patch('/addToCart',addToCart);
router.patch('/decrementCart',decrementCart);
router.patch('/removeFromCart',removeFromCart);
router.patch('/emptyCart',emptyCart);


module.exports = router;
