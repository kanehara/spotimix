<template>
  <div class="container" :class="{ isSmall }">
    <button @click="click" class="toggle-play-button" :class="{clicking: isTogglePlayClicking}" @mousedown="handleTogglePlayFocus" @mouseup="handleTogglePlayUnfocus" @mouseleave="handleTogglePlayUnfocus">
      <PauseIcon v-if="isPlaying" />
      <PlayIcon v-else />
    </button>
  </div>
</template>

<script>

import PlayIcon from '@/components/PlayIcon'
import PauseIcon from '@/components/PauseIcon'

export default {
  components: {PlayIcon, PauseIcon},
  data: () => ({
    isTogglePlayClicking: false,
  }),
  props: {
    isPlaying: Boolean,
    size: {
      type: String,
      default: 'md',
      validator(value) {
        return ['sm', 'md'].includes(value)
      }
    }
  },
  computed: {
    isSmall() {
      return this.size === 'sm'
    }
  },
  methods: {
    handleTogglePlayFocus() {
      this.isTogglePlayClicking = true
    },
    handleTogglePlayUnfocus() {
      this.isTogglePlayClicking = false
    },
    click() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
$mdSize: 2rem;
$mdClickedSize: 1.9rem;

$smSize: 1.1rem;
$smClickedSize: 1rem;

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: $mdSize;
  height: $mdSize;
  
  .toggle-play-button {
    padding: .425rem;
    width: $mdSize;
    height: $mdSize;
    border-radius: $mdSize;
  }
  .toggle-play-button.clicking {
    width: $mdClickedSize;
    border-radius: $mdClickedSize;
    height: $mdClickedSize;
  }

  &.isSmall {
    width: $smSize;
    height: $smSize;
    
    .toggle-play-button {
      padding: .25rem;
      border-radius: $smSize;
      width: $smSize;
      border-radius: $smSize;
      height: $smSize;
    }

    .toggle-play-button.clicking {
      width: $smClickedSize;
      border-radius: $smClickedSize;
      height: $smClickedSize;
    }
  }
}


.toggle-play-button {
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  outline: none;
}
</style>