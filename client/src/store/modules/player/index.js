import * as ACTION_TYPES from './action-types'
import * as MUTATION_TYPES from './mutation-types'
import {ACCESS_TOKEN_COOKIE_KEY} from '@/utils'
import Cookies from 'js-cookie'
import axios from 'axios'
import { get } from 'lodash'

const state = {
  player: null,
  playbackState: null,
  deviceId: null,
}

const getters = {
  isPlaying: state => get(state, 'playbackState.paused') === false,
}

const triggerOauthIfNotLoggedIn = () => {
  if (!Cookies.get(ACCESS_TOKEN_COOKIE_KEY)) {
    window.open(`${API_HOST}/login`)
    return false
  }
  return true
}

const ensureTransferedPlayback = (player, cb) => {
  player.getCurrentState().then(playerState => {
    if (!playerState) {
      axios.put(`${API_HOST}/transfer`, {
        deviceId: state.deviceId,
      }).then(cb).catch((e) => {
        // todo handle error
        console.error('failed to transfer playback', e)
      })
    } else {
      cb()
    }
  })
}

const actions = {
  [ACTION_TYPES.TOGGLE_PLAY]({ state }) {
    if (triggerOauthIfNotLoggedIn() && state.player) {
      ensureTransferedPlayback(state.player, () => state.player.togglePlay())
    }
  },
  [ACTION_TYPES.NEXT_TRACK]({ state }) {
    if (triggerOauthIfNotLoggedIn() && state.player) {
      ensureTransferedPlayback(state.player, () => state.player.nextTrack())
    }
  },
  [ACTION_TYPES.PREVIOUS_TRACK]({ state }) {
    if (triggerOauthIfNotLoggedIn() && state.player) {
      ensureTransferedPlayback(state.player, () => state.player.previousTrack())
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
          commit(MUTATION_TYPES.SET_PLAYBACK_STATE, data)
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
  [MUTATION_TYPES.SET_PLAYBACK_STATE] (state, playbackState) {
    state.playbackState = playbackState
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
