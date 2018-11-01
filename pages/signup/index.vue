<template>
  <section class="signup">
    <v-container fluid signup-container elevation-4 class="mt-5 pa-5">
        <v-layout>
          <v-flex xs12 align-end flexbox>
            <h1 class="mb-3">Sign Up</h1>
            <v-form ref="form" v-model="valid">
                <v-flex xs12>
                    <v-text-field v-model="firstName" :rules="firstNameRules"     label="First name"    required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="lastName"  :rules="lastNameRules"      label="Last name"     required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="email"     :rules="emailRules"         label="Email"         required></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="password"  :rules="passwordRules"      label="Password"      required type="password"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-text-field v-model="confirmPassword" :rules="validateConfirmPassword()"
                                                                                  label="Confirm password" required type="password"></v-text-field>
                </v-flex>
                <v-flex xs12>
                    <v-checkbox
                        id="agree-to-terms"
                        name="agree-to-terms"
                        v-model="agreeToTerms"
                        :rules="agreeToTermsRules">
                        <div slot="label">
                            I agree to the <nuxt-link to="terms-of-use" target="_blank">Terms of Use</nuxt-link> and <nuxt-link to="privacy-policy" target="_blank">Privacy Policy</nuxt-link>
                        </div>
                    </v-checkbox>
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
        firstName: '',
        firstNameRules: [
          v => !!v || 'First name is required'
        ],
        lastName: '',
        lastNameRules: [
          v => !!v || 'Last name is required'
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
        ],
        password: '',
        passwordRules: [
          v => !!v || 'Password is required'
        ],
        confirmPassword: '',
        agreeToTerms: false,
        agreeToTermsRules: [
          v => v || ''
        ]
      }),
      asyncData: (context) => {
        return {}
      },
      methods: {
        validateConfirmPassword () {
          if (!this.confirmPassword) {
            return ['Confirm password is required']
          }

          if (this.confirmPassword !== this.password) {
            return ['Confirm password must match the password']
          }

          return true
        },
        async submit () {
          this.$refs.form.validate()

          if (!this.agreeToTerms) {
    
          }
        }
      }
    }
</script>

<style lang="scss" scoped>

	.signup-container {
        max-width: 700px;
    }

</style>
