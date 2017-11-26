<template>
  <div class="mixer">
    <Slider :min="0" :max="100"/>
    <Slider :min="0" :max="100"/>
    <Slider :min="0" :max="100"/>
    <Slider :min="0" :max="100"/>
    <Slider :min="0" :max="100"/>
    <Slider :min="0" :max="100"/>
    <Slider :min="0" :max="100"/>
    <Slider :min="0" :max="100"/>
    <Slider :min="0" :max="100"/>
    <Slider :min="0" :max="100"/> 
  </div>
</template>

<script>
import Slider from '@/components/Slider/index'

export default {
  components: {
    Slider
  }
}
</script>

<style scoped>
.mixer {
  
}
</style>
