<template>
  <transition name="slideDown">
    <div v-if="show && suggestions && suggestions.length > 0" class="suggestions">
      <div class="cell" v-for="s in suggestions" :key="s.id" @click="select({id: s.id, name: s.name})">
        <div class="img-container" v-if="s.imgUrl">
          <img :src="s.imgUrl" />
        </div>
        <div class="content-container">
          <div class="detail" v-if="s.detail">{{s.detail}}</div>
          <div class="name" v-if="s.name">{{s.name}}</div>
        </div>
      </div>
    </div>
  </transition>
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
    },
  },
  methods: {
    select(suggestion) {
      this.$emit('select', suggestion)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/colors.scss';

$b-radius: 10px;

.suggestions {
  border-radius: $b-radius;
  max-height: 300px;
  overflow-y: scroll;
  
  .content-container {
    display: flex;
    flex-direction: column;
  }

  .img-container {
    margin-right: .2rem;
    padding: .1rem .5rem;

    img {
      width: 2rem;
      height: 2rem;
    }
  }

  .cell {
    display: flex;
    align-items: center;
    border: 1px solid $theme2;
    padding: 6px;
    background: $theme0;

    &:first-child {
      border-top-left-radius: $b-radius;
      border-top-right-radius: $b-radius;
    }

    &:last-child {
      border-bottom-left-radius: $b-radius;
      border-bottom-right-radius: $b-radius;
    }

    &:hover {
      cursor: pointer;
      background: $theme3;
    }
    .detail {
      font-size: .75em;
      margin-bottom: 5px;
      color: $theme4;
    }
  }
}

.slideDown-enter-active {
  transition: all .2s ease-in;
}
.slideDown-leave-active {
  transition: all .1s ease-out;
}

.slideDown-enter, .slideDown-leave-to {
  height: 0;
}

.slideDown-enter-to, .slideDown-leave {
  height: 500px;
}
</style>
