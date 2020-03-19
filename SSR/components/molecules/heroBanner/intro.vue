<template>
    <v-container class="content">
        <h1>Melbourne <span>Ride</span></h1>

        <div class="actions hidden-xs-only">
            <ActionCard
                link="#event"
                hover
                color="light-blue lighten-1"
                icon="bike"
                title="Find out more"
                content="2020 Ride Info"
                hero
            />

            <ActionCard
                link="https://facebook.com"
                hover
                new-window
                color="red lighten-1"
                icon="facebook"
                title="RSVP On"
                content="Facebook"
                hero
            />
        </div>
    </v-container>
</template>

<script>
import ActionCard from "@/components/molecules/card/actionCard.vue";

export default {
    name: "IntroBanner",

    components: {
        ActionCard,
    },
};
</script>

<style lang="scss" scoped>
.content {
    h1 {
        text-align: center;
        margin: map-get($spaces, "triple") 0 map-get($spaces, "double");
        color: map-get($blue, "darken-1");
        font-family: "Roboto", sans-serif;
        letter-spacing: -0.015em;
        font-weight: 700;
        font-size: 3.5rem;
        line-height: 1.2;

        span {
            color: map-get($red, "darken-1");
        }

        @media #{map-get($display-breakpoints, 'sm-and-up')} {
            font-size: 5rem;
        }
    }
}

.actions {
    display: flex;
    justify-content: center;

    .actionCard {
        margin: 0 map-get($spaces, "one");
        width: 250px;
    }
}
</style>
