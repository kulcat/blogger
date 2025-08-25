<script setup>
import { Blog } from '@/models/Blog';
import { blogService } from '@/services/BlogService';

defineProps({
  blog: Blog,
})

</script>

<template>
  <div class="d-flex justify-content-between border-2 border border-black rounded-3 shadow-lg px-3 py-2 gap-3"
    style="height: 15rem">

    <div class="d-flex flex-column justify-content-between">

      <div class="d-flex flex-column">
        <RouterLink class="text-reset text-decoration-none" :to="{ name: 'Profile', params: { id: blog.creatorId } }">
          <div class="d-flex align-items-center gap-1">
            <img class="object-fit-cover rounded-circle" style="width: 2rem; height: 2rem;" :src="blog.creator.picture">
            <span class="fw-bold ">{{ blog.creator.name }}</span>
          </div>
        </RouterLink>

        <span class="fw-bolder text-dark-emphasis">{{ blog.title }}</span>
        <p class="fw-light text-clamp">{{ blog.body }}</p>

        <RouterLink class="text-reset text-decoration-none" :to="{ name: 'BlogView' }"
          @click="blogService.setActiveBlog(blog)">
          <span>Read more and comment</span>
        </RouterLink>
      </div>

      <span class="fw-lighter">{{ blog.date }}</span>
    </div>

    <div class="flex-shrink-0">
      <img class="img-fluid object-fit-cover flex-shrink-0 h-100  order-2 border rounded-3" :src="blog.imgUrl">
    </div>
  </div>
</template>

<style lang="scss">
.text-clamp {
  display: -webkit-box;
  line-clamp: 4;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>