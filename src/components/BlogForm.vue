<script setup>
import { Account } from '@/models/Account';
import { Blog } from '@/models/Blog';
import { blogService } from '@/services/BlogService';

defineProps({
  creator: Account,
})

</script>

<template>
  <div>
    <form>
      <div class="d-flex flex-column border-2 border border-black rounded-3 shadow-lg" style="height: 15rem">

        <div>
          <input type="text" name="image">
        </div>

        <div>
          <div class="d-flex flex-column">
            <div class="d-flex align-items-center gap-1">
              <img class="object-fit-contain rounded-circle" style="width: 10rem; height: 10rem;"
                :src="creator.picture">
            </div>

            <!-- title -->
            <input type="text" name="title">

            <span class="fw-bold text-black">By {{ creator.name }}</span>

            <span class="fw-lighter">Last updated: {{ Date.now().toLocaleString() }}</span>

          </div>

          <!-- body -->
          <input type="text" name="body">

          <input type="submit" value="Post">

        </div>

      </div>
      <div>
        <!-- Comments -->
      </div>
    </form>
  </div>
</template>

<style lang="scss"></style>