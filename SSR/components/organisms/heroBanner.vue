<template>
    <div class="heroBanner">
        <Intro />
        <client-only>
            <Vue100vh>
                <div class="graphics">
                    <Clouds />

                    <div class="gravel">
                        <Bike class="hidden-sm-and-down" />
                        <BikeMale />
                        <BikeFemale />
                        <div class="shrubs"></div>
                    </div>

                    <div class="city">
                        <div class="skyline">
                            <div class="tram"></div>
                            <div class="lamps"></div>
                        </div>
                        <div class="river"></div>
                    </div>
                </div>
            </Vue100vh>
        </client-only>
    </div>
</template>

<script>
import Vue100vh from "vue-div-100vh";

import Clouds from "@/components/atoms/designElements/clouds.vue";
import Intro from "@/components/molecules/heroBanner/intro.vue";
import Bike from "@/components/molecules/heroBanner/bike.vue";
import BikeMale from "@/components/molecules/heroBanner/bike-male.vue";
import BikeFemale from "@/components/molecules/heroBanner/bike-female-1.vue";

export default {
    name: "HeroBanner",

    components: {
        Vue100vh,
        Clouds,
        Intro,
        Bike,
        BikeMale,
        BikeFemale,
    },
};
</script>

<style lang="scss" scoped>
.heroBanner {
    background: map-get($blue, "lighten-1");
    overflow: hidden;
    position: relative;
    width: 100%;
    min-height: 560px;

    @media #{map-get($display-breakpoints, 'md-and-up')} {
        height: 100vh;
        padding: map-get($spaces, "quadruple") 0 0;
    }

    .content {
        position: relative;
        z-index: 3;
    }

    .clouds {
        top: map-get($spaces, "s600");
    }

    .city {
        width: 100%;
        position: fixed;
        bottom: 70px;
        z-index: 0;
        left: 0;
        height: 400px;

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            bottom: 80px;
            height: 600px;
        }
    }

    .skyline {
        background-image: url("~assets/images/design/city-skyline-mobile.png");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: bottom (-(map-get($spaces, "one"))) center;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        bottom: 40px;
        border-bottom: 6px solid #363639;

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            background-image: url("~assets/images/design/city-skyline.png");
            background-size: contain;
            bottom: 80px;
        }
    }

    .lamps {
        background: url("~assets/svg/lamp.svg") repeat-x;
        background-repeat: round;
        background-position: bottom center;
        height: 100px;
        width: 100%;
        position: absolute;
        bottom: -3px;
        z-index: 5;
        background-size: 151px 100%;
    }

    .tram {
        animation: tram 14s ease-in-out infinite;
        position: absolute;
        background: url("~assets/svg/tram.svg") 0 0 no-repeat;
        bottom: -2px;
        z-index: 5;
        height: 85px;
        width: 365px;

        /* @media #{map-get($display-breakpoints, 'md-and-up')} {
            bottom: 8px;
        }

        @media #{map-get($display-breakpoints, 'lg-and-up')} {
            bottom: -2px;
        } */
    }

    .river {
        width: 100%;
        position: absolute;
        bottom: 0;
        z-index: 0;
        left: 0;
        height: 40px;
        background-color: #21b5a3;
        background-size: contain;
        background-image: url("~assets/svg/river.svg");
        background-repeat: repeat-x;
        animation: river 100s linear infinite;
        animation-delay: 1s;
        border-top: 8px solid #48495a;

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            height: 80px;
        }
    }

    .gravel {
        background: #ce9e24 url("~assets/svg/gravel-road.svg") repeat-x;
        background-size: 175%;
        position: absolute;
        z-index: 1;
        bottom: 0;
        left: 0;
        height: 70px;
        width: 100%;

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            background-size: 50%;
            height: 80px;
        }
        @media #{map-get($display-breakpoints, 'xl-only')} {
            background-size: 30%;
            height: 80px;
        }
    }

    .shrubs {
        height: 30px;
        background: url("~assets/svg/shrubs.svg") repeat-x;
        position: absolute;
        width: 100%;
        top: -25px;
        z-index: 3;
        left: 0;

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            // top: -20px;
        }
    }
}

@keyframes river {
    0% {
        background-position: 0 0;
    }

    25% {
        background-position: 600px 0;
    }

    75% {
        background-position: 1000px 0;
    }

    100% {
        background-position: 1612px 0;
    }
}

@keyframes tram {
    0% {
        left: 100%;
    }

    50%,
    70% {
        left: 30%;
    }

    100% {
        left: -365px;
    }
}
</style>
