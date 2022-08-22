<template>
  <div class="row">
    <div class="col-4">
      <Login />
    </div>
    <div class="col-8">
      <div class="row">
        <div class="col-12">
          <Navbar />
        </div>
      </div>
      <div class="row">
        <div class="col-9">
          <router-view />
        </div>
        <div class="col-3">
          <AdCard :ad="(ads[0]) ? ads[0] : ''" />
          <AdCard :ad="(ads[1]) ? ads[1] : ''" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { AppState } from './AppState';
import Navbar from "./components/Navbar.vue";
import Login from "./components/Login.vue";
import AdCard from "./components/AdCard.vue";
import { adService } from "./services/AdService";
import { logger } from "./utils/Logger";
import Pop from "./utils/Pop";

export default {
  name: "App",
  setup() {
    async function getAds() {
      try {
        await adService.getAds()
      }
      catch (error) {
        logger.error("get ads", error);
        Pop.error(error);
      }
    }
    onMounted(() => {
      getAds();
    });
    return {
      appState: computed(() => AppState),
      ads: computed(() => AppState.ads)
    };
  },
  components: { Navbar, Login, AdCard, AdCard }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
