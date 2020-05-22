<template>
    <v-card
        :href="externalLink"
        :to="link"
        :nuxt="!!link"
        :target="externalLink ? '_blank' : ''"
        :hover="hover"
        :color="color"
        :class="['actionCard', { 'actionCard--hero': hero }]"
        :dark="dark"
    >
        <v-icon large class="actionCard__icon"> mdi-{{ icon }} </v-icon>
        <div>
            <v-card-subtitle class="actionCard__title">
                {{ title }}
            </v-card-subtitle>
            <v-card-title class="actionCard__content">
                {{ content }}
            </v-card-title>
        </div>
    </v-card>
</template>

<script>
export default {
    name: "ActionCard",

    props: {
        link: {
            type: String,
            required: false,
        },
        externalLink: {
            type: String,
            required: false,
        },
        color: {
            type: String,
            default: "light-blue darken-1",
        },
        hover: {
            type: Boolean,
            default: false,
        },
        hero: {
            type: Boolean,
            default: false,
        },
        dark: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: String,
            required: false,
            default: "",
        },
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="scss" scoped>
.actionCard {
    display: flex;
    padding: map-get($spaces, "half");
    margin: 0 0 map-get($spaces, "one");

    @media #{map-get($display-breakpoints, 'sm-and-up')} {
        margin: 0 0 map-get($spaces, "onehalf");
        padding: map-get($spaces, "one");
    }

    &__icon {
        margin-right: map-get($spaces, "half");
        transition: ease-in-out 200ms all;

        @media #{map-get($display-breakpoints, 'sm-and-up')} {
            margin-right: map-get($spaces, "one");
        }
    }

    &__title {
        padding: 0 0 map-get($spaces, "quarter");
        text-transform: uppercase;
        line-height: 1;
    }

    &__content {
        padding: 0;
        word-break: break-word;
        line-height: 1;
    }

    &--hero {
        &:hover .actionCard__icon {
            transform: scale(1.2);
        }
    }
}
</style>
