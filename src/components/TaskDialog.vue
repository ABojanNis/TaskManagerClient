<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600"
  >
    <v-card>
      <v-card-title class="headline">
        <span>{{ task && task.title ? task.title : '' }}</span>
        <v-icon style="cursor: pointer;" @click="$emit('close')">mdi-close</v-icon>
      </v-card-title>
      <v-card-text>{{ task && task.task ? task.task : '' }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <template v-if="task && !task.is_expired">
          <v-btn
            color="green darken-1"
            text
            :disabled="task && task.status === 'completed'"
            @click="completed"
          >
            Mark as completed
          </v-btn>
          <v-btn
            color="red darken-1"
            text
            :disabled="task && task.status === 'failed'"
            @click="failed"
          >
            Mark as failed
          </v-btn>
        </template>
        <template v-else>
          <v-tooltip top v-if="task && task.status === 'completed'">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                class="pa-4"
                color="success"
                dark
                v-bind="attrs"
                v-on="on"
              >
                done_all
              </v-icon>
            </template>
            <span>Completed</span>
          </v-tooltip>
          <v-tooltip top v-if="task && task.status === 'failed'">
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                class="pa-4"
                color="error"
                dark
                v-bind="attrs"
                v-on="on"
              >
                remove_done
              </v-icon>
            </template>
            <span>Failed</span>
          </v-tooltip>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  props: {
    dialog: {
      Type: Boolean,
      default: false
    },
    task: {
      Type: Object,
      required: true
    }
  },
  methods: {
    ...mapActions({
      markAsCompleted: "task/markAsCompleted",
      markAsFailed: "task/markAsFailed",
    }),
    ...mapMutations({
      setFetchLoading: "app/setFetchLoading",
      setLoading: "app/setLoading"
    }),
    completed() {
      this.setFetchLoading(true);
      this.markAsCompleted({id: this.task.id})
        .then(response => {
          this.$toast.success(response.message);
          this.$emit('refreshTask', response.task);
        })
        .finally(() => {
          this.setFetchLoading(false);
        });
    },
    failed() {
      this.setFetchLoading(true);
      this.markAsFailed({id: this.task.id})
        .then(response => {
          this.$toast.error(response.message);
          this.$emit('refreshTask', response.task);
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
    }
  }
}
</script>