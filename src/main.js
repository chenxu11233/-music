// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import Vuex from 'vuex'
Vue.use(Vuex)
Vue.prototype.$http = axios
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://127.0.0.1:3000'
/* eslint-disable no-new */

const store = new Vuex.Store({
  state: {
    songlist: ['http://m10.music.126.net/20170922202700/93536744c3a0f5255f3d92d72c7f7baa/ymusic/dc26/6e63/6bde/d08add8397181cefb1014a7b09ee4a92.mp3', 'http://m10.music.126.net/20170923133443/2612ef3e6760793f8840d709f1541f89/ymusic/f1ae/0bd1/31a9/5d64960d0cbebc0d089bc85a6ef54680.mp3', 'http://m10.music.126.net/20170925094241/0248a59b76956934321c123a18dc1e70/ymusic/7532/d080/0201/a42f2a54679e1921c1514b8ed2c577d6.mp3']
  }
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
