<script setup>
import { filtersStore } from '@/stores/filterStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { debounce } from '@/utils/debounce'

const { search } = storeToRefs(filtersStore())
const searchValue = ref()
const setSearch = debounce(() => (search.value = searchValue.value), 400)
</script>

<template>
  <div class="my-4">
    <input
      type="text"
      class="minput"
      v-model="searchValue"
      @input="setSearch"
      placeholder="поиск..."
    />
  </div>
</template>
