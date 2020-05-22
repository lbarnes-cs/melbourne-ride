<template lang="html">
    <v-text-field
        :id="id"
        :append-icon="appendIcon"
        :type="type"
        :name="name"
        :autocomplete="autocomplete"
        :rules="rules"
        :placeholder="placeholder"
        :counter="counter"
        :value="value"
        :readonly="readonly"
        :label="label"
        :success="success"
        :error="error"
        :mask="mask"
        :disabled="disabled"
        :color="color"
        :class="customClass"
        :autofocus="autofocus"
        :outline="outline"
        :single-line="singleLine"
        :validate-on-blur="validateOnBlur"
        @input="handleInput"
    >
        <template v-slot:append>
            <slot name="iconAppend"></slot>
        </template>
    </v-text-field>
</template>

<script>
export default {
    name: "InputText",

    props: {
        type: {
            type: String,
            default: "text",
            required: false,
        },
        appendIcon: {
            type: String,
            default: "",
            required: false,
        },
        rules: {
            type: Array,
            default() {
                return [];
            },
            required: false,
        },
        /**
         * @deprecated with @input
         */
        onChange: {
            type: Function,
            required: false,
            default: () => {
                return true;
            },
        },
        id: {
            type: String,
        },
        placeholder: {
            type: String,
            default: undefined,
            required: false,
        },
        counter: {
            type: Number,
            required: false,
        },
        name: {
            type: String,
        },
        autocomplete: {
            type: String,
        },
        value: {
            type: [String, Number],
            default: "",
            required: false,
        },
        readonly: {
            type: Boolean,
            default: false,
            required: false,
        },
        label: {
            type: String,
            default: undefined,
            required: false,
        },
        success: {
            type: Boolean,
            default: false,
            required: false,
        },
        error: {
            type: Boolean,
            default: false,
            required: false,
        },
        mask: {
            type: String,
            reqired: false,
        },
        disabled: {
            type: Boolean,
            default: false,
            required: false,
        },
        color: {
            type: String,
            default: "slate400",
            required: false,
        },
        customClass: {
            type: String,
            required: false,
        },
        autofocus: {
            type: Boolean,
            default: false,
            required: false,
        },
        outline: {
            type: Boolean,
            default: true,
            required: false,
        },
        validateOnBlur: {
            type: Boolean,
            default: true,
        },
        singleLine: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        handleInput(e) {
            this.$emit("input", e);

            if (this.onChange) {
                this.onChange(e);
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
