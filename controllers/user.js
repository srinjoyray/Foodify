const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user.js');

const userSignup = async(req,res) => {
    const {name,email,address,phone,password,confirmPassword} = req.body;
    
    try{
        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(400).json({message : "User already exist"});
        if(password!==confirmPassword) return res.status(400).json({message : "Passwords don't match"});

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await User.create({name,email,password:hashedPassword,address,phone});

        const token = jwt.sign({email:result.email,id:result._id},'test',{expiresIn:"30d"}) 

        res.status(200).json({result,token});
    }catch(error){
        console.log(error);
        res.status(500).json({message:error})
    }
}

const userSignin = async(req,res) => {
    const {email,password} = req.body;
    try{
        const existingUser = await User.findOne({email});
        if(!existingUser) return res.status(404).json({message : "User doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password); 

        if(!isPasswordCorrect) return res.status(400).json({message :"Invalid credentials"});

        const token = jwt.sign({email:existingUser.email,id:existingUser._id},'test',{expiresIn:"30d"}) 

        res.status(200).json({result:existingUser,token});
    }catch(error) {
        res.status(500).json({message:'Something went wrong.'})
    }
}

const getAllUsers = async(req,res) => {
    try{
        const allUsers= await User.find();

        res.status(200).json({allUsers});
    }catch(error){
        res.status(500).json({message:error});
    }
}

const getUserById = async(req,res) => {
    const { id } = req.params;
    try{
        const user = await User.findById(id);
        res.status(200).json(user);
    }catch(error){
        res.status(500).json({message:error});
    }
}

const getCart = async(req,res) => {
    try{
        const { id } = req.params;
        const user = await User.findById(id);
        const cart = user?.cart;
        res.status(200).json({cartList : cart,cartValue : user.cartValue ,cartSellerId : user.cartSellerId});
    }catch(error){
        res.status(500).json({message:error});
    }
}


const updateUser = async(req,res) => {
    const { id } = req.params;

    const {name,address,phone} = req.body;

    try{
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
        
        const user = await User.findById(id);
        
        const updatedUser = { name,phone,address,email: user.email , password : user.password ,cart: user.cart };

        await User.findByIdAndUpdate(id, updatedUser, { new: true });

        res.json(updatedUser);

    }catch(error){
        res.status(500).json({message:error});
    }

} 

const deleteUser = async(req,res) => {
    const { id } = req.params;

    try{
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No user with id: ${id}`);
        
        await User.deleteOne({_id : id});

        res.status(200).json({message:'User deleted successfully'});

    }catch(error){
        res.status(500).json({message:error});
    }

} 


const addToCart = async(req,res) => {
    try{
        const { name,price,veg,speciality,picture,foodId,userId,sellerId } = req.body;
        const cartItem = {name,price,veg,speciality,picture,foodId,quantity:1};
        
        const user = await User.findById({_id:userId});
        
        if(sellerId && user.cartSellerId !== sellerId){
            user.cart=[];
            user.cartSellerId = sellerId;
        }

        const cart = user?.cart;

        
        const index = cart.findIndex(item=>item.foodId===foodId);
        
        if(index===-1)cart.push(cartItem);
        else cart.map(item=>item.foodId===foodId ? item.quantity++ : null); 

        user.cart = cart;

        let value = 0;
        user.cart.map(item=> value += item.price*item.quantity);
        user.cartValue = value;

        await User.findByIdAndUpdate({_id:userId}, user);

        res.json(user);

    }catch(error){
        res.status(500).json({message:error});
    }
}

const decrementCart = async(req,res) => {
    try{  
        const { foodId,userId } = req.body;
        const user = await User.findById({_id:userId});
        const cart = user?.cart;

        cart.map(item=>item.foodId === foodId ? --item.quantity : null)

        const updatedCart = cart.filter(item=>item.quantity!==0);
        user.cart = updatedCart;

        let value = 0;
        user.cart.map(item=> value += item.price*item.quantity);
        user.cartValue = value;

        if(user.cart.length ===0)user.cartSellerId="";

        await User.findByIdAndUpdate({_id:userId}, user);

        res.json(user);

    }catch(error){
        res.status(500).json({message:error});
    }
}

const removeFromCart = async(req,res) =>{
    try{
        const { foodId,userId } = req.body;
        const user = await User.findById({_id:userId});
        const cart = user?.cart;
        
        const updatedCart = cart.filter(item=>item.foodId !== foodId);
        user.cart = updatedCart;
        
        let value = 0;
        user?.cart?.map(item=> value += item.price*item.quantity);
        user.cartValue = value;

        if(user.cart.length ===0)user.cartSellerId="";
        // console.log(user);
        await User.findByIdAndUpdate({_id:userId}, user);

        res.json(user);

    }catch(error){
        res.status(500).json({message:error});
    }
}

const emptyCart = async(req,res) => {
    try{
        const { userId } = req.body;
        const user = await User.findById({_id:userId});
        user.cart=[];
        user.cartValue = 0;
        user.cartSellerId="";
        await User.findByIdAndUpdate({_id:userId}, user);
        res.json(user);
    }catch(error){
        res.status(500).json({message:error});
    }
}


module.exports = {
    userSignup,userSignin,
    getAllUsers,getUserById,getCart,
    updateUser,deleteUser,
    addToCart,removeFromCart,decrementCart,emptyCart
}