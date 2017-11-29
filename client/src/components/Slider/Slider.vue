<template>
  <div class="slidercontainer">
    <ToggleButton :disabled.sync="disabled" className="toggleButton"/>
    <input
      v-model.number="value"
      @input="input ()"
      type="range" 
      :min="min" 
      :max="max"
      class="slider"  
      :disabled="disabled">
    <label :class="{disabled: disabled}">{{value}}</label>
  </div>
</template>

<script>
import ToggleButton from './ToggleButton'

export default {
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    }
  },
  components: {
    ToggleButton
  },
  data () {
    return {
      value: (this.min + this.max) / 2,
      disabled: false
    }
  },
  methods: {
    input () {
      console.log(this.value)
    }
  }
}
</script>

<style scoped lang="scss">
@import '~style/colors';

.slidercontainer {
  width: 100%;
  display: flex;
  align-items: center;
}

.slider[type="range"] {
  height: 20px;
  border-radius: 5px;
  outline: none;
  transition: opacity .2s;
  margin-right: 10px;
  transition: all .2s;
  cursor: pointer;
  &:focus {
    outline: none;
  }

  &::-webkit-slider-thumb {
    transition: all .2s;
    background: $primaryFontColor;
  }
  &::-moz-range-thumb {
    transition: all .2s;
    background: $primaryFontColor;
  }
  &::-ms-thumb {
    transition: all .2s;
    background: $primaryFontColor;
  }

  &:hover, &:active {
    &::-webkit-slider-runnable-track {
      border-color: $spotifyGreen;
    }
    &::-moz-range-track {
      border-color: $spotifyGreen;
    }
    &::-ms-fill-lower {
      border-color: $spotifyGreen;
    }
    &::-ms-fill-upper {
      border-color: $spotifyGreen;
    }


    &::-webkit-slider-thumb {
      background: $spotifyGreen;
    }
    &::-moz-range-thumb {
      background: $spotifyGreen;
    }
    &::-ms-thumb {
      background: $spotifyGreen;
    }
  }

  &:disabled {
    opacity: $disabledOpacity;
    pointer-events: none;

    &::-webkit-slider-thumb {
      border-color: $quaternaryColor;
    }

    &::-moz-range-thumb {
      border-color: $quaternaryColor;
    }

    &::-ms-thumb {
      border-color: $quaternaryColor;
    }
  }
}

.toggleButton {
  margin: 10px;
}

label {
  width: 50px;

  &.disabled {
    opacity: $disabledOpacity;
  }
}

// ----- default slide override ----- //
$track-color: $contentBackground;
$thumb-color: $primaryFontColor !default;

$thumb-radius: 12px !default;
$thumb-height: 25px !default;
$thumb-width: 10px !default;
$thumb-shadow-size: 4px !default;
$thumb-shadow-blur: 4px !default;
$thumb-shadow-color: $secondaryColor;
$thumb-border-width: 2px !default;
$thumb-border-color: $spotifyGreen !default;

$track-width: 100% !default;
$track-height: 7.5px !default;
$track-shadow-size: 1px !default;
$track-shadow-blur: 1px !default;
$track-shadow-color: $secondaryColor;
$track-border-width: 1px !default;
$track-border-color: $quaternaryColor;

$track-radius: 5px !default;
$contrast: 5% !default;

@mixin shadow($shadow-size, $shadow-blur, $shadow-color) {
  box-shadow: $shadow-size $shadow-size $shadow-blur $shadow-color, 0 0 $shadow-size lighten($shadow-color, 5%);
}

@mixin track {
  cursor: pointer;
  height: $track-height;
  transition: all .2s ease;
  width: $track-width;
}

@mixin thumb {
  @include shadow($thumb-shadow-size, $thumb-shadow-blur, $thumb-shadow-color);
  background: $thumb-color;
  border: $thumb-border-width solid $thumb-border-color;
  border-radius: $thumb-radius;
  cursor: pointer;
  height: $thumb-height;
  width: $thumb-width;
}

[type='range'] {
  -webkit-appearance: none;
  margin: $thumb-height / 2 0;
  width: $track-width;
  background-color: $contentBackground;

  &:focus {
    outline: 0;

    &::-webkit-slider-runnable-track {
      background: lighten($track-color, $contrast);
    }

    &::-ms-fill-lower {
      background: $track-color;
    }

    &::-ms-fill-upper {
      background: lighten($track-color, $contrast);
    }
  }

  &::-webkit-slider-runnable-track {
    @include track;
    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius;
  }

  &::-webkit-slider-thumb {
    @include thumb;
    -webkit-appearance: none;
    margin-top: ((-$track-border-width * 2 + $track-height) / 2) - ($thumb-height / 2);
  }

  &::-moz-range-track {
    @include track;
    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius;
  }

  &::-moz-range-thumb {
    @include thumb;
  }

  &::-ms-track {
    @include track;
    background: transparent;
    border-color: transparent;
    border-width: ($thumb-height / 2) 0;
    color: transparent;
  }

  &::-ms-fill-lower {
    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);
    background: darken($track-color, $contrast);
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius * 2;
  }

  &::-ms-fill-upper {
    @include shadow($track-shadow-size, $track-shadow-blur, $track-shadow-color);
    background: $track-color;
    border: $track-border-width solid $track-border-color;
    border-radius: $track-radius * 2;
  }

  &::-ms-thumb {
    @include thumb;
    margin-top: 0;
  }
}
</style>
