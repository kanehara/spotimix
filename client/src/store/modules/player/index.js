import * as ACTION_TYPES from './action-types'
import * as MUTATION_TYPES from './mutation-types'
import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY, TRACK_INDEX_KEY } from '@/utils'
import Cookies from 'js-cookie'
import axios from 'axios'
import { get } from 'lodash'

const state = {
  player: null,
  playbackState: null,
  deviceId: null,
  playbackStatePollingInteveralId: null,
}

const getters = {
  isPlaying: state => get(state, 'playbackState.paused') === false,
  currentlyPlayingTrack: state => get(state, 'playbackState.track_window.current_track'),
  currentlyPlayingArtists: state => get(state, 'playbackState.track_window.current_track.artists'),
  playbackPosition: state => get(state, 'playbackState.position') || 0,
  playbackDuration: state => get(state, 'playbackState.duration') || 0,
  playbackPercentage: state => get(state, 'playbackState.position') && get(state, 'playbackState.duration') ? (get(state, 'playbackState.position') / get(state, 'playbackState.duration')) * 100 : 0
}

const triggerOauthIfNotLoggedIn = (opts) => {
  if (!Cookies.get(ACCESS_TOKEN_COOKIE_KEY)) {
    if (opts && opts.trackIndex) {
      window.open(`${API_HOST}/login?trackIndex=${opts.trackIndex}`, '_self')
    } else {
      window.open(`${API_HOST}/login`, '_self')
    }
    return false
  }
  return true
}

const actions = {
  [ACTION_TYPES.TOGGLE_PLAY]({ state }) {
    if (triggerOauthIfNotLoggedIn({trackIndex: 0}) && state.player) {
      state.player.togglePlay()
    }
  },
  [ACTION_TYPES.NEXT_TRACK]({ state }) {
    if (triggerOauthIfNotLoggedIn({trackIndex: 0}) && state.player) {
      state.player.nextTrack()
    }
  },
  [ACTION_TYPES.PREVIOUS_TRACK]({ state }) {
    if (triggerOauthIfNotLoggedIn({trackIndex: 0}) && state.player) {
      state.player.previousTrack()
    }
  },
  [ACTION_TYPES.PLAY_TRACKS]({ state, rootState }, { index }) {
    if (triggerOauthIfNotLoggedIn({trackIndex: index}) && state.player && state.deviceId) {
      const uris = rootState.mixer.results.slice(index).map(r => r.uri)
      if (uris && uris.length > 0) {
        axios.put(`${API_HOST}/play`, { uris, deviceId: state.deviceId })
          .catch((error) => {
            alert(`An error occurred trying to play tracks:\n${(error && error.message) || 'unknown error'}`)
            Cookies.remove(ACCESS_TOKEN_COOKIE_KEY)
            Cookies.remove(REFRESH_TOKEN_COOKIE_KEY)
          })
      }
    }
  },
  [ACTION_TYPES.SEEK]({ state }, { percentage }) {
    if (triggerOauthIfNotLoggedIn() && state.player) {
      const duration = get(state, 'playbackState.duration')
      if (duration) {
        state.player.seek(duration * percentage)
      }
    }
  },
  [ACTION_TYPES.INIT_SPOTIFY_PLAYER]({ commit, state, dispatch }) {
    if (Cookies.get(ACCESS_TOKEN_COOKIE_KEY)) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        const player = new window.Spotify.Player({
          name: 'Mixceed',
          getOAuthToken: cb => { cb(Cookies.get(ACCESS_TOKEN_COOKIE_KEY)) }
        })
        // Ready
        player.addListener('ready', ({ device_id }) => { // eslint-disable-line
          commit(MUTATION_TYPES.SET_DEVICE_ID, device_id)
          const trackIndex = Cookies.get(TRACK_INDEX_KEY)
          if (trackIndex && !isNaN(trackIndex)) {
            dispatch(ACTION_TYPES.PLAY_TRACKS, { index: parseInt(trackIndex) })
            Cookies.remove(TRACK_INDEX_KEY)
          }

          // https://github.com/spotify/web-playback-sdk/issues/75#issuecomment-487325589
          const iframe = document.querySelector('iframe[src="https://sdk.scdn.co/embedded/index.html"]')
          if (iframe) {
            iframe.style.display = 'block'
            iframe.style.position = 'absolute'
            iframe.style.top = '-1000px'
            iframe.style.left = '-1000px'
          }
        })

        player.addListener('player_state_changed', (data) => {
          console.log('player state changed', data)
          commit(MUTATION_TYPES.SET_PLAYBACK_STATE, data)
          if (data && !data.paused) {
            if (!state.playbackStatePollingInteveralId) {
              let id
              id = setInterval(() => { // retrieve playback state for track seeking
                player.getCurrentState().then(playbackState => {
                  if (playbackState) {
                    commit(MUTATION_TYPES.SET_PLAYBACK_STATE, playbackState)
                  } else {
                    clearInterval(id)
                  }
                })
              }, 1000)
              commit(MUTATION_TYPES.SET_PLAYBACK_STATE_POLLING_INTERVAL_ID, id)
            }
          } else {
            if (state.playbackStatePollingInteveralId) {
              clearInterval(state.playbackStatePollingInteveralId)
              commit(MUTATION_TYPES.SET_PLAYBACK_STATE_POLLING_INTERVAL_ID, null)
            }
          }
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
  [MUTATION_TYPES.SET_PLAYBACK_STATE_POLLING_INTERVAL_ID] (state, id) {
    state.playbackStatePollingInteveralId = id
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
