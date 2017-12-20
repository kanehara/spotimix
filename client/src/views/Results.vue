<template>
  <div>
    <div class="results">
      <div class="header">
        <h4 class="title">Title</h4>
        <h4 class="artist">Artist</h4>
        <h4 class="duration">Duration</h4>
      </div>
      <Track v-for="r in results" :track="r" :key="r.id"/>
    </div>
  </div>
</template>

<script>
import Track from '@/components/Track'
import Header from '@/views/Header'
import { mapGetters } from 'vuex'

export default {
  components: {
    Header,
    Track
  },
  computed: {
    ...mapGetters(['results'])
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/grid';
@import '~styles/colors';

.results {
  padding: 5%;
  padding-top: 0;
}

.header {
  @include result-grid;

  border-bottom: 1px solid $theme4;

  .title, .artist, .duration {
    text-align: left;
  }
}
</style>

