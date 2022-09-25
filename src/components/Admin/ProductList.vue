<script setup>
import { deleteProduct } from '@/firebase'
import { productsStore } from '@/stores/productsStore'
import { storeToRefs } from 'pinia'

defineProps({
  form: {
    type: Object,
    default: () => ({}),
  },
})

const { categoryProducts } = storeToRefs(productsStore())
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>наименование</th>
          <th v-for="field in form.fields" :key="field">
            {{ field.fieldTitle }}
          </th>
          <th>производитель</th>
          <th>изображение</th>
          <th>гарантия</th>
          <th>цена</th>
          <th width="5%"></th>
        </tr>
      </thead>
      <tbody v-for="product in categoryProducts" :key="product.id">
        <tr>
          <td>{{ product.name }}</td>
          <td v-for="productField in product.fields" :key="productField">
            {{ productField.title }} {{ productField.units }}
          </td>
          <td>{{ product.manufacturer }}</td>
          <td>
            <img :src="product.img" alt="" />
          </td>
          <td>{{ product.warranty }} мес</td>
          <td>{{ product.price }} Р</td>
          <td>
            <button class="btn" @click="deleteProduct(product.id, product.img)">
              удалить
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  table-layout: fixed;
}
th {
  text-align: center;
  vertical-align: text-bottom;
  font-size: 14px;
}
td {
  text-align: center;
  vertical-align: middle;
  border-top: 2px solid #1c1c1c;
}
</style>
