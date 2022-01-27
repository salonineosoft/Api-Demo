<template>
  <div class="col-sm-3">
				<div class="left-sidebar">
					<h2>Category</h2>
					<div class="panel-group category-products" id="accordian"><!--category-productsr-->
						<div v-for="(category,index) in categories" v-bind:key="index">
							<div class="panel panel default">
								<div class="panel-heading">
									<h4 class="panel-title"><router-link :to="`/home/${category.id}`">{{category.name}}</router-link>

									</h4>
								</div>
							<div>
						</div>
					</div>
				</div><br>
						<!--/category-products-->
					</div>
				</div>	
            </div>			
</template>

<script>
import Vue from "vue";
import axios from "axios";
import  constant  from '@/common/Constant';
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
export default {
name:"Sidebar",
data(){
	return {
		categories:null,
	};
  },
  mounted(){
	const url = constant.API_URL+'category';
	axios.get(url).then((res) => {
	console.log(res.data);
	this.categories = res.data;
	});
  },
};
</script>

<style>
.panel-title{
	text-transform: capitalize;
}
</style>