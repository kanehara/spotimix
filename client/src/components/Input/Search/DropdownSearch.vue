<template>
  <Search 
  v-click-outside="clickOutside"
  class="search"
  @focus="showSuggestions = true"
  :id="id" 
  :value="value">
    <i 
    slot="right"
    class="angle down icon dropdown-icon"
    @click.stop="showSuggestions = !showSuggestions"/>
    <Suggestions 
    slot="suggestions"
    :show="showSuggestions" 
    :suggestions="suggestions"/>
  </Search>
</template>

<script>
import Search from './Search'
import Suggestions from '@/components/Input/Suggestions'

export default {
  props: ['id', 'value', 'suggestions'],
  components: {
    Search,
    Suggestions
  },
  data() {
    return {
      showSuggestions: false,
    }
  },
  methods: {
    clickOutside() {
      this.showSuggestions = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~styles/colors';

.dropdown-icon {
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  color: $primaryColor;

}
</style>
