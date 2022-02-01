<template>
  <section id="slider">
    <div class="container">
      <div class="row">
        <div class="col-sm-12">
          <div id="slider-carousel" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li
                data-target="#slider-carousel"
                data-slide-to="0"
                class="active"
              ></li>
              <li data-target="#slider-carousel" data-slide-to="1"></li>
              <li data-target="#slider-carousel" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="item active">
                <div class=" pera col-sm-6">
                  <h1><span>E</span>-SHOPPER</h1>
                  <h2>{{ banners[0].title }}</h2>
                  <p>{{ banners[0].description }}</p>
                </div>
                <div class=" img col-sm-6">
                  <img
                    v-bind:src="server + banners[0].image"
                    class="girl img-responsive"
                    alt=""
                    width="170px"
                    height="200"
                  />
                </div>
              </div>
              <div
                class="item"
                v-for="(banner, index) in banners.slice(1)"
                v-bind:key="index"
              >
                <div class="col-sm-6">
                  <h1><span>E</span>-SHOPPER</h1>
                  <h2>{{ banner.title }}</h2>
                  <p>{{ banner.description }}</p>
                  <button type="button" class="btn btn-default get">
                    Get it now
                  </button>
                </div>
                <div class="col-sm-6">
                  <img
                    v-bind:src="server + banner.image"
                    class="girl img-responsive"
                    alt=""
                    width="170px"
                    height="200"
                  />
                </div>
              </div>
            </div>
            <a
              href="#slider-carousel"
              class="left control-carousel hidden-xs"
              data-slide="prev"
            >
              <i class="fa fa-angle-left"></i>
            </a>
            <a
              href="#slider-carousel"
              class="right control-carousel hidden-xs"
              data-slide="next"
            >
              <i class="fa fa-angle-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import Vue from "vue";
import constant from "@/common/Constant";
import { banners } from "@/common/Service";
import axios from "axios";
import VueAxios from "vue-axios";
Vue.use(VueAxios, axios);
export default {
  name: "Slider",
  data() {
    return {
      server: constant.UPLOAD_PATH,
      banners: null,
    };
  },
  mounted() {
    banners(this.paramm).then((response) => {
      this.banners = response.data.banners;
    });
  },
};
</script>

<style>
.pera{
  margin-bottom:90px;
}
.img{
  margin-top:80px;
}
</style>