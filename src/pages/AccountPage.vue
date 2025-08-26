<script setup>
import { computed, ref } from 'vue';
import { AppState } from '../AppState.js';
import { accountService } from '@/services/AccountService.js';
import { Pop } from '@/utils/Pop.js';

const account = computed(() => AppState.account)

const name = ref(AppState.account.name);
const picture = ref(AppState.account.picture);


async function submitForm() {
  try {
    const accountData = {
      name: name.value,
      picture: picture.value,
    };

    await accountService.editAccount(accountData);
    await accountService.getAccount();
    Pop.toast('Account updated!', 'success');
  }
  catch (error) {
    Pop.toast('Could not update account', 'error');
    console.error(error);
  }
}

</script>

<template>
  <div class="container">
    <RouterLink class="text-reset text-decoration-none" :to="{ name: 'Home' }">
      <i class="mdi mdi-exit-to-app text-danger fs-1" style="display: inline-block;  transform: scaleX(-1);"></i>
    </RouterLink>
  </div>

  <main class="container">
    <div class="about text-center">
      <div v-if="account">
        <h1>{{ account.name }}</h1>
        <img class="rounded-circle" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
      </div>
      <div v-else>
        <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
      </div>
    </div>
    <div class="">
      <form @submit.prevent="submitForm">
        <div>
          <div class="mb-3">
            <label for="" class="form-label">Name</label>
            <input type="text" class="form-control" name="" id="" aria-describedby="helpId" placeholder="Name"
              v-model="name" />
            <small id="helpId" class="form-text text-muted"></small>
          </div>
          <div class="mb-3">
            <label for="" class="form-label">Image URL</label>
            <input type="text" class="form-control" name="" aria-describedby="helpId" placeholder="Image URL"
              v-model="picture" />
            <small id="helpId" class="form-text text-muted"></small>
          </div>
        </div>
        <button class="btn btn-warning" type="submit">Save</button>
      </form>
    </div>
  </main>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
