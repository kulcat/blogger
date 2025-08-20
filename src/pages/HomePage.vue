<script setup>
import { AppState } from '@/AppState';
import BlogPreview from '@/components/BlogPreview.vue';
import { blogService } from '@/services/BlogService';
import { Pop } from '@/utils/Pop';
import { computed, onMounted } from 'vue';

onMounted(() => {
  getBlogs();
});

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
    <div class="row d-flex flex-column gap-4 m-4">
      <BlogPreview v-for="blog in blogs" :blog="blog" :key="blog.id" />
    </div>
  </main>
</template>

<style scoped lang="scss"></style>
