const mongoose = require('mongoose');
const Order = require('../models/order.js');
const Seller = require('../models/seller.js');
const User = require('../models/user.js');

const Razorpay = require('razorpay');
const shortid = require('shortid')

const getAllOrders = async(req,res) => {
    try{
        const order= await Order.find();
        order.sort(function(a, b) {
            return Date.parse(b.time) - Date.parse(a.time)  ;
        });
        res.status(200).json(order);
    }catch(error){
        res.status(500).json({message:error});
    }
}

const getOrderById = async(req,res) => {
    const { id } = req.params;
    try{
        const order = await Order.findById(id);
        res.status(200).json({order});
    }catch(error){
        res.status(500).json({message:error});
    }
}

const getOrdersByUserId = async(req,res) => {
    const { id } = req.params;
    try{
        const order = await Order.find({ userId : id });
        // console.log(order);
        order.sort(function(a, b) {
            return Date.parse(b.time) - Date.parse(a.time)  ;
        });
        res.status(200).json(order);
    }catch(error){
        res.status(500).json({message:error});
    }
}

const getOrdersBySellerId = async(req,res) => {
    const { id } = req.params;
    try{
        const order = await Order.find({ sellerId : id });
        // console.log(order);
        order.sort(function(a, b) {
            return Date.parse(b.time) - Date.parse(a.time)  ;
        });
        res.status(200).json(order);
    }catch(error){
        res.status(500).json({message:error});
    }
}

const placeOrder = async(req,res) => {
    const { userId , sellerId  , razorpay } = req.body;
    const deliveryCharge = 20;
    try{
        const user = await User.findById({_id:userId});

        const result = await Order.create({userId ,sellerId , items : user.cart , price : user.cartValue + deliveryCharge , address : user?.address,time:Date.now() , curentStatus :'Order Placed' , nextStatus : 'Out For Delivery' , razorpayPaymentId : razorpay.paymentId , razorpayOrderId : razorpay.orderId , razorpaySignature : razorpay.signature});

        user.cart = [];
        user.cartValue = 0;
        user.cartSellerId = "";

        await User.findByIdAndUpdate({_id:userId}, user);

        res.status(201).json(result);

    }catch(error) {
        res.status(500).json({message:error});
    }
}

const deleteOrder = async(req,res) => {
    const { id } = req.params;
    try{
        await Order.deleteOne({_id : id});
        res.status(200).json({message:'Order deleted successfully'});
    }catch(error) {
        res.status(500).json({message:error});
    }
}


const razorpay = async(req,res) => {
    const instance = new Razorpay({
        key_id: 'rzp_test_KXTtswDbgfMp4K',
        key_secret: process.env.RAZORPAY_SECRET
    })
    const deliveryCharge = 20;
    const {userId} = req.body ;

    const user = await User.findById({_id:userId});

    const payment_capture = 1;
	const amount = user.cartValue + deliveryCharge;
	const currency = 'INR';

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await instance.orders.create(options)
		// console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
}

const updateStatus = async(req,res) => {
    const { id } = req.params;
    try{
        const order = await Order.findById({_id : id });

        if(order.currentStatus === "Order Placed"){
            order.currentStatus = order.nextStatus;
            order.nextStatus = "Order Delivered";
        }
        else if(order.currentStatus === "Out For Delivery"){
            order.currentStatus = order.nextStatus;  
        }

        if(order.currentStatus === "Order Delivered"){
            order.nextStatus = "";
            order.isDelivered = true;
        }
        
        await Order.findByIdAndUpdate({_id:id}, order);
        // console.log(order);
        res.status(200).json(order);
    }catch(error){
        console.log(error);
    }
}


module.exports = {getAllOrders,getOrderById,placeOrder,deleteOrder,getOrdersByUserId,getOrdersBySellerId,razorpay,updateStatus};