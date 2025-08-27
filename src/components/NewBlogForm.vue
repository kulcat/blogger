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
    };

    await blogService.createBlog(blogData);
    await blogService.getBlogs();
    Pop.toast('Blog created!', 'success');

    title.value = '';
    body.value = '';
    imgUrl.value = '';

    const modalElm = document.getElementById('newBlogModal');
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
  e.target.src = "";
};

</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="d-flex flex-column border-2 border border-black rounded-3 shadow-lg" style="">

      <div>
        <div class="">
          <img v-if="imgUrl" class="img-fluid object-fit-cover w-100 h-100" :src="imgUrl" alt="Preview"
            style="max-height: 90vh; object-position: center;" @error="onImageError" />
          <input class="object-fit-cover w-100 h-100" type="text" placeholder="https://image.jpg" name="image"
            v-model="imgUrl">
        </div>
      </div>

      <div>
        <div class="d-flex flex-row">
          <div class="d-flex align-items-center gap-1">
            <img class="object-fit-cover rounded-circle" style="width: 10rem; height: 10rem;" :src="creator?.picture">
          </div>

          <div class="d-flex flex-col">
            <input type="text" placeholder="Title" name="title" v-model="title" :required="true">

            <span class="fw-bold">By {{ creator?.name }}</span>

            <span class="fw-lighter">Last updated: {{ lastUpdated }}</span>
          </div>
        </div>

        <input type="text" class="w-100 h-100" placeholder="Post text" name="body" v-model="body" :required="true">

        <button class="btn btn-warning" type="submit">Post Blog</button>

      </div>

    </div>
  </form>
</template>

<style lang="scss"></style>