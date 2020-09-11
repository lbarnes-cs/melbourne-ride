<template>
    <v-container class="introContent">
        <SVGIcon icon-name="melbourne-ride-logo" class="logo" />

        <div class="actions">
            <ActionCard
                link="/event"
                hover
                color="red darken-4"
                icon="bike"
                title="Next ride"
                :content="formateDate(upcomingRideDate, 'do MMMM yyyy')"
                hero
                dark
            />

            <ActionCard
                :external-link="themeSettings.hero_banner.facebook_link"
                hover
                color="light-blue darken-4"
                icon="facebook"
                :title="themeSettings.hero_banner.facebook_title"
                content="Facebook"
                hero
                dark
            />
        </div>
    </v-container>
</template>

<script>
import { parseISO } from "date-fns";
import { format } from "date-fns-tz";
import { enAU } from "date-fns/locale";
import { mapGetters } from "vuex";
import SVGIcon from "@/components/atoms/icons/SVGIcon.vue";
import ActionCard from "@/components/molecules/card/actionCard.vue";

export default {
    name: "IntroBanner",

    components: {
        SVGIcon,
        ActionCard,
    },

    computed: {
        ...mapGetters({
            upcomingRideDate: "upcomingRideDate",
            themeSettings: "themeSettings",
        }),
    },

    methods: {
        formateDate(date, timeFormat) {
            return format(parseISO(date), timeFormat, {
                locale: enAU,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.introContent {
    position: absolute;
    top: map-get($spaces, "s600");
    left: 0;
    z-index: 2;

    @media #{map-get($display-breakpoints, 'md-and-up')} {
        top: map-get($spaces, "quadruple");
        position: relative;
    }

    @media #{map-get($display-breakpoints, 'lg-and-up')} {
        top: map-get($spaces, "s900");
    }

    .logo {
        height: 180px;
        display: flex;
        justify-content: center;
        width: 100%;
        margin: 0 0 map-get($spaces, "onehalf");

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            height: 250px;
            margin: map-get($spaces, "double") 0;
        }

        @media #{map-get($display-breakpoints, 'lg-and-up')} {
            height: 300px;
            margin: map-get($spaces, "triple") 0;
        }

        @media #{map-get($display-breakpoints, 'xl-only')} {
            height: 350px;
            margin: map-get($spaces, "s600") 0;
        }
    }
}

.actions {
    display: flex;
    justify-content: center;
    flex-flow: wrap;

    .actionCard {
        width: 100%;

        @media #{map-get($display-breakpoints, 'sm-and-up')} {
            width: 270px;
            margin: 0 map-get($spaces, "one");
        }
    }
}
</style>
