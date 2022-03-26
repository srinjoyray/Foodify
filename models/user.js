const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name : {type:String, required:true},
    email : {type:String,reqiured : true},
    address : {type : String,reqiured : true},
    phone : {type : String , required : true},
    password : {type : String, required : true},
    // id:{type : String},
    cart : [ 
        {   
            // id:{type : String},
            foodId:{type : String},
            name: {type:String , required: true},
            price : {type:Number , required: true},
            veg : {type:Boolean , required:true},
            speciality : {type:Boolean , required: true},
            picture : {type:String , required: true},
            quantity : {type : Number , required:true},
        }
    ],
    cartValue : {type:Number , default : 0 ,required : true},
    cartSellerId : {type : String , default : "" },
})

module.exports = mongoose.model("User",userSchema);