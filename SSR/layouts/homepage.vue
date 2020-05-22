<template>
    <v-app>
        <Header :menu="menuItems" />
        <HeroBanner />
        <v-content class="homepage__content">
            <nuxt />
        </v-content>
        <Footer :menu="menuItems" />
    </v-app>
</template>

<script>
import HeroBanner from "@/components/organisms/heroBanner.vue";
import Header from "@/components/molecules/navigation/header.vue";
import Footer from "@/components/molecules/navigation/footer.vue";
import { menuItems } from "@/data/navigation-config";

export default {
    name: "LayoutHomepage",

    components: {
        HeroBanner,
        Header,
        Footer,
    },

    data() {
        return {};
    },

    computed: {
        menuItems() {
            return menuItems;
        },
    },
};
</script>

<style lang="scss">
html,
body {
    height: 100%;
    margin: 0;
}

.homepage__content {
    padding-top: 0 !important;
}
</style>
