<template lang="html">
    <div>
        <Aim :aims="aims" />
        <About />
        <Event :event="event" />
        <History :history="history" />
        <FAQs :faqs="faqs" />
        <Supporters :supporters="supporters" />
    </div>
</template>

<script>
import axios from "axios";
import Aim from "@/components/organisms/aim.vue";
import About from "@/components/organisms/about.vue";
import Event from "@/components/organisms/event.vue";
import History from "@/components/organisms/history.vue";
import FAQs from "@/components/organisms/faqs.vue";
import Supporters from "@/components/organisms/supporters.vue";
import { API_ENDPOINTS } from "@/data/api-config";

export default {
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
