<template>
  <button @click.stop="click" class="button" :class="[className, {disabled: disabled}]"></button>
</template>

<script>
export default {
  props: ['className', 'disabled'],
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~styles/colors';

.button {
  border-radius: 15px;
  width: 20px;
  border: 3px solid $theme2;
  height: 20px;
  background: $theme4;
  transition: all .3s;
  
  &:focus {
    outline: 0;
  }

  &:hover {
    cursor: pointer;
    border-color: transparent;
  }

  &.disabled {
    background: $theme3;
    opacity: $disabledOpacity;

    &:hover {
      opacity: $disabledOpacity + .5;
      border-color: $theme2;
    }
  }
}
</style>
