import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Callback from '@/components/Callback'
import _404 from '@/components/_404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/callback',
      name: 'Callback',
      component: Callback,
      beforeEnter: (to, from, next) => {
        console.log('entering')
      }
    },
    {
      path: '*',
      name: '404',
      component: _404
    }
  ]
})
