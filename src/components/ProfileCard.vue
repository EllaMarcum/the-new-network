<template>
  <div class="row">
    <div class="col-3">
      <img class="avatar" :src="profile.picture" />
    </div>
    <div class="col-9">
      <h3>{{ profile.name }}</h3>
      <h5>{{ profile.class }}</h5>
      <h5>{{ (profile.graduated) ? "Graduated" : "" }}</h5>
    </div>
  </div>
</template>

<script>
import { Profile } from "../models/Profile";

export default {
  name: 'Profile',
  props: {
    profile: { type: Profile, required: true }
  },
  setup(props) {

    return {

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