<template>
  <ProfileDetails :activeProfile="activeProfile" />
  <div v-for="p in posts" :key="p.id">
    <PostCard :post="p" />
  </div>
  <button @click="previousClickHandler()">Previous</button>
  <h4>{{ pageCount }}</h4>
  <button @click="nextClickHandler()">Next</button>
</template>

<script>
import { computed } from 'vue'
import { onMounted } from "vue";
import { useRoute } from "vue-router"
import { AppState } from '../AppState'
import { profileService } from "../services/ProfileService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import ProfileDetails from "../components/ProfileDetails.vue";
export default {
  name: "Profile",
  setup() {
    const route = useRoute();
    async function getProfile() {
      try {
        await profileService.getProfile(route.params.profileId);
      }
      catch (error) {
        logger.error("get posts", error);
        Pop.error(error);
      }
    }
    async function getPostByProfileId() {
      try {
        await profileService.getPostByProfileId(route.params.profileId);
      }
      catch (error) {
        logger.error("get posts", error);
        Pop.error(error);
      }
    }
    function previousClickHandler() {
      if (AppState.postsPage > 1) {
        AppState.postsPage--;
        getPostByProfileId();
      }
    }
    function nextClickHandler() {
      if (AppState.postsPage < AppState.totalPages) {
        AppState.postsPage++;
        getPostByProfileId();
      }
    }
    onMounted(() => {
      AppState.postsPage = 1;
      getProfile();
      getPostByProfileId();
    });
    return {
      activeProfile: computed(() => AppState.activeProfile),
      pageCount: computed(() => AppState.pageCount),
      posts: computed(() => AppState.posts),
      previousClickHandler,
      nextClickHandler
    };
  },
  components: { ProfileDetails }
}
</script>

<style scoped>
</style>