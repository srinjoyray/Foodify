const express = require('express');
const { getAllOrders, getOrderById, placeOrder, deleteOrder, getOrdersByUserId, getOrdersBySellerId, razorpay, updateStatus } = require('../controllers/order');


// const auth = require('../middleware/auth.js');

const router = express.Router();

router.get('/',getAllOrders);
router.get('/:id',getOrderById);
router.get('/user/:id',getOrdersByUserId);
router.get('/seller/:id',getOrdersBySellerId);


router.post('/razorpay',razorpay);

router.post('/placeOrder',placeOrder);
router.delete('/deleteOrder/:id',deleteOrder);
router.patch('/updateStatus/:id',updateStatus);

// router.patch('/cancelOrder/:id',cancelOrder);




module.exports = router;