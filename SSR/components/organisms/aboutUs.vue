<template lang="html">
    <div class="about">
        <h2 class="display-2">{{ aboutPage.title }}</h2>

        <div class="content" v-html="excerptContent(aboutPage.content)" />

        <div class="about__readMore">
            <v-btn
                v-if="home"
                to="/about"
                nuxt
                x-large
                color="primary"
                class="readMoreCTA"
            >
                {{ aboutPage.acf.call_to_action }}
            </v-btn>
        </div>
    </div>
</template>

<script>
export default {
    name: "AboutUs",

    props: {
        home: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        aboutPage() {
            return this.$store.state.aboutPage;
        },
    },

    methods: {
        excerptContent(content) {
            const readMore = "<p><!--more--></p>";

            if (this.home && content.includes(readMore)) {
                return content.split(readMore)[0];
            }

            return content;
        },
    },
};
</script>

<style lang="scss" scoped>
.about {
    &__headline {
        margin: map-get($spaces, "double") 0 map-get($spaces, "one");
    }

    &__readMore {
        display: flex;
        justify-content: center;
    }
}
</style>
