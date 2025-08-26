<script setup>
import { Blog } from '@/models/Blog';
import { blogService } from '@/services/BlogService';

defineProps({
  blog: Blog,
})

</script>

<template>
  <div
    class="blogPreview d-flex flex-column flex-lg-row justify-content-between border-2 border border-black rounded-3  px-3 py-2 gap-3"
    style="">

    <div class="d-flex flex-column justify-content-between">

      <div class="d-flex flex-column">
        <RouterLink class="text-reset text-decoration-none" :to="{ name: 'Profile', params: { id: blog?.creatorId } }">
          <div class="d-flex align-items-center gap-1">
            <img class="object-fit-cover rounded-circle" style="width: 2rem; height: 2rem;"
              :src="blog?.creator?.picture">
            <span class="fw-bold ">{{ blog?.creator?.name }}</span>
          </div>
        </RouterLink>

        <span class="fw-bolder text-dark-emphasis">{{ blog?.title }}</span>
        <p class="fw-light text-clamp">{{ blog?.body }}</p>

        <RouterLink class="text-reset text-decoration-none" :to="{ name: 'BlogView' }"
          @click="blogService.setActiveBlog(blog)">
          <span>Read more and comment</span>
        </RouterLink>
      </div>

      <span class="fw-lighter">
        {{ new Date(blog?.createdAt).toLocaleString([], {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
        }) }}
      </span>
    </div>

    <div class="flex-shrink-0 h-100">
      <img class="img-fluid object-fit-cover border border-0 rounded-3 w-100 h-100" :src="blog?.imgUrl">
    </div>
  </div>
</template>

<style lang="scss">
.blogPreview {

  @media screen and (min-width: 992px) {
    height: 15rem;
  }
}

.text-clamp {
  display: -webkit-box;
  line-clamp: 4;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>