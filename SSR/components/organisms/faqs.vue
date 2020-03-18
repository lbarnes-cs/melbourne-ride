<template lang="html">
    <div id="faqs" class="section faqs">
        <v-container light>
            <h2 class="display-2 light">
                FAQs
            </h2>

            <v-expansion-panels light focusable multiple>
                <v-expansion-panel
                    v-for="(faq, index) in faqs"
                    :key="index"
                    class="white"
                >
                    <v-expansion-panel-header>
                        <span v-html="faq.title" />
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <div class="faqs__answer" v-html="faq.content" />
                    </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </v-container>
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
};
</script>

<style lang="scss">
.faqs {
    background: map-get($grey, "lighten-3");

    &__answer p {
        margin: map-get($spaces, "one") 0 0;
    }
}
</style>
