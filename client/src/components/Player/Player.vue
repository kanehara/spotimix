<template>
  <div class="player">
    <div>
      Currently playing...
    </div>
    <div>
      <div class="playbackControls">
        <div class="playbackButtons">
          <PrevButton @click="previousTrack"/>
          <PlayButton/>
          <NextButton @click="nextTrack"/>
        </div>
        <SeekBar :duration="100"/>
      </div>
    </div>
    <div class="volumeControls">
      <VolumeControl/>
    </div>
  </div>
</template>

<script>
import NextButton from './NextButton'
import PlayButton from './PlayButton'
import PrevButton from './PrevButton'
import SeekBar from './SeekBar'
import VolumeControl from './VolumeControl'

export default {
  components: {
    NextButton,
    PlayButton,
    PrevButton,
    SeekBar,
    VolumeControl
  },
  methods: {
    previousTrack() {
      this.$emit('previousTrack')
    },
    nextTrack() {
      this.$emit('nextTrack')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/grid';

.player {
  @include player-grid;
}

.playbackControls {
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  height: 65px;
}

.playbackButtons {
  user-select: none;
  flex-grow: 2;
  padding-top: 10px;
}

.volumeControls {
  width: 40%;
  margin: 0 auto;
}
</style>
