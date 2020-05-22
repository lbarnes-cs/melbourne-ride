<template lang="html">
    <v-card class="sidebar" max-width="400" tile light outlined>
        <v-list dense>
            <v-subheader>
                <div class="sidebar__subheader">
                    <nuxt-link :to="{ name: 'faqs' }" class="link subtitle-1">
                        FAQs ({{ menuItems.length }})
                    </nuxt-link>
                </div>
            </v-subheader>
            <v-list-item
                v-for="(faq, index) in menuItems"
                :key="index"
                nuxt
                :to="{
                    name: 'faqs-slug',
                    params: { slug: faq.slug },
                }"
            >
                <v-list-item-content>
                    <v-list-item-title class="sidebar__title">
                        {{ faq.title | apostrophe }}
                    </v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-card>
</template>

<script>
export default {
    name: "FaqSidebar",

    props: {
        menuItems: {
            type: Array,
            required: true,
            validator: (value) => typeof value === "object" || !value,
        },
    },
};
</script>

<style lang="scss" scoped>
.sidebar {
    position: sticky;
    top: 56px;

    &__subheader {
        display: flex;
        justify-content: center;
        width: 100%;
        height: 100%;
        align-items: center;
        text-decoration: none;
    }

    &__title.v-list-item__title {
        white-space: normal;
    }
}
</style>
