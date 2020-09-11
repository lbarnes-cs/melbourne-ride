<template lang="html">
    <div class="eventSection">
        <h4 class="headline red--text text--lighten-1">
            {{ title }}
        </h4>
        <div v-if="excerptContent(content)">
            <div v-html="excerptContent(content)[0]" />

            <v-slide-y-transition>
                <div v-show="showMore" v-html="excerptContent(content)[1]" />
            </v-slide-y-transition>

            <v-btn
                dark
                :class="[
                    'eventSection__moreInfo btn--wide',
                    { 'eventSection__moreInfo--active': showMore },
                ]"
                color="primary"
                @click="showMore = !showMore"
            >
                <v-icon>mdi-chevron-down</v-icon>
                {{ showMore ? hideButtonCta : callToAction || "Read More" }}
            </v-btn>
        </div>
        <div v-else v-html="content"></div>
    </div>
</template>

<script>
export default {
    name: "EventSection",

    props: {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        callToAction: {
            type: String,
            default: "Read More",
        },
        hideButtonCta: {
            type: String,
            default: "Hide Info",
        },
    },

    data: () => ({
        showMore: false,
    }),

    methods: {
        excerptContent(content) {
            const readMore = "<p><!--more--></p>";

            if (content.includes(readMore)) {
                return content.split(readMore);
            }

            return false;
        },
    },
};
</script>

<style lang="scss" scoped>
.eventSection {
    &__moreInfo {
        .v-icon {
            margin-right: map-get($spaces, "half");
            transition: ease-in-out 200ms transform;
        }

        &:hover:not(.eventSection__moreInfo--active) .v-icon {
            transform: translateY(map-get($spaces, "eighth"));
        }
    }

    &__moreInfo--active {
        .v-icon {
            transform: rotate(180deg);
        }

        &:hover .v-icon {
            transform: rotate(180deg) translateY((map-get($spaces, "eighth")));
        }
    }
}
</style>
