/* eslint-disable no-undef */
import {DISPATCH_LOGIN} from './action-types'
import {LOGIN_SUCCESS, LOGIN_FAIL} from './mutation-types'
import axios from 'axios'

const state = {
  isLoggedIn: false
}

const getters = {
  isLoggedIn: state => state.isLoggedIn
}

const actions = {
  async [DISPATCH_LOGIN] ({commit, state}) {
    try {
      window.location = `${API_HOST}/login`
    } catch (error) {
      commit(LOGIN_FAIL, {error})
    }
  }
}

const mutations = {
  [LOGIN_FAIL](state, {error}) {
    console.error(error)
  },
  [LOGIN_SUCCESS](state) {
    console.log('login success')
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
