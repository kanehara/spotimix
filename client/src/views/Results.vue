<template>
  <div>
    <div class="container">
      <h1 v-if="hasNoResults">No Results!</h1>
      <div v-else>
        <div class="header">
          <h4 class="trackNumber h">#</h4>
          <h4 class="title h">Title</h4>
          <h4 class="album h">Album</h4>
          <h4 class="duration h"><ClockIcon /></h4>
        </div>
        <div class="results">
          <Stagger :appear="!!animate">
            <Track v-for="(r, index) in results" :track="r" :key="r.id" :data-index="index" :trackNumber="index+1" @play="handleTrackPlay(index)" @pause="handleTrackPause()"/>
          </Stagger>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Track from '@/components/Track'
import ClockIcon from '@/components/ClockIcon'
import Header from '@/views/Header'
import Stagger from '@/transitions/group/Stagger'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Header,
    Track,
    Stagger,
    ClockIcon
  },
  computed: {
    ...mapGetters(['results', 'isLoggedIn']),
    animate() {
      return this.$route.query.animate
    },
    hasNoResults() {
      return this.results.length === 0
    },
  },
  methods: {
    ...mapActions(['PLAY_TRACKS', 'TOGGLE_PLAY']),
    handleTrackPlay(idx) {
      this.PLAY_TRACKS({ index: idx })
    },
    handleTrackPause() {
      this.TOGGLE_PLAY()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/grid';
@import '~styles/colors';

.container {
  padding-top: 0;
}

.h {
  margin: 0.75rem 0;
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
  padding-right: $resultsGridPaddingRight;

  .trackNumber {
    text-align: right;
  }

  .title {
    text-align: left;
  }
  .album, .duration {
    text-align: right;
  }

  margin-bottom: 20px;
}
</style>

