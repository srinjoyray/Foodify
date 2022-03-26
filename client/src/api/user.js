import axios from 'axios';

const API = axios.create({baseURL:`${process.env.REACT_APP_SERVER_URL}api/user`});

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('user')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}` ;
    }
    return req;
});


export const signIn = (formData) => API.post('/signin',formData);
export const signUp = (formData) => API.post('/signup',formData);

export const addToCart = (data) => API.patch('/addToCart',data);
export const decrementCart = (data) => API.patch('/decrementCart',data);
export const removeFromCart = (data) => API.patch('/removeFromCart',data);
export const getCart = (id) => API.get(`/${id}/cart`);
export const getUserById = (id) => API.get(`/${id}`);
export const updateUser = (user) => API.patch(`/update/${user._id}`,user);
