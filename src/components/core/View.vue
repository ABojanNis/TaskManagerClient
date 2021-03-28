<template>
  <v-main>
    <loading
      :active="fetchLoading"
      :can-cancel="false"
      :is-full-page="true"
      color="#4CAF50"
    />
    <router-view />
  </v-main>
</template>

<script>
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";
import { mapGetters } from "vuex";

export default {
  name: "CoreView",

  components: {
    Loading
  },

  computed: {
    ...mapGetters({
      fetchLoading: "app/fetchLoading"
    })
  }
};
</script>
