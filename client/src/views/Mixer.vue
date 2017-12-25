<template>
  <div class="mixer">
    <SearchSection/>
    <SubmitButton 
      class="submitButton" 
      label="Mix" 
      @click="submit" 
      :loading="loadingCount !== 0"
      :disabled="totalSeeds === 0 || totalSeeds > 5"/>
    <SliderContainer 
      v-for="a in allAttributes" 
      :key="a.name" 
      :attribute="a" 
      :disabled="totalSeeds === 0 || totalSeeds > 5"/>
  </div>
</template>

<script>
/* eslint-disable camelcase */
import gql from 'graphql-tag'
import { MIX, RECEIVE_RESULTS } from 'x/mixer/mutation-types'
import Mixer from '@/views/Mixer'
import SearchSection from '@/views/SearchSection'
import SliderContainer from '@/views/SliderContainer'
import SubmitButton from '@/components/SubmitButton'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    SliderContainer,
    Mixer,
    SearchSection,
    SubmitButton
  },
  data() {
    return {
      payload: {
        limit: 20,
        seed_artists: null,
        seed_tracks: null,
        seed_genres: null,
        target_acousticness: null,
        target_danceability: null,
        target_energy: null,
        target_instrumentalness: null,
        target_key: null,
        target_liveness: null,
        target_loudness: null,
        target_mode: null,
        target_popularity: null,
        target_speechiness: null,
        target_tempo: null,
        target_valence: null,
      },
      loadingCount: 0
    }
  },
  methods: {
    ...mapMutations([MIX, RECEIVE_RESULTS]),
    submit() {
      this.payload.seed_tracks = this.trackSeeds.map(s => s.id).toString()
      this.payload.seed_artists = this.artistSeeds.map(s => s.id).toString()
      this.payload.seed_genres = this.genreSeeds.map(s => s.id).toString()
      this.disabledAttributes.forEach(a => { this.payload[`target_${a.type}`] = null })
      this.enabledAttributes.forEach(a => { this.payload[`target_${a.type}`] = a.value })
      this.MIX({payload: this.payload})
    },
  },
  computed: {
    ...mapGetters([
      'allAttributes',
      'enabledAttributes',
      'disabledAttributes',
      'trackSeeds',
      'artistSeeds',
      'genreSeeds',
      'totalSeeds',
      'results'
    ])
  },
  apollo: {
    recommendations: {
      query: gql`query Recommendations(
        $limit: Int,
        $seed_artists: String,
        $seed_tracks: String,
        $seed_genres: String,
        $target_acousticness: Float,
        $target_danceability: Float,
        $target_energy: Float,
        $target_instrumentalness: Float,
        $target_key: Int,
        $target_liveness: Float,
        $target_loudness:Float
        $target_mode: Int,
        $target_popularity: Int,
        $target_speechiness: Float,
        $target_tempo: Float,
        $target_valence: Float
      ) {
        recommendations(
          limit: $limit,
          seed_artists: $seed_artists,
          seed_tracks: $seed_tracks,
          seed_genres: $seed_genres,
          target_acousticness: $target_acousticness,
          target_danceability: $target_danceability,
          target_energy: $target_energy,
          target_instrumentalness: $target_instrumentalness,
          target_key: $target_key,
          target_liveness: $target_liveness,
          target_loudness: $target_loudness,
          target_mode: $target_mode,
          target_popularity: $target_popularity,
          target_speechiness: $target_speechiness,
          target_tempo: $target_tempo,
          target_valence: $target_valence,
        ) {
          tracks {
            id
            name
            duration_ms
            external_urls {
              spotify
            }
            artists {
              id
              name
              external_urls {
                spotify
              }
            }
          }
        }
      }`,
      variables () {
        const {
          limit,
          seed_artists,
          seed_tracks,
          seed_genres,
          target_acousticness,
          target_danceability,
          target_energy,
          target_instrumentalness,
          target_key,
          target_liveness,
          target_loudness,
          target_mode,
          target_popularity,
          target_speechiness,
          target_tempo,
          target_valence,
        } = this.payload
        return {
          limit,
          seed_artists,
          seed_tracks,
          seed_genres,
          ...target_acousticness && { target_acousticness },
          ...target_danceability && { target_danceability },
          ...target_energy && { target_energy },
          ...target_instrumentalness && { target_instrumentalness },
          ...target_key && { target_key },
          ...target_liveness && { target_liveness },
          ...target_loudness && { target_loudness },
          ...target_mode && { target_mode },
          ...target_popularity && { target_popularity },
          ...target_speechiness && { target_speechiness },
          ...target_tempo && { target_tempo },
          ...target_valence && { target_valence }
        }
      },
      skip () {
        return (!this.payload.seed_artists && !this.payload.seed_tracks && !this.payload.seed_genres)
      },
      loadingKey: 'loadingCount',
      result(res) {
        this.RECEIVE_RESULTS({results: this.recommendations.tracks})
        this.$router.push('results?animate=true')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.submitButton {
  margin-bottom: 20px;
}
</style>
