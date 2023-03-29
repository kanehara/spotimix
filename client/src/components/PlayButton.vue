<template>
<button @click="click" class="toggle-play-button" :class="{ clicking: isTogglePlayClicking, isSmall }" @mousedown="handleTogglePlayFocus" @mouseup="handleTogglePlayUnfocus" @mouseleave="handleTogglePlayUnfocus">
  <PauseIcon v-if="isPlaying" />
  <PlayIcon v-else />
</button>
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
.toggle-play-button {
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  outline: none;
  
  
  padding: .425rem;
  width: 2rem;
  border-radius: 2rem;
  height: 2rem;
  &.clicking {
    width: 2.1rem;
    border-radius: 2.1rem;
    height: 2.1rem;
  }

  &.isSmall {
    padding: .25rem;
    width: 1.1rem;
    border-radius: 1.1rem;
    height: 1.1rem;
    &.clicking {
      width: 1.2rem;
      border-radius: 1.2rem;
      height: 1.2rem;
    }
  }
}
</style>