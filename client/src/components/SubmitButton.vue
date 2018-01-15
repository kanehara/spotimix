<template>
  <div>
    <Button 
    :label="label"
    v-show="!loading"
    class="submitButton" 
    @click="click" 
    :disabled="disabled">
      <h1>{{ label }}</h1>
    </Button>
    <h1 v-show="loading">Loading...</h1>
  </div>
</template>

<script>
import Button from '@/components/Button'

export default {
  props: ['label', 'disabled', 'loading'],
  components: {
    Button
  },
  methods: {
    click(e) {
      this.$emit('click', e)
    }
  }
}
</script>

<style lang="scss" scoped>
.submitButton {
  padding: 0 50px; 
}
</style>

