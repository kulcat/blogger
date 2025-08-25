<script setup>
import { Account } from '@/models/Account';
import { Blog } from '@/models/Blog';
import { blogService } from '@/services/BlogService';
import { Pop } from '@/utils/Pop';
import { Modal } from 'bootstrap';
import { computed, reactive, ref } from 'vue';

defineProps({
  creator: Account,
})

const title = ref("");
const body = ref("");
const imgUrl = ref("");


async function submitForm() {
  try {
    const blogData = {
      title: title.value,
      body: body.value,
      imgUrl: imgUrl.value,
      createdAt: new Date(),
    };

    await blogService.createBlog({ blogData });
    Pop.toast('Blog created!', 'success');

    title.value = '';
    body.value = '';
    imgUrl.value = '';

    const modalElm = document.getElementById('myModal');
    const modal = Modal.getInstance(modalElm);
    modal.hide();
  }
  catch (error) {
    Pop.toast('Could not create blog', 'error');
    console.error(error);
  }
}

const lastUpdated = computed(() => new Date().toLocaleString());

const onImageError = (e) => {
  e.target.src =
    "https://via.placeholder.com/300x200?text=Invalid+Image+URL";
};

</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="d-flex flex-column border-2 border border-black rounded-3 shadow-lg" style="">

      <div>
        <div v-if="imgUrl" class="mt-3">
          <img class="img-fluid object-fit-cover w-100 h-100" :src="imgUrl" alt="Preview" style=""
            @error="onImageError" />
        </div>
        <input type="text" placeholder="https://image.jpg" name="image" v-model="imgUrl">
      </div>

      <div>
        <div class="d-flex flex-column">
          <div class="d-flex align-items-center gap-1">
            <img class="object-fit-contain rounded-circle" style="width: 10rem; height: 10rem;" :src="creator.picture">
          </div>

          <input type="text" placeholder="Title" name="title" v-model="title" :required="true">

          <span class="fw-bold text-black">By {{ creator.name }}</span>

          <span class="fw-lighter">Last updated: {{ lastUpdated }}</span>

        </div>

        <input type="text" placeholder="Post text" name="body" v-model="body" :required="true">

        <input type="submit" value="Post">

      </div>

    </div>
  </form>
</template>

<style lang="scss"></style>