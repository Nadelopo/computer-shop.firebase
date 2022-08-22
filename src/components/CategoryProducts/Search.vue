<script setup>
import { filtersStore } from '@/stores/filterStore'
import { storeToRefs } from 'pinia'

const { search } = storeToRefs(filtersStore())
</script>

<template>
  <div class="my-4">
    <input type="text" class="minput" v-model="search" placeholder="поиск..." />
  </div>
</template>
