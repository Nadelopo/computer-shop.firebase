<script setup>
import FormFields from './FormFields.vue'
import { ref, watch } from 'vue'
import ProductList from './ProductList.vue'
import { getCategory } from '@/firebase'
import { useRoute } from 'vue-router'

const route = useRoute()

const copyForm = ref({
  fields: [],
  name: '',
  description: '',
  img: '',
  category: route.params.category,
  manufacturer: '',
  warranty: 0,
  price: 0,
  popular: 0,
  quantity: 100,
  rait: 0,
  countRaits: 0,
})

const category = ref()

const updateCategory = async () => {
  category.value = await getCategory(route.params.category)
}
updateCategory()

const form = ref({})
watch(
  () => category.value,
  (cur) => {
    copyForm.value.fields = cur.fields
    form.value = JSON.parse(JSON.stringify(copyForm.value))
  }
)

watch(
  () => route.params.category,
  () => updateCategory()
)

const cleanForm = () => {
  form.value = JSON.parse(JSON.stringify(copyForm.value))
}
</script>

<template>
  <div>
    <div>
      <div v-for="(field, index) in form.fields" :key="index">
        <div class="mb-6">
          <label>{{ field.fieldTitle }}</label>
          <input
            v-model.trim="field.title"
            :type="field.type ? 'text' : 'number'"
            class="minput"
            min="0"
          />
        </div>
      </div>
      <FormFields :form="form" :clean-form="cleanForm" />
    </div>
    <ProductList :form="copyForm" />
  </div>
</template>
