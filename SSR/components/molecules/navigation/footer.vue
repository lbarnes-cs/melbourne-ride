<template lang="html">
    <v-footer padless class="footer">
        <v-row no-gutters>
            <v-col cols="12" class="footerAnime">
                <v-container class="footerAnime__container">
                    <span class="footerAnime__tree" />
                </v-container>
                <div class="footerAnime__grass"></div>
            </v-col>
            <v-col class="light-green darken-3 text-center" cols="12">
                <v-container>
                    <v-btn
                        v-for="(item, index) in menu"
                        :key="index"
                        text
                        @click="$vuetify.goTo(`#${item.to}`)"
                    >
                        {{ item.title }}
                    </v-btn>
                </v-container>
            </v-col>
            <v-col class="light-green darken-2" cols="12">
                <v-container>
                    <v-row class="footer__secondary text-center">
                        <v-col cols="12" sm="12" md="6" class="text-md-left">
                            <p class="footer__copyright">
                                &copy; {{ new Date().getFullYear() }} —
                                <strong>Melbourne Ride</strong>
                            </p>
                            <p class="ma-0 font-italic">
                                Designed &amp; Developed by Laurence Barnes
                            </p>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="12"
                            md="6"
                            align-self="center"
                            class="text-md-right"
                        >
                            <v-btn
                                v-for="(item, index) in socialItems"
                                :key="index"
                                icon
                                class="footer__socialIcons"
                                large
                            >
                                <v-icon>{{ item.icon }}</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
    </v-footer>
</template>

<script>
import { socialMedia } from "@/data/navigation-config";

export default {
    name: "Footer",

    props: {
        menu: {
            type: Array,
            required: true,
            validator: (value) => typeof value === "object" || !value,
        },
    },

    computed: {
        socialItems() {
            return socialMedia;
        },
    },
};
</script>

<style lang="scss" scoped>
.footer {
    &__secondary {
        flex-direction: column-reverse;

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            flex-direction: row;
        }
    }

    &__socialIcons {
        &:first-of-type {
            margin-left: -(map-get($spaces, "half"));
        }

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            margin-left: map-get($spaces, "quarter");
        }
    }

    &__copyright {
        margin: 0 0 map-get($spaces, "one");
    }
}
.footerAnime {
    position: relative;
    background: map-get($light-blue, "darken-1");

    &__container {
        position: relative;
        height: 300px;
    }

    &__grass {
        background-image: url("~assets/images/design/grass.png");
        background-position: bottom center;
        background-repeat: repeat-x;
        height: 50px;
        width: 100%;
        background-size: 20%;
        position: absolute;
        left: 0;
        bottom: 0;
    }

    &__tree {
        width: 200px;
        height: 270px;
        bottom: 0;
        right: 0;
        z-index: 0;
        position: absolute;
        background: url("~assets/images/design/tree.png") no-repeat;
    }
}
</style>
