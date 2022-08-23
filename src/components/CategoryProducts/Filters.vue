<script setup>
import FilterInputs from '../UI/FilterInputs.vue'
import { filtersStore } from '@/stores/filterStore'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useLoadFilters } from '@/firebase'

const { minP, maxP } = storeToRefs(filtersStore())
</script>

<template>
  <div class="root">
    <FilterInputs
      v-model:minVal="minP"
      v-model:maxVal="maxP"
      :description="'Цена'"
      :max="300000"
      :step="500"
    />
  </div>
</template>

<style scoped lang="sass">

.root
  background: #fff
  padding: 20px
  border-radius: 8px
</style>
