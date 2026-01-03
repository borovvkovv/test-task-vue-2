<template>
  <div class="container">
    <label :for="propertyName">
      {{ label }}
    </label>
    <div>
      <input
        v-model="value"
        :id="propertyName"
        type="checkbox"
      />
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { validationMixin } from 'vuelidate';

  interface IComputed {
    value: boolean;
  }

  interface IProps {
    modelValue: boolean;
    propertyName: string;
    label: string;
  }

  export default Vue.extend<IProps, {}, IComputed, {}>({
    name: 'FormCheckboxInput',
    mixins: [validationMixin],
    model: {
      prop: 'modelValue',
      event: 'update:modelValue',
    },
    props: {
      modelValue: Boolean,
      propertyName: String,
      label: String,
    },
    computed: {
      value: {
        get() {
          return this.modelValue;
        },
        set(newDate) {
          this.$emit('update:modelValue', newDate);
        },
      },
    },
  });
</script>

<style scoped>
  .container {
    display: flex;
    column-gap: 10px;
  }
</style>
