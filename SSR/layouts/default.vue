<template>
    <v-app light>
        <Header :menu="menuItems" />
        <v-main>
            <nuxt />
        </v-main>
        <Footer :menu="menuItems" />
    </v-app>
</template>

<script>
import Header from "@/components/molecules/navigation/header.vue";
import Footer from "@/components/molecules/navigation/footer.vue";
import { menuItems } from "@/data/navigation-config";

export default {
    name: "LayoutDefault",

    components: {
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
}
</style>
