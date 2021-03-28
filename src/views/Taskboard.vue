<template>
  <v-container class="fill-height">
    <v-row class="align-self-baseline justify-center">
      <template v-for="(task, i) in tasks">
        <v-col cols="10" :key="i">
          <v-card
            elevation="2"
            outlined
            class="pt-2"
          >
            <v-card-title class="justify-center my-2">{{ task.title }}</v-card-title>

            <v-card-text class="text-sm-center">{{ textShortener(task.task) }}</v-card-text>

            <v-card-actions class="justify-end">
              <v-btn
                text
                color="primary"
                @click="readMore(task)"
              >
                Read More
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </template>
    </v-row>
    <v-row class="align-self-end justify-center mb-1">
      <v-pagination
        v-model="page"
        :length="total"
      ></v-pagination>
    </v-row>
    <task-dialog
      :dialog="showTaskDialog"
      :task="selectedTask"
      @close="close"
      @refreshTask="refreshTask"
    ></task-dialog>
  </v-container>
</template>

<script>
import TaskDialog from '../components/TaskDialog';
import { mapMutations, mapActions } from "vuex";

export default {
  name: 'TaskBoard',
  components: { TaskDialog },
  data: () => ({
    showTaskDialog: false,
    tasks: [],
    selectedTask: null,
    page: 1,
    total: 1
  }),
  mounted() {
    this.getTasks();
  },
  methods: {
    ...mapActions({
      getAllTasks: "task/getAll",
    }),
    ...mapMutations({
      setFetchLoading: "app/setFetchLoading"
    }),
    getTasks() {
      this.setFetchLoading(true);
      this.getAllTasks({ page: this.page })
        .then(response => {
          this.tasks = response.data;
          this.page = response.meta.current_page;
          this.total = response.meta.last_page;
        })
        .finally(() => {
          this.setFetchLoading(false);
        });
    },
    readMore(task) {
      this.selectedTask = task;
      this.showTaskDialog = true;
    },
    close() {
      this.showTaskDialog = false;
      this.selectedTask = null;
    },
    refreshTask(updatedTask) {
      const index = this.tasks.findIndex(task => task.id === updatedTask.task_id);
      this.tasks[index].status = updatedTask.status;
    },
    textShortener(text) {
      return text.slice(0, 99) + "...";
    }
  },
  watch: {
    page() {
      this.getTasks({ page: this.page });
    }
  }
};
</script>
