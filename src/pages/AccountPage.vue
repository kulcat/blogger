<script setup>
import { computed, onMounted, ref } from 'vue';
import { AppState } from '../AppState.js';
import { accountService } from '@/services/AccountService.js';
import { Pop } from '@/utils/Pop.js';



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

onMounted(() => {

})

const name = ref(AppState.account.name);
const picture = ref(AppState.account.picture);

</script>

<template>
  <div v-if="AppState.account">

    <main class="container">

      <div class="d-flex align-items-center w-100">
        <RouterLink class="text-reset text-decoration-none" :to="{ name: 'Home' }">
          <i class="mdi mdi-exit-to-app text-danger fs-1" style="display: inline-block;  transform: scaleX(-1);"></i>
        </RouterLink>
      </div>

      <div>
        <div class="about text-center">
          <div v-if="AppState.account">
            <h1>{{ AppState.account.name }}</h1>
            <img class="rounded-circle" :src="AppState.account.picture" alt="" />
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
      </div>
    </main>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
