<template lang="html">
    <div class="contactForm">
        <h3>{{ formHeader }}</h3>
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
                class="contactForm__sweet"
                tabindex="-1"
                autocomplete="off"
            />

            <v-text-field
                v-model="form.name"
                class="contactForm__input"
                color="blue darken-2"
                name="name"
                label="Name"
                :rules="rules.nameRules"
                prepend-inner-icon="mdi-account"
                required
            />

            <v-text-field
                v-model="form.email"
                class="contactForm__input"
                color="blue darken-2"
                name="email"
                label="Email"
                type="email"
                :rules="rules.emailRules"
                prepend-inner-icon="mdi-email"
                required
            />

            <v-textarea
                v-model="form.message"
                :rules="rules.messageRules"
                color="blue darken-2"
                class="contactForm__input contactForm__input--textarea"
                prepend-inner-icon="mdi-comment"
                label="Message"
                :rows="4"
                required
            />

            <v-checkbox
                v-model="form.emailSubscription"
                color="blue darken-2"
                :label="newsletterSubscriptionText"
            />

            <v-btn
                type="submit"
                class="contactForm__button"
                :loading="loading"
                color="primary"
                x-large
            >
                {{ submitButton }}
            </v-btn>
        </v-form>

        <v-snackbar
            v-model="snackbar.display"
            :timeout="snackbar.timeout"
            :color="!submission.isValid ? 'red' : 'blue darken-2'"
            class="contactForm__snackbar"
            bottom
            vertical
        >
            {{ submission.responseMessage }}
            <v-btn color="white" text @click="snackbar.display = false">
                Close
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: "ContactForm",

    props: {
        formHeader: {
            type: String,
            default: "Reach out to us",
        },
        submitButton: {
            type: String,
            default: "Submit Form",
        },
        newsletterSubscriptionText: {
            type: String,
            default: "Sign up to our newsletter",
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
            nameRules: [(v) => !!v || "Name is required"],
            messageRules: [(v) => !!v || "A message is required"],
        },
        submission: {
            apiEndpoint:
                "wp-json/contact-form-7/v1/contact-forms/{{id}}/feedback",
            domain: "http://localhost:3000/wp/",
            formID: "7121",
            isValid: true,
            responseMessage: "",
        },
        snackbar: {
            display: false,
            timeout: 6000,
        },
    }),

    computed: {
        getEndEndpoint() {
            return (
                this.submission.domain +
                this.submission.apiEndpoint.replace(
                    "{{id}}",
                    this.submission.formID,
                )
            );
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

            console.log("submit form data", this.form);
            const form = this.prepareEmailForm();
            const res = await this.$http.post(this.getEndEndpoint, form);
            const data = await res.json();

            console.log("form", form, "response", data);
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

            console.log(
                "this.form.emailSubscription",
                this.form.emailSubscription,
            );

            let emailBody = {
                "your-name": this.form.name,
                "your-email": this.form.email,
                "your-message": this.form.message,
                "g-recaptcha-response": this.form.token,
                website: this.form.website || "",
            };

            if (this.form.emailSubscription) {
                console.log("subscribe to email");
                const subscription = { "opt-in": true };
                emailBody = { ...emailBody, ...subscription };
            }

            console.log("emailBody", emailBody);

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
.contactForm {
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
            -webkit-box-shadow: 0 0 0 30px map-get($grey, "lighten-5") inset !important;
        }
    }

    &__button {
        margin: map-get($spaces, "one") 0 0;
        width: 100%;

        @media #{map-get(
            $display-breakpoints,
            "sm-and-up"
        )} {
            width: auto;
        }
    }

    &__sweet {
        display: none;
        visibility: hidden;
    }

    &__snackbar {
        font-size: 16px;

        ::v-deep .v-snack__wrapper {
            box-shadow: $card-shadow--dark;
        }
    }
}
</style>
