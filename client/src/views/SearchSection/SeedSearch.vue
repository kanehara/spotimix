<template>
  <Search 
  :id="id" 
  :value="value"
  :disabled="disabled"
  @input="onInput"
  @focus="focus"
  @focusout="focusout"
  v-click-outside="clickOutside">
    <Tag 
      class="tag" 
      slot="left" 
      v-for="s in seeds"
      :key="s.id"
      :id="s.id"
      :label="s.name"
      @remove="removeSeed"/>
    <span slot="right">
      <slot name="right"></slot>
    </span>
    <Suggestions 
      slot="suggestions"
      :show="showSuggestions" 
      :suggestions="suggestions" 
      @select="select"/>
  </Search>
</template>

<script>
import {mapMutations, mapState, mapGetters} from 'vuex'
import {SEED_TYPES} from 'x/seeds'
import {
  ADD_SEED,
  REMOVE_SEED,
  FOCUS_SEED_INPUT,
  DEFOCUS_SEED_INPUTS
} from 'x/seeds/mutation-types'
import Search from '@/components/Search'
import Suggestions from '@/components/Suggestions'
import Tag from '@/components/Tag'

export default {
  components: {
    Search,
    Suggestions,
    Tag
  },
  props: {
    id: String,
    value: String,
    suggestions: Array,
    seedType: {
      type: String,
      validator(val) {
        return Object.values(SEED_TYPES).find(s => s === val)
      }
    }
  },
  methods: {
    ...mapMutations([
      ADD_SEED,
      REMOVE_SEED,
      FOCUS_SEED_INPUT,
      DEFOCUS_SEED_INPUTS
    ]),
    onInput(val) {
      this.$emit('input', val)
    },
    select(seed) {
      this.$emit('select', seed)
      this.addSeed(seed)
    },
    clickOutside(e) {
      if (this.isSeedInputFocused) {
        this.DEFOCUS_SEED_INPUTS()
        e.stopImmediatePropagation()
      }
    },
    focus(e) {
      this.FOCUS_SEED_INPUT({type: this.seedType})
      this.$emit('focus', e)
    },
    focusout(e) {
      if (e.relatedTarget && !e.relatedTarget.matches('.search')) {
        this.DEFOCUS_SEED_INPUTS()
      }
      this.$emit('focusout', e)
    },
    addSeed(seed) {
      this.ADD_SEED({type: this.seedType, ...seed})
    },
    removeSeed(id) {
      this.REMOVE_SEED({type: this.seedType, id})
    }
  },
  computed: {
    ...mapState({
      focusedSeedInput: state => state.seeds.focusedSeedInput,
      seeds(state) {
        return state.seeds.seeds[this.seedType]
      }
    }),
    ...mapGetters(['seedsCount', 'isSeedInputFocused']),
    disabled() {
      return this.seedsCount === 5
    },
    showSuggestions() {
      return !this.disabled && this.focusedSeedInput === this.seedType
    },
  },
}
</script>

<style lang="scss" scoped>
.tag {
  margin: 0 2.5px 2.5px 0;
}
</style>

