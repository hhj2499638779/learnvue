<template>
<div class="index">
 <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item, index) in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(itemSon, index) in item.subcates" :key="itemSon.id">
                                                {{itemSon.title}}&nbsp;
                                            </span>
                                           
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="(itemSon, i) in item.subcates" :key="itemSon.id" href="/goods/43.html">{{itemSon.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                               
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片
                         <el-carousel height="341px" indicator-position="outside">
                            <el-carousel-item v-for="(item, index) in sliderlist" :key="item.id">
                                <img :src="item.img_url" alt="">
                            </el-carousel-item>
                        </el-carousel>
                    
                    -->
                    <div class="left-705">
                <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <div v-for="(item, index) in sliderlist" :key="item.id" class="swiper-slide">  <img :src="item.img_url" alt=""></div>
                            
                        </div>
                        <!-- 如果需要分页器 -->
                        <div class="swiper-pagination"></div>
                        
                        <!-- 如果需要导航按钮 -->
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                        
                        <!-- 如果需要滚动条 -->
                        <div class="swiper-scrollbar"></div>
                    </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.tilte}}</a>
                                    <span>{{item.add_time | cutTime}}</span>
                                </div>
                            </li>
                          
                           
                           
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="(item, index) in goodlist" :key="item.level1cateid" class="section">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a v-for="(itemSon, index) in item.level2catelist" :key="itemSon.subcateid" href="/goods/43.html">{{itemSon.subcatetitle}}</a>
                   
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(itemSon, index) in item.datas" :key="itemSon.artID">
                            <!-- 传值 -->
                             <router-link :to="'/goodsInfo/'+itemSon.artID">
                              <div class="img-box">
                                    <img  v-lazy="itemSon.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{itemSon.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{itemSon.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{itemSon.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itemSon.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                             
                             </router-link>
                          
                        </li>
                       
                       
                    </ul>
                </div>
            </div>
        </div>
       
       
       
</div>
</template>
<script>
import axios from "axios";
import Swiper from "swiper";
export default {
  data: function() {
    return {
      catelist: [],
      sliderlist: [],
      toplist: [],
      goodlist: []
    };
  },

  //即将显示时调用
  //获取顶部时数据
  beforeMount() {
    this.axios
      .get("/site/goods/gettopdata/goods")
      .then(response => {
        this.catelist = response.data.message.catelist;
        this.sliderlist = response.data.message.sliderlist;
        this.toplist = response.data.message.toplist;
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      }),
      //渲染商品列表时数据
      this.axios
        .get("/site/goods/getgoodsgroup")
        .then(response => {
          this.goodlist = response.data.message;
        })
        .catch(error => {
          console.log(error);
        });
  },
  mounted() {
    var mySwiper = new Swiper(".swiper-container", {
      // direction: 'vertical',
      loop: true,

      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination"
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },

      // 如果需要滚动条
      //.el-carousel img{
      //  width:100%;
      //  height:100%;

      // }
      scrollbar: {
        el: ".swiper-scrollbar"
      }
    });
  }
};
</script>
<style scoped>
.swiper-container {
  height: 341px;
}
.swiper-container img {
  display: block;
  width: 100%;
  height: 100%;
}
@import url("../../node_modules/swiper/dist/css/swiper.min.css");
</style>
