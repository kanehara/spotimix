<template>
  <div>
    <label for="genre" @click.prevent><h5>Genre</h5></label>
    <DropdownSearch id="genre" v-model="query" :suggestions="suggestions"/>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import {DropdownSearch} from '@/components/Input/Search'

export default {
  components: {
    DropdownSearch
  },
  data: () => ({
    query: ''
  }),
  computed: {
    suggestions() {
      return this.genres
        ? this.genres
            .filter(g => g.search(new RegExp(`${this.query}.*`, 'i')) !== -1)
            .map(g => ({id: g, name: g}))
        : []
    }
  },
  apollo: {
    genres: gql`{genres}`
  },
  methods: {

  }
}
</script>