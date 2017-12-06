<template>
  <Search 
  :id="id" 
  :value="value"
  @input="onInput"
  @focus="showSuggestions = true"
  @focusout="showSuggestions = false">
    <Suggestions :show="showSuggestions" :suggestions="suggestions" slot="suggestions"/>
  </Search>
</template>

<script>
import Search from './Search'
import Suggestions from '@/components/Input/Suggestions'

export default {
  components: {
    Search,
    Suggestions
  },
  props: ['id', 'value', 'suggestions'],
  data() {
    return {
      showSuggestions: false
    }
  },
  methods: {
    onInput(val) {
      this.$emit('input', val)
    }
  },
}
</script>
