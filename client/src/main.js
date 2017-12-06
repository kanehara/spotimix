// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueApollo from 'vue-apollo'
import apolloClient from './apollo-client'
import store from './store'
require('semantic-ui-icon/icon.min.css')

Vue.config.productionTip = false

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

const stopProp = e => e.stopPropagation()
function callBinding(binding, vnode, event) {
  if (binding.value && typeof binding.value === 'function') {
    binding.value()
    event.stopImmediatePropagation()
  } else {
    console.warn('Value passed to v-click-outside directive should be a function')
  }
}
Vue.directive('click-outside', {
  bind (el, binding, vnode) {
    el.addEventListener('click', stopProp)
    document.body.addEventListener('click', callBinding.bind(null, binding, vnode))
  },

  unbind(el) {
    el.removeEventListener('click', stopProp)
    document.body.removeEventListener('click', callBinding)
  },

  stopProp(event) { event.stopPropagation() }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  apolloProvider,
  router,
  store,
  template: '<App/>',
  components: { App }
})
