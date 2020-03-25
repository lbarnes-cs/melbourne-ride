<template lang="html">
    <div>
        <section class="section section--light">
            <v-container light>
                <Supporters :supporters="supporters" />
            </v-container>
        </section>
    </div>
</template>

<script>
import axios from "axios";
import Supporters from "@/components/organisms/supporters.vue";
import { API_ENDPOINTS } from "@/data/api-config";

export default {
    name: "Supporters",
    layout: "default",

    components: {
        Supporters,
    },

    async asyncData(context) {
        const supporters = await axios.get(
            API_ENDPOINTS.apiUrl + API_ENDPOINTS.supporters,
        );

        return {
            supporters: supporters.data,
        };
    },
};
</script>

<style lang="scss">
.contentContainer {
    position: relative;
    z-index: 1;
}
</style>
