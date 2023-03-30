<template>
  <div v-if="hasResults" class="player">
    <div class="inner-container">
      <div>
        <div v-if="currentlyPlayingTrack" class="track-info">
          <div class="track-image-container" v-if="hasTrackImage">
            <img class="track-image" :src="trackImage" />
          </div>
          <div class="track-artist">
            <TrackNameAndArtists skinny="true" :track="currentlyPlayingTrack" :artists="currentlyPlayingArtists" />
          </div>
        </div>
      </div>
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
import TrackNameAndArtists from '@/components/TrackNameAndArtists'
import { mapActions, mapGetters } from 'vuex'
import { INIT_SPOTIFY_PLAYER, TOGGLE_PLAY, PREVIOUS_TRACK, NEXT_TRACK } from 'x/player/action-types'
import {get} from 'lodash'

export default {
  components: {PlayButton, PrevNextButton, TrackNameAndArtists},
  created() {
    this.INIT_SPOTIFY_PLAYER()
  },
  computed: {
    ...mapGetters(['isPlaying', 'hasResults', 'currentlyPlayingTrack', 'currentlyPlayingArtists']),
    trackImage() {
      return get(this.currentlyPlayingTrack, 'album.images[0].url')
    },
    hasTrackImage() {
      return !!this.trackImage
    }
  },
  methods: {
    ...mapActions([INIT_SPOTIFY_PLAYER, TOGGLE_PLAY, PREVIOUS_TRACK, NEXT_TRACK]),
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/colors';

$playerHeight: 4rem;

.track-image-container {
  margin-right: 1rem;
}

.track-image {
  height: 100%;
  width: 3rem;
  aspect-ratio: 1;
  object-fit: contain;
}

.track-info {
  height: 100%;
  box-sizing: border-box;
  font-size: .9rem;
  padding: .25rem 0;
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin: 0;
  }
}

.track-artist {
  display: flex;
  flex-direction: column;
}

.controls {
  display: flex;
  align-items: center;
  justify-self: center;
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
  height: $playerHeight;
}

.inner-container {
  padding: 0 1rem;
  display: grid;
  grid-column-gap: 1.5rem;
  grid-template-columns: minmax(13rem, 20rem) minmax(10rem,auto) minmax(13rem, 20rem);
  justify-items: flex-start;
  height: 100%;
}

</style>
