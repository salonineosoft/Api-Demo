<template>
  <header id="header">
    <!--header-->
    <div class="header_top">
      <!--header_top-->
      <div class="container">
        <div class="row">
          <div class="col-sm-6">
            <div class="contactinfo">
              <ul class="nav nav-pills">
               <li>
                    <a href="#"><i class="fa fa-email">{{conf[0].notification_email}}</i></a>
                  </li>
                <li>
                   <a href="#"><i class="fa fa-phone"></i>{{conf[0].mobile_number}} </a> 
                </li>
                
              </ul>
            </div>
          </div>
          <div class="col-sm-6">
            <div class="social-icons pull-right">
              <ul class="nav navbar-nav">
                <li>
                  <a href="#"><i class="fa fa-facebook"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-twitter"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-linkedin"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-dribbble"></i></a>
                </li>
                <li>
                  <a href="#"><i class="fa fa-google-plus"></i></a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/header_top-->

    <div class="header-middle">
      <!--header-middle-->
      <div class="container">
        <div class="row">
          <div class="col-sm-4">
            <div class="logo pull-left">
              <a href="index.html"><img src="images/home/logo.png" alt="" /></a>
            </div>
            <div class="btn-group pull-right">
              <div class="btn-group">
                <!-- <button
                  type="button"
                  class="btn btn-default dropdown-toggle usa"
                  data-toggle="dropdown"
                >
                  USA
                  <span class="caret"></span>
                </button> -->
                <ul class="dropdown-menu">
                  <li><a href="#">Canada</a></li>
                  <li><a href="#">UK</a></li>
                </ul>
              </div>

              <div class="btn-group">
                <!-- <button
                  type="button"
                  class="btn btn-default dropdown-toggle usa"
                  data-toggle="dropdown"
                >
                  DOLLAR
                  <span class="caret"></span>
                </button> -->
                <ul class="dropdown-menu">
                  <li><a href="#">Canadian Dollar</a></li>
                  <li><a href="#">Pound</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-sm-8">
            <div class="shop-menu pull-right">
              <ul class="nav navbar-nav">
                <li>
                  <router-link to="/wishlist"  v-if="msg" >Wishlist </router-link>
                </li>
                <li>
                  <router-link to="/cart"   v-if="msg"
                    ><i class="fa fa-shopping-cart"></i> Cart({{
                      numInCart.length
                    }})</router-link
                  >
                </li>

                <li>
                  <router-link to="/checkout"  v-if="msg"
                    ><i class="fa fa-crosshairs"></i> Checkout</router-link
                  >
                </li>

                <li>
                  <router-link to="#" v-if="msg"
                    >Welcome {{ useremail }}
                  </router-link>
                </li>
                <li>
                  <!-- <button @click="logout()" v-if="msg">Logout</button> -->
                  <router-link
                        to="/login"
                        @click.native="logout()"
                        v-if="msg"
                        >Logout
                      </router-link>
                  <router-link to="/login" v-if="!msg">Login </router-link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--/header-middle-->

    <div class="header-bottom">
      <!--header-bottom-->
      <div class="container">
        <div class="row">
          <div class="col-sm-9">
            <div class="navbar-header">
              <button
                type="button"
                class="navbar-toggle"
                data-toggle="collapse"
                data-target=".navbar-collapse"
              >
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            </div>
            <div class="mainmenu pull-left">
              <ul class="nav navbar-nav collapse navbar-collapse">
                <li><router-link to="/" class="active">Home</router-link></li>
                <li class="dropdown">
                  <a href="#" v-if="msg" >Shop<i class="fa fa-angle-down"></i></a>
                  <ul role="menu" class="sub-menu">
                    <li>
                      <router-link to="/checkout" 
                        ><i class="fa fa-crosshairs"></i> Checkout</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/cart" 
                        ><i class="fa fa-shopping-cart"></i>Cart({{
                          numInCart.length
                        }})</router-link
                      >
                    </li>

                    <li></li>
                    <li>
                      <router-link
                        to="/login"
                        @click.native="logout()"
                        v-if="msg"
                        >Logout
                      </router-link>
                      <router-link to="/login" v-if="!msg">Login </router-link>
                    </li>
                  </ul>
                </li>
                <li class="dropdown">
                  <a href="#">Profile<i class="fa fa-angle-down"></i></a>
                  <ul role="menu" class="sub-menu">
                    <li>
                      <router-link to="/profile" 
                        >My Account</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/Updateprofile" 
                        >Edit Account</router-link
                      >
                    </li>
                    <li>
                      <router-link to="/changepassword" 
                        >Change Password</router-link
                      >
                    </li>
                  </ul>
                </li>
                <li class="dropdown">
                  <a href="#">Explore<i class="fa fa-angle-down"></i></a>
                  <ul role="menu" class="sub-menu">
                    <li v-for="(c, index) in cms" :key="index">
                      <router-link :to="`/cms/${c.id}`">{{
                        c.title
                      }}</router-link>
                    </li>
                    <li>
                      <router-link to="/order" 
                        >My order
                      </router-link>
                    </li>
                  </ul>
                </li>
                <li>
                  <router-link to="/contact">Contact Us </router-link>
                </li>
              </ul>
            </div>
          </div>
          <!-- <div class="col-sm-3">
            <div class="search_box pull-right">
              <input type="text" placeholder="Search" />
            </div>
          </div> -->
        </div>
      </div>
    </div>
    <!--/header-bottom-->
  </header>
</template>

<script>
import { mapState } from "vuex";
import { cms } from "@/common/Service";
//import { configration } from "@/common/Service";
import constant from "@/common/Constant";
import store from "../store/store";
import * as type from "../store/type";
import { getToken } from "@/common/Jwttoken";
import axios from "axios";
export default {
  name: "Header",
  data() {
    return {
      cms: [],
     conf:undefined,
      useremail: localStorage.getItem("uid"),
      numInCart: JSON.parse(localStorage.getItem("mycart")),

    };
  },
  computed: mapState({
    //numInCart:(state) => state.inCart,
    msg: (state) => state.opt,
    loginn: (state) => state.islogin,
    user: (state) => state.emailId,
    inCart() {
      return this.$store.getters.inCart;
    },
   // numInCart() { return this.$state.inCart.length},
  }),
  methods: {
    logout() {
      const token = getToken();
      const url = constant.API_URL + "logout";
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const data = token;
      axios.post(url, data, config).then((res) => {
        this.$router.push("/login");
        store.dispatch({
          type: type.Opt,
          id: null,
          userId: null,
        });
        console.log(res.data.message);
        localStorage.clear();
      });
    },
    showcms() {
      cms()
        .then((res) => {
          this.cms = res.data.cms;
          console.log(this.cms);
        })
        .catch((error) => {
          console.log("Something Wrong " + error);
        });
    },
    show() {
    //this.$store.dispatch('')
      if ("access_token" in localStorage) {
        store.dispatch({
          type: type.Opt,
          id: getToken(),
          userId: localStorage.getItem("uid"),
        });
      }
    },
  },
  mounted: function mounted() {
    this.show();
    this.showcms();
  },
   created() {
    const url = constant.API_URL + "Configration";
    axios.get(url).then((res) => {
     this.conf=res.data.config;
      console.log(this.conf);
    });
  },
};
</script>

<style>
</style>