<template>
  <div>
    <label for="artist" @click.prevent><h5>Artist</h5></label>
    <SeedSearch 
      id="artist" 
      v-model="query" 
      :seedType="seedType"
      :suggestions="suggestions"
      @select="query = ''"/>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import SeedSearch from './SeedSearch'
import {SEED_TYPES} from 'x/seeds'
import {mapGetters} from 'vuex'
import {get} from 'lodash'

export default {
  components: {
    SeedSearch
  },
  data: () => ({
    seedType: SEED_TYPES.ARTIST,
    query: '',
    search: {
      artists: []
    }
  }),
  computed: {
    ...mapGetters(['artistSeeds']),
    suggestions() {
      return this.query.length > 0
        ? this.search.artists
          .filter(a => this.artistSeeds.every(s => s.id !== a.id))
          .map(a => ({
            ...a,
            imgUrl: get(a, 'images[0].url')
          }))
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
            images {
              url
            }
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
  },
}
</script>