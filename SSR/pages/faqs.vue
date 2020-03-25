<template lang="html">
    <section class="section section--light">
        <v-container light>
            <FAQs :faqs="faqs" />
        </v-container>
    </section>
</template>

<script>
import axios from "axios";
import FAQs from "@/components/organisms/faqs.vue";
import { API_ENDPOINTS } from "@/data/api-config";

export default {
    name: "Faqs",
    layout: "default",

    components: {
        FAQs,
    },

    async asyncData(context) {
        const faqs = await axios.get(API_ENDPOINTS.apiUrl + API_ENDPOINTS.faqs);

        return {
            faqs: faqs.data,
        };
    },
};
</script>

<style lang="scss"></style>
