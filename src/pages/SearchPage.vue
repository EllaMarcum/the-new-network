<template>
  <div v-for="p in profiles" :key="p.id">
    <ProfileCard :profile="p" />
  </div>
  <div v-for="p in posts" :key="p.id">
    <PostCard :post="p" />
  </div>
</template>

<script>
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState";
import { logger } from "../utils/Logger";
import { postService } from '../services/PostService.js'
import { profileService } from '../services/ProfileService.js'
import Pop from "../utils/Pop";
import ProfileCard from "../components/ProfileCard.vue";

export default {
  name: "Search",
  setup() {
    const route = useRoute();
    async function getPostsByQuery() {
      try {
        await postService.getPostsByQuery(route.params.searchText);
      }
      catch (error) {
        logger.error("get posts", error);
        Pop.error(error);
      }
    }
    async function getProfilesByQuery() {
      try {
        await profileService.getProfilesByQuery(route.params.searchText);
      }
      catch (error) {
        logger.error("get profiles", error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      getPostsByQuery();
      getProfilesByQuery();
    });
    watch(route, (newRoute, oldRoute) => {
      getPostsByQuery();
      getProfilesByQuery();
    });
    return {
      posts: computed(() => AppState.posts),
      profiles: computed(() => AppState.searchedProfiles)
    };
  },
  components: { ProfileCard }
}
</script>

<style scoped lang="scss">
</style>