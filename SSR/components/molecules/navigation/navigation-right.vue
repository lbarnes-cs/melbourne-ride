<template lang="html">
    <v-toolbar-items class="navigation__rightSide">
        <v-btn
            v-for="(item, index) in headerMenu"
            :key="index"
            :ripple="{ class: 'red--text darken-2' }"
            depressed
            :to="item.to"
        >
            {{ item.title }}
        </v-btn>
    </v-toolbar-items>
</template>

<script>
export default {
    name: "NavigationRight",

    props: {
        headerMenu: {
            type: Array,
            required: true,
            validator: (value) => typeof value === "object" || !value,
        },
    },
};
</script>

<style lang="css" scoped></style>
