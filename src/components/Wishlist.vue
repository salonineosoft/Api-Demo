<template>
  <div>
    <section id="cart_items">
      <div class="container">
        <div class="table-responsive cart_info">
          <table class="table table-condensed">
            <thead>
              <tr class="cart_menu">
                <td class="image">Item</td>
                <td class="name">Name</td>
                <td class="price">Price</td>
                <td></td>
                <td></td>
              </tr>
            </thead>
            <tbody v-for="(item, i) in carts" :key="i">
              <tr>
                <td class="cart_product">
                  <a href="">
                    <img
                      :src="url + item.product_image"
                      width="100"
                      height="70"
                      alt="Card image cap"
                  /></a>
                </td>
                <td class="product_description">
                  <h4>
                    <a href="">{{ item.product_name }}</a>
                  </h4>
                </td>
                <td class="cart_price">
                  <h4>
                    <a href="">&#x20B9;{{ item.product_price }}</a>
                  </h4>
                </td>
                <td class="cart_delete">
                  <a class="cart_quantity_delete" @click="removeCart(item.id)"
                    ><i class="fa fa-times"></i
                  ></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    <!--/#cart_items-->
  </div>
</template>

<script>
import { userWishlist } from "@/common/Service";
import constant from "@/common/Constant";
import { deletewishlist } from "@/common/Service";
export default {
  name: "Wishlist",
  data() {
    return { carts: undefined, url: constant.UPLOAD_PATH };
  },
  methods: {
    removeCart(id) {
      deletewishlist(id).then((res) => {
        var del = this.carts.indexOf(id);
        this.carts.splice(del, 1);
        console.log(res.data);
        localStorage.setItem("mycart", JSON.stringify(this.carts));
      });
    },
  },

  mounted() {
    userWishlist()
      .then((res) => {
        this.carts = res.data;
        console.log(res.data);
      })

      .catch((error) => {
        console.log("Something went " + error);
      });
  },
};
</script>

<style>
</style>