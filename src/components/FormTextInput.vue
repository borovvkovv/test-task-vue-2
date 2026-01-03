<template>
  <div class="container">
    <label
      :for="propertyName"
      :class="[
        {
          error: isDirty && !isFilled,
        },
      ]"
    >
      {{ label }}
    </label>
    <div>
      <input
        :id="propertyName"
        v-model="value"
        type="text"
        :class="[
          {
            input: true,
            inputError: isDirty && !isFilled,
          },
        ]"
      />
      <p v-if="isDirty && !isFilled">Обязательное значение</p>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { validationMixin, type Validation } from 'vuelidate';

  interface IProps {
    modelValue: string;
    propertyName: string;
    label: string;
    isFilled: boolean;
    isDirty: boolean;
  }

  interface IComputed {
    value: string;
  }

  export default Vue.extend<IProps, {}, IComputed, {}>({
    name: 'FormTextInput',
    mixins: [validationMixin],
    props: {
      modelValue: String,
      propertyName: String,
      label: String,
      isFilled: Boolean,
      isDirty: Boolean,
    },
    model: {
      prop: 'modelValue',
      event: 'update:modelValue',
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
    justify-content: space-between;
    column-gap: 10px;
  }

  .error {
    color: red;
  }

  .inputError {
    border: 1px solid red;
  }

  .inputError:focus {
    outline: none;
  }

  .input {
    width: 200px;
    box-sizing: border-box;
  }
</style>
