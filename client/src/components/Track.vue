<template>
<span class="track" :class="{isPlaying}">
  <span class="right cell">
    <p class="hideOnHover trackNumber">{{ trackNumber }}</p>
    <div class="play-button-container showOnHover">
      <PlayButton size="sm" :isPlaying="isPlaying" @click="onPlayToggle" />
    </div>
  </span>
  <span class="cell">
    <div class="titleArtist">
      <h4 class="title" @click="onTrackClick(track)">{{track.name}}</h4>
      <div class="artistContainer">
        <span class="artist" 
          v-for="artist in artists" 
          :key="artist.id"
          @click="onArtistClick(artist)">
        {{artist.name}}</span>
      </div>
    </div>
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
import { mapGetters } from 'vuex'
import {every, includes} from 'lodash'

export default {
  props: ['track', 'trackNumber'],
  components: {PlayButton},
  computed: {
    ...mapGetters(['currentlyPlayingTrack']),
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
    isPlaying() {
      if (!this.currentlyPlayingTrack) {
        return false
      }
      // cannot rely on uri since Spotify will undeterministically play a differnt URI of the same track
      return this.track.name === this.currentlyPlayingTrack.name && this.currentlyPlayingTrack.artists.length === this.artists.length && every(this.currentlyPlayingTrack.artists, a => includes(this.artistUris, a.uri))
    }
  },
  methods: {
    onTrackClick({uri}) {
      window.open(uri)
    },
    onArtistClick({uri}) {
      window.open(uri)
    },
    onAlbumClick({uri}) {
      window.open(uri)
    },
    onPlayToggle() {
      if (this.isPlaying) {
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

  .titleArtist {
    display: flex;
    flex-direction: column;
  }

  .artistContainer {
    text-align: left;
    font-size: .8rem;
  }
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

  .title, .album, .duration {
    margin: 10px 0;
  }
  .title {
    text-align: left;
  }

  .album, .duration {
    text-align: right;
  }

  .title, .album, .artist {
    &:hover {
      color: $theme4;
      font-weight: bold;
      cursor: pointer;
    }
  }

  .title, .artistContainer, .albumContainer {
    &:hover {
      transform: translateX(-2.5px);
      transition: transform .2s;
    }
  }

  .artist {
    &::after {
      content: ',';
      color: white;
      font-weight: normal;
    }

    &:last-child {
      &::after {
        content: '';
        margin: 0;
      } 
    }
  }
}
</style>

