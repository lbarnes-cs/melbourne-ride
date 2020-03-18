<template lang="html">
    <div id="history" class="history">
        <v-img
            :src="require('@/assets/images/heroImages/city-cycling-min.jpg')"
            class="history__image hidden-md-and-up"
        />
        <v-container class="history__container">
            <h2 class="display-2">{{ history.title }}</h2>
            <div class="history__content" v-html="history.content" />
        </v-container>
    </div>
</template>

<script>
export default {
    name: "History",

    props: {
        history: {
            type: Object,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.history {
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
        padding: map-get($spaces, "one") map-get($spaces, "onehalf");

        @media #{map-get(
            $display-breakpoints,
            "md-and-up"
        )} {
            background: rgba(map-get($grey, "darken-4"), 0.8);
            border-radius: map-get($spaces, "half");
        }
    }

    &__content p:last-of-type {
        margin: 0;
    }
}
</style>
