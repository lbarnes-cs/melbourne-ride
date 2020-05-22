<template lang="html">
    <section class="section section--light">
        <v-container light>
            <FAQs :faqs="faqs" v-bind="page" />
        </v-container>
    </section>
</template>

<script>
import FAQs from "@/components/organisms/faqs.vue";
import { API_ENDPOINTS } from "@/data/api-config";

export default {
    components: {
        FAQs,
    },

    async asyncData({ $http, store }) {
        const [page] = await $http.$get(
            API_ENDPOINTS.baseURL + API_ENDPOINTS.faqsPage,
        );

        if (!store.state.faqs.length) {
            const faqs = await $http.$get(
                API_ENDPOINTS.baseURL + API_ENDPOINTS.faqsPost,
            );
            store.commit("FaqsPosts", faqs);
        }

        return {
            page: {
                title: page.title.rendered,
                content: page.content.rendered,
            },
        };
    },

    computed: {
        faqs() {
            return this.$store.state.faqs;
        },
    },

    head() {
        return {
            title: "FAQs",
        };
    },
};
</script>
