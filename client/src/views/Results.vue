<template>
  <div>
    <div class="container">
      <h1 v-if="hasNoResults">No Results!</h1>
      <div v-else>
        <div class="header">
          <h4 class="title">Title</h4>
          <h4 class="artist">Artist</h4>
          <h4 class="duration">Duration</h4>
        </div>
        <div class="results">
          <Stagger :appear="!!animate">
            <Track v-for="(r, index) in results" :track="r" :key="r.id" :data-index="index"/>
          </Stagger>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Track from '@/components/Track'
import Header from '@/views/Header'
import Stagger from '@/transitions/group/Stagger'
import { mapGetters } from 'vuex'

export default {
  components: {
    Header,
    Track,
    Stagger
  },
  computed: {
    ...mapGetters(['results']),
    animate() {
      return this.$route.query.animate
    },
    hasNoResults() {
      return this.results.length === 0
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/grid';
@import '~styles/colors';

.container {
  padding-top: 0;
}

.header {
  @include result-grid;

  border-bottom: 1px solid $theme4;

  .title, .artist, .duration {
    text-align: left;
  }

  margin-bottom: 20px;
}
</style>

