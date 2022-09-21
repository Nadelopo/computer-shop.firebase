<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { filtersStore } from '@/stores/filterStore'
import { debounce } from '@/utils/debounce'

const props = defineProps([
  'description',
  'step',
  'maxVal',
  'minVal',
  'enDescription',
])

const max = props.maxVal

const route = useRoute()
const router = useRouter()

const minPric = ref(props.minVal)
const maxPric = ref(props.maxVal)

const minRef = ref(null)
const maxRef = ref(null)

const emit = defineEmits(['update:maxVal', 'update:minVal'])

const { getNumberDataFromQuery } = filtersStore()

if (Object.keys(route.query).includes(props.enDescription)) {
  const [minQuery, maxQuery] = getNumberDataFromQuery(props.enDescription)
  minPric.value = minQuery
  maxPric.value = maxQuery
}

const filter = () => {
  // удаление нулей перед числами
  if (minRef.value.value[0] == 0)
    minRef.value.value = minRef.value.value.substring(1)
  if (maxRef.value.value[0] == 0)
    maxRef.value.value = maxRef.value.value.substring(1)

  const minprice = minPric.value
  const maxprice = maxPric.value

  if (minPric.value > maxPric.value) {
    maxPric.value = minprice
    minPric.value = maxprice
  }

  if (minPric.value < 0 || !minPric.value) minPric.value = 0

  if (maxPric.value > max || !maxPric.value) maxPric.value = max

  router.push({
    query: {
      ...route.query,
      [props.enDescription]: minPric.value + '-' + maxPric.value,
    },
  })
  emit('update:minVal', minPric.value)
  emit('update:maxVal', maxPric.value)
}

const filterDebounce = debounce(filter, 500)
</script>

<template>
  <div>
    <div class="text-center my-2">{{ description }}</div>
    <div class="grid">
      <div>
        <input
          @keyup.enter="filterDebounce"
          @input="filterDebounce"
          :step="step"
          min="0"
          :max="max"
          class="filter_price min"
          placeholder="0"
          type="number"
          ref="minRef"
          v-model="minPric"
        />
      </div>
      <div>
        <div class="line"></div>
      </div>
      <div class="text-end">
        <input
          @keyup.enter="filterDebounce"
          @input="filterDebounce"
          :step="step"
          min="0"
          :max="max"
          class="filter_price max"
          :placeholder="max"
          type="number"
          ref="maxRef"
          v-model="maxPric"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">

.grid
  display: grid
  grid-template-columns: 1fr auto 1fr
  align-items: center
  grid-gap: 30px

.filter_price
  border: 2px solid #454545
  padding: 4px
  border-radius: 6px
  max-width: 90px
  width: 100%
  outline: none
  transition: 0.3s

.filter_price:focus
  border-color: #26a69a
  transition: 0.3s

.line
  border: 1px solid #000
  height: 0
  width: 12px
  background-color: #000
</style>
