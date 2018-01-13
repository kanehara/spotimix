<template>
  <div id="seekBar">
    <Slider @change="seek" :max="duration"/>
  </div>
</template>

<script>
import Slider from './Slider'

export default {
  props: {
    currentPosition: {
      type: Number
    },
    duration: {
      type: Number
    }
  },
  components: {
    Slider
  },
  methods: {
    seek(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
  #seekBar {
    width: 100%;
    margin-bottom: 5px;
  }
</style>
