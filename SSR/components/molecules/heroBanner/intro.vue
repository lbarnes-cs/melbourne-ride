<template>
    <v-container class="content">
        <SVGIcon icon-name="melbourne-ride-logo" class="logo" />

        <div class="actions hidden-xs-only">
            <ActionCard
                link="/event"
                hover
                color="red darken-4"
                icon="bike"
                title="Find out more"
                content="2020 Ride Info"
                hero
            />

            <ActionCard
                external-link="https://facebook.com"
                hover
                new-window
                color="light-blue darken-4"
                icon="facebook"
                title="RSVP On"
                content="Facebook"
                hero
            />
        </div>
    </v-container>
</template>

<script>
import SVGIcon from "@/components/atoms/icons/SVGIcon.vue";
import ActionCard from "@/components/molecules/card/actionCard.vue";

export default {
    name: "IntroBanner",

    components: {
        SVGIcon,
        ActionCard,
    },
};
</script>

<style lang="scss" scoped>
.content {
    .logo {
        height: 250px;
        display: flex;
        justify-content: center;
        width: 100%;
        margin: map-get($spaces, "double") 0;
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
