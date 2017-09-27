import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Gedan from '@/components/Gedan'
import Home from '@/components/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/songlist',
      component: Hello,
      children: [
        {
          path: 'gedan',
          component: Gedan
        }
      ]
    }
  ]
})
