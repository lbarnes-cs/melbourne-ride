<template lang="html">
    <div class="contact">
        <section class="section section--light">
            <v-container light>
                <Header
                    :title="contactPage.title"
                    :subline="contactPage.subline"
                />

                <v-row class="contact__container">
                    <v-col cols="12" sm="5" md="4" lg="3">
                        <ContactDetails
                            :navigation-header="
                                contactPage.socialNavigationTitle
                            "
                            :social-links="socialMedia"
                        />
                    </v-col>
                    <v-col cols="12" sm="6" md="7" lg="8" offset-sm="1">
                        <ContactForm
                            :form-header="contactPage.contactFormTitle"
                            :submit-button="contactPage.submitBtn"
                            :newsletter-subscription-text="
                                contactPage.newsletterSubscriptionText
                            "
                        />
                    </v-col>
                </v-row>
            </v-container>
        </section>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import { API_ENDPOINTS } from "@/data/api-config";

import Header from "@/components/molecules/title/header.vue";
import ContactDetails from "@/components/organisms/contactDetails.vue";
import ContactForm from "@/components/organisms/contactForm.vue";

export default {
    components: {
        Header,
        ContactDetails,
        ContactForm,
    },
    async asyncData({ $http, params, error, store }) {
        let [contactPage] = await $http.$get(
            API_ENDPOINTS.baseURL + API_ENDPOINTS.contactPage,
        );

        contactPage = {
            id: contactPage.id,
            slug: contactPage.slug,
            title: contactPage.title.rendered,
            content: contactPage.content.rendered,
            subline: contactPage.acf.subline,
            contactFormTitle: contactPage.acf.contactFormTitle,
            submitBtn: contactPage.acf.submitButton,
            socialNavigationTitle: contactPage.acf.socialNavigationTitle,
            newsletterSubscriptionText:
                contactPage.acf.newsletterSubscriptionText,
        };

        return { contactPage };
    },

    computed: {
        ...mapGetters({
            socialMedia: "socialMedia",
        }),
    },

    head() {
        return {
            title: "Contact",
        };
    },
};
</script>

<style lang="scss" scoped></style>
