<template>
    <div class="heroBanner">
        <Intro />

        <div class="graphics">
            <Clouds />

            <div class="gravel">
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
    </div>
</template>

<script>
import Clouds from "@/components/atoms/designElements/clouds.vue";
import Intro from "@/components/molecules/heroBanner/intro.vue";

export default {
    name: "HeroBanner",

    components: {
        Clouds,
        Intro,
    },
};
</script>

<style lang="scss" scoped>
.heroBanner {
    width: 100%;
    overflow: hidden;
    height: calc(100vh - 56px);
    background: map-get($blue, "lighten-3");
    position: relative;

    @media #{map-get($display-breakpoints, 'md-and-up')} {
        height: calc(100vh - 64px);
    }

    .content {
        position: relative;
        z-index: 3;
    }

    .city {
        width: 100%;
        position: fixed;
        bottom: 70px;
        z-index: 0;
        left: 0;
        height: 400px;

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            bottom: 100px;
            height: 600px;
        }
    }

    .skyline {
        background-image: url("~assets/images/design/city-skyline-mobile.png");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center bottom;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        bottom: 40px;

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            background-image: url("~assets/images/design/city-skyline.png");
            background-size: contain;

            bottom: 70px;
        }
    }

    .lamps {
        background: url("~assets/svg/lamp.svg") repeat-x;
        background-repeat: round;
        background-position: bottom center;
        height: 100px;
        width: 100%;
        position: absolute;
        bottom: 5px;
        z-index: 5;
    }

    .tram {
        animation: tram 14s ease-in-out infinite;
        position: absolute;
        background: url("~assets/svg/tram.svg") 0 0 no-repeat;
        bottom: -2px;
        z-index: 5;
        height: 85px;
        width: 100%;

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            bottom: 10px;
        }
    }

    .river {
        width: 100%;
        position: absolute;
        bottom: 0;
        z-index: 0;
        left: 0;
        height: 40px;
        background-size: cover;
        background-image: url("~assets/svg/river.svg");
        background-repeat: repeat-x;
        animation: river 100s linear infinite;
        animation-delay: 1s;

        @media #{map-get($display-breakpoints, 'md-and-up')} {
            height: 70px;
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
            height: 100px;
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
            top: -20px;
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
        transform: translateX(100%);
    }

    50%,
    70% {
        transform: translateX(30%);
    }

    100% {
        transform: translateX(-100%);
    }
}
</style>
