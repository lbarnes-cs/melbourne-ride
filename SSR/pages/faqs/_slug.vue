<template lang="html">
    <section class="section section--light">
        <v-container class="faq">
            <v-row wrap>
                <v-col cols="4" lg="4" class="hidden-xs-only">
                    <sidebar :menu-items="faqs" />
                </v-col>

                <v-col cols="12" sm="8" lg="7" offset-lg="1">
                    <h2 class="faq__title headline">
                        {{ question.title | apostrophe }}
                    </h2>
                    <div class="faq__content" v-html="question.content"></div>
                    <v-btn
                        :to="{ name: 'faqs' }"
                        text
                        color="primary"
                        class="faq__back"
                        light
                    >
                        <v-icon class="faq__icon">mdi-arrow-left</v-icon>
                        Return to FAQs
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import { API_ENDPOINTS } from "@/data/api-config";
import Sidebar from "@/components/molecules/faqs/faq-sidebar.vue";

export default {
    name: "FaqsSlug",

    components: {
        Sidebar,
    },

    async asyncData({ $http, params, error, payload, store }) {
        if (!store.state.faqs.length) {
            const faqs = await $http.$get(
                API_ENDPOINTS.baseURL + API_ENDPOINTS.faqsPost,
            );

            store.commit("FaqsPosts", faqs);
        }

        if (payload) {
            return { question: payload };
        }

        let [question] = await $http.$get(
            API_ENDPOINTS.baseURL + API_ENDPOINTS.faqsPost + params.slug,
        );

        question = {
            id: question.id,
            slug: question.slug,
            title: question.title.rendered,
            content: question.content.rendered,
            acf: question.acf,
        };

        return { question };
    },

    data() {
        return {
            question: {
                title: {
                    rendered: "testing",
                },
                content: {
                    rendered: "testing",
                },
            },
        };
    },

    computed: {
        faqs() {
            return this.$store.state.faqs;
        },
    },
};
</script>

<style lang="scss" scoped>
.faq {
    &__title {
        margin: 0 0 map-get($spaces, "one");
        text-align: left;
    }

    &__icon {
        transition: all 200ms ease-in-out;
        margin-right: map-get($spaces, "half");
    }

    &__back {
        &:hover .faq__icon {
            transform: translateX(-(map-get($spaces, "half")));
        }
    }
}
</style>
