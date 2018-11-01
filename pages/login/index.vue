<template>
  <section class="login">
    <v-container fluid login-container elevation-4 class="mt-5 pa-5">
        <v-layout>
          <v-flex xs12 align-end flexbox>
            <h1 class="mb-3">Login</h1>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-flex xs12>
                    <v-text-field v-model="email"    :rules="emailRules"    label="Email"    required color="primary"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="password" :rules="passwordRules" label="Password" required color="primary" type="password"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-btn :disabled="!valid" @click="submit">SUBMIT</v-btn>
                </v-flex>
            </v-form>
          </v-flex>
        </v-layout>
    </v-container>
  </section>
</template>


<script>
    export default {
      data: () => ({
        valid: false,
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        password: '',
        passwordRules: [
          v => !!v || 'Password is required'
        ]
      }),
      methods: {
        submit: function () {

        }
      }
    }
</script>

<style lang="scss" scoped>

	.login-container {
        max-width: 700px;
    }

</style>
