<script setup>
import { AppState } from '@/AppState';
import { Account } from '@/models/Account';
import { Blog } from '@/models/Blog';
import { blogService } from '@/services/BlogService';
import { Pop } from '@/utils/Pop';
import { Modal } from 'bootstrap';
import { computed, onMounted, reactive, ref } from 'vue';

defineProps({
  creator: Account,
})

const blog = computed(() => AppState.activeBlog);

const title = ref(blog.value.title);
const body = ref(blog.value.body);
const imgUrl = ref(blog.value.imgUrl);
const tags = ref(blog.value.tags);
const inputTag = ref("");
const lastUpdated = computed(() => new Date().toLocaleString([], {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
}));

function addTag() {
  if (inputTag.value) {
    if (tags.value.find(tag => tag.toLowerCase() === inputTag.value.toLowerCase())) {
      Pop.toast("Tag already exists.");
    }
    else {
      tags.value.push(inputTag.value);
      inputTag.value = "";
    }
  }
}

function removeTag() {
  if (tags.value.find(tag => tag === inputTag.value)) {
    tags.value = tags.value.filter(tag => tag !== inputTag.value);
    inputTag.value = "";
  }
  else {
    Pop.toast("No such tag in tags");
  }
}

async function submitForm() {
  try {
    const blogData = {
      title: title.value,
      body: body.value,
      imgUrl: imgUrl.value,
      tags: tags.value,
    };

    await blogService.editBlog(blogData);
    await blogService.getBlogs();
    Pop.toast('Blog edited!', 'success');

    const modalElm = document.getElementById('editBlogModal');
    const modal = Modal.getInstance(modalElm);
    modal.hide();
  }
  catch (error) {
    Pop.toast('Could not create blog', 'error');
    console.error(error);
  }
}

const onImageError = (e) => {
  e.target.src = "";
};

function saveBlogDraft() {
  const blogData = {
    title: title.value,
    body: body.value,
    imgUrl: imgUrl.value,
    tags: tags.value
  };

  blogService.saveBlogDraft(blogData);
  Pop.toast('Successfully saved blog draft', 'success');
}

function loadBlogDraft() {
  title.value = AppState.savedBlogDraft.title;
  body.value = AppState.savedBlogDraft.body;
  imgUrl.value = AppState.savedBlogDraft.imgUrl;
  tags.value = AppState.savedBlogDraft.tags;
}

</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="d-flex flex-column border-2 border border-black rounded-3 shadow-lg gap-3" style="">

      <div class="p-3">
        <img v-if="imgUrl" class="img-fluid object-fit-cover border border-0 rounded-3 w-100 h-100" :src="imgUrl"
          alt="Preview" style="max-height: 90vh; object-position: center;" @error="onImageError" />
        <input class="form-control object-fit-cover w-100 h-100" type="text" placeholder="https://image.jpg"
          name="image" v-model="imgUrl">
      </div>

      <div class="px-3 py-2 d-flex flex-column gap-3">
        <div class="d-flex gap-3">

          <div class="d-flex align-items-center gap-1">
            <img class="object-fit-cover rounded-circle" style="width: 10rem; height: 10rem;" :src="creator?.picture">
          </div>

          <div class="d-flex flex-column">

            <div class="mb-3">
              <input class="form-control" type="text" placeholder="Title" name="title" v-model="title" :required="true">
            </div>

            <span class="fw-bold text-black">By {{ creator?.name }}</span>

            <span class="fw-lighter">Last updated: {{ lastUpdated }}</span>

          </div>
        </div>

        <div class="mb-3">

          <div v-if="tags.length > 0">
            Tags:
            <span>{{ tags.join(", ") }} </span>
          </div>

          <div v-else>
            <span>No tags</span>
          </div>

          <input class="form-control" type="text" placeholder="Tag" name="tag" v-model="inputTag">

          <div class="d-flex mt-2 gap-2">
            <button type="button" class="btn btn-warning" @click="addTag">
              Add
            </button>

            <button type="button" class="btn btn-warning" @click="removeTag">
              Remove
            </button>
          </div>

        </div>

        <div class="mb-3">
          <textarea class="form-control w-100 h-100" placeholder="Post text" name="body" v-model="body"
            :required="true"></textarea>
        </div>

        <button class="btn btn-warning" type="submit">Apply Changes</button>

        <div class="d-flex gap-2">
          <button type="button" class="btn btn-warning" @click="saveBlogDraft">Save Draft</button>
          <button :disabled="AppState.savedBlogDraft == null" type="button" class="btn btn-warning"
            @click="loadBlogDraft">Load Draft</button>
        </div>

      </div>

    </div>

  </form>
</template>

<style lang="scss"></style>