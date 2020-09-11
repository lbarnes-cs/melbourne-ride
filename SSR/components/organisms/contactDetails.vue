<template lang="html">
    <v-card class="contactDetails" outlined>
        <h3>{{ navigationHeader }}</h3>
        <ul>
            <li v-for="(item, index) in socialLinks" :key="index">
                <a
                    class="contactDetails__socialIcons"
                    :href="item.link"
                    target="_blank"
                >
                    <v-icon class="contactDetails__icon" large>
                        mdi-{{ item.icon }}
                    </v-icon>
                    <span>{{ item.name }}</span>
                </a>
            </li>
        </ul>
    </v-card>
</template>

<script>
export default {
    name: "ContactDetails",

    props: {
        socialLinks: {
            type: Array,
            validator: (value) => typeof value === "object" || !value,
        },
        navigationHeader: {
            type: String,
            default: "You can also support us on:",
        },
    },
};
</script>

<style lang="scss" scoped>
.contactDetails {
    h3 {
        padding: map-get($spaces, "one");
        color: map-get($shades, "white");
        background: map-get($light-blue, "darken-1");
    }
    ul {
        padding: map-get($spaces, "one");
    }

    li {
        display: block;
        margin: map-get($spaces, "one") 0 0;

        &:first-child {
            margin: 0;
        }
    }

    &__socialIcons {
        text-decoration: none;
        display: block;
        color: inherit;
        transition: ease-in-out 200ms color;

        span {
            text-decoration: none;
        }

        &:hover,
        &:hover .contactDetails__icon.v-icon {
            color: map-get($light-blue, "darken-1");
        }
    }

    &__icon {
        margin-right: map-get($spaces, "half");
    }
}
</style>
