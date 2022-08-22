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
</script>

<template>
  <div>
    <form @submit.prevent="createProduct" class="mb-16" v-if="form">
      <div class="mb-6">
        <label>наименование</label>
        <input type="text" class="minput" v-model.trim="form.name" required />
      </div>
      <div class="mb-6">
        <label>описание</label>
        <input
          type="text"
          class="minput"
          v-model.trim="form.description"
          required
        />
      </div>
      <div class="mb-6">
        <label>производитель</label>
        <input
          type="text"
          class="minput"
          v-model.trim="form.manufacturer"
          required
        />
      </div>
      <div class="mb-6">
        <label>изображение</label>
        <input
          type="file"
          class="minput"
          @change="previewImage"
          accept="image/*"
          required
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
        <!-- <input type="text" class="minput" v-model.trim="form.img" required /> -->
      </div>
      <div class="mb-6">
        <label>гарантия</label>
        <input
          type="number"
          min="0"
          class="minput"
          v-model="form.warranty"
          required
        />
      </div>
      <div class="mb-6">
        <label>цена</label>
        <input
          type="number"
          min="0"
          class="minput"
          v-model="form.price"
          required
        />
      </div>
      <div><button class="btn">создать</button></div>
    </form>
  </div>
</template>

<style scoped lang="sass">
progress::-webkit-progress-bar
  border-radius: 20px
  background: #fff
  border: 2px solid var(--color-main)


progress::-webkit-progress-value
  background: var(--color-main)
</style>
