<template>
<span class="track">
  <h4 class="title">{{track.name}}</h4>
  <h4 class="artist">{{artists}}</h4>
  <h4 class="duration">{{duration}}</h4>
</span>
</template>

<script>
import { formatArtists, msToMinAndSec } from '@/utils'

export default {
  props: ['track'],
  computed: {
    artists() {
      return formatArtists(this.track.artists)
    },
    duration() {
      return msToMinAndSec(this.track.duration_ms)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/colors';
@import '~styles/grid';

.track {
  @include result-grid;

  .title, .artist, .duration {
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 10px 0;
  }
}
</style>

