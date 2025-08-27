<script setup>
import { AppState } from '@/AppState';
import NewBlogForm from '@/components/NewBlogForm.vue';
import BlogPreview from '@/components/BlogPreview.vue';
import { computed, onMounted, ref, watch } from 'vue';
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import { router } from '@/router';
import { Pop } from '@/utils/Pop';
import { blogService } from '@/services/BlogService';

const route = useRoute();

if (!route.query.id) {
  router.push({ name: 'Home' });
}

const blogs = computed(() => AppState.blogs);

const profileBlogs = computed(() =>
  blogs.value.filter(blog => blog.creatorId === route.query.id)
);

onMounted(() => {
  getBlogs();
});

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
    <RouterLink class="text-reset text-decoration-none" :to="{ name: 'Home' }">
      <i class="mdi mdi-exit-to-app text-danger fs-1" style="display: inline-block;  transform: scaleX(-1);"></i>
    </RouterLink>
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
            <NewBlogForm :creator="AppState.account" />
          </div>
        </div>
      </div>
    </div>

    <div class="row d-flex flex-column gap-3 my-3">
      <div class="d-flex align-items-center gap-1">
        <img class="object-fit-cover rounded-circle" style="width: 10rem; height: 10rem;"
          :src="profileBlogs[0]?.creator?.picture">
        <span class="fw-bold text-black">{{ profileBlogs[0]?.creator?.name }}</span>
        <button v-if="AppState.account" class="btn btn-warning my-3" style="width: 3rem; height: 3rem;" @click="
          router.push({ name: 'Account' });">
          <i class="mdi mdi-pencil"></i>
        </button>
      </div>
      <div>
        <button v-if="AppState.account" class="btn btn-warning my-3" data-bs-toggle="modal"
          data-bs-target="#newBlogModal" style="width: 3rem; height: 3rem;">
          <i class="mdi mdi-plus"></i>
        </button>
      </div>
    </div>
    <div class="row d-flex flex-column gap-4 g-0">
      <BlogPreview v-for="blog in profileBlogs" :blog="blog" :key="blog.id" />
    </div>
  </main>
</template>

<style scoped lang="scss"></style>
