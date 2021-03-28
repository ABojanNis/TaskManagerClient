<template>
  <v-card flat>
    <v-card-text>
      <validation-observer
        ref="obs"
        v-slot="{ invalid }"
      >
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="Title"
            rules="required|max:20"
          >
            <v-text-field
              v-model="data.title"
              :counter="20"
              :error-messages="errors"
              label="Title"
              required
            ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="Task"
            rules="required|max:500"
          >
            <v-textarea
              v-model="data.task"
              :counter="500"
              :error-messages="errors"
              label="Task"
              required
            ></v-textarea>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            name="DateTime"
            rules="required"
          >
            <v-datetime-picker
              ref="datetimepicker"
              v-model="data.send_at"
              :error-messages="errors"
              label="Select date and time when to send task to users"
              date-format="dd MMMM yyyy"
              :text-field-props="textFieldProps"
              :date-picker-props="dateProps"
              :time-picker-props="timeProps"
              required
            ></v-datetime-picker>
          </validation-provider>

          <v-layout class="mt-2 justify-end">
            <v-btn
              class="mr-4"
              type="submit"
              color="success"
              :disabled="invalid || emptyData"
              :loading="loading"
            >
              submit
            </v-btn>
            <v-btn :loading="loading" @click="clear">
              clear
            </v-btn>
          </v-layout>
        </form>
      </validation-observer>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data: () => ({
    data: {},
    dateProps: {
      min: (new Date()).toISOString()
    },
    textFieldProps: {
      prependIcon: 'event'
    },
    timeProps: {
      format: '24hr'
    }
  }),
  computed: {
    ...mapGetters({
      loading: "app/loading"
    }),
    emptyData() {
      if (!this.data.title || !this.data.task || !this.data.send_at) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    ...mapActions({
      storeTask: "task/store",
    }),
    ...mapMutations({
      setLoading: "app/setLoading"
    }),
    submit () {
      this.$refs.obs.validate().then(result => {
        if (result) {
          this.setLoading(true);
          const data = { ...this.data };
          data.send_at = this.$moment(data.send_at).format('YYYY-MM-DD H:mm:ss');
          this.storeTask({ data: data })
            .then(response => {
              if (response) {
                this.$toast.success(response.message);
                this.clear();
              }
            })
            .finally(() => {
              this.setLoading(false);
            });
        }
      });
    },
    clear () {
      this.$refs.datetimepicker.resetPicker();
      this.$refs.datetimepicker.date = '';
      this.$refs.datetimepicker.time = '00:00:00';
      this.data = {};
      this.$refs.obs.reset();
    },
    getLocaleDateFormat(str, withTime = false) {
      if (str != null) {
            let time = str.substring(11, str.length);
            return str.substring(8, 10)+'/'+str.substring(5, 7)+'/'+str.substring(0, 4) + (withTime && time ? ' ' + time : '');
      }
      return '';
    },
  },
}
</script>