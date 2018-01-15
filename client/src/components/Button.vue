<template>
  <button 
  class="button" 
  :id="id"
  @click="click"
  :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: ['id', 'disabled'],
  methods: {
    click(e) {
      this.$emit('click', e)
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~styles/colors';

.button {
  border-radius: 7.5px;
  outline: 0;
  background: $theme4;
  color: white;
  border: none;

  &:hover {
    cursor: pointer;
    box-shadow: 2px 2px 2px $theme3;
    transform: translateY(-2%);

    &:active {
      box-shadow: none;
      transform: translateY(0);
    }
  }

  &[disabled] {
    background: $theme2;
    color: $theme3;
    cursor: default;
    box-shadow: none;
    transform: none;
  }
}
</style>

