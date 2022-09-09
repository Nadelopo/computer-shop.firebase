<script setup>
import FilterInputs from '../UI/FilterInputs.vue'
import { filtersStore } from '@/stores/filterStore'
import { storeToRefs } from 'pinia'
import { watch } from 'vue'
import FilterCheckBox from '../UI/FilterCheckBox.vue'
import { useRoute } from 'vue-router'

const { minP, maxP, filterFields, copyFilter } = storeToRefs(filtersStore())
const { updateFilters } = filtersStore()

const route = useRoute()
updateFilters(route.params.category)
watch(
  () => route.params.category,
  (cur) => updateFilters(cur)
)
</script>

<template>
  <div>
    <div class="root" v-if="copyFilter.length">
      <FilterInputs
        v-model:minVal="minP"
        v-model:maxVal="maxP"
        description="цена"
        en-description="price"
        :step="500"
      />

      <div v-for="(item, index) in filterFields" :key="item.title">
        <h1 class="text-center">{{ item.title }}</h1>
        <div v-if="item.type">
          <FilterInputs
            v-model:minVal="item.params.min"
            v-model:maxVal="item.params.max"
            :en-description="item.enTitle"
            :step="item.params.step"
          />
        </div>
        <div v-else v-for="(g, i) in item" :key="g.id">
          <FilterCheckBox
            v-if="g != item.title && g != item.enTitle && g != item.type"
            :id="index + i"
            :name="g.title"
            :en-title="item.enTitle"
            :title="item.title"
            v-model="copyFilter[index][i].title"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">

.root
  background: #fff
  padding: 20px
  border-radius: 8px
  display: flex
  flex-direction: column
  gap: 30px
</style>
