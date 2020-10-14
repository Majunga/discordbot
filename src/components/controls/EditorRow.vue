<template>
<b-container>
    <b-row class="my-1">
      <b-col sm="3" v-if="label">
        <label>{{ label }}</label>
      </b-col>
      <b-col sm="9">
        <Input v-bind="$attrs"
               :value="value"
               @input="$emit('input', $event)"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Input from './Input'
export default {
  inheritAttrs: false,
  name: 'EditorRow',
  components: {
    Input
  },
  props: {
    label: String,
    value: String
  }
}
</script>
