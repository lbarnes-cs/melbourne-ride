<template lang="html">
    <div id="history" class="history white--text">
        <v-img
            :src="require('@/assets/images/heroImages/city-cycling-min.jpg')"
            class="history__image hidden-md-and-up"
        />
        <v-container class="history__container">
            <h2 class="display-2">{{ title }}</h2>
            <div class="history__content content" v-html="content" />
        </v-container>
    </div>
</template>

<script>
export default {
    name: "History",

    props: {
        title: {
            type: String,
            default: "Header",
        },
        content: {
            type: String,
            default: "Content",
        },
    },
};
</script>

<style lang="scss" scoped>
.history {
    background: map-get($grey, "darken-4");

    @media #{map-get(
        $display-breakpoints,
        "md-and-up"
    )} {
        width: 100%;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        background-attachment: fixed;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        background-image: url("~assets/images/heroImages/city-cycling-min.jpg");
    }

    &__container {
        margin: map-get($spaces, "triple") auto;

        @media #{map-get(
            $display-breakpoints,
            "md-and-up"
        )} {
            padding: map-get($spaces, "double");
            background: rgba(map-get($grey, "darken-4"), 0.8);
            border-radius: map-get($spaces, "half");
            margin: auto;
        }
    }
}
</style>
