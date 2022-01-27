import axios from 'axios';
import  constant  from '@/common/Constant';
export function userLogin(data)
{
    return axios.post(`${constant.API_URL}login`,data)
}
export function userRegister(data)
{
    return axios.post(`${constant.API_URL}register`,data)
}
export function contact(data)
{       
    return axios.post(`${constant.API_URL}contact`,data)
}
export function userDetails(data)
{       
    return axios.post(`${constant.API_URL}userDetails`,data)
}
export function category(id)
{
    return axios.get(`${constant.API_URL}category/${id}`)
}
export function products()
{
    return axios.get(`${constant.API_URL}products`)
}
export function banners()
{
    return axios.get(`${constant.API_URL}banners`)
}
export function categories()
{
    return axios.get(`${constant.API_URL}categories`)
}
export function configration()
{
    return axios.get(`${constant.API_URL}Configration`)
}
export function productDetails(id)
{
    return axios.get(`${constant.API_URL}products/${id}`)
}
export function profiledit(data)
{
    var token = localStorage.getItem('access_token');
    return axios.post(`${constant.API_URL}updateprofile`,data, { headers: { "Authorization": `Bearer ${token}` } })
}
export function profile()
{
    var token = localStorage.getItem('access_token');
    return axios.get(`${constant.API_URL}profile`, { headers: { "Authorization": `Bearer ${token}` } })
}
export function changePassword(data)
{
    var token = localStorage.getItem('access_token');
    return axios.post(`${constant.API_URL}changepassword`,data, { headers: { "Authorization": `Bearer ${token}` } })
}
export function cms()
{
    return axios.get(`${constant.API_URL}cms`)
}
export function cmsById(id)
{
    return axios.get(`${constant.API_URL}cms/${id}`)
}
export function logout(data)
{
    return axios.post(`${constant.API_URL}logout`,data)
}
export function deletewishlist(id){
    return axios.delete(`${constant.API_URL}wishlist/${id}`)
}
export function userWish(data)
{
    return axios.post(`${constant.API_URL}wishlist`,data)
}
export function orderDetails(data)
{
    return axios.post(`${constant.API_URL}orderDetails/`,data)
}
export function Showorder(id)
{
    return axios.get(`${constant.API_URL}orderDetails/${id}`)
}
export function userWishlist()
{
    return axios.get(`${constant.API_URL}wishlist`)
}
export function coupons(data)
{
    return axios.get(`${constant.API_URL}coupons/${data}`)
}

export default {userLogin,userRegister,contact};
