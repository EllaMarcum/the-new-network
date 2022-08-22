<template>
  <ProfileCard :activeProfile="activeProfile" />
</template>

<script>
import { computed } from 'vue'
import { onMounted } from "vue";
import { useRoute } from "vue-router"
import { AppState } from '../AppState'
import { profileService } from "../services/ProfileService";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import ProfileCard from "../components/ProfileCard.vue";
export default {
  name: "Profile",
  setup() {
    const route = useRoute();
    console.log(route.params);
    async function getProfile() {
      try {
        await profileService.getProfile(route.params.profileId);
      }
      catch (error) {
        logger.error("get posts", error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      getProfile();
    });
    return {
      activeProfile: computed(() => AppState.activeProfile)
    };
  },
  components: { ProfileCard }
}
</script>

<style scoped>
</style>