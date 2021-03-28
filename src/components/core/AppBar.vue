<template>
  <v-app-bar app flat color="primary" dark class="mt-1">
    <v-toolbar-title>Task Manager</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn text large class="ma-2" @click="logout">
      <v-icon>mdi-power</v-icon> Logout
    </v-btn>
  </v-app-bar>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations({
      setMe: "app/setMe"
    }),
    logout() {
      let self = this;
      this.$auth.logout().then(() => {
        self.$toast.success("You are successfully logged out!");
        self.$router.push("/");
        self.setMe(null);
      });
    }
  }
};
</script>
