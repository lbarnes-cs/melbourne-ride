<template>
    <div class="videoDialog">
        <div class="videoDialog__close">
            <v-btn fab light x-small @click.stop="emitClose">
                <v-icon>
                    mdi-close-thick
                </v-icon>
            </v-btn>
        </div>
        <div class="videoDialog__content">
            <iframe
                id="ytplayer"
                type="text/html"
                width="640"
                height="360"
                :src="youtubeUrl"
                frameborder="0"
            />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        videoId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            youtubeUrl: `http://www.youtube.com/embed/${this.videoId}?autoplay=0`,
        };
    },

    methods: {
        emitClose() {
            this.$emit("closeDialog");
        },
    },
};
</script>

<style lang="scss" scoped>
.videoDialog {
    @media #{map-get(
        $display-breakpoints,
        "sm-and-up"
    )} {
        position: relative;
    }

    &__content {
        overflow: hidden;
    }

    &__close {
        position: absolute;
        right: (map-get($spaces, "one"));
        top: (map-get($spaces, "one"));
        width: auto;
        z-index: 2;

        @media #{map-get(
                $display-breakpoints,
                "sm-and-up"
            )} {
            right: -(map-get($spaces, "one"));
            top: -(map-get($spaces, "one"));
        }
    }
}
</style>
