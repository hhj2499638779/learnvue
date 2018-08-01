<template>

    <div>
        <div class="section">
            <div class="location">
                <span>
                    <font style="vertical-align: inherit;">
                        <font style="vertical-align: inherit;">当前位置：</font>
                    </font>
                </span>
                <a href="/index.html">
                    <font style="vertical-align: inherit;">
                        <font style="vertical-align: inherit;">首页</font>
                    </font>
                </a>
                <font style="vertical-align: inherit;">
                    <font style="vertical-align: inherit;"> &gt;
                    </font>
                </font>
                <a href="/cart.html">
                    <font style="vertical-align: inherit;">
                        <font style="vertical-align: inherit;">购物车</font>
                    </font>
                </a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>
                            <font style="vertical-align: inherit;">
                                <font style="vertical-align: inherit;">我的购物车</font>
                            </font>
                        </h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>
                                            <font style="vertical-align: inherit;">
                                                <font style="vertical-align: inherit;">1</font>
                                            </font>
                                        </span>
                                        <font style="vertical-align: inherit;">
                                            <font style="vertical-align: inherit;">
                                                放进购物车
                                            </font>
                                        </font>
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>
                                            <font style="vertical-align: inherit;">
                                                <font style="vertical-align: inherit;">2</font>
                                            </font>
                                        </span>
                                        <font style="vertical-align: inherit;">
                                            <font style="vertical-align: inherit;">
                                                填写订单信息
                                            </font>
                                        </font>
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>
                                            <font style="vertical-align: inherit;">
                                                <font style="vertical-align: inherit;">3</font>
                                            </font>
                                        </span>
                                        <font style="vertical-align: inherit;">
                                            <font style="vertical-align: inherit;">
                                                支付/确认订单
                                            </font>
                                        </font>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>
                                            <font style="vertical-align: inherit;">
                                                <font style="vertical-align: inherit;">选择</font>
                                            </font>
                                        </a>
                                    </th>
                                    <th align="left" colspan="2">
                                        <font style="vertical-align: inherit;">
                                            <font style="vertical-align: inherit;">商品信息</font>
                                        </font>
                                    </th>
                                    <th width="84" align="left">
                                        <font style="vertical-align: inherit;">
                                            <font style="vertical-align: inherit;">单价</font>
                                        </font>
                                    </th>
                                    <th width="104" align="center">
                                        <font style="vertical-align: inherit;">
                                            <font style="vertical-align: inherit;">数量</font>
                                        </font>
                                    </th>
                                    <th width="104" align="left">
                                        <font style="vertical-align: inherit;">
                                            <font style="vertical-align: inherit;">金额（元）</font>
                                        </font>
                                    </th>
                                    <th width="54" align="center">
                                        <font style="vertical-align: inherit;">
                                            <font style="vertical-align: inherit;">操作</font>
                                        </font>
                                    </th>
                                </tr>
                                <tr v-if="message.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>
                                                    <font style="vertical-align: inherit;">
                                                        <font style="vertical-align: inherit;">购物车没有商品！</font>
                                                    </font>
                                                </strong>
                                                <p>
                                                    <font style="vertical-align: inherit;">
                                                        <font style="vertical-align: inherit;">您的购物车为空，
                                                        </font>
                                                    </font>
                                                    <a href="/index.html">
                                                        <font style="vertical-align: inherit;">
                                                            <font style="vertical-align: inherit;">马上去购物</font>
                                                        </font>
                                                    </a>
                                                    <font style="vertical-align: inherit;">
                                                        <font style="vertical-align: inherit;">吧！</font>
                                                    </font>
                                                </p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for="(item, index) in message" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch v-model="item.isSelected" active-color="#409eff" inactive-color="#555555">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo"><img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <el-input-number @change="countChange($event,index)" v-model="item.buycount" size="mini" :min="1" :max="10" label="描述文字"></el-input-number>
                                    </td>
                                    <td width="104" align="left">{{item.buycount*item.sell_price}}</td>
                                    <td width="54" align="center">
                                        <a @click="delIndex=index;showModal=true" href="javascript:void(0)">删除</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{totalSize}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalCount}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">
                                <font style="vertical-align: inherit;">
                                    <font style="vertical-align: inherit;">继续购物</font>
                                </font>
                            </button>
                            <router-link to="/payOrder">
                                <button type="submit">
                                    <font style="vertical-align: inherit;">
                                        <font style="vertical-align: inherit;">立即结算</font>
                                    </font>

                                </button>
                            </router-link>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
        <div id="goog-gt-tt" class="skiptranslate" dir="ltr">
            <div style="padding: 8px;">
                <div>
                    <div class="logo">
                        <img src="https://www.gstatic.com/images/branding/product/1x/translate_24dp.png" width="20" height="20" alt="Google 翻译">
                    </div>
                </div>
            </div>
            <div class="top" style="padding: 8px; float: left; width: 100%;">
                <h1 class="title gray">原文</h1>
            </div>
            <div class="middle" style="padding: 8px;">
                <div class="original-text"></div>
            </div>
            <div class="bottom" style="padding: 8px;">
                <div class="activity-links">
                    <span class="activity-link">提供更好的翻译建议</span>
                    <span class="activity-link"></span>
                </div>
                <div class="started-activity-container">
                    <hr style="color: #CCC; background-color: #CCC; height: 1px; border: none;">
                    <div class="activity-root"></div>
                </div>
            </div>
            <div class="status-message" style="display: none;"></div>
        </div>

        <div class="goog-te-spinner-pos">
            <div class="goog-te-spinner-animation">
                <svg xmlns="http://www.w3.org/2000/svg" class="goog-te-spinner" width="96px" height="96px" viewBox="0 0 66 66">
                    <circle class="goog-te-spinner-path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
                </svg>
            </div>
        </div>
        <Modal v-model="showModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>警告</span>
            </p>
            <div style="text-align:center">
                <p>你确定要删除它?</p>

            </div>
            <div slot="footer">
                <Row>
                    <Col span="12">
                    <Button type="success" size="large" long @click="del">删除</Button>
                    </Col>
                    <Col span="12">
                    <Button type="error" size="large" @click="showModal=false" long>取消</Button>
                    </Col>
                </Row>

            </div>
        </Modal>
    </div>
