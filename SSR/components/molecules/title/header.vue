<template lang="html">
    <div class="header">
        <h2 class="display-2">{{ title | apostrophe }}</h2>

        <p class="header__subline title">
            {{ displaySubline | striphtml }}
            <NuxtLink v-if="displaySublineLink" :to="link" class="link">
                {{ displaySublineLink }}
            </NuxtLink>
        </p>
    </div>
</template>

<script>
export default {
    name: "Header",

    props: {
        title: {
            type: String,
            default: "Header",
        },
        subline: {
            type: String,
            default: "Subline with [{{count}} link]",
        },
        link: {
            type: String,
            required: false,
        },
        count: {
            type: Number,
            required: false,
        },
    },

    computed: {
        displaySubline() {
            const subline = this.subline.replace("{{count}}", this.count);

            if (this.link && subline.match(/\[(.*?)\]/)) {
                return subline.split("[")[0];
            }

            return subline;
        },

        displaySublineLink() {
            if (this.link && this.subline.match(/\[(.*)\]/)) {
                const subline = this.subline.replace("{{count}}", this.count);
                return subline.match(/\[(.*)\]/)[1];
            }

            return false;
        },
    },
};
</script>

<style lang="scss" scoped>
.header {
    &__subline {
        text-align: center;
        margin-bottom: map-get($spaces, "triple");
    }
}
</style>
