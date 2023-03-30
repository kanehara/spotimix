<template>
  <div class="submitButtonContainer">  
    <button 
    id="submitButton" 
    @click="click" 
    :disabled="disabled || loading">
      <h1>{{ label }}</h1>
    </button>
  </div>
</template>

<script>
export default {
  props: ['label', 'disabled', 'loading'],
  methods: {
    click() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/colors';

#submitButton {
  padding: 0 50px; 
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

