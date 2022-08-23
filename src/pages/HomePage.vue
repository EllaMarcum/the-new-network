<template>
  <PostForm v-if="user.isAuthenticated" />
  <div v-for="p in posts" :key="p.id">
    <PostCard :post="p" />
  </div>
  <button @click="previousClickHandler()">Previous</button>
  <h4>{{ pageCount }}</h4>
  <button @click="nextClickHandler()">Next</button>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { AppState } from "../AppState";
import { postService } from "../services/PostService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import PostForm from "../components/PostForm.vue";

export default {
  name: "Home",
  setup() {
    async function getPosts() {
      try {
        await postService.getPosts();
      }
      catch (error) {
        logger.error("get posts", error);
        Pop.error(error);
      }
    }
    function previousClickHandler() {
      if (AppState.postsPage > 1) {
        AppState.postsPage--;
        getPosts();
      }
    }
    function nextClickHandler() {
      if (AppState.postsPage < AppState.totalPages) {
        AppState.postsPage++;
        getPosts();
      }
    }
    onMounted(() => {
      AppState.postsPage = 1;
      getPosts();
    });
    return {
      posts: computed(() => AppState.posts),
      pageCount: computed(() => AppState.pageCount),
      user: computed(() => AppState.user),
      previousClickHandler,
      nextClickHandler
    };
  },
  components: { PostForm }
}
</script>

<style scoped lang="scss">
</style>
