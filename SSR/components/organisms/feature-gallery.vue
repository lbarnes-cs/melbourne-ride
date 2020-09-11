<template lang="html">
    <section class="section section--darkGrey white--text">
        <v-container>
            <Header :title="title" :subline="content" :count="media.length" />
        </v-container>

        <v-container fluid>
            <v-row dense>
                <v-col
                    v-for="(image, index) in media"
                    :key="index"
                    cols="6"
                    sm="4"
                    md="3"
                    lg="2"
                >
                    <v-img
                        v-if="image"
                        :key="image.id"
                        :alt="`${title} ${image.id}`"
                        :src="image.thumbnail"
                        :lazy-src="require('@/assets/svg/loading-spinning.svg')"
                        lazy
                        aspect-ratio="1"
                        class="gallery__image"
                        @click.stop="dialogImage(index)"
                    />
                </v-col>
            </v-row>
        </v-container>

        <v-container>
            <div class="gallery__readMore">
                <v-btn
                    to="/previous-rides"
                    nuxt
                    x-large
                    color="primary"
                    class="readMoreCTA"
                >
                    {{ acf.call_to_action }}
                </v-btn>
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
                :alt="`${title} ${selectedImage.id}`"
                :counter="`${key + 1} / ${media.length}`"
                nav
                @closeDialog="displayDialog = false"
                @changeDirection="changeImage"
            />
        </v-dialog>
    </section>
</template>

<script>
import Header from "@/components/molecules/title/header.vue";
import GalleryDialog from "@/components/organisms/galleryDialog.vue";

export default {
    name: "FeatureGallery",

    components: {
        Header,
        GalleryDialog,
    },

    props: {
        title: {
            type: String,
            default: "title",
        },
        content: {
            type: String,
            default: "subline",
        },
        acf: {
            type: Object,
            default: () => ({
                call_to_action: "",
            }),
        },
        featureImages: {
            type: Array,
            validator: (value) => typeof value === "object" || !value,
        },
    },

    data() {
        return {
            displayDialog: false,
            selectedImage: {},
            key: 0,
        };
    },

    computed: {
        media() {
            if (this.$vuetify.breakpoint.xsOnly) {
                return this.featureImages.slice(0, 8);
            }

            if (this.$vuetify.breakpoint.smOnly) {
                return this.featureImages.slice(0, 12);
            }

            return this.featureImages;
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
            this.selectedImage = this.media[key];
            this.displayDialog = true;
        },

        changeImage(direction) {
            let key = this.key;

            if (direction === "previous") {
                key = this.previousImage(key);
            }

            if (direction === "next") {
                key = this.nextImage(key);
            }

            this.dialogImage(key);
        },

        previousImage(index) {
            if (index === 0) {
                return this.media.length - 1;
            }

            if (index >= this.media.length) {
                return 0;
            }

            return index - 1;
        },

        nextImage(index) {
            if (index >= this.media.length - 1) {
                return 0;
            }

            return index + 1;
        },
    },
};
</script>

<style lang="scss" scoped>
.gallery {
    &__readMore {
        display: flex;
        justify-content: center;
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
