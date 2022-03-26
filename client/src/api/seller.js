import axios from 'axios';

const API = axios.create({baseURL:`${process.env.REACT_APP_SERVER_URL}api/seller`});


API.interceptors.request.use((req)=>{
    if(localStorage.getItem('seller')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('seller')).token}` ;
    }
    return req;
});


export const signIn = (formData) => API.post('/signin',formData);
export const signUp = (formData) => API.post('/signup',formData);

export const updateRestaurant = (data) => API.patch(`/update/${data?.sellerId}`,data.formdata);

export const getAllRestaurants = () => API.get('/'); 
export const getRestaurantById = (id) => API.get(`/${id}`);
export const getRestaurantsBySearch = (search) => API.get(`/search?searchQuery=${search}`);
export const getRestaurantItems = (id) => API.get(`/${id}/items`);
export const getRestaurantItemsBySearch = (data) => API.get(`/${data.id}/items/search?searchQuery=${data.search}`);

export const addFood = (data) => API.patch(`/${data.sellerId}/addFood`,data.formdata);
export const deleteFood = (data) => API.patch(`/${data.sellerId}/deleteFood/${data.foodId}`);
export const updateFood = (data) => API.patch(`/${data.sellerId}/updateFood/${data.foodId}`,data.formdata);