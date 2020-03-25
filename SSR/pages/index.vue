<template lang="html">
    <div class="contentContainer">
        <section class="section section--teal">
            <v-container>
                <Aim :aims="aims" />
            </v-container>
        </section>

        <section class="section section--indigo">
            <v-container>
                <About home />
            </v-container>
        </section>

        <section class="section section--light">
            <v-container>
                <Event :event="event" home />
            </v-container>
        </section>

        <History :history="history" />

        <section class="section section--lightGrey">
            <v-container light>
                <FAQs :faqs="faqs" />
            </v-container>
        </section>

        <section class="section section--purple">
            <v-container light>
                <Supporters :supporters="supporters" />
            </v-container>
        </section>
    </div>
</template>

<script>
import axios from "axios";
import Aim from "@/components/organisms/aim.vue";
import About from "@/components/organisms/about.vue";
import Event from "@/components/organisms/event.vue";
import History from "@/components/organisms/history.vue";
import FAQs from "@/components/organisms/faqs-cards.vue";
import Supporters from "@/components/organisms/supporters.vue";
import { API_ENDPOINTS } from "@/data/api-config";

export default {
    name: "Homepage",
    layout: "homepage",

    components: {
        Aim,
        About,
        Event,
        History,
        FAQs,
        Supporters,
    },

    async asyncData(context) {
        const aims = await axios.get(API_ENDPOINTS.apiUrl + API_ENDPOINTS.aims);

        const faqs = await axios.get(API_ENDPOINTS.apiUrl + API_ENDPOINTS.faqs);

        const supporters = await axios.get(
            API_ENDPOINTS.apiUrl + API_ENDPOINTS.supporters,
        );

        const event = await axios.get(
            API_ENDPOINTS.apiUrl + API_ENDPOINTS.event,
        );

        const history = await axios.get(
            API_ENDPOINTS.apiUrl + API_ENDPOINTS.history,
        );

        return {
            aims: aims.data,
            faqs: faqs.data,
            supporters: supporters.data,
            event: event.data,
            history: history.data,
        };
    },
};
</script>

<style lang="scss">
.contentContainer {
    position: relative;
    z-index: 1;
    background: map-get($grey, "darken-4");
}
</style>
