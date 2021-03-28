<template>
  <div>
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="10">
          <v-tabs
            v-model="tab"
            color="basil"
            grow
          >
            <v-tab
              v-for="item in items"
              :key="item"
            >
              {{ item }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item>
              <create-task></create-task>
            </v-tab-item>
            <v-tab-item>
              <most-successfully-users></most-successfully-users>
            </v-tab-item>
          </v-tabs-items>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CreateTask from '../components/CreateTask';
import MostSuccessfullyUsers from '../components/MostSuccessfullyUsers';

export default {
  name: 'AdminTaskboard',
  components: { CreateTask, MostSuccessfullyUsers },
  data () {
    return {
      tab: null,
      items: [
        'Create a Task', 'View most succesfull'
      ],
    }
  },
}
</script>
