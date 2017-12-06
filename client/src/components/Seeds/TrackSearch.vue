<template>
  <div>
    <label for="track" @click.prevent><h5>Track</h5></label>
    <SuggestionsSearch id="track" v-model="query" :suggestions="suggestions"/>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import {SuggestionsSearch} from '@/components/Input/Search'

const formatArtists = artists => {
  if (!artists || !artists.length || artists.length === 0) {
    return ''
  }
  return artists.map(a => a.name).join(', ')
}

export default {
  components: {
    SuggestionsSearch
  },
  data: () => ({
    query: '',
    search: {
      tracks: []
    }
  }),
  computed: {
    suggestions () {
      return this.query.length > 0
        ? this.search.tracks.map(t => ({
          id: t.id,
          detail: formatArtists(t.artists),
          name: t.name
        }))
        : []
    }
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