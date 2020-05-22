<template lang="html">
    <div>
        <section class="section section--light">
            <v-container light>
                <AboutUs />
            </v-container>
        </section>
        <section class="section section--teal">
            <v-container light>
                <Aim />
            </v-container>
        </section>
    </div>
</template>

<script>
import AboutUs from "@/components/organisms/aboutUs.vue";
import Aim from "@/components/organisms/aim.vue";
import { API_ENDPOINTS } from "@/data/api-config";

export default {
    components: {
        AboutUs,
        Aim,
    },

    async asyncData({ $http, store }) {
        const [about] = await $http.$get(
            API_ENDPOINTS.baseURL + API_ENDPOINTS.about,
        );

        store.commit("AboutPage", about);
        store.commit("AimsPosts", about.acf);
    },
};
</script>

<style lang="scss"></style>
