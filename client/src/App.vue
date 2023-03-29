<template>
  <div id="app">
    <div id="content">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import axios from 'axios'

const ACCESS_TOKEN_COOKIE_KEY = 'spotify_access_token'

export default {
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

    // TODO: #17 web player
    // window.onSpotifyWebPlaybackSDKReady = () => {
    //   console.log('Spotify WebPlayer SDK initialized')
    // }
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
  @include minMobile {
    padding: 30px 5%;
  }
}

body, html {
  margin: 0;
  background-color: $bodyBackground;
}

body {
  font-size: .6rem;
  
  @include minMobile {
    padding: 0 5%;
    font-size: .8rem;
  }
  
  @include minTablet {
    font-size: 1rem;
  }

  @include minDisplay {
    font-size: 2rem;
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
