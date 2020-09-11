<template lang="html">
    <header>
        <v-app-bar :clipped-left="clipped" fixed app hide-on-scroll dark>
            <v-toolbar-title class="header__title">
                <nuxt-link to="/">
                    <v-icon color="blue lighten-1">
                        mdi-bicycle
                    </v-icon>
                    <span class="title blue--text lighten-1">
                        Melbourne
                        <span
                            class="red--text text--lighten-1 font-weight-light"
                        >
                            Ride
                        </span>
                    </span>
                </nuxt-link>
            </v-toolbar-title>
            <v-spacer />
            <navigation-right class="hidden-sm-and-down" :header-menu="menu" />
            <v-app-bar-nav-icon
                class="hidden-md-and-up"
                @click.stop="showNavigation = !showNavigation"
            />
        </v-app-bar>
        <v-navigation-drawer
            v-model="showNavigation"
            :mini-variant="miniVariant"
            :clipped="clipped"
            fixed
            app
            right
            disable-resize-watcher
        >
            <v-list>
                <v-list-item
                    v-for="(item, i) in menu"
                    :key="i"
                    :to="item.to"
                    nuxt
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title v-text="item.title" />
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </header>
</template>

<script>
import NavigationRight from "@/components/molecules/navigation/navigation-right.vue";

export default {
    name: "Header",

    components: {
        NavigationRight,
    },

    props: {
        menu: {
            type: Array,
            required: true,
            validator: (value) => typeof value === "object" || !value,
        },
    },

    data() {
        return {
            showNavigation: false,
            clipped: false,
            miniVariant: false,
            title: "Melbourne Ride",
        };
    },
};
</script>

<style lang="scss" scoped>
.header {
    &__title {
        a {
            display: flex;
            text-decoration: none;
        }

        .title {
            margin-left: map-get($spaces, "half");
        }
    }
}
</style>
