<template lang="html">
    <section class="section section--light">
        <v-container>
            <Header :title="page.title" :subline="page.content" />

            <v-row>
                <v-col
                    v-for="ride in previousRides"
                    :key="ride.id"
                    class="ride"
                    cols="12"
                    md="6"
                >
                    <v-card
                        light
                        color="white"
                        class="ride__card fill-height"
                        hover
                        nuxt
                        :to="{
                            name: 'previous-rides-slug',
                            params: { slug: ride.slug },
                        }"
                    >
                        <div class="ride__content">
                            <v-img
                                height="200px"
                                :src="ride.featureImage || ''"
                                lazy
                                class="ride__image align-end"
                            >
                                <v-card-title class="ride__title">
                                    <v-icon class="ride__icon" dark>
                                        mdi-bike
                                    </v-icon>
                                    {{ ride.title }}
                                </v-card-title>
                            </v-img>
                            <v-card-text>
                                {{ ride.content | striphtml }}
                            </v-card-text>
                        </div>
                        <v-card-actions class="ride__action">
                            <v-divider class="ride__divider" />
                            <v-btn
                                class="ride__ctaBtn"
                                text
                                block
                                color="primary"
                            >
                                <v-icon class="ride__icon">
                                    mdi-tooltip-image-outline
                                </v-icon>
                                {{ ride.acf.call_to_action || "View Album" }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import Header from "@/components/molecules/title/header.vue";
import { API_ENDPOINTS } from "@/data/api-config";

export default {
    name: "PreviousRides",
    components: {
        Header,
    },
    async asyncData({ $http, store }) {
        const previousRides = await $http.$get(
            API_ENDPOINTS.baseURL + API_ENDPOINTS.previousRidePost,
        );

        store.commit("PreviousRidesPosts", previousRides);

        let [page] = await $http.$get(
            API_ENDPOINTS.baseURL + API_ENDPOINTS.previousRidePage,
        );

        page = {
            title: page.title.rendered,
            content: page.content.rendered,
        };

        return {
            page,
        };
    },

    computed: {
        previousRides() {
            return this.$store.state.previousRides;
        },
    },

    head() {
        return {
            title: "Previous Rides",
        };
    },
};
</script>

<style lang="scss" scoped>
.ride {
    &__card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        ::v-deep .v-image__image {
            transition: ease-in-out 200ms transform;
        }

        &:hover {
            ::v-deep .v-image__image {
                transform: scale(1.1);
            }
        }
    }

    &__content {
        overflow: hidden;
    }

    &__title {
        color: map-get($shades, "white");
        background: linear-gradient(
            to bottom,
            rgba(map-get($grey, "darken-4"), 0),
            rgba(map-get($grey, "darken-4"), 0.9)
        );
    }

    &__icon {
        margin-right: map-get($spaces, "half");

        &--light {
            color: map-get($shades, "white");
        }
    }

    &__action {
        flex-direction: column;
        margin: 0 map-get($spaces, "half") map-get($spaces, "half");
    }

    &__divider {
        width: 100%;
        margin: 0 0 map-get($spaces, "half");
    }
}
</style>
