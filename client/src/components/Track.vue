<template>
<span class="track" :class="{isTrackPlaying}">
  <span class="right cell">
    <p class="hideOnHover trackNumber">{{ trackNumber }}</p>
    <div class="play-button-container showOnHover">
      <PlayButton size="sm" :isPlaying="isTrackPlaying" @click="onPlayToggle" />
    </div>
  </span>
  <span class="cell">
    <TrackNameAndArtists :isPlaying="isTrackPlaying" :track="track" :artists="artists" />
  </span>
  <span class="right cell">
      <span class="albumContainer">
        <span class="album" 
          @click="onAlbumClick(album)">
          {{album.name}}
        </span>
      </span>
  </span>
  <span class="right cell">
    <span class="duration">{{duration}}</span>
  </span>
</span>
</template>

<script>
import { msToMinAndSec } from '@/utils'
import PlayButton from '@/components/PlayButton'
import TrackNameAndArtists from '@/components/TrackNameAndArtists'
import { mapGetters } from 'vuex'
import {every, includes} from 'lodash'

export default {
  props: ['track', 'trackNumber'],
  components: {PlayButton, TrackNameAndArtists},
  computed: {
    ...mapGetters(['currentlyPlayingTrack', 'isPlaying']),
    artists() {
      return this.track.artists
    },
    artistUris() {
      return this.artists.map(a => a.uri)
    },
    album() {
      return this.track.album
    },
    duration() {
      return msToMinAndSec(this.track.duration_ms)
    },
    isTrackPlaying() {
      if (!this.isPlaying || !this.currentlyPlayingTrack) {
        return false
      }
      // cannot rely on uri since Spotify will undeterministically play a differnt URI of the same track
      return this.track.name === this.currentlyPlayingTrack.name && this.currentlyPlayingTrack.artists.length === this.artists.length && every(this.currentlyPlayingTrack.artists, a => includes(this.artistUris, a.uri))
    }
  },
  methods: {
    onAlbumClick({uri}) {
      window.open(uri)
    },
    onPlayToggle() {
      if (this.isTrackPlaying) {
        this.$emit('pause')
      } else {
        this.$emit('play')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/colors';
@import '~styles/grid';
@import '~styles/breakpoints';

.track.isPlaying {
  .title {
    color: $theme4;
    font-weight: bold;
  }
}

.track {
  @include result-grid;

  transition: transform .2s;
  border-radius: 5px;
  
  min-height: 4rem;
  padding-right: $resultsGridPaddingRight;

  .albumContainer {
    max-width: 7rem;
    overflow: hidden;
    text-overflow: ellipsis;

    @include minTablet {
      max-width: 30rem;
    }
  }
  .album {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  .showOnHover {
    display: none;
  }
  .hideOnHover {
    display: inline;
  }

  &:hover {
    background-color: $theme2;

    .showOnHover {
      display: inline;
    }
    .hideOnHover {
      display: none;
    }
  }

  .cell {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 10px 0;

    &.right {
      justify-content: flex-end;
    }

    &.center {
      justify-content: center;
    }

  }
  .trackNumber {
    font-size: .8rem;
    min-width: 1rem;
  }

  .album, .duration {
    text-align: right;
  }

  .album {
    &:hover {
      color: $theme4;
      font-weight: bold;
      cursor: pointer;
    }
  }

  .albumContainer {
    &:hover {
      transform: translateX(-2.5px);
      transition: transform .2s;
    }
  }
}
</style>

