<template lang="html">
    <div class="contast">
        <section class="section section--light">
            <v-container light>
                <Header
                    :title="contactPage.title"
                    :subline="contactPage.subline"
                />

                <v-row>
                    <v-col cols="12" md="4">
                        <ContactDetails :social-links="socialItems" />
                    </v-col>
                    <v-col cols="12" md="8">
                        <ContactForm :submit-button="contactPage.submitBtn" />
                    </v-col>
                </v-row>
            </v-container>
        </section>
    </div>
</template>

<script>
import { socialMedia } from "@/data/navigation-config";
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
            submitBtn: contactPage.acf.submit_button,
        };

        return { contactPage };
    },

    computed: {
        socialItems() {
            return socialMedia;
        },
    },
};
</script>

<style lang="scss"></style>
