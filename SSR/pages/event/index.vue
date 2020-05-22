<template lang="html">
    <div class="contentContainer">
        <section class="section section--light">
            <v-container>
                <Event v-bind="eventPage" />
            </v-container>
        </section>
    </div>
</template>

<script>
import Event from "@/components/organisms/event.vue";
import { API_ENDPOINTS } from "@/data/api-config";

export default {
    name: "PageEvent",
    layout: "default",

    components: {
        Event,
    },

    async asyncData({ $http, store }) {
        if (!store.state.event.length) {
            const [eventPage] = await $http.$get(
                API_ENDPOINTS.baseURL + API_ENDPOINTS.event,
            );

            store.commit("EventPage", eventPage);
        }
    },

    computed: {
        eventPage() {
            return this.$store.state.event;
        },
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
