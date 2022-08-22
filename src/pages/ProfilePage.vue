<template>
  <div class="row">
    <div class="col-3">
      <img class="avatar" :src="activeProfile.picture" alt="">
    </div>
    <div class="col-9">
      <img class="coverImg" :src="activeProfile.coverImg" alt="">
    </div>
  </div>
  <div class="row">
    <div class="col-9">
      <h3>{{ activeProfile.name }}</h3>
      <h5>{{ activeProfile.class }}</h5>
      <h5>{{ (activeProfile.graduated) ? "Graduated" : "" }}</h5>
    </div>
    <div class="col-3">
      <a :href="activeProfile.github">GitHub</a>
      <a :href="activeProfile.linkedin">LinkedIn</a>
      <a :href="activeProfile.resume">Resume</a>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <p>{{ activeProfile.bio }}</p>
    </div>
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
export default {
  name: 'Profile',
  setup() {
    const route = useRoute()
    console.log(route.params)
    async function getProfile() {
      try {
        await profileService.getProfile(route.params.profileId)
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
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 80px;
  height: 80px;
}

.coverImg {
  width: 100%;
}
</style>