<template lang="html">
    <div>
        <section class="section section--light">
            <v-container light>
                <About />
            </v-container>
        </section>
        <section class="section section--teal">
            <v-container light>
                <Aim :aims="aims" />
            </v-container>
        </section>
    </div>
</template>

<script>
import axios from "axios";
import Aim from "@/components/organisms/aim.vue";
import About from "@/components/organisms/about.vue";
import { API_ENDPOINTS } from "@/data/api-config";

export default {
    name: "About",
    layout: "default",

    components: {
        Aim,
        About,
    },

    async asyncData(context) {
        const aims = await axios.get(API_ENDPOINTS.apiUrl + API_ENDPOINTS.aims);

        return {
            aims: aims.data,
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
