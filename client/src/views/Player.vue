<template>
  <div id="player">
    <SpotifyLogin v-if="!isLoggedIn" id="spotifyLogin"/>
    <Player :class="{ notLoggedIn: !isLoggedIn }"/>
  </div>
</template>

<script>
import Player from '@/components/Player'
import SpotifyLogin from '@/components/SpotifyLogin'
import { mapGetters } from 'vuex'

export default {
  components: {
    Player,
    SpotifyLogin
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/colors';
@import '~styles/z-index';

#player {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 90px;
  background-color: $theme1;
  border-top: 1.5px solid $theme4;
  width: 100%;
}

#spotifyLogin {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: $z-5;
}

.notLoggedIn {
  opacity: 0.25;
}

</style>
