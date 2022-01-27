<template>
  <section>
    <div class="container">
      <div class="row">
        <div class="col-sm-9 padding-right">
          <div class="product-details">
            <!--product-details-->
            <div class="col-sm-5">
              <div class="view-product">
                <img :src="server + images[0].image" alt="" />
              </div>
              <div
                id="similar-product"
                class="carousel slide"
                data-ride="carousel"
              >
                <!-- Wrapper for slides -->
                <div class="carousel-inner">
                  <div class="item active">
                    <a
                      href=""
                      v-for="(image, index) in images"
                      v-bind:key="index"
                      ><img :src="server + image.image" alt=""
                    /></a>
                  </div>
                </div>

                <!-- Controls -->
                <a
                  class="left item-control"
                  href="#similar-product"
                  data-slide="prev"
                >
                  <i class="fa fa-angle-left"></i>
                </a>
                <a
                  class="right item-control"
                  href="#similar-product"
                  data-slide="next"
                >
                  <i class="fa fa-angle-right"></i>
                </a>
              </div>
            </div>
            <div class="col-sm-7">
              <div class="product-information">
                <!--/product-information-->
                <img
                  src="images/product-details/new.jpg"
                  class="newarrival"
                  alt=""
                />
                <h2>{{ details.name }}</h2>
                <p>Web ID: {{ details.product_id }}</p>
                <img src="images/product-details/rating.png" alt="" />
                <span>
                  <span>&#8377; {{ details.price }}</span>
                  <label>Quantity:</label>
                  <input type="text" v-model="details.quantity" />
                  <button
                    type="button"
                    class="btn btn-fefault cart"
                    @click="addCartBtn(details)"
                  >
                    <i class="fa fa-plus-square"></i>Add to cart
                  </button>
                  <!-- <li>
                    <router-link to="/addCartBtn(product)"
                      >Add Cart</router-link
                    >
                  </li> -->
                </span>
                <p v-if="details.status == 1"><b>Availability:</b> In Stock</p>
                <p v-if="details.status == 0">
                  <b>Availability:</b> Out of Stock
                </p>
                <p><b>Features:</b> {{ details.description }}</p>
                <p><b>Brand:</b> E-SHOPPER</p>
                <a href=""
                  ><img
                    src="images/product-details/share.png"
                    class="share img-responsive"
                    alt=""
                /></a>
              </div>
              <!--/product-information-->
            </div>
          </div>
          <!--/product-details-->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { productDetails, products } from "@/common/Service.js";
import constant from "@/common/Constant";
export default {
  name: "Productdetails",
  data() {
    return {
      pid: this.$route.params.id,
      server: constant.UPLOAD_PATH,
      details: null,
      images: null,
    };
  },
  methods: {
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
          this.$swal("already  added", "", "error");

          this.$router.push("/cart");
        } else {
          arr.push(obj);
          localStorage.setItem("mycart", JSON.stringify(arr));
          this.$store.dispatch("addToCart", arr);
          this.$swal("successfullt added", "", "success");
          this.$router.push("/cart");
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
        alert("Product Added to Cart");
        this.$router.push("/cart");
      }
    },
  },
  mounted() {
    productDetails(this.pid).then((res) => {
      console.log(res.data);
      this.details = res.data.product_price;
      this.images = res.data.product_image;
    });
    products().then((res) => {
      this.product_price = res.data.product;
      console.log(this.product_price);
    });
  },
};
</script>

<style>
</style>
            