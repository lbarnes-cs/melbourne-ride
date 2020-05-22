<template lang="html">
    <div class="faqs">
        <Header :title="title" :subline="content" :count="faqs.length" />

        <v-row wrap>
            <v-col cols="4" class="faqs__sidebar hidden-xs-only">
                <sidebar :menu-items="faqs" />
            </v-col>

            <v-col cols="12" sm="8" lg="7" offset-lg="1">
                <div
                    v-for="(faq, index) in faqs"
                    :key="index"
                    class="faqs__card"
                >
                    <h3 class="faqs__question">
                        {{ faq.title | apostrophe }}
                    </h3>

                    <div
                        class="faqs__answer content"
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
                        color="primary"
                    >
                        {{ faq.acf.call_to_action || "Continue reading" }}
                    </v-btn>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Sidebar from "@/components/molecules/faqs/faq-sidebar.vue";
import Header from "@/components/molecules/title/header.vue";

export default {
    name: "FAQs",

    components: {
        Sidebar,
        Header,
    },

    props: {
        faqs: {
            type: Array,
            required: true,
            validator: (value) => typeof value === "object" || !value,
        },
        title: {
            type: String,
            default: "Title",
        },
        content: {
            type: String,
            default: "Subline",
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
.faqs {
    &__card {
        margin: 0 0 map-get($spaces, "triple");
    }

    &__answer {
        ::v-deep p {
            margin: map-get($spaces, "one") 0;
        }
    }

    &__question {
    }

    &__continue {
        margin: map-get($spaces, "one") 0;
    }
}
</style>
