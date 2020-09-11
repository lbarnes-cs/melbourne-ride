<template lang="html">
    <div class="faqsCards">
        <Header
            :title="title"
            :subline="content"
            link="/faqs"
            :count="faqs.length"
        />

        <v-row>
            <v-col
                v-for="(faq, index) in topQuestions"
                :key="index"
                cols="12"
                md="6"
            >
                <v-card light color="white" class="faqCard fill-height">
                    <v-card-title class="faqCard__title">
                        {{ faq.title | apostrophe }}
                    </v-card-title>
                    <v-card-text>
                        <div
                            class="faqCard__answer content"
                            v-html="excerptContent(faq.content)"
                        />

                        <v-btn
                            v-if="readMore(faq.content)"
                            class="faqCard__continue btn--wide"
                            :to="{
                                name: 'faqs-slug',
                                params: { slug: faq.slug },
                            }"
                            nuxt
                        >
                            {{ faq.acf.call_to_action || "Continue reading" }}
                        </v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <div class="faqCards__readMore">
            <v-btn to="/faqs" nuxt x-large color="primary" class="readMoreCTA">
                {{ callToAction }}
            </v-btn>
        </div>
    </div>
</template>

<script>
import Header from "@/components/molecules/title/header.vue";
export default {
    name: "FAQs",

    components: {
        Header,
    },

    props: {
        title: {
            type: String,
            default: "Header",
        },
        content: {
            type: String,
            default: "Subline with [{{count}} link]",
        },
        acf: {
            type: Object,
            default: () => ({
                call_to_action: "See all {{count}} FAQs",
            }),
        },
    },

    computed: {
        topQuestions() {
            return this.faqs.slice(0, 6);
        },

        faqs() {
            return this.$store.state.faqs;
        },
        callToAction() {
            return this.acf.call_to_action.replace(
                "{{count}}",
                this.faqs.length,
            );
        },
    },

    methods: {
        excerptContent(content) {
            const readMore = "<p><!--more--></p>";

            if (content.includes(readMore)) {
                const [first] = content.split(readMore);
                return first;
            }

            return content;
        },

        readMore(content) {
            const readMore = "<p><!--more--></p>";

            return content.includes(readMore);
        },
    },
};
</script>

<style lang="scss" scoped>
.faqCards {
    &__readMore {
        display: flex;
        justify-content: center;
    }
}

.faqCard {
    &__continue {
        margin-top: map-get($spaces, "one");
    }
    ::v-deep .v-card__title {
        word-break: break-word;
    }
}
</style>
