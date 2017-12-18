import * as MUTATION_TYPES from './mutation-types'

const state = {
  loading: false,
  results: [],
  payload: {}
}

const getters = {
  results: state => state.results
}

const actions = {
}

const mutations = {
  [MUTATION_TYPES.MIX] (state, {payload}) {
    state.loading = true
    state.payload = payload
  },
  [MUTATION_TYPES.RECEIVE_RESULTS] (state, {results}) {
    state.loading = false
    state.results = results
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
