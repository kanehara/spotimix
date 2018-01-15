<template>
  <div>
    <div class="loginContainer">
      <Button label="Login" class="spotifyLogin" @click="click">
        <i class="spotify icon"/>
        Login
      </Button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'
import {DISPATCH_LOGIN} from 'x/auth/action-types'
import {mapActions} from 'vuex'

export default {
  components: {
    Button
  },
  methods: {
    ...mapActions([DISPATCH_LOGIN]),
    click() {
      this.DISPATCH_LOGIN()
    }
  }
}
</script>


<style lang="scss" scoped>
.loginContainer {
  display: flex;
  align-items: center;
  height: 100%;

  button {
    margin: auto;
  }

  .spotifyLogin {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    padding: 10px 15px;
  }
}
</style>

