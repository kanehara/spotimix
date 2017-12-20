<template>
  <span class="tag" @click="click">
    <span class="label">{{label}}</span>
    <i class="remove icon" @click.stop="remove"></i>
  </span>
</template>

<script>
export default {
  props: ['id', 'label'],
  methods: {
    click() {
      this.$emit('click', this.id)
    },
    remove() {
      this.$emit('remove', this.id)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~styles/colors";

.tag {
  display: flex;
  align-items: center;
  background: $theme4;
  border-radius: 10px;
  padding: 5px 7px;
  width: auto;
  justify-content: space-between;
  transition: all .2s;

  &:hover {
    cursor: default;
    background: $theme2;
  }

  .remove.icon {
    margin-right: 0;
    color: $negRed;
    &:hover {
      cursor: pointer;
      color: $negRed-hover;
    }
  }

  .label {
    margin-right: 5px;
    text-shadow: .25px .25px 3px $theme3;
  }
}
</style>
