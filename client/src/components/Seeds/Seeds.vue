<template>
  <div>
    <div class="seedsHeader">
      <h4>Please select up to 5 seeds</h4>
    </div>
    <div class="seeds">
      <div class="item">
        <label for="track"><h5>Track</h5></label>
        <input type="text" id="track">
      </div>
      <div class="item">
        <label for="artist"><h5>Artist</h5></label>
        <input type="text" id="artist">
      </div>
      <div class="item">
        <label for="genre"><h5>Genre</h5></label>
        <input type="text" id="genre">
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss" >
@import '~style/breakpoints';

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