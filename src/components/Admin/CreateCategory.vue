<script setup>
import { ref } from 'vue'

const defaultField = {
  fieldTitle: '',
  title: '',
  type: true,
  visible: false,
}

const category = ref({
  category: '',
  name: '',
  fields: [{ ...defaultField }],
})
</script>

<template>
  <div>
    <div v-for="(field, index) in category.fields" :key="index" class="mb-12">
      <div class="mb-2">
        <label>наименование поля</label>
        <input type="text" class="minput" v-model="field.fieldTitle" />
      </div>
      <div class="mb-2">
        <label>значение поля</label>
        <input type="text" class="minput" v-model="field.title" />
      </div>
    </div>
    <button class="btn" @click="category.fields.push({ ...defaultField })">
      add
    </button>
    <button class="btn" @click="category.fields.pop()">del</button>
  </div>
</template>
