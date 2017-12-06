<template>
  <div class="container">
    <div class="inputContainer" @click="focusInput" :class="{focused: isInputFocused}">
      <slot name="tags"></slot>
      <input 
        type="text" 
        class="search"
        ref="input"
        :id="id" 
        :value="value" 
        @focus="focus" 
        @focusout="focusout"
        @input="onInput($event.target.value)">
      <slot name="right"></slot>
    </div>
    <div class="suggestions">
      <slot name="suggestions"></slot>
    </div>
  </div>
</template>

<script>
import {throttle} from 'lodash'

export default {
  props: {
    id: String,
    value: String
  },
  data() {
    return {
      isInputFocused: false
    }
  },
  methods: {
    onInput (val) {
      throttle(() => this.$emit('input', val), 500)()
    },
    focusInput() {
      this.$refs.input.focus()
    },
    focus() {
      this.isInputFocused = true
      this.$emit('focus')
    },
    focusout() {
      this.isInputFocused = false
      this.$emit('focusout')
    }

  }
}
</script>

<style scoped lang="scss">
@import '~styles/z-index.scss';
@import '~styles/colors.scss';
$inputHeight: 35px;
$b-radius: 10px;

.container {
  display: flex;
  flex-direction: column;
  position: relative;


  .inputContainer {
    width: 100%;
    cursor: text;
    display: flex;
    background-color: white;
    padding: 4px;
    box-sizing: border-box;
    height: $inputHeight;
    border-radius: 5px;

    &.focused {
      border: 1.5px solid $spotifyGreen;
    }

    input.search {
      background: none transparent;
      height: auto;
      padding: 0;
      border: none;
      box-shadow: none;
      outline: 0;
    }
  }

  .suggestions {
    position: absolute;
    top: 37.5px;
    z-index: $z-5;
    width: 100%;
  }
}
</style>
