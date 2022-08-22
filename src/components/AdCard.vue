<template>
  <div>
    <img class="ad-img" :src="ad.square" alt="">
  </div>
</template>

<script>
import { Ad } from "../models/Ad";

export default {
  name: 'AdCard',
  props: {
    ad: { type: Ad, required: true }
  },
  setup(props) {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
.ad-img {
  width: 200px;
}
</style>