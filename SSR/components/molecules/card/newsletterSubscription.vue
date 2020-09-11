<template lang="html">
    <div class="subscription">
        <Header
            v-if="header"
            :title="subscriptionSettings.title"
            :subline="subscriptionSettings.subline"
        />

        <v-card
            :class="[
                'subscription__card',
                { 'subscription__card--header': header },
            ]"
            outlined
        >
            <div v-if="!header">
                <h3 class="subscription__title">
                    {{ subscriptionSettings.title }}
                </h3>
                <p class="subscription__subline">
                    {{ subscriptionSettings.subline }}
                </p>
            </div>

            <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent="submit"
            >
                <v-text-field
                    v-model="form.website"
                    type="text"
                    name="website"
                    class="subscription__sweet"
                    tabindex="-1"
                    autocomplete="off"
                />

                <v-row>
                    <v-col
                        cols="12"
                        :sm="header ? 5 : 6"
                        class="subscription__column"
                    >
                        <v-text-field
                            v-model="form.name"
                            class="subscription__input"
                            :outlined="header"
                            color="blue darken-2"
                            name="given-name"
                            label="First Name"
                            prepend-inner-icon="mdi-account"
                        />
                    </v-col>
                    <v-col
                        cols="12"
                        :sm="header ? 5 : 6"
                        class="subscription__column"
                    >
                        <v-text-field
                            v-model="form.email"
                            class="subscription__input"
                            :outlined="header"
                            color="blue darken-2"
                            name="email"
                            label="Email"
                            type="email"
                            :rules="rules.emailRules"
                            prepend-inner-icon="mdi-email"
                            required
                        />
                    </v-col>

                    <v-col
                        cols="12"
                        :sm="header ? 2 : 12"
                        class="subscription__column"
                    >
                        <div class="subscription__submit">
                            <v-btn
                                type="submit"
                                class="subscription__button"
                                :loading="loading"
                                color="primary"
                                x-large
                                :block="header"
                            >
                                {{ subscriptionSettings.submitButton }}
                            </v-btn>
                        </div>
                    </v-col>
                </v-row>
            </v-form>

            <v-snackbar
                v-model="snackbar.display"
                :timeout="snackbar.timeout"
                :color="!submission.isValid ? 'red' : 'blue darken-1'"
                class="contactForm__snackbar"
                bottom
                vertical
            >
                {{ submission.responseMessage }}
                <v-btn color="white" text @click="snackbar.display = false">
                    Close
                </v-btn>
            </v-snackbar>
        </v-card>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "@/components/molecules/title/header.vue";

export default {
    name: "NewsletterSubscription",

    components: {
        Header,
    },

    props: {
        header: {
            type: Boolean,
            default: false,
        },
    },

    data: () => ({
        valid: false,
        loading: false,
        form: {
            email: "",
            name: "",
            message: "",
            website: "",
            token: "",
            emailSubscription: false,
        },
        rules: {
            emailRules: [
                (v) => !!v || "E-mail is required",
                (v) => /.+@.+/.test(v) || "E-mail must be valid",
            ],
        },
        submission: {
            apiEndpoint:
                "wp-json/contact-form-7/v1/contact-forms/{{id}}/feedback",
            domain: "http://localhost:3000/wp/",
            formID: "7242",
            isValid: true,
            responseMessage: "",
        },
        snackbar: {
            display: false,
            timeout: 6000,
        },
    }),

    computed: {
        ...mapGetters({
            themeSettings: "themeSettings",
        }),
        getEndEndpoint() {
            return (
                this.submission.domain +
                this.submission.apiEndpoint.replace(
                    "{{id}}",
                    this.submission.formID,
                )
            );
        },
        subscriptionSettings() {
            return this.themeSettings.subscription;
        },
    },

    async mounted() {
        await this.$recaptcha.init();
    },

    methods: {
        async submit() {
            if (this.form.website) {
                return;
            }

            if (!this.$refs.form.validate() || this.form.website) {
                return;
            }

            this.loading = true;

            // get token
            this.form.token = await this.$recaptcha.execute("social");

            const form = this.prepareEmailForm();
            const res = await this.$http.post(this.getEndEndpoint, form);
            const data = await res.json();

            this.loading = false;
            this.submission.responseMessage = data.message;
            this.snackbar.display = true;

            if (data.status === "validation_failed") {
                this.submission.isValid = false;
                return;
            }

            this.$refs.form.reset();
            this.submission.isValid = true;
        },

        prepareEmailForm() {
            // Build for data
            const emailBody = {
                "your-name": this.form.name,
                "your-email": this.form.email,
                "g-recaptcha-response": this.form.token,
                "opt-in": true,
                website: this.form.website || "",
            };

            const form = new FormData();

            for (const field in emailBody) {
                form.append(field, emailBody[field]);
            }

            return form;
        },
    },
};
</script>

<style lang="scss" scoped>
.subscription {
    &__card {
        padding: map-get($spaces, "one");
        margin: map-get($spaces, "double") 0;

        @media #{map-get(
              $display-breakpoints,
              "sm-and-up"
          )} {
            margin: map-get($spaces, "triple") 0;
        }

        &--header {
            margin-bottom: 0;
            @media #{map-get(
                      $display-breakpoints,
                      "sm-and-up"
                  )} {
                padding: map-get($spaces, "double") map-get($spaces, "onehalf")
                    0;
            }
        }
    }

    &__title {
        margin: 0 0 map-get($spaces, "half");
    }

    &__input {
        margin: 0 0 map-get($spaces, "half");

        &::v-deep.v-input .v-input__prepend-inner {
            padding-right: map-get($spaces, "half");
        }

        &:first-of-type {
            padding-top: 0;
        }

        ::v-deep input:-internal-autofill-previewed,
        ::v-deep input:-internal-autofill-selected,
        ::v-deep input:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 30px map-get($shades, "white") inset !important;
        }
    }

    &__subline {
        margin-bottom: map-get($spaces, "onehalf");
    }

    &__column {
        padding-top: 0;
        padding-bottom: 0;
    }

    &__submit {
        display: flex;
        justify-content: flex-end;
    }

    &__button {
        width: 100%;

        @media #{map-get(
            $display-breakpoints,
            "sm-and-up"
        )} {
            width: auto;
            &::v-deep.v-btn {
                padding: 0 map-get($spaces, "s400");
            }
        }
    }

    &__sweet {
        display: none;
        visibility: hidden;
    }
}
</style>
