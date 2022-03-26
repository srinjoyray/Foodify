import * as api from '../api/user.js';

export const signin = async(formData) =>{
    
    try{
        const {data} = await api.signIn(formData);
        return data;
    } catch(error){
        return error;
    }
}

export const signup = async(formData) =>{
    try{
        const {data} = await api.signUp(formData);
        return data;
    } catch(error){
        return error;
    }
}

export const getUserById = async(id)=>{
    try{
        const {data} = await api.getUserById(id);
        console.log(data,id);
        return data;
    }catch(error){
        return error;
    }
}

export const updateUser = async(user) => {
    try{
        const {data} = await api.updateUser(user);
        return data;
    }catch(error){  
        console.log(error);
    }
}

export const addToCart = async(cartItem) => {
    try{
        const {data} = await api.addToCart(cartItem);
        return data;
    }catch(error){
        console.log(error);
        return error;
    }
}
export const decrementCart = async(cartItem) => {
    try{
        const {data} = await api.decrementCart(cartItem);
        return data;
    }catch(error){
        console.log(error);
        return error;
    }
}
export const removeFromCart = async(cartItem) => {
    try{
        const {data} = await api.removeFromCart(cartItem);
        return data;
    }catch(error){
        console.log(error);
        return error;
    }
}

export const getCart = async(id) => {
    try{
        const {data} = await api.getCart(id);
        return data;
    }catch(error){
        console.log(error);
        return error;
    }
}