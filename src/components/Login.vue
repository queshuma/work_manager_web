<template>
  <v-container class="bg-surface-variant">
    <v-row
      style="height: 150px;"
      no-gutters
    >
      <v-col align-self="start">
        <v-sheet class="pa-2 ma-2">
          .align-self-start
        </v-sheet>
      </v-col>

      <v-col align-self="center">
        <v-sheet class="pa-2 ma-2">
          .align-self-center
        </v-sheet>
      </v-col>

      <v-col align-self="end">
        <v-sheet class="pa-2 ma-2">
          .align-self-end
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  data: () => ({
    name: '',
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be 10 characters or less',
    ],
    select: null,
    items: [
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
    ],
    checkbox: false,
  }),

  methods: {
    async validate () {
      const { valid } = await this.$refs.form.validate()

      if (valid) alert('Form is valid')
    },
    reset () {
      this.$refs.form.reset()
    },
    resetValidation () {
      this.$refs.form.resetValidation()
    }
}
</script>
