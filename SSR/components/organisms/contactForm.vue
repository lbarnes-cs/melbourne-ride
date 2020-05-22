<template lang="html">
    <div class="contactForm">
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
                class="contactForm__honey"
                tabindex="-1"
                autocomplete="off"
            />

            <v-text-field
                v-model="form.name"
                class="contactForm__input"
                name="name"
                label="Name"
                :rules="rules.nameRules"
                prepend-inner-icon="mdi-account"
                required
            />
            <v-text-field
                v-model="form.email"
                class="contactForm__input"
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
                class="contactForm__input contactForm__input--textarea"
                prepend-inner-icon="mdi-comment"
                label="Message"
                required
            />

            <div
                v-if="submission.responseMessage"
                :class="[
                    'contactForm__message',
                    { 'contactForm__message--error': !submission.isValid },
                ]"
            >
                <span>{{ submission.responseMessage }}</span>
            </div>

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
    </div>
</template>

<script>
export default {
    name: "ContactForm",

    props: {
        submitButton: {
            type: String,
            default: "Submit Form",
        },
    },

    data: () => ({
        valid: false,
        loading: false,
        honeypot: "",
        form: {
            email: "",
            name: "",
            message: "",
            website: "",
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
            domain: "https://wnbrmelbourne.com.au/",
            formID: "7121",
            isValid: true,
            responseMessage: "",
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

    methods: {
        async submit() {
            if (this.form.website) {
                return;
            }

            if (!this.$refs.form.validate() || this.form.website) {
                return;
            }

            this.loading = true;

            const form = this.prepareEmailForm();
            const res = await this.$http.post(this.getEndEndpoint, form);
            const data = await res.json();

            this.loading = false;
            this.submission.responseMessage = data.message;

            if (data.status === "validation_failed") {
                this.submission.isValid = false;
                this.submission.responseMessage = data.message;
                return;
            }

            this.submission.isValid = true;
        },
        prepareEmailForm() {
            // Build for data
            const emailBody = {
                "your-name": this.form.name,
                "your-email": this.form.email,
                "your-message": this.form.message,
                website: this.form.website,
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
.contactForm {
    &__input {
        margin: 0 0 map-get($spaces, "half");

        &::v-deep.v-input .v-input__prepend-inner {
            padding-right: map-get($spaces, "half");
        }

        &:first-of-type {
            padding-top: 0;
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

    &__honey {
        display: none;
        visibility: hidden;
    }

    &__message {
        &--error {
            color: red;
        }
    }
}
</style>
