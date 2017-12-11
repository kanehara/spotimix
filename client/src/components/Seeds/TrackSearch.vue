<template>
  <div>
    <label for="track" @click.prevent><h5>Track</h5></label>
    <SeedSearch 
      :seedType="seedType"
      id="track" 
      v-model="query" 
      :suggestions="suggestions"/>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import SeedSearch from './SeedSearch'
import {SEED_TYPES} from 'x/seeds'
import {mapGetters} from 'vuex'

const formatArtists = artists => {
  if (!artists || !artists.length || artists.length === 0) {
    return ''
  }
  return artists.map(a => a.name).join(', ')
}

export default {
  components: {
    SeedSearch
  },
  data: () => ({
    seedType: SEED_TYPES.TRACK,
    query: '',
    search: {
      tracks: []
    }
  }),
  computed: {
    ...mapGetters(['trackSeeds']),
    suggestions () {
      return this.query.length > 0
        ? this.search.tracks
          .map(t => ({
            id: t.id,
            detail: formatArtists(t.artists),
            name: t.name
          }))
          .filter(t => this.trackSeeds.every(s => s.id !== t.id))
        : []
    },
  },
  apollo: {
    search: {
      query: gql`query SearchTracks($q: String!) {
        search(q: $q) {
          tracks {
            id,
            name,
            artists {
              name
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
    }
  }
}
</script>