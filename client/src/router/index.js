import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Results from '@/views/Results'
import Callback from '@/views/Callback'
import Mixer from '@/views/Mixer'
import _404 from '@/views/_404'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: '/mixer',
      component: Home,
      children: [
        {
          path: 'mixer',
          component: Mixer
        },
        {
          path: 'results',
          component: Results
        }
      ]
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
