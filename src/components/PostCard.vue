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
    <div class="col-2 like-container">
      <h4>{{ post.likes.length }}</h4>
      <button @click="likePost()" v-if="user.isAuthenticated">like</button>
      <button @click="handleDelete()" v-if="account.id === post.creatorId">delete</button>
    </div>
  </div>

</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { Post } from "../models/Post";
import { postService } from "../services/PostService";

export default {
  name: 'PostCard',
  props: {
    post: { type: Post, required: true }
  },
  setup(props) {
    console.log(props.post)
    async function handleDelete() {
      try {
        await postService.deletePost(props.post.id)
      }
      catch (error) {
        logger.error("get posts", error);
        Pop.error(error);
      }
    }

    async function likePost() {
      console.log('like')
      try {
        await postService.likePost(props.post.id)
      }
      catch (error) {
        logger.error("get posts", error);
        Pop.error(error);
      }
    }
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      handleDelete,
      likePost
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

.like-container>* {
  float: left;
}
</style>