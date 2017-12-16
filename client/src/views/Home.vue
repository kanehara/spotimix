<template>
  <div>
    <SearchSection/>
    <SubmitButton 
      class="submitButton" 
      label="Mix" 
      @click="submit" 
      :disabled="totalSeeds === 0 || totalSeeds > 5"/>
    <Mixer/>
  </div>
</template>

<script>
// import gql from 'graphql-tag'
import Mixer from '@/views/Mixer'
import SearchSection from '@/views/SearchSection'
import SubmitButton from '@/components/SubmitButton'
import { mapGetters } from 'vuex'

export default {
  components: {
    Mixer,
    SearchSection,
    SubmitButton
  },
  data() {
    return {
      blah: 'blah'
    }
  },
  methods: {
    submit() {
      console.log('Submit')
    }
  },
  computed: {
    ...mapGetters(['enabledAttributes', 'trackSeeds', 'artistSeeds', 'genreSeeds', 'totalSeeds'])
  },
  // apollo: {
  //   mixResults: {
  //     query: gql`query SearchRecommendations

  //     `,
  //     variables () {

  //     },
  //     skip () {
  //       return this.totalSeeds === 0 || this.totalSeeds > 5
  //     }
  //   },
  // }
}
</script>

<style lang="scss" scoped>
.submitButton {
  margin-bottom: 20px;
}
</style>

