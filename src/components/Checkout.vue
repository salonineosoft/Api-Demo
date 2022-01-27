<template>
  <div>
    <section id="cart_items">
      <div class="container">
        <div class="shopper-informations text-center">
          <div class="container">
            <div class="form">
              <div class="bill-to">
                <div class="form-one">
                  <form class="col-12">
                    <input
                      type="text"
                      placeholder="First Name"
                      class="form-control"
                      v-model="user.first_name"
                      name="first_name"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      class="form-control"
                      v-model="user.last_name"
                      name="last_name"
                    />
                    <input
                      type="text"
                      placeholder="Mobile Number"
                      class="form-control"
                      v-model="user.mobile"
                      name="mobile"
                    />
                    <input
                      type="text"
                      placeholder="Address"
                      class="form-control"
                      v-model="user.address"
                      name="address"
                    />
                    <input
                      type="text"
                      placeholder="City"
                      class="form-control"
                      v-model="user.city"
                      name="city"
                    />
                    <input
                      type="text"
                      placeholder="Pin Code"
                      class="form-control"
                      v-model="user.pin_code"
                      name="pin_code"
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="review-payment">
          <h2>Review & Payment</h2>
        </div>
        <div class="table-responsive cart_info">
          <table class="table table-condensed">
            <thead>
              <tr class="cart_menu">
                <td class="image">Item</td>
                <td class="description"></td>
                <td class="price">Price</td>
                <td class="quantity">Quantity</td>
                <td class="total">Total</td>
                <td></td>
              </tr>
            </thead>
            <tbody v-for="(item, i) in carts" :key="i">
              <tr>
                <td class="cart_product">
                   <a href="">
                    <img
                      :src="url + item.image"
                      width="100"
                      height="90"
                      alt="image"
                  /></a>
                </td>
                <td class="product_description">
                  <h4><a href="">{{item.product_name}}</a></h4> 
                </td>
                <td class="cart_price">
                   <h4>
                    <a href="">&#x20B9;{{ item.sale_price }}.00</a>
                  </h4>
                </td>
                <td class="cart_quantity">
                  <div class="cart_quantity_button">
                  <a>{{ item.quantity }}</a>
                  </div>
                </td>
                <td class="cart_total">
                <h4><b><span>&#x20B9;{{parseInt(item.quantity) * parseInt(item.sale_price) }}</span></b></h4>
                </td>         
              </tr>
               </tbody>
                </table>    
             </div>
                 <tr>
              <td>
                <input type="text" v-model="code" />
                <button type="submit" @click="applyCoupon()">
                  Apply coupon
                </button>
              </td>
            </tr>
             <span class="Ammount">
              <tr>
                <td class="text-primary">Discount:-</td>
                <td>&#x20B9;{{discount}}.00</td>
              </tr>
              <tr>
                <td class="text-primary">Total</td>
                <td>&#x20B9;{{ total }}.00</td>
              </tr>
               <tr class="shipping-cost">
                    <td>Shipping Cost:-</td>
                    <td>Free</td>
                  </tr>
            </span><br>
                 <!-- <span>
              <tr >
                <td class="text-primary">Total</td>
                <td >{{ check }}</td>
              </tr>
            </span> -->
           
            <span class="d-flex align-items-end flex-column" style="height:100px;">
                <Paypal/>
              <a class="btn btn-primary" @click="orderout()">Continue</a>
            </span>                
      </div>
    </section>
    <!--/#cart_items-->
  </div>
</template>

<script>
import Paypal from "../components/Paypal.vue"
import { userDetails } from "@/common/Service";
import { orderDetails } from "@/common/Service";
import { coupons } from "@/common/Service";
import constant from "@/common/Constant";
export default {
  name: "Checkout",
  components:{Paypal},
  data() {
    return {
     url: constant.UPLOAD_PATH,
     total:0,
     discount:0,
     code:"",
      email: localStorage.getItem("uid"),
      user: {
        first_name: "",
        last_name: "",
        mobile: "",
      
        city: "",
        pin_code: "",
        address: "",    
        carts: [],   
          cartdata: {
       
        quantity: "",
       
        coupons: "",
        },
      },
    };
  },
  created() {
    this.viewCart();
    this.check();
  },
  computed: {
  
  },
  methods: {
     viewCart() {
      if (localStorage.getItem("mycart")) {
        this.carts = JSON.parse(localStorage.getItem("mycart"));
        console.log(this.carts);
      }
    },
      check() {
      const items = JSON.parse(localStorage.getItem("mycart"));
      var sum = 0;
      items.forEach((item) => {
        sum = sum + parseInt(item.sale_price) *parseInt(item.quantity);
      });
      localStorage.setItem("amount",sum);
       return this.total = sum;
    },
      applyCoupon(){
      coupons(this.code).then((res)=>{
        console.log(res.data);
       if(res.data){
          this.details = res.data.coupon;
          //console.log(this.details)
             this.$swal("Coupon applied successfully", "", "success");
            if(this.details.type=='fixed'){
              this.discount=this.details.value;
              this.total=this.total-this.details.value;
              localStorage.setItem("amount",this.total);
            }
            else{
           this.discount=this.total*(this.details.value/100);
             this.total=this.total-this.discount;
            localStorage.setItem("amount",this.total);
             
            }        
        }else{
          console.log("invalid ");
        }
      
        })
      
    },
     orderout() {
      const items = JSON.parse(localStorage.getItem("mycart"));
      items.forEach((item) => {
        let obj = {
          user_email: this.email,
          product_id: item.pro_id,
          quantity: item.quantity,
          price: item.sale_price,
          total: this.total,
          image: item.image,
        
        };
        console.log(obj);
        orderDetails(obj).then((res) => {
          if (res) {
            console.log(res.data);
         
          }
          
        });
      });
let formData = {
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.email,
        mobile: this.user.mobile,
        address: this.user.address,
        city: this.user.city,
        pin_code: this.user.pin_code,
      };       
      //console.log(formData);
      userDetails(formData)
        .then((res) => {
          if (res) {
            console.log(res.data);
            localStorage.removeItem("mycart");
            //this.$router.push("/order");
            this.$swal("ORDER PLACE SUCCESSFULLY", "", "success");
          }
        })
		// this.$router.push('/')
        .catch((err) => {
          console.log("SOmething Wrong " + err);

        });
    },
  },
};
      
</script>

<style>

</style>