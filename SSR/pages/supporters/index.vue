<template lang="html">
    <div>
        <section class="section section--light">
            <v-container light>
                <Supporters v-bind="page" />
            </v-container>
        </section>
    </div>
</template>

<script>
import Supporters from "@/components/organisms/supporters.vue";
import { API_ENDPOINTS } from "@/data/api-config";

export default {
    name: "PageSupporters",
    layout: "default",

    components: {
        Supporters,
    },

    async asyncData({ $http, store }) {
        const [page] = await $http.$get(
            API_ENDPOINTS.baseURL + API_ENDPOINTS.supportersPage,
        );

        const supporters = await $http.$get(
            API_ENDPOINTS.baseURL + API_ENDPOINTS.supporters,
        );
        store.commit("SupportersPosts", supporters);

        return {
            page: {
                title: page.title.rendered,
                content: page.content.rendered,
            },
        };
    },

    computed: {
        supporters() {
            return this.$store.state.supporters;
        },
    },

    head() {
        return {
            title: "Supporters",
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
