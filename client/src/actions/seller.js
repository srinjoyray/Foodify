import * as api from '../api/seller.js';

export const signin = async(formData) =>{
    try{
        const {data} = await api.signIn(formData);
        return data;
    } catch(error){
        console.log(error);
        return error;
    }
}

export const signup = async(formData) =>{

    try{
        const {data} = await api.signUp(formData);
        return data;
    } catch(error){
        console.log(error);
        return error;
    }
}

export const getAllRestaurants = async() => {
    try{
        const {data}  = await api.getAllRestaurants();
        return data;
    } catch(error){
        console.log(error);
    }
}

export const getRestaurantById = async(id)  => {
    try{
        const {data} = await api.getRestaurantById(id);
        return data;
    }catch(error){
        console.log(error);
    }
}

export const getRestaurantsBySearch = async(search) => {
    try{
        const {data} = await api.getRestaurantsBySearch(search);
        return data;
    }catch(error){
        console.log(error);
    }
} 

export const getRestaurantItems = async(id) => {
    try{
        const {data} = await api.getRestaurantItems(id);
        return data;
    }catch(error){
        console.log(error);
    }
}

export const getRestaurantItemsBySearch = async(props) => {
    try{
        const {data} = await api.getRestaurantItemsBySearch(props);
        return data;
    }catch(error){
        console.log(error);
    }
}

export const addFood = async(foodItem) => {
    try{
        const {data} = await api.addFood(foodItem);
        return data;
    }catch(error){
        console.log(error);
    }
}

export const deleteFood = async({sellerId,foodId}) => {
    try{
        const {data} = await api.deleteFood({sellerId,foodId});
        return data;
    }catch(error){
        console.log(error);
    }
}

export const updateFood = async(foodItem) => {
    try{
        const {data} = await api.updateFood(foodItem);
        return data;
    }catch(error){
        console.log(error);
    }
}

export const updateRestaurant = async(item) => {
    try{
        const {data} = await api.updateRestaurant(item);
        return data;
    }catch(error){
        console.log(error);
    }
}