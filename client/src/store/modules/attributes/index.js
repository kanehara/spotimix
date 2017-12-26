import * as MUTATION_TYPES from './mutation-types'

const ATTRIBUTE_TYPES = {
  ACOUSTICNESS: 'acousticness',
  DANCEABILITY: 'danceability',
  ENERGY: 'energy',
  INSTRUMENTALNESS: 'instrumentalness',
  KEY: 'key',
  MODE: 'mode',
  LIVENESS: 'liveness',
  LOUDNESS: 'loudness',
  VALENCE: 'valence',
  POPULARITY: 'popularity',
  SPEECHINESS: 'speechiness',
  TEMPO: 'tempo'
}

const keys = ['C', 'C#/Db', 'D', 'D#/Eb', 'E', 'E#/Fb', 'F', 'F#/Gb', 'G', 'G#Ab', 'A', 'A#/Bb', 'B', 'B#/Cb']

const createAttribute = ({
  name,
  disabled = true,
  value = 0,
  min = 0,
  max = 1,
  step = 0.01,
  labelMapper = v => v * 100,
  valueMapper = v => v,
}) => ({ name, disabled, value, min, max, step, labelMapper, valueMapper })
const state = {
  [ATTRIBUTE_TYPES.ACOUSTICNESS]: {
    type: ATTRIBUTE_TYPES.ACOUSTICNESS,
    ...createAttribute({name: 'Acousticness'})
  },
  [ATTRIBUTE_TYPES.DANCEABILITY]: {
    type: ATTRIBUTE_TYPES.DANCEABILITY,
    ...createAttribute({name: 'Danceability'})
  },
  [ATTRIBUTE_TYPES.ENERGY]: {
    type: ATTRIBUTE_TYPES.ENERGY,
    ...createAttribute({name: 'Energy'})
  },
  [ATTRIBUTE_TYPES.INSTRUMENTALNESS]: {
    type: ATTRIBUTE_TYPES.INSTRUMENTALNESS,
    ...createAttribute({name: 'Instrumentalness'})
  },
  [ATTRIBUTE_TYPES.KEY]: {
    type: ATTRIBUTE_TYPES.KEY,
    ...createAttribute({
      name: 'Key',
      min: 0,
      max: keys.length - 1,
      step: 0.01,
      labelMapper: v => keys[Math.round(Number(v))],
      valueMapper: v => Math.round(Number(v))
    })
  },
  [ATTRIBUTE_TYPES.MODE]: {
    type: ATTRIBUTE_TYPES.MODE,
    ...createAttribute({
      name: 'Mode',
      labelMapper: v => Number(v) >= 0.5 ? 'Major' : 'Minor',
      valueMapper: v => Math.round(v)
    })
  },
  [ATTRIBUTE_TYPES.LIVENESS]: {
    type: ATTRIBUTE_TYPES.LIVENESS,
    ...createAttribute({name: 'Liveness'})
  },
  [ATTRIBUTE_TYPES.LOUDNESS]: {
    type: ATTRIBUTE_TYPES.LOUDNESS,
    ...createAttribute({
      name: 'Loudness',
      value: -60,
      min: -60,
      max: 0,
      step: 1,
      labelMapper: v => `${v}db`
    })
  },
  [ATTRIBUTE_TYPES.VALENCE]: {
    type: ATTRIBUTE_TYPES.VALENCE,
    ...createAttribute({name: 'Mood'})
  },
  [ATTRIBUTE_TYPES.POPULARITY]: {
    type: ATTRIBUTE_TYPES.POPULARITY,
    ...createAttribute({
      name: 'Popularity',
      min: 0,
      max: 100,
      step: 1,
      labelMapper: v => v,
      valueMapper: v => v,
    })
  },
  [ATTRIBUTE_TYPES.SPEECHINESS]: {
    type: ATTRIBUTE_TYPES.SPEECHINESS,
    ...createAttribute({name: 'Speechiness'})
  },
  [ATTRIBUTE_TYPES.TEMPO]: {
    type: ATTRIBUTE_TYPES.TEMPO,
    ...createAttribute({
      name: 'Tempo',
      min: 0,
      max: 200,
      step: 1,
      labelMapper: v => v
    })
  },
}

const getters = {
  getAttribute: state => attribute => {
    return state[attribute]
  },
  enabledAttributes: state => Object.values(state).filter(a => !a.disabled),
  disabledAttributes: state => Object.values(state).filter(a => a.disabled),
  allAttributes: state => Object.values(state)
}

const actions = {
}

const mutations = {
  [MUTATION_TYPES.EDIT_ATTRIBUTE](state, {attributeType, value}) {
    state[attributeType].value = value
  },
  [MUTATION_TYPES.ENABLE_ATTRIBUTE](state, {attributeType}) {
    state[attributeType].disabled = false
  },
  [MUTATION_TYPES.DISABLE_ATTRIBUTE](state, {attributeType}) {
    state[attributeType].disabled = true
  },
  [MUTATION_TYPES.ENABLE_ALL_ATTRIBUTES](state) {
    Object.values(state).forEach(a => { a.disabled = false })
  },
  [MUTATION_TYPES.DISABLE_ALL_ATTRIBUTES](state) {
    Object.values(state).forEach(a => { a.disabled = true })
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
