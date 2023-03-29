<template>
  <div>
    <div class="container">
      <h1 v-if="hasNoResults">No Results!</h1>
      <div v-else>
        <div v-if="isLoggedIn" class="loggedInContainer">
          <button class="button" @click="PLAY_TRACKS_IN_SPOTIFY" :disabled="isMakingPlayRequest">Play in Spotify</button>
          <button class="button logoutButton" @click="logout">Logout of Spotify</button>
        </div>
        <div v-else>
          <p>Login to play tracks in Spotify</p>
          <button @click="triggerOauth" class="button">Login</button>
        </div>
        <div class="header">
          <h4 class="title">Title</h4>
          <h4 class="artist">Artist</h4>
          <h4 class="duration">Duration</h4>
        </div>
        <div class="results">
          <Stagger :appear="!!animate">
            <Track v-for="(r, index) in results" :track="r" :key="r.id" :data-index="index"/>
          </Stagger>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Track from '@/components/Track'
import Header from '@/views/Header'
import Stagger from '@/transitions/group/Stagger'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { PLAY_TRACKS_IN_SPOTIFY } from 'x/mixer/action-types'
import { RESET_PLAY_TRACKS_REQUEST } from 'x/mixer/mutation-types'
import Cookies from 'js-cookie'

const ACCESS_TOKEN_COOKIE_KEY = 'spotify_access_token'
const REFRESH_TOKEN_COOKIE_KEY = 'spotify_refresh_token'

export default {
  components: {
    Header,
    Track,
    Stagger
  },
  beforeMount() {
    this.RESET_PLAY_TRACKS_REQUEST()
  },
  computed: {
    ...mapGetters(['results', 'isMakingPlayRequest']),
    animate() {
      return this.$route.query.animate
    },
    hasNoResults() {
      return this.results.length === 0
    },
    isLoggedIn() {
      return !!Cookies.get(ACCESS_TOKEN_COOKIE_KEY)
    }
  },
  methods: {
    ...mapMutations([RESET_PLAY_TRACKS_REQUEST]),
    ...mapActions([PLAY_TRACKS_IN_SPOTIFY]),
    triggerOauth() {
      window.open(`${API_HOST}/login`) // eslint-disable-line
    },
    logout() {
      Cookies.remove(ACCESS_TOKEN_COOKIE_KEY)
      Cookies.remove(REFRESH_TOKEN_COOKIE_KEY)
      location.reload()
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/grid';
@import '~styles/colors';

.container {
  padding-top: 0;
}

.loggedInContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button {
  padding: 5px 10px;
  border-radius: 10px;
  outline: 0;
  background: $theme4;
  color: white;
  border: none;
  cursor: pointer;

  &[disabled] {
    background: $theme2;
    color: $theme3;
    cursor: wait;
    box-shadow: none;
    transform: none;
  }
}

.logoutButton {
  margin-top: 5px;
  background: $theme2;
}

.header {
  @include result-grid;

  border-bottom: 1px solid $theme4;

  .title, .artist, .duration {
    text-align: left;
  }

  margin-bottom: 20px;
}
</style>

