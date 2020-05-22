<template lang="html">
    <div class="contactDetails">
        <ul>
            <li v-for="(item, index) in socialLinks" :key="index">
                <a
                    class="contactDetails__socialIcons linkIcons"
                    :href="item.href"
                    target="_blank"
                >
                    <v-icon class="contactDetails__icon" large>{{
                        item.icon
                    }}</v-icon>
                    <span>{{ item.title }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "ContactDetails",

    props: {
        socialLinks: {
            type: Array,
            validator: (value) => typeof value === "object" || !value,
        },
    },
};
</script>

<style lang="scss" scoped>
.contactDetails {
    ul {
        padding: 0;
    }

    li {
        display: block;
        margin: 0 0 map-get($spaces, "one");
    }

    &__icon {
        margin-right: map-get($spaces, "half");
    }
}
</style>
