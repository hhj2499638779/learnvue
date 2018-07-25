import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import index from './components/index.vue'
import vipcenter from './components/vipcenter'
import orderlist from './components/sons/orderlist.vue'
Vue.use(VueRouter)
Vue.config.productionTip = false

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
      path: '/vipcenter',
      component: vipcenter
    },
    {
      path: '/orderlist',
      component: orderlist
    },
  ]
})
// import './assets/statics/site/css/style.css'
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})