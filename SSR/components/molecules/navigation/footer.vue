<template lang="html">
    <v-footer padless class="footer">
        <v-row no-gutters>
            <v-col cols="12" class="footerAnime">
                <Clouds small />
                <v-container class="footerAnime__container">
                    <span class="footerAnime__sun" />
                    <span class="footerAnime__tree" />
                    <span class="footerAnime__bike" />
                </v-container>
                <div class="footerAnime__grass"></div>
            </v-col>
            <v-col class="light-green darken-3 text-center" cols="12">
                <v-container>
                    <v-btn
                        v-for="(item, index) in menu"
                        :key="index"
                        text
                        :to="item.to"
                        nuxt
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
                                :href="item.href"
                                target="_blank"
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
import Clouds from "@/components/atoms/designElements/clouds.vue";

export default {
    name: "Footer",

    components: {
        Clouds,
    },

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
    position: relative;

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
        z-index: 2;
        height: 350px;
    }

    &__grass {
        background-image: url("~assets/images/design/grass.png");
        background-position: bottom center;
        background-repeat: repeat-x;
        height: 50px;
        width: 100%;
        background-size: 50%;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 2;

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            background-size: 20%;
        }
    }

    &__tree {
        width: 220px;
        height: 270px;
        bottom: 10px;
        right: 0;
        z-index: 0;
        position: absolute;
        background: url("~assets/images/design/tree.png") no-repeat;

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            height: 290px;
        }
    }

    &__sun {
        width: 120px;
        height: 120px;
        position: absolute;
        top: map-get($spaces, "onehalf");
        left: map-get($spaces, "one");
        background: url("~assets/svg/sun.svg") no-repeat;
        transition: all 0.5s linear;

        &:hover {
            animation: spin 3s linear infinite;
        }

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            width: 140px;
            height: 140px;
            left: 0;
        }
    }

    &__bike {
        width: 150px;
        height: 80px;
        position: absolute;
        bottom: 0;
        right: 25px;
        background: url("~assets/svg/bike-blue.svg") no-repeat;
        z-index: 1;

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            height: 100px;
            width: 165px;
        }
    }
}

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}
</style>
