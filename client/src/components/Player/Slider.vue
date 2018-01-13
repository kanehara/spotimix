<template>
  <div style="width: 100%">
    <div class="progressBar" @click="change">
      <div class="background middleAlign">
        <div class="foreground">
        </div>
        <div class="anchor middleAlign">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    min: {
      default: 0,
      type: Number
    },
    max: {
      default: 1,
      type: Number
    }
  },
  methods: {
    change(e) {
      const percentage = e.offsetX / e.target.offsetWidth
      this.$emit('change', this.min + ((this.max - this.min) * percentage))
    }
  }
}
</script>


<style lang="scss" scoped>
@import '~styles/colors';

.progressBar {
  height: 12px;
  cursor: pointer;
  position: relative;
  width: 100%;

  &:hover {
    .anchor {
      transition-property: all;
      transition-duration: .1s;
      transition-timing-function: cubic-bezier(.3,0,0,1);
      transform: scale(1);
      opacity: 1;
    }
  }
}

.background {
  background: $theme3;
  height: 4px;
  width: 100%;
  border-radius: 5px;
  display: flex;
}

.foreground {
  background: $theme4;
}

.anchor {
  background-color: #fff;
  border-radius: 50%;
  width: 12px;
  height: 12px;
  margin-left: -6px;
  margin-top: -6px;
  z-index: 100;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.5);
  transform: scale(0);
  opacity: 0;
}

.middleAlign {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
</style>

