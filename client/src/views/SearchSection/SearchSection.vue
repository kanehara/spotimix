<template>
  <div class="searchSectionContainer">
    <div class="searchSectionHeader">
      <h4>Please select up to 5 seeds</h4>
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
  </div>
</template>

<script>
import TrackSearch from './TrackSearch'
import ArtistSearch from './ArtistSearch'
import GenreSearch from './GenreSearch'

export default {
  components: {
    TrackSearch,
    ArtistSearch,
    GenreSearch
  }
}
</script>

<style scoped lang="scss" >
@import '~styles/breakpoints';
@import '~styles/colors';

.searchSectionContainer {
  background: $theme2;
  border-radius: 7.5px;
  padding: 25px 10px;
  margin-bottom: 30px;
  box-shadow: $theme4 2px 2px 2.75px 0px;
}

.searchSectionHeader {
  h4 {
    margin: 0;
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