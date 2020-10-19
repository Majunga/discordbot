<template>
    <b-form-input
        v-bind="$attrs"
        @input="$emit('input', $event)"
    />
</template>

<script>
export default {
  name: 'Input'
}
</script>
