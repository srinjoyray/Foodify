const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userId : { type : String },
    sellerId : { type : String },
    items :  [ 
        {   
            foodId:{type : String},
            name: {type:String , required: true},
            price : {type:Number , required: true},
            veg : {type:Boolean , required:true},
            speciality : {type:Boolean , required: true},
            picture : {type:String , required: true},
            quantity : {type : Number , required:true},
        }
    ] ,
    price : {type : Number , required:true},
    address : {type : String , required:true},
    time : { type : Date },
    currentStatus : {type : String , default : 'Order Placed'},
    nextStatus  : {type : String , default : 'Out For Delivery'},
    isDelivered : { type : Boolean  , default : false },

    razorpayPaymentId : { type : String },
    razorpayOrderId : { type : String },
    razorpaySignature : { type : String }
    
})

module.exports = mongoose.model("Order",orderSchema);