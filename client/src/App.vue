<template>
  <div id="app">
    <div id="content">
      <router-view/>
    </div>
    <Player/>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import {ACCESS_TOKEN_COOKIE_KEY} from '@/utils'
import axios from 'axios'
import Player from '@/components/Player'

export default {
  components: {Player},
  computed: {
    isLoggedIn() {
      return !!Cookies.get(ACCESS_TOKEN_COOKIE_KEY)
    }
  },
  mounted() {
    if (this.isLoggedIn) {
      setInterval(async () => {
        try {
          await axios.put(`${API_HOST}/refresh_token`) // eslint-disable-line
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
  
  padding: 10px 20px;
  padding-bottom: 7rem;
  @include minMobile {
    padding: 30px 5%;
    padding-bottom: 7rem;
  }
}

body, html {
  margin: 0;
  background-color: $bodyBackground;
  overscroll-behavior: none;
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
