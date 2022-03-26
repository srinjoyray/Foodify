const mongoose = require('mongoose');

const sellerSchema = mongoose.Schema({
    restaurantName : {type:String, required:true},
    email : {type:String,reqiured : true},
    password : {type : String, required : true},
    // id:{type : String},
    cuisine : {type:String , required: true},
    costForTwo : {type:Number , required: true},
    address : {type:String , required: true},
    phone : {type:Number , required: true},
    coverPhoto: {type:String , required: true},
    foodItems : [
        {   
            // id:{type : String},
            name: {type:String , required: true},
            price : {type:Number , required: true},
            veg : {type:Boolean , required:true},
            speciality : {type:Boolean , required: true},
            picture : {type:String , required: true},
        }
    ]
})

module.exports = mongoose.model("Seller",sellerSchema);