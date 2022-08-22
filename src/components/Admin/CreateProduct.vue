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

// createCategory({
//   fields: [
//     { title: '', fieldTitle: 'сокет', type: true, visible: true },
//     { title: '', fieldTitle: 'техпроцесс', type: true, visible: false },
//     {
//       title: 0,
//       fieldTitle: 'Объем кэша L3',
//       units: 'МБ',
//       type: false,
//       visible: false,
//     },
//     { title: 0, fieldTitle: 'количество ядер', type: false, visible: true },
//     { title: 0, fieldTitle: 'количество потоков', type: false, visible: true },
//     {
//       title: 0,
//       fieldTitle: 'минимальная частота',
//       units: 'ГГц',
//       type: false,
//       visible: true,
//     },
//     {
//       title: 0,
//       fieldTitle: 'максимальная частота',
//       units: 'ГГц',
//       type: false,
//       visible: true,
//     },
//   ],
//   category: 'processors',
// })
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

const cleanForm = () =>
  (form.value = JSON.parse(JSON.stringify(copyForm.value)))
</script>

<template>
  <div class="p-4">
    <div>
      <div v-for="(field, index) in form.fields" :key="index">
        <div class="mb-6">
          <label>{{ form.fields[index].fieldTitle }}</label>
          <input
            :type="field.type ? 'text' : 'number'"
            class="minput"
            min="0"
            v-model.trim="form.fields[index].title"
          />
        </div>
      </div>
      <FormFields :form="form" :clean-form="cleanForm" />
    </div>
    <ProductList :form="copyForm" />
  </div>
</template>
