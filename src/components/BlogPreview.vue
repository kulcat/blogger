<script setup>
import { Blog } from '@/models/Blog';


defineProps({
  blog: Blog,
})

</script>

<template>
  <div class="d-flex justify-content-between border-2 border border-black rounded-3 shadow-lg" style="height: 15rem">
    <div class="d-flex flex-column justify-content-between p-1">

      <div class="d-flex flex-column">

        <div class="d-flex align-items-center gap-1">
          <img class="object-fit-contain rounded-circle" style="width: 2rem; height: 2rem;" :src="blog.creator.picture">
          <span class="fw-bold">{{ blog.creator.name }}</span>
        </div>

        <span class="fw-bolder text-dark-emphasis">{{ blog.title }}</span>
        <p class="fw-light text-clamp">{{ blog.body }}</p>

      </div>

      <span class="fw-lighter">{{ blog.date }}</span>
    </div>

    <div>
      <img class="img-fluid object-fit-cover flex-shrink-0 h-100" :src="blog.imgUrl">
    </div>
  </div>
</template>

<style lang="scss">
.text-clamp {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>