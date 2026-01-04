<template>
  <div class="container">
    <label :for="inputId">
      {{ label }}
    </label>
    <div>
      <input
        v-model="value"
        :id="inputId"
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
    label: string;
  }

  interface IData {
    inputId: string;
  }

  export default Vue.extend<IData, {}, IComputed, IProps>({
    name: 'FormCheckboxInput',
    mixins: [validationMixin],
    model: {
      prop: 'modelValue',
      event: 'update:modelValue',
    },
    props: {
      modelValue: Boolean,
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
    data: () => ({
      inputId: Math.random().toString(36).substring(2),
    }),
  });
</script>

<style scoped>
  .container {
    display: flex;
    column-gap: 10px;
  }
</style>
