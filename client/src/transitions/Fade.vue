<template>
  <transition name="fade" appear>
    <slot></slot>
  </transition>
</template>

<style lang="scss" scoped>
  .fade-enter {
    opacity: 0;
  }
  .fade-enter-active {
    transition: all .3s ease-out;
  }
  .fade-enter-to {
    opacity: 1;
  }
  .fade-leave-active {
    transition: all .2s ease-in;
  }
  .fade-leave-to {
    opacity: 0;
  }
</style>