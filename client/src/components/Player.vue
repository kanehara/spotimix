<template>
  <div v-if="hasResults" class="player">
    <div class="inner-container">
    <div class="controls">
      <PlayButton :isPlaying="isPlaying" @click="TOGGLE_PLAY" />
    </div>
    </div>
  </div>
</template>

<script>
import PlayButton from '@/components/PlayButton'
import { mapActions, mapGetters } from 'vuex'
import { INIT_SPOTIFY_PLAYER, TOGGLE_PLAY } from 'x/player/action-types'

export default {
  components: {PlayButton},
  created() {
    this.INIT_SPOTIFY_PLAYER()
  },
  computed: {
    ...mapGetters(['isPlaying', 'hasResults']),
  },
  methods: {
    ...mapActions([INIT_SPOTIFY_PLAYER, TOGGLE_PLAY]),
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/colors';

.player {
  position: fixed;
  bottom: 0;
  background: $onix;
  border-top: .25rem solid $spotifyGreen;
  left: 0;
  right: 0;
  height: 4rem;
}

.toggle-play-button {
  background: white;
  width: 2rem;
  border-radius: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: .425rem;
  cursor: pointer;
  border: none;
  outline: none;

  &.clicking {
    width: 2.1rem;
    border-radius: 2.1rem;
    height: 2.1rem;
  }
}

.inner-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
