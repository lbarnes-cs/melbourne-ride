<template lang="html">
    <div class="contentContainer">
        <section class="section section--teal">
            <v-container>
                <Aim />
            </v-container>
        </section>

        <section class="section section--indigo white--text">
            <v-container>
                <AboutUs home />
            </v-container>
        </section>

        <section class="section section--light">
            <v-container>
                <Event v-bind="eventPage" home />
            </v-container>
        </section>

        <FeatureGallery v-bind="featureGallery" />

        <History v-bind="history" />

        <section class="section section--lightGrey">
            <v-container light>
                <FAQs v-bind="faqCard" />
            </v-container>
        </section>

        <section class="section section--purple white--text">
            <v-container>
                <Supporters v-bind="supportPage" />
            </v-container>
        </section>

        <section class="section section--blue white--text">
            <v-container>
                <Header title="title" subline="content" />
                <NewsletterSubscription header />
            </v-container>
        </section>
    </div>
</template>

<script>
import Aim from "@/components/organisms/aim.vue";
import AboutUs from "@/components/organisms/aboutUs.vue";
import Event from "@/components/organisms/event.vue";
import History from "@/components/organisms/history.vue";
import FAQs from "@/components/organisms/faqs-cards.vue";
import Supporters from "@/components/organisms/supporters.vue";
import FeatureGallery from "@/components/organisms/feature-gallery.vue";
import NewsletterSubscription from "@/components/molecules/card/newsletterSubscription.vue";

import { API_ENDPOINTS } from "@/data/api-config";

export default {
    layout: "homepage",

    components: {
        Aim,
        AboutUs,
        Event,
        History,
        FAQs,
        Supporters,
        FeatureGallery,
        NewsletterSubscription,
    },

    async asyncData({ $http, store }) {
        // Hero Banner
        const [themeSettings] = await $http.$get(
            API_ENDPOINTS.baseURL + API_ENDPOINTS.themeSettings,
        );

        if (themeSettings.acf) {
            store.commit("ThemeSettings", themeSettings.acf);
        }

        // About Page
        const [about] = await $http.$get(
            API_ENDPOINTS.baseURL + API_ENDPOINTS.about,
        );

        if (about) {
            store.commit("AboutPage", about);
        }

        if (about.acf) {
            store.commit("AimsPosts", about.acf);
        }

        // History Page
        let [history] = await $http.$get(
            API_ENDPOINTS.baseURL + API_ENDPOINTS.history,
        );

        history = {
            title: history.title.rendered,
            content: history.content.rendered,
        };

        // Supporter Post
        const supporters = await $http.$get(
            API_ENDPOINTS.baseURL + API_ENDPOINTS.supporters,
        );

        if (supporters) {
            store.commit("SupportersPosts", supporters);
        }

        // Supporter Page
        let [supportPage] = await $http.$get(
            API_ENDPOINTS.baseURL + API_ENDPOINTS.supportersPage,
        );

        supportPage = {
            title: supportPage.acf.title || supportPage.title.rendered,
            content: supportPage.acf.subline || supportPage.content.rendered,
        };

        // Faqs posts
        const faqs = await $http.$get(
            API_ENDPOINTS.baseURL + API_ENDPOINTS.faqsPost,
        );

        if (faqs) {
            store.commit("FaqsPosts", faqs);
        }

        // Faq Page
        let [faqCard] = await $http.$get(
            API_ENDPOINTS.baseURL + API_ENDPOINTS.faqsPage,
        );

        faqCard = {
            title: faqCard.acf.title || faqCard.title.rendered,
            content: faqCard.acf.subline || faqCard.content.rendered,
            acf: faqCard.acf,
        };

        // Event Page
        const [eventPage] = await $http.$get(
            API_ENDPOINTS.baseURL + API_ENDPOINTS.event,
        );

        if (eventPage) {
            store.commit("EventPage", eventPage);
        }

        // Feature Gallery
        let [featureGallery] = await $http.$get(
            API_ENDPOINTS.baseURL + API_ENDPOINTS.featureGallery,
        );

        let featureGalleryMedia = await $http.$get(
            API_ENDPOINTS.baseURL + API_ENDPOINTS.media + featureGallery.id,
        );

        featureGalleryMedia = featureGalleryMedia.map((image) => ({
            id: image.id,
            thumbnail: image.media_details.sizes.thumbnail.source_url,
            medium: image.media_details.sizes.medium.source_url,
            large: image.media_details.sizes.large.source_url,
            full: image.media_details.sizes.full.source_url,
        }));

        featureGallery = {
            id: featureGallery.id,
            slug: featureGallery.slug,
            title: featureGallery.title.rendered,
            content: featureGallery.content.rendered,
            acf: featureGallery.acf,
            featureImages: featureGalleryMedia,
        };

        return {
            supportPage,
            faqCard,
            history,
            featureGallery,
            featureGalleryMedia,
        };
    },

    computed: {
        eventPage() {
            return this.$store.state.event;
        },
    },
    head() {
        return {
            title: "As Bare As You Dare",
        };
    },
};
</script>
