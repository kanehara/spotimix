<template>
  <div class="mixer">
    <SliderContainer v-for="a in allAttributes" :key="a.name" :attribute="a"/>
  </div>
</template>

<script>
import SliderContainer from '@/views/SliderContainer'
import ToggleButton from '@/components/ToggleButton'
import { mapGetters } from 'vuex'

export default {
  components: {
    SliderContainer,
    ToggleButton
  },
  computed: {
    ...mapGetters(['allAttributes'])
  }
}
</script>
