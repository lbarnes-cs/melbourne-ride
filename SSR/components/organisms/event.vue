<template lang="html">
    <div id="event" class="section event grey--text text--darken-4">
        <v-container>
            <h3 class="display-3 text-center">2020</h3>
            <h2 class="display-2 text-center">{{ event.title }}</h2>

            <v-row>
                <v-col cols="12" md="4">
                    <v-card
                        v-if="event.location"
                        :href="event.location_url_link"
                        target="_blank"
                        hover
                        color="light-blue darken-1"
                        class="eventCard"
                    >
                        <v-icon
                            color="grey lighten-4"
                            large
                            class="eventCard__icon"
                        >
                            mdi-map-marker
                        </v-icon>
                        <div>
                            <v-card-subtitle class="eventCard__title">
                                Meeting Area
                            </v-card-subtitle>
                            <v-card-title class="eventCard__content">
                                {{ event.location }}
                            </v-card-title>
                        </div>
                    </v-card>

                    <v-card
                        v-if="event.date_and_time"
                        color="blue-grey lighten-5"
                        class="eventCard"
                        light
                    >
                        <v-icon
                            color="grey darken-1"
                            large
                            class="eventCard__icon"
                        >
                            mdi-calendar
                        </v-icon>
                        <div>
                            <v-card-subtitle class="eventCard__title">
                                Date
                            </v-card-subtitle>
                            <v-card-title class="eventCard__content">
                                {{
                                    formateDate(
                                        event.date_and_time,
                                        "cccc, do MMMM yyyy",
                                    )
                                }}
                            </v-card-title>
                        </div>
                    </v-card>

                    <v-card
                        v-if="event.date_and_time"
                        color="blue-grey lighten-5"
                        class="eventCard"
                        light
                    >
                        <v-icon
                            color="grey darken-1"
                            large
                            class="eventCard__icon"
                        >
                            mdi-clock
                        </v-icon>
                        <div>
                            <v-card-subtitle class="eventCard__title">
                                Start time
                            </v-card-subtitle>
                            <v-card-title class="eventCard__content">
                                {{
                                    formateDate(event.date_and_time, "H:mm aaa")
                                }}
                            </v-card-title>
                        </div>
                    </v-card>
                </v-col>
                <v-col cols="12" md="8">
                    <div
                        class="event__summary"
                        v-html="getMainContent(event.content)"
                    />

                    <EventSection
                        v-for="(section, index) in event.content_builder"
                        :key="index"
                        v-bind="section"
                    />
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { parseISO } from "date-fns";
import { format } from "date-fns-tz";
import { enAU } from "date-fns/locale";
import EventSection from "@/components/molecules/event/section.vue";

export default {
    name: "Event",

    components: {
        EventSection,
    },

    props: {
        event: {
            type: Object,
            required: true,
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

.eventCard {
    display: flex;
    align-items: flex-start;
    padding: map-get($spaces, "one");
    margin: 0 0 map-get($spaces, "onehalf");

    &__icon {
        margin-right: map-get($spaces, "one");
    }

    &__title {
        padding: 0;
        text-transform: uppercase;
    }

    &__content {
        padding: 0;
        word-break: break-word;
        line-height: 1.4;
    }
}
</style>
