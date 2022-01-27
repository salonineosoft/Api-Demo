import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import Main from '../components/Main.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);
import Contact from '../components/Contact.vue'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import Cart from '../components/Cart.vue'
import Profile from '../components/Profile.vue'
import Updateprofile from '../components/Updateprofile.vue'
import Productdetails from '../components/Productdetails.vue'
import Changepassword from '../components/Changepassword.vue'
import Wishlist from '../components/Wishlist.vue'
import Checkout from '../components/Checkout.vue'
import Cms from '../components/Cms.vue'
import Order from '../components/Order.vue'
function myGuard(to, from, next) {
    let isAuthenticated = false;
    if (localStorage.getItem('uid') != undefined) {
        isAuthenticated = true;
    }
    else {
        isAuthenticated = false;
    }
    if (isAuthenticated) {
        next(); //allow to enter route
    }
    else {
        alert("You are not authorize to view this.");
        next("/login");
    }
}
export default new Router({   
    routes:[
        {
            path:'/',
            name:'Main',
            component:Main
        },
        {
            path:'/Updateprofile',
            name:'Updateprofile',
            beforeEnter: myGuard,
            component:Updateprofile
        },
        {
            path:'/changepassword',
            name:'Changepassword',
            beforeEnter: myGuard,
            component:Changepassword
        },
        {
            path:'/home/:id',
            name:'Home',
            component:Home
        },
        {
            path:'/profile',
            name:'Profile',
            beforeEnter: myGuard,
            component:Profile
        },
        {
            path: '/productdetails/:id',
            name: 'Productdetails',
            component: Productdetails
        },
        {
            path:'/contact',
            name:'Contact',
            component:Contact
        },
        {
            path:'/login',
            name:'Login',
            component:Login
        },{
            path:'/cart',
            name:'Cart',
            component:Cart
        },
        {
            path:'/checkout',
            name:'Checkout',
            component:Checkout
        },
        {
            path: '/wishlist',
            name: 'Wishlist',
            component: Wishlist
        },
        {
            path:'/cms/:id',
            name:'Cms',
            component:Cms
        },
        {
            path: '/order',
            name: 'Order',
            beforeEnter: myGuard,
            component: Order
        }
    ]
})