</template>

<script>
export default {
  name: "buyCar",
  data: function() {
    return {
      message: [],
      showModal: false,
      delIndex: 0
    };
  },
  computed: {
    totalSize() {
      let num = 0;
      this.message.forEach(v => {
        if (v.isSelected) {
          num += v.buycount;
        }
      });
      return num;
    },
    totalCount() {
      let price = 0;
      this.message.forEach(v => {
        if (v.isSelected) {
          price += v.buycount * v.sell_price;
        }
      });
      return price;
    }
  },

  created() {
    //进来弹框显示
    this.$Spin.show();
    let buyList = this.$store.state.buyList;
    let ids = "";
    for (const key in buyList) {
      ids += key;
      ids += ",";
    }
    //判断是否有数据
    if (ids == "") {
      setTimeout(() => {
        this.message = [];
        this.$Spin.hide();
      }, 500);
      return;
    }
    ids = ids.slice(0, -1);
    this.axios
      .get(`site/comment/getshopcargoods/${ids}`)
      .then(response => {
        console.log(response);

        response.data.message.forEach((v, i) => {
          //通过id获取每一个加入购物车的数量
          v.buycount = buyList[v.id];
          v.isSelected = true;
        });
        this.message = response.data.message;
        setTimeout(() => {
          this.$Spin.hide();
        }, 500);
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    countChange(value, index) {
      this.$store.commit("changCount", {
        goodId: this.message[index].id,
        goodNum: value
      });
    },
    del() {
      // console.log(this.delIndex);
      this.$store.commit("delGoodById", this.message[this.delIndex].id);
      this.message.splice(this.delIndex, 1);
      this.showModal = false;
    }
  }
};
</script>
<style scoped>
</style>