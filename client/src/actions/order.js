import * as api from '../api/order.js';

export const razorpay = async({userId}) => {
    try{
        const {data} = await api.razorpay({userId});
        return data;
    }catch(error){
        console.log(error);
    }
}

export const placeOrder = async(item) =>{
    try{
        const {data} = await api.placeOrder(item);
        return data;
    }catch(error){
        console.log(error);
    }
}

export const getOrdersByUserId = async(id)=>{
    try{
        const {data} = await api.getOrdersByUserId(id);
        return data;
    }catch(error){
        console.log(error.response);
    }
}

export const getOrdersBySellerId = async(id)=>{
    try{
        const {data} = await api.getOrdersBySellerId(id);
        return data;
    }catch(error){
        console.log(error.response);
    }
}

export const updateStatus = async(id) => {
    try{
        const {data} = await api.updateStatus(id);
        return data;
    }catch(error){
        console.log(error);
    }
}