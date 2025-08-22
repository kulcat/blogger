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
  <main class="container">
    <div class="row d-flex flex-column gap-4 m-4">
      <div class="d-flex align-items-center gap-1">
        <img class="object-fit-contain rounded-circle" style="width: 10rem; height: 10rem;"
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
    <div class="row d-flex flex-column gap-4 m-4">
      <BlogPreview v-for="blog in profileBlogs" :blog="blog" :key="blog.id" />
    </div>
  </main>
</template>

<style scoped lang="scss"></style>
