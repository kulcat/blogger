<script setup>
import { AppState } from '@/AppState';
import BlogPreview from '@/components/BlogPreview.vue';
import { router } from '@/router';
import { blogService } from '@/services/BlogService';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const blog = computed(() => AppState.activeBlog);

async function deleteBlog(blogId) {
  await blogService.deleteBlog(blogId);
  await blogService.getBlogs();
  router.push({ name: 'Home' });
}

</script>

<template>

  <div class="container">
    <RouterLink class="text-reset text-decoration-none" :to="{ name: 'Home' }">
      <i class="mdi mdi-exit-to-app text-danger fs-1" style="display: inline-block;  transform: scaleX(-1);"></i>
    </RouterLink>
  </div>

  <main class="container d-flex flex-column justify-content-center">

    <div class="d-flex flex-column border-2 border border-black rounded-3 shadow-lg gap-3" style="">

      <div>
        <img class="img-fluid object-fit-cover w-100 h-100" :src="blog?.imgUrl"
          style="max-height: 90vh; object-position: center;">
      </div>

      <div class="px-3 py-2 d-flex flex-column gap-3">
        <div class="d-flex gap-3">

          <div class="d-flex align-items-center gap-1">
            <RouterLink class="text-reset text-decoration-none"
              :to="{ name: 'Profile', params: { id: blog?.creatorId } }">
              <img class="object-fit-cover rounded-circle" style="width: 10rem; height: 10rem;"
                :src="blog?.creator?.picture">
            </RouterLink>
          </div>

          <div class="d-flex flex-column">
            <span class="fw-bolder fs-3">{{ blog?.title }}</span>

            <RouterLink class="text-reset text-decoration-none"
              :to="{ name: 'Profile', params: { id: blog?.creatorId } }">
              <span class="fw-bold">By {{ blog?.creator?.name }}</span>
            </RouterLink>

            <span class="fw-lighter">Last updated: {{ blog?.date }}</span>
          </div>

        </div>

        <p class="fw-light">{{ blog?.body }}</p>

        <button v-if="AppState?.account?.id === blog?.creatorId" type="button" class="btn"
          @click="deleteBlog(blog?.id)">
          <i class="mdi mdi-delete text-danger fs-1"></i>
        </button>

        <button v-if="AppState?.account?.id === blog?.creatorId" type="button" class="btn">
          <i class="mdi mdi-edit text-danger fs-1"></i>
        </button>
      </div>

    </div>
    <div>
      <!-- Comments -->
    </div>
  </main>


</template>

<style scoped lang="scss"></style>
