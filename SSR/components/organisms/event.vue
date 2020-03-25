<template lang="html">
    <div id="event" class="event">
        <h3 class="display-3 text-center">2020</h3>
        <h2 class="display-2 text-center">{{ event.title }}</h2>

        <v-row>
            <v-col cols="12" md="4">
                <ActionCard
                    v-if="event.location"
                    :link="event.location_url_link"
                    hover
                    color="light-blue darken-1"
                    icon="map-marker"
                    title="Meeting Area"
                    :content="event.location"
                />

                <ActionCard
                    v-if="event.date_and_time"
                    color="blue-grey lighten-5"
                    icon="calendar"
                    title="Date"
                    :content="
                        formateDate(event.date_and_time, 'cccc, do MMMM yyyy')
                    "
                    light
                />

                <ActionCard
                    v-if="event.date_and_time"
                    color="blue-grey lighten-5"
                    icon="clock"
                    title="Start time"
                    :content="formateDate(event.date_and_time, 'H:mm aaa')"
                    light
                />
            </v-col>
            <v-col cols="12" md="8">
                <div
                    class="event__summary"
                    v-html="getMainContent(event.content)"
                />

                <v-btn
                    v-if="home"
                    to="/event"
                    nuxt
                    x-large
                    color="primary"
                    class="readMoreCTA"
                >
                    Find out more
                </v-btn>

                <div v-if="!home" class="event__furtherInfo">
                    <EventSection
                        v-for="(section, index) in event.content_builder"
                        :key="index"
                        v-bind="section"
                    />
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
        event: {
            type: Object,
            required: true,
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

<style lang="scss">
.event {
    background: map-get($grey, "lighten-5");

    &__summary p:first-child {
        font-size: 1.6em;
        line-height: 1.4;
        font-weight: 500;
    }

    &__summary p:nth-child(2) {
        font-size: 1.3em;
        line-height: 1.4;
    }
}
</style>
