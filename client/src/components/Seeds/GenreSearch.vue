<template>
  <div>
    <label for="genre" @click.prevent><h5>Genre</h5></label>
    <SeedSearch id="genre" 
      v-model="query"
      :seedType="seedType"
      :suggestions="suggestions">
      <i slot="right"
        class="angle down icon dropdown-icon"
        @click.stop="console.log('hi')"/>
    </SeedSearch>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import SeedSearch from './SeedSearch'
import {SEED_TYPES} from 'x/seeds'
import {mapGetters} from 'vuex'

export default {
  components: {
    SeedSearch
  },
  data: () => ({
    seedType: SEED_TYPES.GENRE,
    query: ''
  }),
  computed: {
    ...mapGetters(['genreSeeds']),
    suggestions() {
      return this.genres
        ? this.genres
          .filter(g => g.search(new RegExp(`${this.query}.*`, 'i')) !== -1)
          .map(g => ({id: g, name: g}))
          .filter(g => this.genreSeeds.every(s => s.id !== g.id))
        : []
    },
  },
  apollo: {
    genres: gql`{genres}`
  },
}
</script>