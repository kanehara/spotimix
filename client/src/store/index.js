import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import createPersistedState from 'vuex-persistedstate'
import mixer from './modules/mixer'
import player from './modules/player'
import attributes from './modules/attributes'
import auth from './modules/auth'
import seeds from './modules/seeds'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const vuexConfig = {
  paths: [
    'attributes',
    'seeds',
    'mixer',
  ]
}

export default new Vuex.Store({
  modules: {
    attributes,
    auth,
    seeds,
    mixer,
    player
  },
  strict: debug,
  plugins: debug ? [createLogger(), createPersistedState(vuexConfig)] : [createPersistedState(vuexConfig)]
})
