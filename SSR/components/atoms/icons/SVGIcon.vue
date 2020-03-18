<template>
    <svg-icon :name="iconName" />
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
