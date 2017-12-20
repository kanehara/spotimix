<template>
  <transition-group
    name="staggered-fade"
    :appear="appear"
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @leave="leave"
  >
    <slot></slot>
  </transition-group>
</template>

<script>
import Velocity from 'velocity-animate'

export default {
  props: ['appear'],
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
    },
    enter(el, done) {
      const delay = el.dataset.index * 50
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 1 },
          { complete: done }
        )
      }, delay)
    },
    leave(el, done) {
      const delay = el.dataset.index * 50
      setTimeout(function () {
        Velocity(
          el,
          { opacity: 0 },
          { complete: done }
        )
      }, delay)
    }
  }
}
</script>
