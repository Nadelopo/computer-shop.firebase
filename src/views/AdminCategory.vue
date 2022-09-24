<script setup>
import AdminWrapper from '../components/Admin/AdminWrapper.vue'
import { ref } from 'vue'
import { createCategory, updateCategory, getCategory } from '@/firebase'
import { categoriesStore } from '@/stores/categoriesStore'
import DoubleButtons from '@/components/UI/DoubleButtons.vue'
import firebase from 'firebase/app'
import 'firebase/storage'

const { updateCategoriesArray } = categoriesStore()

const uploadValue = ref(0)
const imageData = ref('')
const previewImage = (event) => {
  uploadValue.value = 0
  category.value.img = ''
  imageData.value = event.target.files[0]
  const storageRef = firebase
    .storage()
    .ref('products/' + `${imageData.value.name}`)
    .put(imageData.value)
  storageRef.on(
    `state_changed`,
    (snapshot) => {
      uploadValue.value =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    },
    (error) => {
      console.log(error.message)
    },
    () => {
      uploadValue.value = 100
      storageRef.snapshot.ref.getDownloadURL().then((url) => {
        category.value.img = url
      })
    }
  )
}
const deleteImage = (img) => {
  firebase.storage().refFromURL(img).delete()
  imageData.value = null
  uploadValue.value = 0
}

const categoriesArray = ref([])
getCategory('names').then((e) => (categoriesArray.value = e))

const defaultField = {
  fieldTitle: '',
  enFieldTitle: '',
  title: 0,
  type: true,
  visible: false,
  units: '',
}
const category = ref({
  category: '',
  name: '',
  img: '',
  fields: [{ ...defaultField }],
})

const create = () => {
  categoriesArray.value.arr.push({
    enName: category.value.category,
    name: category.value.name,
    img: category.value.img,
  })
  updateCategory('names', categoriesArray.value)
  createCategory(category.value)

  //очищение формы
  imageData.value = null
  uploadValue.value = 0
  category.value = {
    category: '',
    name: '',
    img: '',
    fields: [{ ...defaultField }],
  }

  updateCategoriesArray()
}
</script>

<template>
  <AdminWrapper>
    <div>
      <form @submit.prevent="create" method="get">
        <div class="mb-6">
          <label>изображение</label>
          <input
            type="file"
            class="minput"
            @change="previewImage"
            accept="image/*"
            required
          />
          <div class="mt-2">
            <p>
              Progress: {{ uploadValue.toFixed() + '%' }}
              <progress id="progress" :value="uploadValue" max="100"></progress>
            </p>
          </div>

          <div v-if="imageData">
            <button class="btn" @click="deleteImage(category.img)">X</button>
            <img width="200" :src="category.img" />
            <br />
          </div>
        </div>

        <div class="mb-2">
          <label>наименование на английском</label>
          <input
            type="text"
            class="minput"
            v-model.trim="category.category"
            required
          />
        </div>
        <div class="mb-2">
          <label>наименование на русском</label>
          <input
            type="text"
            class="minput"
            v-model.trim="category.name"
            required
          />
        </div>
        <div
          v-for="(field, index) in category.fields"
          :key="index"
          class="mb-12"
        >
          <div class="mb-2">
            <label>наименование поля на английском</label>
            <input
              type="text"
              class="minput"
              v-model.trim="field.enFieldTitle"
              required
            />
          </div>
          <div class="mb-2">
            <label>наименование поля на русском</label>
            <input
              type="text"
              class="minput"
              v-model.trim="field.fieldTitle"
              required
            />
          </div>

          <div class="mb-2">
            <label>единицы измерения</label>
            <input
              type="text"
              class="minput"
              v-model.trim="field.units"
              required
            />
          </div>
          <div class="mb-2">
            <div class="mb-2">тип поля</div>
            <DoubleButtons
              v-model="field.type"
              text-first="текст"
              text-second="число"
            />
          </div>
          <div class="mb-2">
            <div class="mb-2">отображение на карточке товара</div>
            <DoubleButtons
              v-model="field.visible"
              text-first="да"
              text-second="нет"
            />
          </div>
        </div>
        <div class="flex gap-x-4">
          <button
            class="btn"
            type="button"
            @click="category.fields.push({ ...defaultField })"
          >
            добавить
          </button>
          <button class="btn" type="button" @click="category.fields.pop()">
            удалить
          </button>
        </div>
        <button class="btn mt-8">создать категорию</button>
      </form>
    </div>
  </AdminWrapper>
</template>
