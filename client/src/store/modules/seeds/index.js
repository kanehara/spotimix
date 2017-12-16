import * as MUTATION_TYPES from './mutation-types'

export const SEED_TYPES = {
  TRACK: 'tracks',
  ARTIST: 'artists',
  GENRE: 'genres'
}

const state = {
  seeds: {
    tracks: [],
    artists: [],
    genres: []
  },
  focusedSeedInput: null
}

const reduceTotalSeeds = state =>
  Object.values(SEED_TYPES)
    .reduce((sum, seedType) => sum + state.seeds[seedType].length, 0)
const getters = {
  seeds: state => state.seeds,
  totalSeeds: state => reduceTotalSeeds(state),
  trackSeeds: state => state.seeds[SEED_TYPES.TRACK],
  artistSeeds: state => state.seeds[SEED_TYPES.ARTIST],
  genreSeeds: state => state.seeds[SEED_TYPES.GENRE],
  seedsCount: state => Object.values(state.seeds).reduce((prev, curr) => prev + curr.length, 0),
  isSeedInputFocused: state => !!state.focusedSeedInput,
}

const actions = {
}

const mutations = {
  [MUTATION_TYPES.ADD_SEED] (state, {id, type, name}) {
    if (!state.seeds[type].find(s => s.id === id) && reduceTotalSeeds(state) < 5) {
      state.seeds[type].push({id, name})
    }
  },
  [MUTATION_TYPES.REMOVE_SEED] (state, {id, type}) {
    const i = state.seeds[type].findIndex(s => s.id === id)
    if (i !== -1) {
      state.seeds[type].splice(i, 1)
    }
  },
  [MUTATION_TYPES.REMOVE_ALL_SEEDS] (state) {
    Object.values(SEED_TYPES).forEach(s => { state[s] = [] })
  },
  [MUTATION_TYPES.FOCUS_SEED_INPUT] (state, {type}) {
    state.focusedSeedInput = type
  },
  [MUTATION_TYPES.DEFOCUS_SEED_INPUTS] (state) {
    state.focusedSeedInput = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
