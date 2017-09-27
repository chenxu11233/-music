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
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
/* eslint-disable no-new */
const store = new Vuex.Store({
  state: {
    songlist: ['http://m10.music.126.net/20170925193205/350b9faafffdf70f970d81686fba5931/ymusic/f1ae/0bd1/31a9/5d64960d0cbebc0d089bc85a6ef54680.mp3', 'http://m10.music.126.net/20170925193220/2afbb79e98ebe4de679c752b984a9ee6/ymusic/d225/b9e7/917e/f01459c23fe55e30ee7c884385d061bc.mp3', 'http://m10.music.126.net/20170925193233/96040cab3e04a91ce62b49032508ca28/ymusic/dc26/6e63/6bde/d08add8397181cefb1014a7b09ee4a92.mp3'],
    idlist: ['347230', '186008', '186001'],
    nowN: 1,
    songmenu: [{
      Name: '海阔天空',
      Singer: 'Beyond',
      Time: '5:26'
    },
    {
      Name: '园游会',
      Singer: '周杰伦',
      Time: '4:15'
    },
    {
      Name: '七里香',
      Singer: '周杰伦',
      Time: '4:59'
    }
    ],
    songdetail: {
      'singer': '',
      'pic': '',
      'name': ''
    },
    volume: 0.2
  }
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
