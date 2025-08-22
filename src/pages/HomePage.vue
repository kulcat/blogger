<script setup>
import { AppState } from '@/AppState';
import BlogForm from '@/components/BlogForm.vue';
import BlogPreview from '@/components/BlogPreview.vue';
import { blogService } from '@/services/BlogService';
import { Pop } from '@/utils/Pop';
import { computed, onMounted, watch } from 'vue';

watch(
  () => AppState.blogs,
  () => {
    getBlogs();
  },
  { immediate: true }
);

const blogs = computed(() => AppState.blogs);

async function getBlogs() {
  try {
    await blogService.getBlogs();
  }
  catch (error) {
    Pop.toast('Could not get blogs', 'error');
    console.log(error);
  }
}

</script>

<template>
  <main class="container">

    <button v-if="AppState.account" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#myModal">
      <i class="mdi mdi-plus"></i>
    </button>

    <div v-if="AppState.account" id="myModal" class="modal fade" tabindex="-1" aria-hidden="true">
      <BlogForm :creator="AppState.account" />
    </div>

    <div class="row d-flex flex-column gap-4 m-4">
      <BlogPreview v-for="blog in blogs" :blog="blog" :key="blog.id" />
    </div>

  </main>
</template>

<style scoped lang="scss"></style>
