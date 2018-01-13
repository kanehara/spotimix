<template>
  <div class="volumeControl">
    <i v-if="isVolumeOff" class="volume off icon"/>
    <i v-else-if="isVolumeLow" class="volume down icon"/>
    <i v-else-if="isVolumeHigh" class="volume up icon"/>
    <Slider @change="change"/>
  </div>
</template>

<script>
import Slider from './Slider'

export default {
  components: {
    Slider
  },
  props: {
    volume: {
      type: Number,
      default: 1,
    }
  },
  computed: {
    isVolumeOff() {
      return this.volume === 0
    },
    isVolumeLow() {
      return this.volume < 0.5
    },
    isVolumeHigh() {
      return this.volume >= 0.5
    }
  },
  methods: {
    change(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="scss" scoped>
.volume.icon {
  margin-right: 30px;
}

.volumeControl {
  display: flex;
}
</style>

