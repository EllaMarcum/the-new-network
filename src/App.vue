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
        <div class="col-3">Ads</div>
      </div>
    </div>
  </div>


  <!-- <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    <div class="bg-dark text-light text-center p-4">
      Made with 💖 by CodeWorks
    </div>
  </footer> -->
</template>

<script>
import { computed } from 'vue';
import { AppState } from './AppState';
import Navbar from "./components/Navbar.vue";
import Login from "./components/Login.vue";

export default {
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState)
    };
  },
  components: { Navbar, Login }
}
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
