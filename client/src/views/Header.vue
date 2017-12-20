<template>
<div id="header">
  <span class="left">
    <slot name="left"></slot>
  </span>
  <router-link to="/" class="spotimix">Spotimix</router-link>
  <span class="right">
    <slot name="right"></slot>
  </span>
</div>
</template>

<style scoped lang="scss">
@import '~styles/colors';

#header {
  background-color: $contentBackground;
  border-bottom: 1.25px solid $theme3;
  border-top: 1.25px solid $theme3;
  padding: 15px;
  position: relative;
  margin-bottom: 25px;

  .left {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
  
  .right {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .spotimix {
    font-size: 2em;
  }
}

h1 {
  margin: 0;
  color: $theme4;

  &:hover {
    cursor: pointer;
  }
}
</style>