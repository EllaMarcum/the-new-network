<template>
  <ProfileDetails :activeProfile="activeProfile" />
  <div v-for="p in posts" :key="p.id">
    <PostCard :post="p" />
  </div>
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
    onMounted(() => {
      getProfile();
      getPostByProfileId();
    });
    return {
      activeProfile: computed(() => AppState.activeProfile),
      posts: computed(() => AppState.posts)
    };
  },
  components: { ProfileDetails }
}
</script>

<style scoped>
</style>