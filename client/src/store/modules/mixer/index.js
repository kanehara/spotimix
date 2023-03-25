import * as MUTATION_TYPES from './mutation-types'
import * as ACTION_TYPES from './action-types'
import axios from 'axios'

const state = {
  loading: false,
  isMakingPlayRequest: false,
  results: [],
  payload: {},
  playError: null
}

const getters = {
  results: state => state.results,
  isMakingPlayRequest: state => state.isMakingPlayRequest,
  hasResults: state => state.results.length > 0
}

const actions = {
  [ACTION_TYPES.PLAY_TRACKS_IN_SPOTIFY]({ commit, state }) {
    if (state.results.length > 0) {
      axios.put(`${API_HOST}/play`, { uris: state.results.map(r => r.uri) }, { withCredentials: true }) // eslint-disable-line
        .then(() => commit(MUTATION_TYPES.PLAY_TRACKS_SUCCESS))
        .catch((e) => {
          if (e && e.response && e.response.status === 440) {
            location.reload()
          }
          commit(MUTATION_TYPES.PLAY_TRACKS_FAIL, e)
        })
    }
    commit(MUTATION_TYPES.PLAY_TRACKS_REQUEST)
  }
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
  [MUTATION_TYPES.PLAY_TRACKS_REQUEST](state) {
    state.isMakingPlayRequest = true
  },
  [MUTATION_TYPES.PLAY_TRACKS_SUCCESS](state) {
    state.isMakingPlayRequest = false
  },
  [MUTATION_TYPES.RESET_PLAY_TRACKS_REQUEST](state) {
    state.isMakingPlayRequest = false
  },
  [MUTATION_TYPES.PLAY_TRACKS_FAIL](state, error) {
    state.isMakingPlayRequest = false
    alert(`An error occurred trying to play tracks:\n${(error && error.message) || 'unknown error'}`)
    state.playError = error
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
