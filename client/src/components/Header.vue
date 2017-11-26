<template>
<div class="header">
  <h1 @click="headerClick">Spotimix</h1>
</div>
</template>

<script>
export default {
  methods: {
    headerClick () {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped lang="scss">
@import '~style/colors';

.header {
  background-color: $contentBackground;
  border-bottom: 1.25px solid $quaternaryColor;
  padding: 15px;
}

h1 {
  margin: 0;
  color: $spotifyGreen;

  &:hover {
    cursor: pointer;
  }
}
</style>