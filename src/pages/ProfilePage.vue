<script setup>
import { AppState } from '@/AppState';
import BlogPreview from '@/components/BlogPreview.vue';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// const blogs = computed(() => AppState.blogs.filter);

// const creator = blogs.value.find(blog => blog.creator.id === route.params.id );

const profileBlogs = computed(() => AppState.blogs.filter(blog => blog.creatorId === route.params.id));

</script>

<template>
  <div class="container">
    <RouterLink class="text-reset text-decoration-none" :to="{ name: 'Home' }">
      <i class="mdi mdi-exit-to-app text-danger fs-1" style="display: inline-block;  transform: scaleX(-1);"></i>
    </RouterLink>
  </div>

  <main class="container d-flex flex-column">

    <div class="row d-flex flex-column gap-3 my-3">
      <div class="d-flex align-items-center gap-1">
        <img class="object-fit-cover rounded-circle" style="width: 10rem; height: 10rem;"
          :src="profileBlogs[0]?.creator?.picture">
        <span class="fw-bold text-black">{{ profileBlogs[0]?.creator?.name }}</span>
        <button v-if="profileBlogs[0]?.creator?.id === AppState.account.id">
          <i class="mdi mdi-pencil"></i>
        </button>
      </div>
      <div>
        <button v-if="profileBlogs[0]?.creator?.id === AppState.account.id">
          <i class="mdi mdi-plus"></i>
        </button>
      </div>
    </div>
    <div class="row d-flex flex-column gap-4 my-4 g-0">
      <BlogPreview v-for="blog in profileBlogs" :blog="blog" :key="blog.id" />
    </div>
  </main>
</template>

<style scoped lang="scss"></style>
