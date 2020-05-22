<template lang="html">
    <div class="supporters">
        <Header :title="title" :subline="content" to="/contact" />

        <v-row>
            <v-col
                v-for="(support, index) in supporters"
                :key="index"
                cols="12"
                sm="12"
                md="6"
                class="supporter"
            >
                <v-card
                    light
                    :ripple="false"
                    class="supporter__card fill-height"
                    color="white"
                >
                    <div class="supporter__content">
                        <div class="supporter__imageContainer">
                            <v-img
                                :src="
                                    support.featureImage ||
                                        'https://cdn.vuetifyjs.com/images/cards/docks.jpg'
                                "
                                class="supporter__image align-end"
                                height="200px"
                                contain
                                elevation="8"
                                :style="{ backgroundColor: support.acf.colour }"
                            />
                        </div>

                        <v-card-title class="supporter__title">
                            {{ support.title | apostrophe }}
                        </v-card-title>
                        <v-card-text v-html="support.content" />
                    </div>

                    <v-card-actions class="supporter__action">
                        <v-divider class="supporter__divider" />
                        <v-btn
                            :href="support.acf.url_link"
                            class="supporter__ctaBtn btn--wide"
                            target="_blank"
                            text
                            block
                            color="primary"
                        >
                            <v-icon class="mr-3">mdi-open-in-new</v-icon>
                            <span class="supporter__linkText">
                                Visit {{ support.title | apostrophe }}
                            </span>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Header from "@/components/molecules/title/header.vue";

export default {
    name: "Supporters",

    components: {
        Header,
    },

    props: {
        title: {
            type: String,
            default: "Header",
        },
        content: {
            type: String,
            default: "Subline with [link]",
        },
    },

    computed: {
        supporters() {
            return this.$store.state.supporters;
        },

        displaySubline() {
            const subline = this.content.replace("{{count}}", this.faqs.length);

            if (subline.match(/\[(.*?)\]/)) {
                return subline.split("[")[0];
            }

            return subline;
        },

        displaySublineLink() {
            if (this.content.match(/\[(.*)\]/)) {
                const subline = this.content.replace(
                    "{{count}}",
                    this.faqs.length,
                );
                return subline.match(/\[(.*)\]/)[1];
            }

            return false;
        },
    },
};
</script>

<style lang="scss" scoped>
.supporter {
    margin: map-get($spaces, "double") 0 0;

    &__card {
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        p:last-of-type {
            margin: 0;
        }

        &:hover .supporter__imageContainer {
            top: -(36px);
        }
    }

    &__title {
        margin-top: -(map-get($spaces, "double"));
    }

    &__imageContainer {
        background: white;
        margin: 0 map-get($spaces, "one");
        border-radius: map-get($spaces, "half");
        top: -(map-get($spaces, "double"));
        position: relative;
        overflow: hidden;
        transition: ease-in-out 200ms all;
        box-shadow: $card-shadow;
    }

    &__action {
        flex-direction: column;
        margin: 0 map-get($spaces, "half") map-get($spaces, "half");
    }

    &__divider {
        width: 100%;
        margin: 0 0 map-get($spaces, "half");
    }

    &__ctaBtn {
    }

    &__linkText {
        white-space: normal;
    }
}
</style>
