<template lang="html">
    <div id="supporters" class="section supporters">
        <v-container>
            <h2 class="display-2">Supporters</h2>

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
                        color="white"
                        :href="support.url_link"
                        target="_blank"
                        hover
                        :ripple="false"
                        class="supporter__card fill-height"
                    >
                        <div class="supporter__content">
                            <div class="supporter__imageContainer">
                                <v-img
                                    class="supporter__image white--text align-end"
                                    height="200px"
                                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                                    elevation="8"
                                />
                            </div>

                            <v-card-title
                                class="supporter__title"
                                v-html="support.title"
                            />
                            <v-card-text v-html="support.content" />
                        </div>

                        <v-card-actions class="supporter__action">
                            <v-divider class="supporter__divider" />
                            <v-btn text block>
                                <v-icon class="mr-3">mdi-open-in-new</v-icon>
                                Visit&nbsp;<span v-html="support.title" />
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    name: "Supporters",

    props: {
        supporters: {
            type: Array,
            required: true,
            validator: (value) => typeof value === "object" || !value,
        },
    },
};
</script>

<style lang="scss">
.supporters {
    background: map-get($red, "darken-1");
}

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
}
</style>
