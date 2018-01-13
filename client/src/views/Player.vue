<template>
  <div id="player">
    <Player/>
  </div>
</template>

<script>
import Player from '@/components/Player'

export default {
  components: {
    Player
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/colors';

#player {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 90px;
  background-color: $theme1;
  border-top: 1.5px solid $theme4;
  width: 100%;
}
</style>

