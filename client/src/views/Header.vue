<template>
<div id="header">
  <span class="left">
    <slot name="left"></slot>
  </span>
  <router-link to="/" class="spotimix">
    <div class="icon-container">
      <SpotimixIcon fill="#2AB759"/>
    </div>
  </router-link>
  <span class="right">
    <slot name="right"></slot>
  </span>
</div>
</template>

<script>
import SpotimixIcon from '@/components/SpotimixIcon'

export default {
  components: {
    SpotimixIcon
  }
}
</script>


<style scoped lang="scss">
@import '~styles/colors';

.icon-container {
  display: flex;
  max-height: 2.5rem;
  justify-content: center;
  margin: auto;
}

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
    padding: 0;
    font-weight: 100;
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