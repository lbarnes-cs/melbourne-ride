<template lang="html">
    <div class="event">
        <h3 class="display-3 text-center">{{ acf.event_year }}</h3>
        <h2 class="display-2 text-center">{{ title }}</h2>

        <v-row>
            <v-col cols="12" md="4">
                <ActionCard
                    v-if="acf.location"
                    :link="acf.location_url_link"
                    hover
                    color="light-blue darken-1"
                    icon="map-marker"
                    title="Meeting Area"
                    :content="acf.location"
                    dark
                />

                <ActionCard
                    v-if="acf.date_and_time"
                    color="blue-grey lighten-5"
                    icon="calendar"
                    title="Date"
                    :content="
                        formateDate(acf.date_and_time, 'cccc, do MMMM yyyy')
                    "
                />

                <ActionCard
                    v-if="acf.date_and_time"
                    color="blue-grey lighten-5"
                    icon="clock"
                    title="Start time"
                    :content="formateDate(acf.date_and_time, 'H:mm aaa')"
                />
            </v-col>
            <v-col cols="12" md="8">
                <div class="event__summary" v-html="getMainContent(content)" />

                <v-btn
                    v-if="home"
                    to="/event"
                    nuxt
                    x-large
                    color="primary"
                    class="readMoreCTA"
                >
                    {{ callToAction }}
                </v-btn>

                <div v-if="!home" class="event__furtherInfo">
                    <template v-for="(section, index) in contentBuilder">
                        <EventSection
                            v-if="section.published"
                            :key="index"
                            v-bind="section"
                        />
                    </template>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { parseISO } from "date-fns";
import { format } from "date-fns-tz";
import { enAU } from "date-fns/locale";
import EventSection from "@/components/molecules/event/section.vue";
import ActionCard from "@/components/molecules/card/actionCard.vue";

export default {
    name: "Event",

    components: {
        EventSection,
        ActionCard,
    },

    props: {
        title: {
            type: String,
            default: "title",
        },
        content: {
            type: String,
            default: "content",
            required: false,
        },
        contentBuilder: {
            type: Array,
            validator: (value) => typeof value === "object" || !value,
            required: false,
        },
        acf: {
            type: Object,
            validator: (value) => typeof value === "object" || !value,
            required: false,
        },
        callToAction: {
            type: String,
            default: "read",
        },
        home: {
            type: Boolean,
            required: false,
            default: false,
        },
    },

    methods: {
        getMainContent(content) {
            const readMore = "<p><!--furtherinfo--></p>";

            if (content.includes(readMore)) {
                return content.split(readMore)[0];
            }

            return content;
        },

        formateDate(date, timeFormat) {
            return format(parseISO(date), timeFormat, {
                locale: enAU,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.event {
    background: map-get($grey, "lighten-5");

    h3 {
        margin-bottom: map-get($spaces, "half");
        font-weight: 500;
        color: map-get($blue, "darken-1");
    }

    &__summary ::v-deep p:first-child {
        font-size: 1.6em;
        line-height: 1.4;
        font-weight: 500;
    }

    &__summary ::v-deep p:nth-child(2) {
        font-size: 1.3em;
        line-height: 1.4;
    }
}
</style>
