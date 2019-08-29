<template>
    <section class="contact-section">
        <v-container contact-container>
            <v-layout>
                <v-flex xs12>
                    <h1 class="page-title">{{ $t('pages.contact.title') }}</h1>
                </v-flex>
            </v-layout>
            <v-layout mt-5 row wrap>

                <v-flex
                    xs12 md6 align-end flexbox
                    class="left-column"
                    >
                    <v-form
                        ref="contactForm"
                        v-model="valid"
                        id="contact-form">
                        <v-layout column>
                            <v-flex xs12>
                                <v-layout column>
                                    <v-flex xs12>
                                        <span class="field-title">
                                            {{ $t('fields.contact-full-name.label') }}*:
                                        </span>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field
                                            solo
                                            v-model="fullName"
                                            :rules="fullNameRules"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs12 mt-5>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <span class="field-title">
                                            {{ $t('fields.contact-email.label') }}*:
                                        </span>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-text-field
                                            solo
                                            v-model="email"
                                            :rules="emailRules"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs12 mt-5>
                                <v-layout wrap>
                                    <v-flex xs12>
                                        <span class="field-title">
                                            {{ $t('fields.contact-subject.label') }}*:
                                        </span>
                                    </v-flex>
                                    <v-flex xs6>
                                        <v-text-field
                                            solo
                                            v-model="subject"
                                            :rules="subjectRules"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs12 mt-5>
                                <v-layout column>
                                    <v-flex xs12>
                                        <span class="field-title">
                                            {{ $t('fields.contact-message.label') }}*:
                                        </span>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-textarea
                                            class="text-area-field"
                                            v-model="message"
                                            :rules="messageRules"
                                            solo
                                            auto-grow
                                            box
                                            rows="5"
                                            validate-on-blur>
                                        </v-textarea>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs12 mt-3>
                                <v-layout>
                                    <v-flex xs1>
                                        <v-checkbox
                                            id="agree-to-terms"
                                            name="agree-to-terms"
                                            color="#27AE60"
                                            v-model="agreeToTerms"
                                            :rules="agreeToTermsRules">
                                        </v-checkbox>
                                    </v-flex>
                                    <v-flex xs11>
                                        <label
                                            class="agree-to-terms-label"
                                            for="agree-to-terms">
                                            {{ $t('pages.contact.agreement-text-1') }}
                                        </label>
                                        <nuxt-link
                                            class="agree-to-terms-link"
                                            to="terms-and-conditions"
                                            target="_blank">
                                            {{ $t('pages.contact.agreement-text-2') }}
                                        </nuxt-link>
                                    </v-flex>
                                </v-layout>
                            </v-flex>
                            <v-flex xs12 mt-3 class="submit-button-container">
                                <v-btn
                                    @click="submit"
                                    class="contact-button ml-0">
                                        {{ $t('pages.contact.submit-button') }}
                                </v-btn>
                            </v-flex>
                            <v-flex v-if="users.contactErrors">
                                <ServerSideErrors :errors="users.contactErrors"/>
                            </v-flex>
                        </v-layout>

                    </v-form>
                </v-flex>

                <v-flex
                    xs12
                    md6
                    class="right-column">
                    <img
                        id="contact-image"
                        :src="require('~/assets/images/contact-image.jpg')"
                    >
                </v-flex>

            </v-layout>
        </v-container>
        <v-snackbar
            v-model="snackbar"
            :timeout="3000"
            absolute>
                {{ snackbarText }}
                <v-btn color="blue" flat @click="snackbar = false">{{ $t('shared.content.close') }}</v-btn>
        </v-snackbar>
    </section>
</template>

<script>
   import ServerSideErrors from '~/components/errors/server-side-errors.vue';
   import { Validators } from '~/utils';
   import { mapState } from 'vuex';

    export default {
      components: {
          ServerSideErrors
      },
      layout: ({ store }) => {
          if (!store.getters['authentication/isAuthenticated']) {
              return 'visitor';
          } else if (store.getters['users/isAdmin']) {
              return 'administration';
          } else {
              return 'user';
          }
      },
      middleware: 'visitor',
        data: function () {
            return {
                valid: false,
                fullName: '',
                fullNameRules: [
                    v => !!v || this.$t('fields.contact-full-name.validation-errors.required'),
                    v => v.length <= 100 || this.$t('fields.contact-full-name.validation-errors.length')
                ],
                email: '',
                emailRules: [
                    v => !!v || this.$t('fields.contact-email.validation-errors.required'),
                    v => v.length <= 100 || this.$t('fields.contact-email.validation-errors.length'),
                    v => Validators.isValidEmailAddress(v) || this.$t('fields.contact-email.validation-errors.invalid')
                ],
                subject: '',
                subjectRules: [
                    v => !!v || this.$t('fields.contact-subject.validation-errors.required'),
                    v => v.length <= 50 || this.$t('fields.contact-subject.validation-errors.length')
                ],
                message: '',
                messageRules: [
                    v => !!v || this.$t('fields.contact-message.validation-errors.required'),
                    v => v.length <= 200 || this.$t('fields.contact-message.validation-errors.length')
                ],
                contactErrors: [],
                agreeToTerms: false,
                agreeToTermsRules: [
                    v => v || ''
                ],
                snackbar: false,
                snackbarText: ''
            };
        },
        computed: {
            ...mapState(['users'])
        },
        methods: {
            initializePageState () {
                this.$store.dispatch('users/setContactErrors', '');
            },
            async submit () {
                this.$refs.contactForm.validate();

                if (!this.valid || !this.agreeToTerms) {
                    return;
                }

                await this.$store.dispatch('users/contact', {
                    FullName: this.fullName,
                    Email: this.email,
                    Subject: this.subject,
                    Message: this.message,
                    AgreeToTerms: this.agreeToTerms
                });

                if (this.users.contactErrors) {
                    this.snackbarText = this.$t('pages.contact.snackbar-messages.send-message');
                    this.snackbar = true;

                    this.fullName   = '';
                    this.email      = '';
                    this.subject    = '';
                    this.message    = '';
                    this.agreeToTerms = false;
                    this.$refs.contactForm.resetValidation();
                }
            },
            showSnackbar: function (snackbarText) {
                this.$emit('showSnackbar', snackbarText);
            }
        },
        mounted: function () {
            this.initializePageState();
        }
    }

</script>


<style lang="scss">

    .left-column {
        padding-right: 40px;
    }

    .contact-container {
        max-width: 1600px;
        padding: 40px 40px 0px 40px;
    }

    #contact-image {
        max-width: 100%;
    }

    .field-title {
        font-weight: 700;
        margin-bottom: 10px;
    }

    #contact-form {

        .v-input__slot {
            min-height: 32px;
        }

        .v-text-field {
            height: 32px;
        }

        .v-textarea {
            height: 100%;
        }

        .v-text-field__details {
            padding-left: 0px;
        }

        textarea {
            padding-left: 10px;
        }

    }

    .agree-to-terms-label {
        cursor: pointer;
    }

    .agree-to-terms-link {
        text-decoration: none;
        color: #03A9F4;
    }

    .submit-button-container {
        display: flex;
        justify-content: flex-end;
    }

    .contact-button {
        background-color: #2E7D32 !important;
        color: #FFF !important;
        min-width: 20%;
    }

    @media screen  and (max-width: 960px){

        .left-column {
            padding-right: 0px;
        }

        .right-column {
            display: none;
        }

    }

</style>
