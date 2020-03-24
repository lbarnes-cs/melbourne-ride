<template lang="html">
    <div class="contentContainer">
        <section class="section section--light">
            <v-container>
                <Event :event="event" />
            </v-container>
        </section>
    </div>
</template>

<script>
import axios from "axios";
import Event from "@/components/organisms/event.vue";
import { API_ENDPOINTS } from "@/data/api-config";

export default {
    name: "PageEvent",
    layout: "default",

    components: {
        Event,
    },

    async asyncData(context) {
        const event = await axios.get(
            API_ENDPOINTS.apiUrl + API_ENDPOINTS.event,
        );

        return {
            event: event.data,
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
