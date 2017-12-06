<template>
  <div v-if="show && suggestions && suggestions.length > 0" class="suggestions">
    <div class="cell" v-for="s in suggestions" :key="s.id">
      <div class="detail" v-if="s.detail">{{s.detail}}</div>
      <div class="name" v-if="s.name">{{s.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean
    },
    suggestions: {
      type: Array,
      default: () => [],
      validator: value => value.length === 0 || value.every(v => v.id && v.name)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/colors.scss';

$b-radius: 10px;

.suggestions {
  border: 1px solid $tertiaryColor;
  border-radius: $b-radius;
  max-height: 300px;
  overflow-y: scroll;
  
  .cell {
    border-bottom: 1px solid $tertiaryColor;
    padding: 6px;
    background: $primaryColor;

    &:first-child {
      border-top-left-radius: $b-radius;
      border-top-right-radius: $b-radius;
    }

    &:last-child {
      border-bottom: none;
      border-bottom-left-radius: $b-radius;
      border-bottom-right-radius: $b-radius;
    }

    &:hover {
      cursor: pointer;
      background: $quaternaryColor;
    }
    .detail {
      font-size: .75em;
      margin-bottom: 5px;
      color: $spotifyGreen;
    }
  }
}
</style>
