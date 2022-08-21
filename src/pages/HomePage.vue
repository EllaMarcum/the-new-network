<template>
  <div v-for="p in posts" :key="p.id">
    <PostCard :post="p" />
  </div>
  <button @click="previousClickHandler()">Previous</button>
  <h4>1 of 20</h4>
  <button @click="nextClickHandler()">Next</button>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { AppState } from "../AppState";
import { postService } from "../services/PostService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";

export default {
  name: 'Home',
  setup() {
    async function getPosts() {
      try {
        await postService.getPosts()
      } catch (error) {
        logger.error('get posts', error)
        Pop.error(error)
      }
    }

    function previousClickHandler() {
      console.log('previous')
    }
    function nextClickHandler() {
      console.log('next')
    }

    onMounted(() => {
      getPosts()
    })
    return {
      posts: computed(() => AppState.posts),
      previousClickHandler,
      nextClickHandler
    }
  }
}
</script>

<style scoped lang="scss">
</style>
