<template>
  <div class="row">
    <div class="col-2">
      <img class="avatar" :src="post.creator.picture" alt="">
    </div>
    <div class="col-10">
      <h4>{{ post.creator.name }}</h4>
      <label>{{ post.updatedAt }}</label>
      <label>{{ (post.creator.graduated) ? "Graduated" : "" }}</label>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <p>{{ post.body }}</p>
      <img class="post-image" v-if="post.imgUrl" :src="post.imgUrl" />
    </div>
  </div>
  <div class="row">
    <div class="col-10"></div>
    <div class="col-2">
      <h4>{{ post.likes.length }}</h4>
      <button v-if="user.isAuthenticated">like</button>
    </div>
  </div>

</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { Post } from "../models/Post";

export default {
  name: 'PostCard',
  props: {
    post: { type: Post, required: true }
  },
  setup(props) {
    console.log(props)
    return {
      user: computed(() => AppState.user)
    }
  }
}
</script>  

<style>
.avatar {
  width: 80px;
  height: 80px;
}

.post-image {
  max-width: 600px;
}
</style>