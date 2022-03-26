import axios from 'axios';
// http://localhost:5000/
// https://foodify---backend.herokuapp.com/

const API = axios.create({baseURL:`${process.env.REACT_APP_SERVER_URL}api/order`});

export const razorpay = (data) => API.post('/razorpay',data);
export const placeOrder = (data) => API.post('/placeOrder',data);
export const getOrdersByUserId = (id) =>API.get(`/user/${id}`);
export const getOrdersBySellerId = (id) =>API.get(`/seller/${id}`);
export const updateStatus = (id) => API.patch(`updateStatus/${id}`);