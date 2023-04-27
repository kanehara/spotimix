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
    ...mapGetters(['hasResults']),
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

