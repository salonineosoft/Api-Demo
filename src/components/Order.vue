<template>
  <section>
    <div class="container">
       <h2 class="title text-center">Your Orders</h2>
      <div class="row">
        <div class="col-sm-9 padding-right">
          <div class="product-information">
            <table class="table table-dark">
              <thead>
                <tr>
                    <th scope="col">Image</th>
                  <th scope="col">User email</th>
                  <th scope="col">Product id</th>
                  <th scope="col">Price</th>
                  <th scope="col">Qunatity</th>
                  <th scope="col">Total</th>
                
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in ord" :key="i">
                   <img :src="url +
                          item.image"
                          alt=""
                          height="30px"
                          width="20px"
                      />
                  <td>{{ item.user_email }}</td>
                  <td>{{ item.product_id }}</td>
                  <td>{{ item.price }}</td>
                  <td>{{ item.quantity }}</td>
                  <td>{{ item.total }}</td>
                
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Showorder } from "@/common/Service.js";
import constant from "@/common/Constant";
export default {
  name: "Order",

  data() {
    return { url: constant.UPLOAD_PATH, email: localStorage.getItem("uid"), ord: undefined, currentPage:1,totalPages:0};
  },
  created() {
    this.order();
  },
  methods: {
    order() {
      Showorder(this.email)
        .then((res) => {
          if (res) {
            this.ord = res.data.order;
            console.log(res.data.order);
          }
        })
        .catch((err) => {
          console.log("SOmething Wrong " + err);
        });
    },
  },
};
</script>

<style>
</style>