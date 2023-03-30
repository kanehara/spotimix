<template>
  <div class="container">
    <button @click="click" class="btn" :class="{ clicking: isTogglePlayClicking }" @mousedown="handleTogglePlayFocus" @mouseup="handleTogglePlayUnfocus" @mouseleave="handleTogglePlayUnfocus">
      <NextIcon v-if="isNext" />
      <PrevIcon v-else />
    </button>
  </div>
  </template>
  
  <script>
  
  import PrevIcon from '@/components/PrevIcon'
  import NextIcon from '@/components/NextIcon'
  
  export default {
    components: {PrevIcon, NextIcon},
    data: () => ({
      isTogglePlayClicking: false,
    }),
    props: {
      kind: {
        type: String,
        default: 'next',
        validator(value) {
          return ['next', 'prev'].includes(value)
        }
      }
    },
    computed: {
      isNext() {
        return this.kind === 'next'
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

  $size: 1.6rem;
  $clickedSize: 1.5rem;

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  
  width: $size;
  height: $size;
  
  .btn {
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    outline: none;
    
    
    padding: .425rem;
    width: $size;
    border-radius: $size;
    height: $size;
    &.clicking {
      width: $clickedSize;
      border-radius: $clickedSize;
      height: $clickedSize;
    }
  }
}
  </style>