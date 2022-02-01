<template>
  <section>
    <section>
      <div class="container">
        <div class="row">
          <Sidebar />
          <div class="col-sm-9 padding-right">
            <div class="features_items">
              <!--features_items-->

              <h2 class="title text-center">Features Items</h2>
              <div class="col-sm-4" v-for="product of detail" :key="product.id">
                <div class="product-image-wrapper">
                  <div class="single-products">
                    <div class="productinfo text-center">
                      <router-link
                        :to="`/Productdetails/${product.product_id}`"
                      >
                        <img
                          class="card-img-top"
                          :src="server + product.image"
                          width="200"
                          height="150"
                          alt="Card image cap"
                      /></router-link>
                      <h2>{{ product.name }}</h2>
                      <p>price: &#x20B9;{{ product.price }}</p>
                    </div>
                  </div>
                  <div class="choose">
                    <ul class="nav nav-pills nav-justified"></ul>
                  </div>
                </div>
              </div>
            </div>
            <!--features_items-->

            <div class="category-tab"></div>
            <!--/category-tab-->

            <div class="recommended_items">
              <!--recommended_items-->
              <h2 class="title text-center">recommended items</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
import { category } from "@/common/Service";
import constant from "@/common/Constant";
import Sidebar from "./includes/Sidebar.vue";
export default {
  name: "Home",
  data() {
    return {
      category: undefined,
      products: undefined,
      paramm: undefined,
      detail: "",
      server: constant.UPLOAD_PATH,
    };
  },
  components: {
    Sidebar,
  },
  mounted() {
    category(this.paramm).then((response) => {
      console.log(response.data);
      this.detail = response.data;
    });
  },
  watch: {
    $route(to) {
      this.paramm = to.params.id;
      category(this.paramm).then((response) => {
        this.detail = response.data;
      });
    },
  },
  created() {
    this.paramm = this.$route.params.id;
  },
};
</script>

<style>
</style>