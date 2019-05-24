import babelpolyfill from 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
//import './assets/theme/theme-green/index.css'
import VueRouter from 'vue-router'
import routes from './routes'

import store from './vuex/store'

import Vuex from 'vuex'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.prototype.$http= axios;

import 'font-awesome/css/font-awesome.min.css'

Vue.use(VueAxios,axios);

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)


Vue.config.productionTip = false;
Vue.prototype.$API = 'http://localhost:8090';

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  //NProgress.start();
  if (to.path == '/login') {
    sessionStorage.removeItem('user');
  }
  let user = JSON.parse(sessionStorage.getItem('user'));
  if (!user && to.path != '/login') {
    next({ path: '/login' })
  } else {
    next()
  }
})

new Vue({
  //el: '#app',
  //template: '<App/>',
  router,
  store,
  //components: { App }
  render: h => h(App)
}).$mount('#app')

