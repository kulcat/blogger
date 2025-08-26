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
  <div class="container">
    <button v-if="AppState.account" class="btn btn-warning my-3" data-bs-toggle="modal" data-bs-target="#newBlogModal"
      style="width: 3rem; height: 3rem;">
      <i class="mdi mdi-plus"></i>
    </button>
  </div>

  <main class="container d-flex flex-column">

    <div v-if="AppState.account" id="newBlogModal" class="modal fade" tabindex="-1" aria-hidden="true"
      style="width: 100% !important;">
      <div class="modal-dialog modal-dialog-centered modal-fullscreen">
        <div class="modal-content container">
          <div class="modal-header bg-warning">
            <h5 class="modal-title">Create a Blog</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <BlogForm :creator="AppState.account" />
          </div>
        </div>
      </div>
    </div>

    <div class="row d-flex flex-column gap-4 g-0">
      <BlogPreview v-for="blog in blogs" :blog="blog" :key="blog.id" />
    </div>

  </main>
</template>

<style scoped lang="scss"></style>
