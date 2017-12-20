<template>
  <div class="sliderContainer" :class="{ disabled: disabled }">
    <span class="sliderLabel" :data-attribute-type="attribute.name">{{attribute.name}}</span>
    <Slider 
      class="slider"
      :initialValue="attribute.value"
      :initialDisabled="attribute.disabled"
      :min="attribute.min" 
      :max="attribute.max" 
      :step="attribute.step"
      :labelMapper="attribute.labelMapper"
      @input="input"
      @enable="enable"
      @disable="disable"/>  
  </div>
</template>

<script>
import Slider from '@/components/Slider'
import { mapMutations } from 'vuex'
import {
  EDIT_ATTRIBUTE,
  ENABLE_ATTRIBUTE,
  DISABLE_ATTRIBUTE,
} from 'x/attributes/mutation-types'

export default {
  props: ['attribute', 'disabled'],
  components: {
    Slider
  },
  methods: {
    ...mapMutations([EDIT_ATTRIBUTE, ENABLE_ATTRIBUTE, DISABLE_ATTRIBUTE]),
    input(v) {
      const mappedValue = this.attribute.valueMapper(v)
      if (this.attribute.value !== mappedValue) {
        this.EDIT_ATTRIBUTE({ attributeType: this.attribute.type, value: mappedValue })
      }
    },
    enable() {
      this.ENABLE_ATTRIBUTE({ attributeType: this.attribute.type })
    },
    disable() {
      this.DISABLE_ATTRIBUTE({ attributeType: this.attribute.type })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/breakpoints';

.sliderContainer {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  &.disabled {
    pointer-events: none;
    opacity: .2;
  }

  .slider {
    flex-grow: 1;

    @include minMobile {
      min-width: 350px;
    }

    @include minTablet {
      min-width: 400px;
    }
  }

  .sliderLabel {
    min-width: 150px;
    box-sizing: border-box;
    text-align: left;
  }

  [data-attribute-type="Mode"] {
    padding-left: 15px;
  }
}
</style>

