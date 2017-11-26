<template>
  <button @click="click ()" class="button" :class="[className, {disabled: disabled}]"></button>
</template>

<script>
export default {
  props: ['className', 'disabled'],
  methods: {
    click () {
      this.$emit('update:disabled', !this.disabled)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~style/colors';

.button {
  border-radius: 15px;
  width: 20px;
  border: 3px solid $tertiaryColor;
  height: 20px;
  background: $spotifyGreen;
  transition: background-color .2s;
  transition: opacity .2s;
  
  &:focus {
    outline: 0;
  }

  &:hover {
    cursor: pointer;
    border-color: $spotifyGreen;
  }

  &.disabled {
    background: $quaternaryColor;
    opacity: $disabledOpacity;

    &:hover {
      opacity: $disabledOpacity + .5;
      border-color: $quaternaryColor;
    }
  }
}
</style>
