<script setup>
import { AppState } from '@/AppState';
import BlogPreview from '@/components/BlogPreview.vue';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const blog = computed(() => AppState.activeBlog);

</script>

<template>
  <main class="container">
    <div class="d-flex flex-column border-2 border border-black rounded-3 shadow-lg" style="height: 15rem">

      <div>
        <img class="img-fluid object-fit-cover flex-shrink-0 h-100" :src="blog.imgUrl">
      </div>

      <div>
        <div class="d-flex flex-column">
          <RouterLink class="link-underline-opacity-0 " :to="{ name: 'Profile', params: { id: blog.creatorId } }">
            <div class="d-flex align-items-center gap-1">
              <img class="object-fit-contain rounded-circle" style="width: 10rem; height: 10rem;"
                :src="blog.creator.picture">
            </div>
          </RouterLink>

          <span class="fw-bolder text-dark-emphasis">{{ blog.title }}</span>

          <RouterLink class="link-underline-opacity-0 " :to="{ name: 'Profile', params: { id: blog.creatorId } }">
            <span class="fw-bold text-black">By {{ blog.creator.name }}</span>
          </RouterLink>

          <span class="fw-lighter">Last updated: {{ blog.date }}</span>

        </div>

        <p class="fw-light">{{ blog.body }}</p>

      </div>

    </div>
    <div>
      <!-- Comments -->
    </div>
  </main>


</template>

<style scoped lang="scss"></style>
