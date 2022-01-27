<template>
  <div>
    <section id="cart_items">
      <div class="container">
        <div class="table-responsive cart_info">
          <table class="table table-condensed">
            <thead>
              <tr class="cart_menu">
                <td class="image">Item</td>
                <td></td>
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
                <td></td>
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
                    <button
                      class="btn btn-success btn-sm"
                      @click="addItem(item)">
                      +
                    </button>
                    <input type="text"  v-model="item.quantity" />
                     <button
                      class="btn btn-danger btn-sm"
                      @click="subItem(item)">- </button>
                  </div>
                </td>
                <td class="cart_total">					
					<h4><b><span>&#x20B9;{{ item.quantity * item.sale_price }}</span></b></h4>
					<!-- {{ total += (parseInt(item.quantity) * parseInt(item.price)) }} -->
                <a href="">{{total}}</a>
                </td>
                <td class="cart_delete">
                  <a class="cart_quantity_delete"  @click="removeCart(item)"
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
import  constant  from '@/common/Constant';
export default {
  name: "Cart",
  data() {
    return { carts:[], url:constant.UPLOAD_PATH};
  },
  created() {
    this.viewCart();
  },
  methods: {
    viewCart() {
      if (localStorage.getItem("mycart")) {
        this.carts = JSON.parse(localStorage.getItem("mycart"));
        console.log(this.carts);
        //console.log(carts,'carts');
      }
    },

	addItem(carts) {
    Object.assign(carts,{
		quantity:parseInt(carts.quantity)+1,
	});
		localStorage.setItem("mycart",JSON.stringify(this.carts));
    },
	subItem(carts) {
      Object.assign(carts,{
		quantity:parseInt(carts.quantity)-1,
	});
		localStorage.setItem("mycart",JSON.stringify(this.carts));
    },
	removeCart(item) {
    var del=this.carts.indexOf(item);
		this.carts.splice(del,1);
     localStorage.setItem("mycart",JSON.stringify(this.carts));
    // location.reload();
    },
  },
  mounted() {
    this.carts = JSON.parse(localStorage.getItem("mycart"));   
    console.log(this.carts);
  },
};
</script>

<style>
.product_name{
  margin-left: 13px;
}
</style>