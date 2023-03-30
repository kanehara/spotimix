import * as MUTATION_TYPES from './mutation-types'

const state = {
  loading: false,
  results: [],
  payload: {},
}

const getters = {
  results: state => state.results,
  isMakingPlayRequest: state => state.isMakingPlayRequest,
  hasResults: state => state.results.length > 0
}

const mutations = {
  [MUTATION_TYPES.MIX] (state, {payload}) {
    state.loading = true
    state.payload = payload
  },
  [MUTATION_TYPES.RECEIVE_RESULTS] (state, {results}) {
    state.loading = false
    state.isMakingPlayRequest = false
    state.results = results
  },
}

export default {
  state,
  getters,
  mutations
}
