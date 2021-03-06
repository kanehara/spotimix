import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'
import Cookies from 'js-cookie'
import mixer from './modules/mixer'
import attributes from './modules/attributes'
import auth from './modules/auth'
import seeds from './modules/seeds'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    attributes,
    auth,
    seeds,
    mixer
  },
  strict: debug,
  plugins: debug ? [createLogger(), createPersistedState()] : [createPersistedState({
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
      removeItem: key => Cookies.remove(key)
    }
  })]
})
