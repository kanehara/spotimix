<template>
  <div class="searchSectionContainer">
    <div class="searchSectionHeader">
      <h4>
          Please select up to 5 seeds
      </h4>
      <div class="tooltip-container">
        <Tooltip>
          <p>Mixceed helps you discover songs on Spotify through a series of seeds and parameters.</p>
          <p>1. Select up to 5 combination of tracks, artists, and genres to feed the algorithm 🧪</p>
          <p>2. (Optional) Tweak additional parameters such as danceability 🕺</p>
          <p>3. Hit mix and see what you find! 🎛️</p>
        </Tooltip>
      </div>
    </div>
    <div class="searchSection">
      <div class="item">
        <TrackSearch/>
      </div>
      <div class="item">
        <ArtistSearch/>
      </div>
      <div class="item">
        <GenreSearch/>
      </div>
    </div>
    <div class="reset-container" :class="{visible: totalSeeds > 0}">
      <p @click="handleReset" class="reset-text">Reset</p>
    </div>
  </div>
</template>

<script>
import TrackSearch from './TrackSearch'
import ArtistSearch from './ArtistSearch'
import GenreSearch from './GenreSearch'
import Tooltip from '@/components/Tooltip'
import { mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    TrackSearch,
    ArtistSearch,
    GenreSearch,
    Tooltip
  },
  computed: {
    ...mapGetters(['totalSeeds'])
  },
  methods: {
    ...mapMutations(['RESET_ALL_ATTRIBUTES', 'REMOVE_ALL_SEEDS']),
    handleReset() {
      this.RESET_ALL_ATTRIBUTES()
      this.REMOVE_ALL_SEEDS()
    }
  }
}
</script>

<style scoped lang="scss" >
@import '~styles/breakpoints';
@import '~styles/colors';

.reset-container {
  visibility: hidden;
  margin-top: .7rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .reset-text {
    margin: 0;
    color: $red;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
      font-weight: 900;
    }
  }

  &.visible {
    visibility: visible;
  }
}

.searchSectionContainer {
  background: $theme2;
  border-radius: 7.5px;
  padding: 25px 10px;
  margin-bottom: 30px;
  box-shadow: $theme4 2px 2px 2.75px 0px;
}

.searchSectionHeader {
  display: flex;
  align-items: center;
  justify-content: center;

  h4 {
    margin: 0;
  }

  .tooltip-container {
    margin-left: .75rem;
    display: flex;
    justify-self: center;
  }
}

.searchSection {
  display: flex;
  align-items: baseline;
  flex-direction: column;

  @include minTablet {
    flex-direction: row;
  }
}

h5 {
  margin: 10px 0;
}

.item {
  flex-grow: 1;
  text-align: left;
  padding: 5px 15px;
  width: 100%;
  box-sizing: border-box;

  input[type="text"] {
    width: 100%;
    box-sizing: border-box;
  }
}

</style>