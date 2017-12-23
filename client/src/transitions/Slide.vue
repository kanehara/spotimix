<template>
  <transition :name="name" appear>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  props: ['direction'],
  computed: {
    name() {
      return `slide-${this.direction}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .slide-left-enter {
    transform: translateX(50%);
    opacity: 0;
  }
  .slide-left-enter-active {
    transition: all .3s ease-out;
  }
  .slide-left-enter-to {
    transform: translateX(0);
  }
  .slide-left-leave-active {
    transition: all .2s ease-in;
  }
  .slide-left-leave-to {
    transform: translateX(-50%);
    opacity: 0;
  }
  
  .slide-right-enter {
    transform: translateX(-50%);
    opacity: 0;
  }
  .slide-right-enter-active {
    transition: all .3s ease-out;
  }
  .slide-right-enter-to {
    transform: translateX(0);
  }
  .slide-right-leave-active {
    transition: all .2s ease-in;
  }
  .slide-right-leave-to {
    transform: translateX(50%);
    opacity: 0;
  }
</style>
