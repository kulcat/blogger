<script setup>
import { AppState } from '@/AppState';
import BlogPreview from '@/components/BlogPreview.vue';
import { blogService } from '@/services/BlogService';
import { Pop } from '@/utils/Pop';
import { computed, onMounted, ref, watch } from 'vue';
import NewBlogForm from '@/components/NewBlogForm.vue';

watch(
  () => AppState.blogs,
  () => {
    getBlogs();
  },
  { immediate: true }
);


const blogs = computed(() => {
  if (search.value) {
    if (searchBy.value == "author") {
      return AppState.blogs.filter(blog => blog.creator.name.toLowerCase().includes(search.value.toLowerCase()));
    }
    if (searchBy.value == "title") {
      return AppState.blogs.filter(blog => blog.title.toLowerCase().includes(search.value.toLowerCase()));
    }
    if (searchBy.value == "tags") {
      return AppState.blogs.filter(blog =>
        blog.tags.some(tag => tag.toLowerCase().includes(search.value.toLowerCase())));
    }
  }

  return AppState.blogs;
});

const search = ref("");
const searchBy = ref("author");

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

    <button v-if="AppState.account" class="btn btn-warning my-3" data-bs-toggle="modal" data-bs-target="#newBlogModal"
      style="width: 3rem; height: 3rem;">
      <i class="mdi mdi-plus"></i>
    </button>

    <form class="d-flex mb-3 w-100">
      <select class="form-control" v-model="searchBy" style="width: 10%">
        <option value="author">Author</option>
        <option value="title">Title</option>
        <option value="tags">Tags</option>
      </select>
      <input class="form-control w-100" type="text" placeholder="Search" v-model="search">
    </form>

    <div class="d-flex flex-column">

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

      <div class="row d-flex flex-column gap-4 g-0">
        <BlogPreview v-for="blog in blogs" :blog="blog" :key="blog.id" />
      </div>

    </div>

  </main>
</template>

<style scoped lang="scss"></style>
