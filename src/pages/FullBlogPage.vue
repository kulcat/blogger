<script setup>
import { AppState } from '@/AppState';
import BlogPreview from '@/components/BlogPreview.vue';
import EditBlogForm from '@/components/EditBlogForm.vue';
import { router } from '@/router';
import { blogService } from '@/services/BlogService';
import { computed, onMounted, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute } from 'vue-router';

const route = useRoute();

if (!AppState.activeBlog) {
  router.replace({ name: 'Home' });
}

onBeforeRouteUpdate((to, from, next) => {
  if (!AppState.activeBlog) {
    next({ name: 'Home' })
  } else {
    next()
  }
})

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

    <div v-if="AppState.account" id="editBlogModal" class="modal fade" tabindex="-1" aria-hidden="true"
      style="width: 100% !important;">
      <div class="modal-dialog modal-dialog-centered modal-fullscreen">
        <div class="modal-content container">
          <div class="modal-header bg-warning">
            <h5 class="modal-title">Edit Blog</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <EditBlogForm :creator="AppState.account" />
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex flex-column border-2 border border-black rounded-3 shadow-lg gap-3">

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

        <div>
          <button v-if="AppState?.account?.id === blog?.creatorId" type="button" class="btn"
            @click="deleteBlog(blog?.id)">
            <i class="mdi mdi-delete text-danger fs-1"></i>
          </button>

          <button v-if="AppState?.account?.id === blog?.creatorId" type="button" class="btn" data-bs-toggle="modal"
            data-bs-target="#editBlogModal">
            <i class="mdi mdi-pencil text-warning fs-1"></i>
          </button>
        </div>

      </div>

    </div>
  </main>


</template>

<style scoped lang="scss"></style>
