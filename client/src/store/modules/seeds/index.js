import * as mutationTypes from './mutation-types'

const state = {
  seeds: []
}

const getters = {
  seeds: state => state.seeds
}

const actions = {
}

const mutations = {
  [mutationTypes.ADD_SEED] (state, seed) {
    state.seeds.push(seed)
  },
  [mutationTypes.REMOVE_SEED] (state, seed) {
    const i = state.seeds.findIndex(s => s.id === seed.id)
    if (i !== -1) {
      state.seeds.splice(i, 1)
    }
  },
  [mutationTypes.REMOVE_ALL_SEEDS] (state) {
    state.seeds = []
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
