<template>
  <span class="container">
    <TooltipIcon />
    <div class="tooltip-content">
      <slot></slot>
    </div>
  </span>
</template>

<script>
import TooltipIcon from '@/components/TooltipIcon'

export default {
  components: {TooltipIcon},
}
</script>

<style scoped lang="scss" >
@import '~styles/breakpoints';

.tooltip-content {
  display: none;
  position: absolute;
  top: 1.5rem;
  right: 0;
  z-index: 1000;
  border-radius: 5px;
  padding: .5rem;
  background-color: white;
  color: black;


  width: 200px;
  @include minTablet {
    width: 500px;
  }
}

.container {
  position: relative;
  width: 1rem;
  height: 1rem;

  &:hover {
    .tooltip-content {
      display: block;
    }
  }
}
</style>
