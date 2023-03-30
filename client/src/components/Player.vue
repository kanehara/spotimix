<template>
  <div v-if="hasResults" class="player">
    <div class="inner-container">
    <div class="controls">
      <div class="control-container">
        <PrevNextButton kind="prev" @click="PREVIOUS_TRACK" />
      </div>
      <div class="control-container">
        <PlayButton :isPlaying="isPlaying" @click="TOGGLE_PLAY" />
      </div>
      <div class="control-container">
        <PrevNextButton kind="next" @click="NEXT_TRACK" />
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import PlayButton from '@/components/PlayButton'
import PrevNextButton from '@/components/PrevNextButton'
import { mapActions, mapGetters } from 'vuex'
import { INIT_SPOTIFY_PLAYER, TOGGLE_PLAY, PREVIOUS_TRACK, NEXT_TRACK } from 'x/player/action-types'

export default {
  components: {PlayButton, PrevNextButton},
  created() {
    this.INIT_SPOTIFY_PLAYER()
  },
  computed: {
    ...mapGetters(['isPlaying', 'hasResults']),
  },
  methods: {
    ...mapActions([INIT_SPOTIFY_PLAYER, TOGGLE_PLAY, PREVIOUS_TRACK, NEXT_TRACK]),
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/colors';

.controls {
  display: flex;
  align-items: center;
}

.control-container {
  margin: 0 1rem;
}

.player {
  position: fixed;
  bottom: 0;
  background: $onix;
  border-top: .1rem solid $spotifyGreen;
  left: 0;
  right: 0;
  height: 4rem;
}

.inner-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>
