import Vue from 'vue'
import App from './App.vue'
//引入路由模块
import VueRouter from 'vue-router'
//引入index组件
import index from './components/index.vue'
// import vipcenter from './components/vipcenter'
import payOrder from './components/payOrder.vue'
import goodsInfo from './components/goodsInfo.vue'
import buyCar from './components/buyCar.vue'
//导入ui框架
import login from './components/login.vue'
import ElementUI from 'element-ui';
//导入css
import 'element-ui/lib/theme-chalk/index.css';
//导入懒加载插件
import moment from "moment";
import VueLazyload from 'vue-lazyload'
// import path from 'path'
import axios from 'axios';
import iView from 'iview';
import Vuex from 'vuex';
import 'iview/dist/styles/iview.css';
Vue.prototype.axios = axios;
axios.defaults.baseURL = 'http://47.106.148.205:8899';
axios.defaults.withCredentials = true
Vue.use(VueLazyload, {
  loading: require('./assets/img/01.gif')
})
//使用路中间件
Vue.use(VueRouter)
//使用ui中间件
Vue.use(ElementUI);
Vue.use(iView);
Vue.use(Vuex);
Vue.config.productionTip = false

//注册路由规则
const router = new VueRouter({
  routes: [{
      path: '/',
      component: index
    },


    {
      path: '/index',
      component: index
    },
    {
      path: '/buyCar',
      component: buyCar
    },
    {
      path: '/goodsInfo/:id',
      component: goodsInfo
    },
    {
      path: '/payOrder',
      component: payOrder
    },
    {
      path: '/login',
      component: login
    },
  ]
})

Vue.filter('cutTime', function (value) {
  return moment(value).format("YYYY-MM-DD");
})
let buyList = JSON.parse(window.localStorage.getItem('buyList')) || {};
const store = new Vuex.Store({
  state: {
    buyList,
    isLogin: false,
    fromPath: ''
  },
  getters: {
    totalCount(state) {
      let num = 0;
      for (let key in state.buyList) {
        num += parseInt(state.buyList[key])
      }
      return num;
    }
  },
  mutations: {
    buyGood(state, info) {
      if (state.buyList[info.goodId]) {
        let oldNum = parseInt(state.buyList[info.goodId]);
        oldNum += parseInt(info.goodNum);
        state.buyList[info.goodId] = oldNum;

      } else {
        // state.buyList[info.goodId]=info.goodNum;
        Vue.set(state.buyList, info.goodId, parseInt(info.goodNum));
      }
    },
    changCount(state, info) {
      state.buyList[info.goodId] = info.goodNum;
    },
    //根据id删除对象的某个属性
    delGoodById(state, id) {
      Vue.delete(state.buyList, id);
    },
    changeLogin(state, isLogin) {
      state.isLogin = isLogin;
    },
    rememberFromPath(state, path) {
      state.fromPath = path;
    }
  }
});
//路由守卫
router.beforeEach((to, from, next) => {
  // console.log(to);
  console.log(from);
  // console.log(next);
  store.commit('rememberFromPath', from.path);
  if (to.path === '/payOrder') {
    axios
      .get("/site/account/islogin")
      .then(response => {
        // console.log(response);
        if (response.data.code == "nologin") {
          //登录了
          // console.log("没登录");
          // this.$router.push("/login");
          next('/login');
        } else {
          //没有登录
          next();
        }
      })
      .catch(error => {
        // console.log(error);
      });
  } else {
    next();
  }

})
//引入css
import './assets/statics/site/css/style.css'
new Vue({
  //挂载到vue
  el: '#app',
  router,
  //渲染App组件
  store,
  render: h => h(App)
})
window.onbeforeunload = function () {
  window.localStorage.setItem('buyList', JSON.stringify(store.state.buyList));
}