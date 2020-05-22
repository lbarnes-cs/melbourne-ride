<template>
    <section class="section section--light">
        <v-container>
            <div class="album">
                <Header
                    :title="previousRide.title"
                    :subline="previousRide.content"
                    :count="previousRide.attachment_count"
                />

                <v-row v-if="$fetchState.pending" dense>
                    <v-col
                        v-for="n in 10"
                        :key="n"
                        class="album__loading"
                        cols="6"
                        sm="4"
                        md="3"
                        lg="2"
                    >
                        <v-img
                            :src="require('@/assets/svg/loading-spinning.svg')"
                            aspect-ratio="1"
                            class="gallery__image"
                        />
                    </v-col>
                </v-row>

                <div v-else-if="$fetchState.error">
                    Error while fetching posts:
                    {{ $fetchState.error.message }}
                </div>

                <v-row v-else dense>
                    <v-col
                        v-for="(image, index) in displayImages"
                        :key="index"
                        cols="6"
                        sm="4"
                        md="3"
                        lg="2"
                    >
                        <v-img
                            v-if="image"
                            :key="image.id"
                            :alt="`${previousRide.title} ${image.id}`"
                            :src="image.thumbnail"
                            :lazy-src="
                                require('@/assets/svg/loading-spinning.svg')
                            "
                            lazy
                            aspect-ratio="1"
                            class="gallery__image"
                            @click.stop="dialogImage(index)"
                        />
                    </v-col>
                    <template v-if="pagination.hasImages">
                        <div v-intersect.quiet="infiniteScrolling" />
                        <v-col
                            v-for="n in 10"
                            :key="pagination.offset + n"
                            class="album__loading"
                            cols="6"
                            sm="4"
                            md="3"
                            lg="2"
                        >
                            <v-img
                                :src="
                                    require('@/assets/svg/loading-spinning.svg')
                                "
                                aspect-ratio="1"
                                class="gallery__image"
                                alt="loading"
                            />
                        </v-col>
                    </template>
                </v-row>

                <div class="album__readMore">
                    <v-btn
                        to="/previous-rides"
                        nuxt
                        x-large
                        color="primary"
                        class="readMoreCTA album__button"
                    >
                        <v-icon class="album__icon">mdi-arrow-left</v-icon>
                        Back to Previous Rides
                    </v-btn>
                </div>
            </div>
        </v-container>

        <v-dialog
            v-model="displayDialog"
            width="unset"
            content-class="dialogWindow"
            :overlay-opacity="0.8"
        >
            <gallery-dialog
                v-if="selectedImage"
                :image-src="selectedImage.large"
                :download-src="selectedImage.full"
                :alt="`${previousRide.title} ${selectedImage.id}`"
                nav
                :counter="`${key + 1} / ${previousRide.attachment_count}`"
                @closeDialog="displayDialog = false"
                @changeDirection="changeImage"
            />
        </v-dialog>
    </section>
</template>
<script>
import Header from "@/components/molecules/title/header.vue";
import GalleryDialog from "@/components/organisms/galleryDialog.vue";
import { API_ENDPOINTS } from "@/data/api-config";

export default {
    name: "PreviousRidesSlug",

    components: {
        GalleryDialog,
        Header,
    },

    async fetch() {
        await this.imageRequest();
        // this.images = this.mapImages(media);
    },

    // fetchOnServer: false,

    async asyncData({ $http, params, error, payload }) {
        if (payload) {
            return { previousRide: payload };
        }

        let [previousRide] = await $http.$get(
            API_ENDPOINTS.baseURL +
                API_ENDPOINTS.previousRidePost +
                params.slug,
        );

        previousRide = {
            id: previousRide.id,
            slug: previousRide.slug,
            title: previousRide.title.rendered,
            content: previousRide.content.rendered,
            featureImage: previousRide.fimg_url,
            attachment_count: previousRide.attachment_count,
            acf: previousRide.acf,
        };

        return { previousRide };
    },

    data() {
        return {
            displayDialog: false,
            key: 0,
            selectedImage: {},
            images: [],
            previousRide: {
                id: 0,
                attachment_count: 0,
                title: "title",
                content: "content",
            },
            pagination: {
                perPage: 20,
                offset: 0,
                hasImages: true,
            },
        };
    },

    computed: {
        displayImages() {
            return this.images;
        },
    },

    watch: {
        displayDialog(val) {
            if (!val) {
                this.selectedImage = {};
            }
        },
    },

    methods: {
        dialogImage(key) {
            this.key = key;
            this.selectedImage = this.displayImages[key];
            this.displayDialog = true;
        },

        async changeImage(direction) {
            let key = this.key;

            if (direction === "previous") {
                key = this.previousImage(key);
            }

            if (direction === "next") {
                key = await this.nextImage(key);
            }

            this.dialogImage(key);
        },

        previousImage(index) {
            if (index === 0) {
                return this.displayImages.length - 1;
            }

            if (index >= this.displayImages.length) {
                return 0;
            }

            return index - 1;
        },

        async nextImage(index) {
            // Get more images if at the end of the current image array
            if (
                index >= this.displayImages.length - 1 &&
                index < this.previousRide.attachment_count
            ) {
                await this.imageRequest();
            }

            if (index >= this.displayImages.length - 1) {
                return 0;
            }

            return index + 1;
        },

        async imageRequest() {
            const postId = this.previousRide.id;

            // Get media images
            const media = await this.$http.$get(
                API_ENDPOINTS.baseURL +
                    `${API_ENDPOINTS.media}${postId}&per_page=${this.pagination.perPage}&offset=${this.pagination.offset}`,
            );

            // Update Images array
            this.images = [...this.images, ...this.mapImages(media)];

            // If reached the end of the array, set pagination to finished
            if (media.length < this.pagination.perPage) {
                this.pagination.hasImages = false;
            }

            // update pagination
            this.pagination.offset += this.pagination.perPage;
        },

        mapImages(media) {
            return media.map((image) => ({
                id: image.id,
                thumbnail: image.media_details.sizes.thumbnail.source_url,
                medium: image.media_details.sizes.medium.source_url,
                large: image.media_details.sizes.large.source_url,
                full: image.media_details.sizes.full.source_url,
            }));
        },

        async infiniteScrolling(entries, observer, isIntersecting) {
            let call = true;
            if (this.pagination.hasImages && call) {
                call = false;
                await this.imageRequest();

                setTimeout(() => {
                    call = true;
                }, 3000);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.album {
    &__readMore {
        display: flex;
        justify-content: center;
    }

    &__icon {
        transition: all 200ms ease-in-out;
        margin-right: map-get($spaces, "half");
    }

    &__button {
        &:hover .album__icon {
            transform: translateX(-(map-get($spaces, "half")));
        }
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
