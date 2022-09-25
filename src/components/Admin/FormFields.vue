<script setup>
import { toRefs, ref } from 'vue'
import { createProducts } from '../../firebase'
import firebase from 'firebase/app'
import 'firebase/storage'

const props = defineProps({
  form: {
    type: Object,
    required: true,
    defaul: () => {},
  },
  cleanForm: {
    type: Function,
    default: () => {},
  },
})

const { form } = toRefs(props)

const create = () => {
  props.cleanForm()
  createProducts(form.value)
}

const uploadValue = ref(0)
const imageData = ref('')

const previewImage = (event) => {
  uploadValue.value = 0
  form.value.img = ''
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
        form.value.img = url
      })
    }
  )
}

const createProduct = () => {
  create()
  uploadValue.value = 0
  imageData.value = ''
}

const deleteImage = (img) => {
  firebase.storage().refFromURL(img).delete()
  imageData.value = null
  uploadValue.value = 0
}
</script>

<template>
  <div>
    <form v-if="form" class="mb-16" @submit.prevent="createProduct">
      <div class="mb-6">
        <label>наименование</label>
        <input v-model.trim="form.name" type="text" class="minput" required />
      </div>
      <div class="mb-6">
        <label>описание</label>
        <input
          v-model.trim="form.description"
          type="text"
          class="minput"
          required
        />
      </div>
      <div class="mb-6">
        <label>производитель</label>
        <input
          v-model.trim="form.manufacturer"
          type="text"
          class="minput"
          required
        />
      </div>
      <div class="mb-6">
        <label>изображение</label>
        <input
          type="file"
          class="minput"
          accept="image/*"
          required
          @change="previewImage"
        />
        <div>
          <p>
            Progress: {{ uploadValue.toFixed() + '%' }}
            <progress id="progress" :value="uploadValue" max="100"></progress>
          </p>
        </div>

        <div v-if="imageData">
          <button class="btn" @click="deleteImage(form.img)">X</button>
          <img width="200" :src="form.img" />
          <br />
        </div>
      </div>

      <div class="mb-6">
        <label>гарантия</label>
        <input
          v-model="form.warranty"
          type="number"
          min="0"
          class="minput"
          required
        />
      </div>
      <div class="mb-6">
        <label>цена</label>
        <input
          v-model="form.price"
          type="number"
          min="0"
          class="minput"
          required
        />
      </div>
      <div><button class="btn">создать</button></div>
    </form>
  </div>
</template>
