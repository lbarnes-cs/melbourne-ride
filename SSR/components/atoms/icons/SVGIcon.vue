<template>
    <!-- <svg-icon :name="iconName" /> -->
    <div>{{ iconName }}</div>
</template>

<script>
export default {
    name: "SVGIcon",

    props: {
        iconName: {
            type: String,
            required: true,
        },
    },
};
</script>
