<template>
  <v-sheet class="mx-auto" width="300">

    <v-form ref="form">
      <v-text-field
        v-model="username"
        :counter="10"
        :rules="userNameRules"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :counter="10"
        :rules="passwordRules"
        label="Password"
        required
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :rules="[v => !!v || 'You must agree to continue!']"
        label="Do you agree?"
        required
      ></v-checkbox>

      <div class="d-flex flex-column">
        <v-btn
          class="mt-4"
          color="success"
          block
          @click="validate"
        >
          LOGIN | 登录
        </v-btn>

        <v-btn
          class="mt-4"
          color="error"
          block
          @click="reset"
        >
          RESET | 重置
        </v-btn>

        <v-btn
          class="mt-4"
          color="warning"
          block
          @click="resetValidation"
        >
          REGISTER | 注册
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>

<script>
export default {
  data: () => ({
    username: '',
    userNameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be 10 characters or less',
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 10) || 'Name must be 10 characters or less',
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
    },
  },
}
</script>
