<template>
  <div id="app">
    <div id="content">
      <router-view/>
    </div>
    <Player/>
  </div>
</template>

<script>
import axios from 'axios'
import Player from '@/components/Player'
import { mapGetters } from 'vuex'

export default {
  components: {Player},
  computed: {
    ...mapGetters(['isLoggedIn']),
  },
  mounted() {
    if (this.isLoggedIn) {
      setInterval(async () => {
        try {
          await axios.put(`${API_HOST}/api/refresh_token`) // eslint-disable-line
        } catch (e) {
          if (e && e.response && e.response.status === 440) {
            location.reload()
          }
        }
      }, 20000)
    }
  }
}
</script>


<style lang="scss">
@import '~styles/colors';
@import '~styles/breakpoints';

#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
  color: $primaryFontColor;
}

#content {
  margin: auto;
  height: 100%;
  background-color: $contentBackground;
  
  padding: 1.5rem 3rem;
  padding-bottom: 7rem;
  @include minMobile {
    padding-bottom: 7rem;
  }
}

h4 {
  margin: .8rem 0;
}

h5 {
  margin: .8rem 0;
}

body, html {
  margin: 0;
  background-color: $bodyBackground;
  @include minTablet {
    overscroll-behavior: none;
  }
}

html {
  font-size: 10px;
  
  @include minMobile {
    padding: 0 5%;
    font-size: 12px;
  }
  
  @include minTablet {
    font-size: 14px;
  }

  @include minDisplay {
    font-size: 18px;
  }
}

input[type="text"] {
  border: 2px solid $theme3;
  border-radius: 5px;
  height: 30px;
  font-size: 1em;
  padding: 4px;

  &:focus {
    border: 2px solid $theme4;
    outline: none;
  }
}

a {
  text-decoration: none;
  color: $theme4;
  padding: 5px 2px;
  font-weight: bold;

  &:hover {
    border-bottom: 2px solid $theme4;
  }
}

</style>
