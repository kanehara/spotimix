import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Results from '@/views/Results'
import Callback from '@/views/Callback'
import _404 from '@/views/_404'

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
      path: '/results',
      name: '/results',
      component: Results
    },
    {
      path: '*',
      name: '404',
      component: _404
    }
  ]
})
