<template>
  <v-data-table
    class="mt-4"
    :headers="headers"
    :items="users"
    :loading="loading"
    hide-default-footer
  >
  </v-data-table>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data () {
    return {
      headers: [
        {
          text: 'Name',
          value: 'name',
          sortable: false,
          class: 'subtitle-1 font-weight-bold'
        },
        {
          text: 'Completed tasks',
          value: 'completed_tasks',
          sortable: false,
          class: 'subtitle-1 font-weight-bold text-sm-center',
          align: 'center'
        },
      ],
      users: []
    }
  },
  computed: {
    ...mapGetters({
      loading: "app/loading"
    }),
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    ...mapActions({
      getMostSuccessfullyUsers: "task/getMostSuccessfullyUsers",
    }),
    ...mapMutations({
      setLoading: "app/setLoading"
    }),
    getUsers() {
      this.setLoading(true);
      this.getMostSuccessfullyUsers({})
        .then(response => {
          this.users = response.most_successfully;
        })
        .finally(() => {
          this.setLoading(false);
        });
    },
  }
}
</script>

<style>

</style>