<template>
  <div class="row post-form-container">
    <div class="col-3">Avatar</div>
    <div class="col-9">
      <form @submit.prevent="handleSubmit">
        <textarea class="post-body" v-model="post.body"></textarea>
        <input type="text" placeholder="Image url..." v-model="post.imgUrl" />
        <button>Post</button>
      </form>
    </div>
  </div>
</template>


<script>
import { ref, watchEffect } from 'vue';
import { AppState } from '../AppState.js';
import { postService } from "../services/PostService";
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';

export default {
  setup() {

    const post = ref({})

    return {
      post,
      async handleSubmit() {
        if (post.value.body || post.value.imgUrl) {
          postService.createPost(post.value)
          post.value = ""
        }
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.post-body {
  width: 100%;
  height: 100px;
}

.post-form-container {
  margin: 24px 0;
}
</style>
