<script setup>
import { AppState } from '@/AppState';
import BlogPreview from '@/components/BlogPreview.vue';
import { blogService } from '@/services/BlogService';
import { Pop } from '@/utils/Pop';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

onMounted(() => {
  blogService.setActiveProfile(route.params.id);
  getBlogs();
});

watch(
  () => route.params.id,
  (id) => {
    blogService.setActiveProfile(id);
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
    <div class="row d-flex flex-column gap-4 m-4">
      <div class="d-flex align-items-center gap-1">
        <img class="object-fit-contain rounded-circle" style="width: 10rem; height: 10rem;"
          :src="blogs[0].creator.picture">
        <span class="fw-bold text-black">{{ blogs[0].creator.name }}</span>
        <button>
          <i class="mdi mdi-pencil"></i>
        </button>
      </div>
      <div>
        <button>
          <i class="mdi mdi-plus"></i>
        </button>
      </div>
    </div>
    <div class="row d-flex flex-column gap-4 m-4">
      <BlogPreview v-for="blog in blogs" :blog="blog" :key="blog.id" />
    </div>
  </main>
</template>

<style scoped lang="scss"></style>
