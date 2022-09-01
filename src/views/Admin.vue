<script setup>
import Sidebar from '@/components/Admin/Sidebar.vue'
import CreateProduct from '../components/Admin/CreateProduct.vue'
</script>

<template>
  <div class="root">
    <Sidebar />
    <CreateProduct v-if="$route.path.includes('products')" />
  </div>
</template>

<style scoped lang="sass">
.root
  display: grid
  grid-template-columns: 12% auto
  background: #fff
</style>
