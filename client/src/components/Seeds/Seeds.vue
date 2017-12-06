<template>
  <div>
    <div class="seedsHeader">
      <h4>Please select up to 5 seeds</h4>
    </div>
    <div class="seeds">
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

.seedsHeader {
  h4 {
    margin: 0;
  }
}

.seeds {
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 30px;

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

  input[type="text"] {
    width: 100%;
    box-sizing: border-box;
  }
}

</style>