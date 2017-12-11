<template>
  <div class="container">
    <div class="inputContainer" @click="focusInput" :class="{focused: isInputFocused}">
      <slot name="left"></slot>
      <input 
        type="text" 
        class="search"
        ref="input"
        :id="id" 
        :value="value" 
        :disabled="disabled"
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
    value: String,
    disabled: Boolean
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
$b-radius: 10px;

.container {
  display: flex;
  flex-direction: column;
  position: relative;


  .inputContainer {
    width: 100%;
    cursor: text;
    display: flex;
    flex-wrap: wrap;
    background-color: white;
    padding: 4px;
    box-sizing: border-box;
    height: auto;
    border-radius: 5px;
    border: 1.5px solid transparent;

    &.focused {
      border: 1.5px solid $theme4;
    }

    input.search {
      background: none transparent;
      height: auto;
      padding: 0;
      border: none;
      box-shadow: none;
      outline: 0;
      height: 30px;

      &[disabled] {
        color: transparent;
      }
    }
  }

  .suggestions {
    position: absolute;
    top: calc(100% + 1.5px);
    z-index: $z-5;
    width: 100%;
  }
}
</style>
