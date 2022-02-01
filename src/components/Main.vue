<template>
  <section>
    <Slider />
    <section>
      <div class="container" width="850px" height="100px">
        <div class="row">
          <Sidebar />
          <div class="col-sm-9 padding-right">
            <div class="features_items">
              <!--features_items-->
              <h2 class="title text-center">Features Items</h2>
              <div
                class="col-sm-4"
                v-for="(product, index) in product_price"
                :key="index"
              >
                <div class="product-image-wrapper">
                  <div class="single-products">
                    <div class="productinfo text-center">
                      <router-link :to="`/Productdetails/${product.id}`">
                        <img
                          :src="url + product.images[0].image"
                          alt=""
                          height="270px"
                          width="370px"
                        />
                      </router-link>
                      <h5>
                        <b>Product Name: {{ product.name }}</b>
                      </h5>
                      <h5>
                        <del>Price: &#x20B9;{{ product.price }}.00</del>
                      </h5>
                      <h4>
                        Sale Price: <b>&#x20B9;{{ product.sale_price }}.00</b>
                      </h4>
                      <a href="#" class="btn btn-default add-to-cart"
                        ><i
                          class="fa fa-shopping-cart"
                          @click="addCartBtn(product)"
                          >Add to cart
                        </i></a
                      >
                    </div>
                  </div>
                  <div class="choose">
                    <ul class="nav nav-pills nav-justified">
                      <li>
                        <a @click="postWish(product)"
                          ><i class="fa fa-plus-square"></i>Add to wishlist</a
                        >
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!--features_items--><br />

            <div class="category-tab">
              <!--category-tab-->
            </div>
            <!--/category-tab-->

            <div class="recommended_items"></div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import Slider from "./includes/Slider.vue";
import constant from "@/common/Constant";
import { userWish } from "@/common/Service";
import { products } from "@/common/Service";
import Sidebar from "./includes/Sidebar.vue";
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
export default {
  name: "Main",
  data() {
    return {
      paramm: undefined,
      product_image: "",
      product_price: "",
      product_name: "",
      url: constant.UPLOAD_PATH,
      user_mail: localStorage.getItem("uid"),
    };
  },
  components: {
    Slider,
    Sidebar,
  },
  methods: {
    /* Method For Add Item Into WishList */
    /* If Item same Item Found into Wishlist Then Its Show alert Message For Item Already Added To Wishlist*/
    postWish(pro) {
      console.log(pro, "pro");
      let obj = {
        user_email: this.user_mail,
        product_id: pro.id,
        product_price: pro.sale_price,
        product_name: pro.name,
        product_image: pro.images[0].image,
      };

      userWish(obj)
        .then((res) => {
          if (res.data.message == "Already Added") {
            this.$swal("Already Added", "", "error");
          } else {
            this.$swal("Added to Wishlist.", "", "success");
          }
        })
        .catch((err) => {
          console.log("Something Wrong " + err);
        });
    },

    /* Function For Add Item Into Cart */
    /* If Item same Item Found into Cart Then Its Show alert Message For Item Already Added To Cart*/
    addCartBtn(pro) {
      if (localStorage.getItem("mycart") != undefined) {
        let arr = JSON.parse(localStorage.getItem("mycart"));
        let obj = {
          pro_id: pro.id,
          quantity: 1,
          product_id: pro.product_id,
          sale_price: pro.sale_price,
          product_name: pro.name,
          image: pro.images[0].image,
        };
        const found = arr.some((item) => item.pro_id == pro.id);
        if (found) {
          this.$swal("Already  Added", "", "error");
        } else {
          arr.push(obj);
          localStorage.setItem("mycart", JSON.stringify(arr));
          this.$store.dispatch("addToCart", arr);
          this.$swal("Successfully Added.", "", "success");
          window.location.reload();
        }
      } else {
        let arr = [];
        let obj = {
          pro_id: pro.id,
          quantity: 1,
          product_id: pro.product_id,
          sale_price: pro.sale_price,
          product_name: pro.name,
          product_image: pro.image_path,
        };
        arr.push(obj);
        localStorage.setItem("mycart", JSON.stringify(arr));
        this.$store.dispatch("addToCart", arr);
        this.$swal("successfully added", "", "success");
        this.$router.push("/cart");
      }
    },
  },
  mounted() {
    products().then((res) => {
      this.product_price = res.data.product;
      console.log(this.product_price);
    });
  },
};
</script>

<style>
</style>