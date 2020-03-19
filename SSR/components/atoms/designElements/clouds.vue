<template>
    <div :class="['clouds', { 'clouds--small': small }]"></div>
</template>

<script>
export default {
    name: "HeroBanner",

    props: {
        small: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="scss" scoped>
.clouds {
    top: 10px;
    left: 0;
    position: absolute;
    height: 280px;
    width: 100%;
    z-index: 0;
    background: url("~assets/svg/clouds.svg") 0 0 repeat-x;
    animation: clouds 50s linear infinite;
    z-index: 1;

    &--small {
        top: 0;
        height: 200px;
        animation-duration: 80s;
    }
}

@keyframes clouds {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 1612px 0;
    }
}
</style>
