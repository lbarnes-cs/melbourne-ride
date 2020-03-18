<template>
    <v-app dark>
        <Header :menu="menuItems" />
        <v-content>
            <nuxt />
        </v-content>
        <Footer :menu="menuItems" />
    </v-app>
</template>

<script>
import Header from "@/components/molecules/navigation/header.vue";
import Footer from "@/components/molecules/navigation/footer.vue";
import { menuItems } from "@/data/navigation-config";

export default {
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
