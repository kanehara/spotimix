<template>
  <div>
    <label for="artist" @click.prevent><h5>Artist</h5></label>
    <SuggestionsSearch id="artist" v-model="query" :suggestions="suggestions"/>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import {SuggestionsSearch} from '@/components/Input/Search'

export default {
  components: {
    SuggestionsSearch
  },
  data: () => ({
    query: '',
    search: {
      artists: []
    }
  }),
  computed: {
    suggestions() {
      return this.query.length > 0
        ? this.search.artists
        : []
    },
  },
  apollo: {
    search: {
      query: gql`query SearchArtists($q: String!) {
        search(q: $q) {
          artists {
            id,
            name
          }
        }
      }`,
      variables () {
        return {
          q: this.query
        }
      },
      skip () {
        return this.query.length === 0
      }
    },
  }
}
</script>