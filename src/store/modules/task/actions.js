import Vue from "vue";

export default {
  async getAll(context, payload) {
    let result = await Vue.prototype.$repos.TaskRepository.all(payload.page);
    if (result && result.data) {
      return result.data;
    }
  },

  async store(context, payload) {
    let result = await Vue.prototype.$repos.TaskRepository.store(
      payload.data
    );
    if (result && result.data) {
      return result.data;
    }
  },

  async markAsCompleted(context, payload) {
    let result = await Vue.prototype.$repos.TaskRepository.markAsCompleted(payload.id);
    if (result && result.data) {
      return result.data;
    }
  },

  async markAsFailed(context, payload) {
    let result = await Vue.prototype.$repos.TaskRepository.markAsFailed(payload.id);
    if (result && result.data) {
      return result.data;
    }
  },

  async getMostSuccessfullyUsers() {
    let result = await Vue.prototype.$repos.TaskRepository.getMostSuccessfullyUsers();
    if (result && result.data) {
      return result.data;
    }
  },
};
