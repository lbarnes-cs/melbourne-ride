<template lang="html">
    <div class="faqsCards">
        <h2 class="display-2">
            FAQs
        </h2>

        <p class="title">
            We understand you have questions, and we are here to answer them
            all.<br />
            If you don't find the ones you are looking for, view all of our
            <NuxtLink to="/faqs" class="link"
                >{{ faqs.length }} questions here</NuxtLink
            >
        </p>

        <v-row>
            <v-col
                v-for="(faq, index) in topQuestions"
                :key="index"
                cols="12"
                md="6"
            >
                <v-card light color="white" class="faqCard fill-height">
                    <v-card-title class="faqCard__title">
                        <span v-html="faq.title" />
                    </v-card-title>
                    <v-card-text>
                        <div
                            class="faqCard__answer content"
                            v-html="faq.content"
                        />
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <div class="faqCards__readMore">
            <v-btn to="/faqs" nuxt x-large color="primary" class="readMoreCTA">
                See all {{ faqs.length }} FAQs
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: "FAQs",

    props: {
        faqs: {
            type: Array,
            required: true,
            validator: (value) => typeof value === "object" || !value,
        },
    },

    computed: {
        topQuestions() {
            return this.faqs.slice(0, 4);
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
</style>
