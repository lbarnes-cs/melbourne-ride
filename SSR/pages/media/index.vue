<template lang="html">
    <section class="section section--light">
        <v-container>
            <div class="media">
                <Header :title="mediaPage.title" :subline="mediaPage.content" />

                <v-row>
                    <v-col
                        v-for="media in mediaPage.media"
                        :key="media.id"
                        class="ride"
                        cols="12"
                        md="6"
                    >
                        <v-card
                            v-if="media.published"
                            light
                            color="white"
                            class="media__card fill-height"
                            hover
                            nuxt
                            @click.stop="displayMedia(media)"
                        >
                            <v-img
                                height="300px"
                                :src="media.thumbnail || ''"
                                :alt="media.title"
                                lazy
                                class="media__image align-end"
                            >
                                <v-icon class="media__playIcon">
                                    mdi-youtube
                                </v-icon>
                            </v-img>
                            <v-card-title class="media__title">
                                <v-icon class="media__icon" light>
                                    mdi-television-play
                                </v-icon>
                                {{ media.title }}
                            </v-card-title>
                            <v-card-text>
                                {{ media.description }}
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </div>
        </v-container>

        <v-dialog
            v-model="displayDialog"
            width="unset"
            content-class="dialogWindow"
            :overlay-opacity="0.8"
        >
            <video-player
                v-if="videoId"
                :video-id="videoId"
                @closeDialog="closeDialog"
            />
        </v-dialog>
    </section>
</template>

<script>
import Header from "@/components/molecules/title/header.vue";
import VideoPlayer from "@/components/molecules/media/video.vue";

import { API_ENDPOINTS } from "@/data/api-config";

export default {
    name: "Media",

    components: {
        Header,
        VideoPlayer,
    },

    async asyncData({ $http, params, error, store }) {
        let [mediaPage] = await $http.$get(
            API_ENDPOINTS.baseURL + API_ENDPOINTS.mediaPage,
        );

        const media = mediaPage.acf.media.map((post) => ({
            id: post.id,
            title: post.title,
            description: post.description,
            type: post.type,
            year: post.year,
            youtubeId: post.youtube_id,
            thumbnail: post.image.sizes.medium,
            published: post.published || true,
        }));

        mediaPage = {
            id: mediaPage.id,
            slug: mediaPage.slug,
            title: mediaPage.title.rendered,
            content: mediaPage.content.rendered,
            media,
        };

        return { mediaPage };
    },

    data() {
        return {
            displayDialog: false,
            videoId: null,
        };
    },

    methods: {
        displayMedia(media) {
            this.videoId = media.youtubeId;
            this.displayDialog = true;
        },

        closeDialog() {
            this.videoId = null;
            this.displayDialog = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.media {
    &__icon {
        margin-right: map-get($spaces, "half");
    }

    &__card {
        &:hover .media__playIcon {
            color: map-get($red, "darken-1");
        }
    }

    &__image {
        ::v-deep .v-responsive__content {
            display: flex;
            height: 100%;
            justify-content: center;
        }
    }

    &__playIcon {
        font-size: 6em;
    }
}

.dialogWindow {
    ::v-deep &.v-dialog {
        margin: map-get($spaces, "one") 0;
        border-radius: 0;

        @media #{map-get(
            $display-breakpoints,
            "sm-and-up"
        )} {
            overflow: initial;
            margin: map-get($spaces, "double");
        }
    }
}
</style>
