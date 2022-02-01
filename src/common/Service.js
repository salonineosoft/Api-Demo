import axios from 'axios';
import  constant  from '@/common/Constant';

/* Login Function */
export function userLogin(data)
{
    return axios.post(`${constant.API_URL}login`,data)
}

/* Register Fuction */
export function userRegister(data)
{
    return axios.post(`${constant.API_URL}register`,data)
}

/* Contact Function */
export function contact(data)
{       
    return axios.post(`${constant.API_URL}contact`,data)
}

/* Function For UserDetails */
export function userDetails(data)
{       
    return axios.post(`${constant.API_URL}userDetails`,data)
}

/* Function For Category */
export function category(id)
{
    return axios.get(`${constant.API_URL}category/${id}`)
}

/* Function For Products */
export function products()
{
    return axios.get(`${constant.API_URL}products`)
}

/* Function For Banners */
export function banners()
{
    return axios.get(`${constant.API_URL}banners`)
}

/* Functions For Category */
export function categories()
{
    return axios.get(`${constant.API_URL}categories`)
}

/* Function For Configration */
export function configration()
{
    return axios.get(`${constant.API_URL}Configration`)
}

/* Function For ProductsDetails */
export function productDetails(id)
{
    return axios.get(`${constant.API_URL}products/${id}`)
}

/* Function For EditProfile */
export function profiledit(data)
{
    var token = localStorage.getItem('access_token');
    return axios.post(`${constant.API_URL}updateprofile`,data, { headers: { "Authorization": `Bearer ${token}` } })
}

/* Function For ShowProfile */
export function profile()
{
    var token = localStorage.getItem('access_token');
    return axios.get(`${constant.API_URL}profile`, { headers: { "Authorization": `Bearer ${token}` } })
}

/* Function For ChangePAssword */
export function changePassword(data)
{
    var token = localStorage.getItem('access_token');
    return axios.post(`${constant.API_URL}changepassword`,data, { headers: { "Authorization": `Bearer ${token}` } })
}

/* Function For CMS */
export function cms()
{
    return axios.get(`${constant.API_URL}cms`)
}
export function cmsById(id)
{
    return axios.get(`${constant.API_URL}cms/${id}`)
}

/* Function For Logout */
export function logout(data)
{
    return axios.post(`${constant.API_URL}logout`,data)
}

/* Function For Delete WishList */
export function deletewishlist(id){
    return axios.delete(`${constant.API_URL}wishlist/${id}`)
}

/* Function For Add Wishlist */
export function userWish(data)
{
    return axios.post(`${constant.API_URL}wishlist`,data)
}

/* Function For OrderDetails */
export function orderDetails(data)
{
    return axios.post(`${constant.API_URL}orderDetails/`,data)
}

/* Function For Show Order */
export function Showorder(id)
{
    return axios.get(`${constant.API_URL}orderDetails/${id}`)
}

/* Function For Geting Data Into Wishlist */
export function userWishlist()
{
    return axios.get(`${constant.API_URL}wishlist`)
}

/* Function For Coupons */
export function coupons(data)
{
    return axios.get(`${constant.API_URL}coupons/${data}`)
}

/* Function For NewsLetter */
export function NewsLetter(data)
{
    return axios.post(`${constant.API_URL}NewsLetter`,data)
}

export default {userLogin,userRegister,contact};
