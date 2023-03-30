<template>
  <div class="titleArtist" :class="{skinny}">
    <div class="titleContainer" >
      <h4 class="title" :class="{isPlaying}" @click="onTrackClick(track)">{{track.name}}</h4>
    </div>
    <div class="artistContainer">
      <span class="artist" 
        v-for="artist in artists" 
        :key="artist.id"
        @click="onArtistClick(artist)">
      {{artist.name}}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['track', 'artists', 'skinny', 'isPlaying'],
  methods: {
    onTrackClick({uri}) {
      window.open(uri)
    },
    onArtistClick({uri}) {
      window.open(uri)
    },
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/colors';
@import '~styles/breakpoints';

.titleArtist {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &.skinny {
    .titleContainer {
      max-width: 100px;
      @include minTablet { 
        max-width: none;
      }
    }
  }
}

.artistContainer {
  font-size: .8rem;
  display: flex;
  align-items: flex-start;
}

.titleContainer {
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 170px;

  @include minTablet {
    max-width: none;
  }
}

.title {
  margin: 0;
  margin-bottom: .5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &.isPlaying {
    color: $theme4;
    font-weight: bold;
    cursor: pointer;
  }
}

.title, .artist {
  text-align: left;
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
    content: ',';
    color: white;
    font-weight: normal;
  }

  margin-right: 4px;

  &:last-child {
    margin-right: 0;
    &::after {
      content: '';
      margin: 0;
    } 
  }
}

</style>