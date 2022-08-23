<template>
  <form class="card account-form" @submit.prevent="handleSubmit">
    <div class="card-body text-start">
      <div>
        <label for="name">Name:</label>
        <input type="text" class="form-control" v-model="editable.name" required name="name">
      </div>
      <div>
        <label for="picture">Picture:</label>
        <input type="url" class="form-control" v-model="editable.picture" required name="picture" placeholder="picture">
      </div>
      <div>
        <label for="coverImg">Cover Image:</label>
        <input type="url" class="form-control" v-model="editable.coverImg" required name="coverImg">
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" class="form-control" v-model="editable.email" name="email" placeholder="email">
      </div>
      <div>
        <label for="class">Class:</label>
        <input type="text" class="form-control" v-model="editable.class" name="class" placeholder="class">
      </div>
      <div>
        <label for="github">GitHub:</label>
        <input type="url" class="form-control" v-model="editable.github" name="github" placeholder="github">
      </div>
      <div>
        <label for="linkedin">LinkedIn:</label>
        <input type="url" class="form-control" v-model="editable.linkedin" name="linkedin" placeholder="linkedin">
      </div>
      <div>
        <label for="resume">Resume:</label>
        <input type="url" class="form-control" v-model="editable.resume" name="resume" placeholder="resume">
      </div>
      <div>
        <label for="graduated">Graduated:</label>
        <input type="checkbox" v-model="editable.graduated" name="graduated" placeholder="graduated">
      </div>
      <div>
        <label for="bio">Bio:</label>
        <textarea type="text" class="form-control" v-model="editable.bio" required name="bio" rows="8"
          style="resize:none"></textarea>
      </div>
      <div>
        <button type="submit" class="btn btn-primary w-100 mt-2">Save</button>
      </div>
    </div>
  </form>
</template>


<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { router } from '../router.js';
import { accountService } from '../services/AccountService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {

    const editable = ref({})

    watchEffect(() => {
      if (!AppState.account) { return }
      editable.value = { ...AppState.account }
    })

    return {
      editable,
      async handleSubmit() {
        try {
          await accountService.editAccount(editable.value)
          router.push({ name: 'Profile', params: { profileId: editable.value.id } })
        } catch (error) {
          logger.error('[Editing Account]', error)
          Pop.error(error)
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
</style>
