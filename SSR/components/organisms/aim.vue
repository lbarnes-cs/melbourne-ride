<template lang="html">
    <div id="aim" class="aims">
        <h2 class="display-2">Our Aim</h2>
        <p class="title">
            Through our highly visible presence on the streets of Melbourne,
            <br />we aim to promote and educate the communicate on three key
            important issues:-
        </p>

        <v-row>
            <v-col
                v-for="(item, index) in aims"
                :key="index"
                cols="12"
                sm="12"
                md="4"
                class="ourAims"
            >
                <v-card light color="white" class="fill-height text-center">
                    <div :class="['ourAims__imageContainer', item.color]">
                        <SVGIcon :icon-name="item.icon" class="ourAims__icon" />
                    </div>
                    <v-card-title class="ourAims__title">
                        {{ item.title }}
                    </v-card-title>
                    <v-card-text>
                        {{ item.text }}
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <div v-if="home" class="aims__readMore">
            <v-btn
                to="/about/"
                x-large
                color="red darken-1"
                class="readMoreCTA"
            >
                Find out more
            </v-btn>
        </div>
    </div>
</template>

<script>
import SVGIcon from "@/components/atoms/icons/SVGIcon.vue";

export default {
    name: "OurAim",

    components: {
        SVGIcon,
    },

    props: {
        aims: {
            type: Array,
            required: true,
            validator: (value) => typeof value === "object" || !value,
        },
        home: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
.aims {
    &__readMore {
        display: flex;
        justify-content: center;
    }
}

.ourAims {
    padding-bottom: map-get($spaces, "triple");

    &:last-of-type {
        padding-bottom: 0;
    }

    @media #{map-get(
            $display-breakpoints,
            "md-and-up"
        )} {
        padding-bottom: 0;
    }

    &:hover .ourAims__imageContainer {
        transform: scale(1.1) rotate(-5deg);
    }

    &__imageContainer {
        background: white;
        margin: 0 auto;
        padding: (map-get($spaces, "onehalf"));
        border-radius: 50% !important;
        width: 170px;
        height: 170px;
        top: -(map-get($spaces, "double"));
        position: relative;
        box-sizing: border-box;
        text-align: center;
        display: flex;
        align-items: center;
        transition: ease-in-out 200ms transform;
        box-shadow: $card-shadow;
    }

    &__icon {
        display: block;
        text-align: center;
    }

    &__title {
        margin-top: -(map-get($spaces, "double"));
        justify-content: center;
    }
}
</style>
