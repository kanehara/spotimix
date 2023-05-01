<template>
  <div>
    <Header>
      <Fade slot="left">
        <router-link v-if="isResultsRoute" to="/">Back</router-link>
      </Fade>
      <Fade slot="right">
        <router-link v-if="hasResults && !isResultsRoute" to="/results">Results</router-link>
      </Fade>
    </Header>
    <div class="sub-header">
      <div />
      <div class="spotify-logo-container">
        <img src="/static/spotify_logo.png" />
      </div>
      <div v-if="isLoggedIn">
        <a href="https://www.spotify.com/account/apps/" target="_blank">
          Disconnect
        </a>
      </div>
    </div>
    <Slide :direction="transitionDirection">
      <router-view/>
    </Slide>
  </div>
</template>

<script>
import Slide from '@/transitions/Slide'
import Fade from '@/transitions/Fade'
import Header from '@/views/Header'
import {mapGetters} from 'vuex'

export default {
  components: {
    Header,
    Slide,
    Fade,
  },
  data() {
    return {
      transitionDirection: 'left'
    }
  },
  computed: {
    ...mapGetters(['hasResults', 'isLoggedIn']),
    isResultsRoute() {
      return this.$route.path === '/results'
    }
  },
  watch: {
    $route(to, from) {
      this.transitionDirection = to.path === '/results' ? 'left' : 'right'
    }
  }
}
</script>

<style lang="scss" scoped>
.sub-header {
  display: grid;
  align-items: center;
  grid-template-columns: 8rem 1fr 8rem;
}

.spotify-logo-container {
  object-fit: contain;
  padding: 1rem 0;

  img {
    object-fit: cover;
    max-height: 1.5rem;
  }
}
</style>

