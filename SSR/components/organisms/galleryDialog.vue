<template lang="html">
    <div
        v-touch="{
            left: () => eventChangeDirection('left'),
            right: () => eventChangeDirection('right'),
        }"
        class="galleryDialog"
    >
        <div class="galleryDialog__close">
            <v-btn fab light x-small @click.stop="emitClose">
                <v-icon>
                    mdi-close-thick
                </v-icon>
            </v-btn>
        </div>
        <div class="galleryDialog__content">
            <div
                v-if="nav"
                class="galleryDialog__nav galleryDialog__nav--previous"
            >
                <v-btn
                    fab
                    light
                    :small="this.$vuetify.breakpoint.xsOnly"
                    @click.stop="changeDirection('previous')"
                >
                    <v-icon>
                        mdi-chevron-left
                    </v-icon>
                </v-btn>
            </div>

            <img
                class="galleryDialog__image"
                :src="imageSrc"
                loading="lazy"
                :alt="alt"
            />

            <div v-if="nav" class="galleryDialog__nav galleryDialog__nav--next">
                <v-btn
                    fab
                    light
                    :small="this.$vuetify.breakpoint.xsOnly"
                    @click.stop="changeDirection('next')"
                >
                    <v-icon>
                        mdi-chevron-right
                    </v-icon>
                </v-btn>
            </div>
            <div class="galleryDialog__info">
                <span v-if="counter">{{ counter }}</span>

                <v-btn
                    v-if="downloadSrc"
                    :href="downloadSrc"
                    download
                    fab
                    light
                    x-small
                    class="galleryDialog__download"
                >
                    <v-icon>
                        mdi-download
                    </v-icon>
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import { Touch } from "vuetify/lib/directives";

export default {
    name: "GalleryDialog",

    directives: {
        Touch,
    },

    props: {
        imageSrc: {
            type: String,
            required: false,
            default: "",
        },
        nav: {
            type: Boolean,
            default: false,
        },
        downloadSrc: {
            type: String,
            default: "",
        },
        counter: {
            type: String,
            required: false,
            default: "",
        },
        alt: {
            type: String,
            required: false,
            default: "",
        },
    },

    mounted() {
        document.addEventListener("keyup", this.eventChangeDirection);
    },

    destroyed() {
        document.removeEventListener("keyup", this.eventChangeDirection);
    },

    methods: {
        emitClose() {
            this.$emit("closeDialog");
        },
        changeDirection(direction) {
            this.$emit("changeDirection", direction);
        },
        eventChangeDirection(direction = "") {
            if (event.keyCode === 37 || direction === "right") {
                this.$emit("changeDirection", "previous");
            }

            if (event.keyCode === 39 || direction === "left") {
                this.$emit("changeDirection", "next");
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.galleryDialog {
    &__content {
        overflow: hidden;

        @media #{map-get(
            $display-breakpoints,
            "sm-and-up"
        )} {
            border-radius: map-get($spaces, "half");
        }
    }

    &__nav {
        position: absolute;
        z-index: 2;
        bottom: (map-get($spaces, "half"));

        @media #{map-get(
            $display-breakpoints,
            "sm-and-up"
        )} {
            bottom: initial;
            top: 50%;
            transform: translateY(-50%);
        }

        &--previous {
            left: (map-get($spaces, "half"));
        }

        &--next {
            right: (map-get($spaces, "half"));
        }
    }

    &__close {
        position: absolute;
        right: (map-get($spaces, "half"));
        top: (map-get($spaces, "half"));
        width: auto;
        z-index: 2;

        @media #{map-get(
            $display-breakpoints,
            "sm-and-up"
        )} {
            right: (map-get($spaces, "one"));
            top: (map-get($spaces, "one"));
        }
    }

    &__info {
        position: absolute;
        color: map-get($shades, "white");
        bottom: (map-get($spaces, "half"));
        left: 50%;
        transform: translatex(-50%);
        height: 40px;
        display: flex;
        align-items: center;

        @media #{map-get(
            $display-breakpoints,
            "sm-and-up"
        )} {
            height: unset;
            position: fixed;
        }
    }

    &__image {
        max-width: calc(100% - #{map-get($spaces, "one")});
        max-height: 90vh;
        display: block;
        min-width: 200px;
        min-height: 200px;
        background: white;
        margin: 0 auto;

        @media #{map-get(
            $display-breakpoints,
            "sm-and-up"
        )} {
            max-width: 90vw;
            max-height: 85vh;
        }
    }

    &__download {
        margin-left: (map-get($spaces, "one"));
    }
}
</style>
