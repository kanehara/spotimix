<template>
  <span class="playPauseButtons">
    <i v-if="playing" @click="pause" class="pause icon"/>
    <i v-else @click="play" class="play icon"/>
  </span>
</template>

<script>
export default {
  props: ['playing'],
  methods: {
    pause() {
      this.$emit('pause')
    },
    play() {
      this.$emit('play')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/colors';

.icon {
  cursor: pointer;
  user-select: none;

  &:hover {
    color: $theme4;
  }
}

.playPauseButtons {
  margin: 0 20px;
}
</style>


