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
      v-model="searchValue"
      type="text"
      class="minput"
      placeholder="поиск..."
      @input="setSearch"
    />
  </div>
</template>
