<template>
  <span class="navbar-text">
    <button @click="login" v-if="!user.isAuthenticated">
      Login
    </button>
    <div class="dropdown my-2 my-lg-0" v-else>
      <div class="dropdown-toggle selectable" data-bs-toggle="dropdown" aria-expanded="false" id="authDropdown">
        <div v-if="account.picture || user.picture">
          <img :src="account.picture || user.picture" alt="account photo" height="40" class="rounded" />
          <span class="mx-3">{{ account.name || user.name }}</span>
        </div>
      </div>
      <div class="dropdown-menu p-0 list-group w-100" aria-labelledby="authDropdown">
        <router-link :to="{ name: 'Account' }">
          <div class="list-group-item list-group-item-action hoverable">
            Manage Account
          </div>
        </router-link>
        <div class="list-group-item list-group-item-action hoverable text-danger" @click="logout">
          <i class="mdi mdi-logout"></i>
          logout
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <img class="avatar" :src="account.picture">
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <!-- FIX-ME make this info editable -->
          <h3>{{ account.name }}</h3>
          <h5>{{ account.class }}</h5>
          <h5>{{ (account.graduated) ? "Graduated" : "" }}</h5>
          <a :href="account.github">{{ gitHubLinkText }}</a>
          <br />
          <a :href="account.linkedin">{{ linkedInLinkText }}</a>
          <br />
          <a :href="account.resume">{{ resumeLinkText }}</a>
        </div>
      </div>
    </div>
  </span>
</template>


<script>
import { computed } from "@vue/reactivity";
import { onMounted, watch } from "vue";
import { AppState } from "../AppState";
import { AuthService } from "../services/AuthService";
export default {
  setup() {
    return {
      user: computed(() => AppState.user),
      account: computed(() => AppState.account),
      gitHubLinkText: computed(() => (AppState.account.github) ? "GitHub" : ""),
      linkedInLinkText: computed(() => (AppState.account.linkedin) ? "LinkedIn" : ""),
      resumeLinkText: computed(() => (AppState.account.resume) ? "Resume" : ""),
      async login() {
        AuthService.loginWithPopup();
      },
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    };
  },
};
</script>


<style lang="scss" scoped>
.dropdown-menu {
  user-select: none;
  display: block;
  transform: scale(0);
  transition: all 0.15s linear;
}

.dropdown-menu.show {
  transform: scale(1);
}

.hoverable {
  cursor: pointer;
}

.avatar {
  width: 80px;
  height: 80px;
}
</style>
