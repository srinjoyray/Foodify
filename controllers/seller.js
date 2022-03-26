const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const Seller = require('../models/seller.js');

const sellerSignin = async(req,res) => {
    const {email,password} = req.body;
    // console.log(email,password);
    try{
        const existingSeller = await Seller.findOne({email});
        if(!existingSeller) return res.status(404).json({message : "Seller doesn't exist"});

        const isPasswordCorrect = await bcrypt.compare(password,existingSeller.password); 

        if(!isPasswordCorrect) return res.status(400).json({message :"Invalid credentials"});

        const token = jwt.sign({email:existingSeller.email,id:existingSeller._id},'test',{expiresIn:"30d"}) 

        res.status(200).json({result:existingSeller,token});
    }catch(error) {
        res.status(500).json({message:'Something went wrong.'})
    }
}

const sellerSignup = async(req,res) => {
    
    const {email,password,confirmPassword,restaurantName,cuisine,costForTwo,address,phone} = req.body;
    try{
        const existingSeller = await Seller.findOne({email});

        if(existingSeller) return res.status(400).json({message : "Seller already exist"});
        if(password!==confirmPassword) return res.status(400).json({message : "Passwords don't match"});

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await Seller.create({email,password:hashedPassword,restaurantName,cuisine,costForTwo,address,phone,coverPhoto : req.file.path});

        const token = jwt.sign({email:result.email,id:result._id},'test',{expiresIn:"30d"}) 

        res.status(200).json({result,token});
    }catch(error){
        res.status(500).json({message:'Something went wrong.'})
    }
}


const updateRestaurant = async(req,res) => {
    const { id } = req.params;

    const {restaurantName,cuisine,costForTwo,address,phone} = req.body;
   
    try{
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No restaurant with id: ${id}`);
        
        const restaurant = await Seller.findById(id);
        
        const updatedRestaurant = { restaurantName,cuisine,costForTwo,address,phone,coverPhoto : req.file.path ,email: restaurant.email , password : restaurant.password ,foodItem: restaurant.foodItem };

        await Seller.findByIdAndUpdate(id, updatedRestaurant, { new: true });

        res.json(updatedRestaurant);

    }catch(error){
        res.status(500).json({message:error});
    }

}

const deleteRestaurant = async(req,res) => {
    const { id } = req.params;

    try{
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No restaurant with id: ${id}`);
        
        await Seller.deleteOne({_id : id});

        res.status(200).json({message:'Restaurant deleted successfully'});


    }catch(error){
        res.status(500).json({message:error});
    }

}

const addFoodItem = async(req,res) =>{
    const { id } = req.params;

    const {name,price,veg,speciality} = req.body;
    try{
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No restaurant with id: ${id}`);
        
        const restaurant = await Seller.findById(id);

        const foodItems = restaurant.foodItems;
        
        foodItems.push({name,price,veg,speciality,picture : req.file.path});

        restaurant.foodItems = foodItems ;

        await Seller.findByIdAndUpdate(id, restaurant, { new: true });

        res.json(restaurant);

    }catch(error){
        res.status(500).json({message:error});
    }

}


const updateFoodItem = async(req,res) =>{
    const { id,foodId } = req.params;
    const {name,price,veg,speciality} = req.body;
    
    try{
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No restaurant with id: ${id}`);
        
        const restaurant = await Seller.findById(id);

        const foodItems = restaurant.foodItems;
        
        const index = foodItems.findIndex(item => item._id == foodId);

        if(index===-1) return res.status(404).send(`No item with id: ${foodId}`);

        foodItems[index] = {name,price,veg,speciality,picture : req.file.path,"_id":foodId};
    
        restaurant.foodItems = foodItems ;

        await Seller.findByIdAndUpdate(id, restaurant, { new: true });

        res.json(restaurant);

    }catch(error){
        res.status(500).json({message:error});
    }
}

const deleteFoodItem = async(req,res) =>{
    const { id,foodId } = req.params;
   
    try{
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No restaurant with id: ${id}`);
        
        const restaurant = await Seller.findById(id);

        const foodItems = restaurant.foodItems;
        
        const index = foodItems.findIndex(item => item._id == foodId);

        if(index!==-1){
            foodItems.splice(index,1);
        }
        
        restaurant.foodItems = foodItems ;

        await Seller.findByIdAndUpdate(id, restaurant, { new: true });

        res.json(restaurant);

    }catch(error){
        res.status(500).json({message:error});
    }
}


const getAllRestaurants = async(req,res) => {
    try{
        const allRestaurant = await Seller.find();

        res.status(200).json(allRestaurant);
    }catch(error){
        res.status(500).json({message:error});
    }
}

const getRestaurantsBySearch = async(req,res) => {
    const {searchQuery} = req.query;

    try{
        const name = new RegExp(searchQuery,"i");

        const queryRestaurant = await Seller.find({"restaurantName":name});
       
        res.status(200).json(queryRestaurant);

    }catch(error){
        res.status(500).json({message:error});
    }
}

const getRestaurantById = async(req,res) => {
    const { id } = req.params;
    try{
        const restaurant = await Seller.findById(id);
        res.status(200).json(restaurant);
    }catch(error){
        res.status(500).json({message:error});
    }
}

const getRestaurantItems = async(req,res) => {
    const { id } = req.params;
    try{
        const restaurant = await Seller.findById(id);
        res.status(200).json(restaurant.foodItems);
    }catch(error){
        res.status(500).json({message:error});
    }
}

const getRestaurantItemsBySearch = async(req,res) => {
    const { id } = req.params;
    const {searchQuery} = req.query;
    try{
        const restaurant = await Seller.findById(id);
        const search = new RegExp(searchQuery,"i");

        const foodItems = restaurant.foodItems.filter(item=> search.test(item.name));
        res.status(200).json(foodItems);
    }catch(error){
        res.status(500).json({message:error});
    }
}

module.exports = {sellerSignin,sellerSignup,getAllRestaurants,getRestaurantsBySearch,getRestaurantById, getRestaurantItems , getRestaurantItemsBySearch ,updateRestaurant, deleteRestaurant ,addFoodItem,updateFoodItem,deleteFoodItem}