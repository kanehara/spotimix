import * as ACTION_TYPES from './action-types'
import * as MUTATION_TYPES from './mutation-types'
import {ACCESS_TOKEN_COOKIE_KEY} from '@/utils'
import Cookies from 'js-cookie'
import axios from 'axios'

const state = {
  player: null,
  deviceId: null,
  isPlaying: false,
}

const getters = {
  isPlaying: state => state.isPlaying
}

const triggerOauthIfNotLoggedIn = () => {
  if (!Cookies.get(ACCESS_TOKEN_COOKIE_KEY)) {
    window.open(`${API_HOST}/login`)
    return false
  }
  return true
}

const actions = {
  [ACTION_TYPES.TOGGLE_PLAY]({ state }) {
    if (triggerOauthIfNotLoggedIn() && state.player) {
      state.player.getCurrentState().then(playerState => {
        if (!playerState) {
          axios.put(`${API_HOST}/transfer`, {
            deviceId: state.deviceId,
          }).then(() => {
            state.player.togglePlay()
          }).catch((e) => {
            // todo handle error
            console.error('failed to transfer playback', e)
          })
        } else {
          state.player.togglePlay()
        }
      })
    }
  },
  [ACTION_TYPES.INIT_SPOTIFY_PLAYER]({ commit, state }) {
    if (Cookies.get(ACCESS_TOKEN_COOKIE_KEY)) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: 'Spotimix',
          getOAuthToken: cb => { cb(Cookies.get(ACCESS_TOKEN_COOKIE_KEY)) }
        })
        // Ready
        player.addListener('ready', ({ device_id }) => { // eslint-disable-line
          console.log('Ready with Device ID', device_id)
          commit(MUTATION_TYPES.SET_DEVICE_ID, device_id)
        })

        player.addListener('player_state_changed', (data) => {
          console.log('player state changed', data)
          commit(MUTATION_TYPES.TOGGLE_PLAY_STATE, !data.paused)
        })

        // Not Ready
        player.addListener('not_ready', ({ device_id }) => { // eslint-disable-line
          console.log('Device ID has gone offline', device_id)
        })
        player.addListener('initialization_error', ({ message }) => {
          console.error('Shopify player initialiation error: ', message)
        })

        player.addListener('authentication_error', ({ message }) => {
          console.error('Shopify player authentication error: ', message)
        })

        player.addListener('account_error', ({ message }) => {
          console.error('Shopify player account error: ', message)
        })

        player.connect()

        commit(MUTATION_TYPES.SET_SPOTIFY_PLAYER, {player})
      }
    }
  }
}

const mutations = {
  [MUTATION_TYPES.SET_SPOTIFY_PLAYER] (state, {player}) {
    state.player = player
  },
  [MUTATION_TYPES.TOGGLE_PLAY_STATE] (state, isPlaying) {
    state.isPlaying = isPlaying
  },
  [MUTATION_TYPES.SET_DEVICE_ID] (state, deviceId) {
    state.deviceId = deviceId
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
