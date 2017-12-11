<template>
  <div id="app">
    <SpotimixHeader/>
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name: 'app',
  components: {
    SpotimixHeader: Header
  }
}
</script>

<style lang="scss">
@import '~styles/colors.scss';
@import '~styles/breakpoints.scss';

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $primaryFontColor;
}

#content {
  max-width: 1440px;
  height: 100%;
  padding: 30px 5%;
  background-color: $contentBackground;
}

body, html {
  margin: 0;
  background-color: $bodyBackground;
}

body {
  padding: 0 5%;
}

input[type="text"] {
  border: 2px solid $theme3;
  border-radius: 5px;
  height: 30px;
  font-size: 14px;
  padding: 4px;

  &:focus {
    border: 2px solid $theme4;
    outline: none;
  }
}

</style>
