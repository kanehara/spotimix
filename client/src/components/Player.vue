<template>
  <div v-if="hasResults && isPlayerActive" class="player">
    <div class="inner-container">
      <div class="track-info-container">
        <div v-if="currentlyPlayingTrack" class="track-info">
          <div class="track-image-container" v-if="hasTrackImage">
            <img class="track-image" :src="trackImage" />
          </div>
          <div class="track-artist">
            <div class="spotify-logo-container">
              <img src="/static/spotify_logo.png" />
            </div>
            <TrackNameAndArtists skinny="true" :track="currentlyPlayingTrack" :artists="currentlyPlayingArtists" />
          </div>
        </div>
      </div>
      <div class="controls">
        <div class="top-controls">
          <div class="control-btn-container">
            <PrevNextButton kind="prev" @click="PREVIOUS_TRACK" />
          </div>
          <div class="control-btn-container">
            <PlayButton :isPlaying="isPlaying" @click="TOGGLE_PLAY" />
          </div>
          <div class="control-btn-container">
            <PrevNextButton kind="next" @click="NEXT_TRACK" />
          </div>
        </div>
        <div class="bottom-controls"> 
          <p class="seeker-timestamp position" :style="{ visibility: playbackDuration ? 'visible' : 'hidden' }">{{ playbackPosition | msToMinAndSec }}</p>
          <div class="seeker-controller" @click="handleSeek">
            <div class="seeker-container">
              <div class="seeker-played" :style="{ width: `${playbackPercentage}%` }" />
            </div>
          </div>
          <p class="seeker-timestamp duration" :style="{ visibility: playbackDuration ? 'visible' : 'hidden' }">{{ playbackDuration | msToMinAndSec }}</p>
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
import { INIT_SPOTIFY_PLAYER, TOGGLE_PLAY, PREVIOUS_TRACK, NEXT_TRACK, SEEK } from 'x/player/action-types'
import {get} from 'lodash'
import { msToMinAndSec } from '@/utils'

export default {
  components: {PlayButton, PrevNextButton, TrackNameAndArtists},
  created() {
    this.INIT_SPOTIFY_PLAYER()
  },
  filters: {
    msToMinAndSec(v) {
      return msToMinAndSec(v)
    }
  },
  computed: {
    ...mapGetters([
      'isPlaying',
      'hasResults',
      'currentlyPlayingTrack',
      'currentlyPlayingArtists',
      'isPlayerActive',
      'playbackPercentage',
      'playbackPosition',
      'playbackDuration'
    ]),
    trackImage() {
      return get(this.currentlyPlayingTrack, 'album.images[0].url')
    },
    hasTrackImage() {
      return !!this.trackImage
    }
  },
  methods: {
    ...mapActions([INIT_SPOTIFY_PLAYER, TOGGLE_PLAY, PREVIOUS_TRACK, NEXT_TRACK, SEEK]),
    handleSeek(e) {
      this.SEEK({percentage: e.offsetX / e.target.offsetWidth})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/colors';
@import '~styles/breakpoints';
@import '~styles/player';

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

.spotify-logo-container {
  object-fit: contain;

  img {
    object-fit: cover;
    max-height: 1rem;
    margin-bottom: .25rem;
  }
}

.track-info-container {
  display: flex;
  align-items: center;
  justify-self: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 1rem;
  @include minTablet {
    margin-bottom: 0;
  }
}

.track-artist {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.controls {
  display: flex;
  flex-direction: column;
  justify-self: center;
  justify-content: center;
  width: 80%;
}

.top-controls {
  display: flex;
  align-items: center;
  justify-self: center;
  align-self: center;
  margin-bottom: 1rem;
}

.bottom-controls {
  justify-self: center;
  display: flex;
  align-items: center;
}

.seeker-timestamp {
  font-size: .7rem;
  padding: 0;
  margin: 0;
  min-width: 2rem;

  &.position {
    text-align: right;
  }

  &.duration {
    text-align: left;
  }
}

.control-btn-container {
  margin: 0 1rem;
}

.player {
  position: fixed;
  bottom: 0;
  background: $onix;
  border-top: .1rem solid $theme4;
  left: 0;
  right: 0;
  height: $playerHeightMobile;
  padding: 1rem 0 3rem 0;
  
  @include minTablet {
    padding: 0;
    height: $playerHeight;
  }
}

.inner-container {
  display: grid;
  grid-column-gap: 1.5rem;
  grid-template-columns: 1fr;
  justify-items: flex-start;
  height: 100%;
  padding: 0 1rem;
  
  @include minTablet {
    grid-template-columns: minmax(13rem, 1fr) minmax(10rem,40rem) minmax(13rem, 1fr);
  }
}

.seeker-controller {
  display: flex;
  align-items: center;
  width: 100%;
  height: 1rem;
  margin: 0 .7rem;

  &:hover {
    cursor: pointer;

    .seeker-played {
      background-color: $theme4;
    }
  }
}

.seeker-container {
  height: 4px;
  border-radius: 2px;
  overflow: hidden;
  width: 100%;
  background-color: $lightgray;
  position: relative;

  .seeker-played {
    background-color: white;
    position: absolute;
    border-radius: 2px;
    height: 4px;
  }
}

</style>
