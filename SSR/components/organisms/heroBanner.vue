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
    position: relative;
    width: 100%;
    min-height: 560px;
    overflow: hidden;
    background: map-get($blue, "lighten-1");

    @media #{map-get($display-breakpoints, 'md-and-up')} {
        height: 100vh;
        min-height: 700px;
        padding: map-get($spaces, "quadruple") 0 0;
    }

    @media #{map-get($display-breakpoints, 'lg-and-up')} {
        min-height: 800px;
        padding: map-get($spaces, "s600") 0 0;
    }

    .content {
        position: relative;
        z-index: 3;
    }

    .clouds {
        top: map-get($spaces, "s600");
    }

    .city {
        position: fixed;
        bottom: 70px;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 400px;

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            bottom: 80px;
            height: 600px;
        }
    }

    .skyline {
        position: absolute;
        bottom: 40px;
        z-index: 1;
        width: 100%;
        height: 100%;
        background-image: url("~assets/images/design/city-skyline-mobile.png");
        background-position: bottom (-(map-get($spaces, "one"))) center;
        background-repeat: no-repeat;
        background-size: cover;
        border-bottom: 6px solid #363639;

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            background-image: url("~assets/images/design/city-skyline.png");
            background-size: contain;
            bottom: 80px;
        }
    }

    .lamps {
        position: absolute;
        bottom: -3px;
        z-index: 5;
        width: 100%;
        height: 100px;
        background: url("~assets/svg/lamp.svg") repeat-x;
        background-position: bottom center;
        background-repeat: round;
        background-size: 151px 100%;
    }

    .tram {
        position: absolute;
        bottom: -2px;
        z-index: 5;
        width: 365px;
        height: 85px;
        background: url("~assets/svg/tram.svg") 0 0 no-repeat;

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            animation: tram 14s ease-in-out infinite;
            /* bottom: 8px; */
        }

        @medi /* a #{map-get($display-breakpoints, 'lg-and-up')} {
            bottom: -2px;
        } */;
    }

    .river {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 0;
        width: 100%;
        height: 40px;
        background-color: #21b5a3;
        background-image: url("~assets/svg/river.svg");
        background-repeat: repeat-x;
        background-size: contain;
        border-top: 8px solid #48495a;

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            animation: river 100s linear infinite;
            animation-delay: 1s;
            height: 80px;
        }
    }

    .gravel {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
        width: 100%;
        height: 70px;
        background: #ce9e24 url("~assets/svg/gravel-road.svg") repeat-x;
        background-size: 175%;

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            height: 80px;
            background-size: 50%;
        }
        @media #{map-get($display-breakpoints, 'xl-only')} {
            height: 80px;
            background-size: 30%;
        }
    }

    .shrubs {
        position: absolute;
        top: -25px;
        left: 0;
        z-index: 3;
        width: 100%;
        height: 30px;
        background: url("~assets/svg/shrubs.svg") repeat-x;
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
