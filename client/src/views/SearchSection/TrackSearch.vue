<template>
  <div>
    <label for="track" @click.prevent><h5>Track</h5></label>
    <SeedSearch 
      id="track" 
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
import { formatArtists } from '@/utils'
import {get} from 'lodash'

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
            name: t.name,
            imgUrl: get(t, 'album.images[0].url')
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
            album {
              images {
                url
              }
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