<template>
  <v-footer id="core-footer" class="pa-0">
    <v-container>
      <v-row class="text-right" no-gutters>
        <v-col>
          <div class="body-1 font-weight-light">
            &copy; 2021, made by
            <span class="primary--text font-weight-bold">Bojan</span>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
export default {
  name: "CoreFooter"
};
</script>

<style lang="sass">
#core-footer
  a
    font-size: .825rem
    font-weight: 500
    text-decoration: none
    text-transform: uppercase
</style>
