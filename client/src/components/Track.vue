<template>
<span class="track">
  <span class="cell">
    <span class="title" @click="onTrackClick">{{track.name}}</span>
  </span>
  <span class="artistContainer cell">
    <span class="artist" 
    v-for="artist in artists" 
    :key="artist.id"
    @click="onArtistClick(artist.id)">
      {{artist.name}}</span>
  </span>
  <span class="cell">
    <span class="duration">{{duration}}</span>
  </span>
</span>
</template>

<script>
import { msToMinAndSec } from '@/utils'

export default {
  props: ['track'],
  computed: {
    artists() {
      return this.track.artists
    },
    duration() {
      return msToMinAndSec(this.track.duration_ms)
    }
  },
  methods: {
    onTrackClick() {
      if (this.track.external_urls && this.track.external_urls.spotify) {
        window.open(this.track.external_urls.spotify, '_blank')
      }
    },
    onArtistClick(id) {
      const artist = this.track.artists.find(a => a.id === id)
      if (artist && artist.external_urls && artist.external_urls.spotify) {
        window.open(artist.external_urls.spotify, '_blank')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/colors';
@import '~styles/grid';

.track {
  @include result-grid;

  padding: 2px 20px;
  transition: transform .2s;
  &:hover {
    background-color: $theme2;
    transform: translateX(1.5px);
  }

  .cell {
    display: flex;
  }

  .title, .artist, .duration {
    text-align: left;
    margin: 10px 0;
  }

  .title, .artist {
    &:hover {
      color: $theme4;
      font-weight: bold;
      cursor: pointer;
    }
  }

  .title, .artistContainer {
    &:hover {
      transform: translateX(-2.5px);
      transition: transform .2s;
    }
  }

  .artist {
    &::after {
      margin: 0 10px;
      content: '|';
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

