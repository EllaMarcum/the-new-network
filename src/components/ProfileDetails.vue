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
      <!-- maybe add not graduated or still in cohort -->
      <h5>{{ (activeProfile.graduated) ? "Graduated" : "" }}</h5>
    </div>
    <div class="col-3">
      <!-- fix this- v-if these if no github -->
      <a :href="activeProfile.github"> {{ gitHubLinkText }}</a>
      <a :href="activeProfile.linkedin">{{ linkedInLinkText }}</a>
      <a :href="activeProfile.resume">{{ resumeLinkText }}</a>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <p>{{ activeProfile.bio }}</p>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import { Profile } from "../models/Profile";

export default {
  name: 'Template',
  props: {
    activeProfile: { type: Profile, required: true }
  },
  setup(props) {

    return {
      gitHubLinkText: computed(() => (AppState.account.github) ? "GitHub" : ""),
      linkedInLinkText: computed(() => (AppState.account.linkedin) ? "LinkedIn" : ""),
      resumeLinkText: computed(() => (AppState.account.resume) ? "Resume" : "")
    }
  }
}
</script>

<style scoped lang="scss">
.avatar {
  width: 80px;
  height: 80px;
}

.coverImg {
  width: 100%;
}
</style>