<template>
  <div class="container">
    <label
      :for="inputId"
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
        :id="inputId"
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
    label: string;
    isFilled: boolean;
    isDirty: boolean;
  }

  interface IComputed {
    value: string;
  }

  interface IData {
    inputId: string;
  }

  export default Vue.extend<IData, {}, IComputed, IProps>({
    name: 'FormTextInput',
    mixins: [validationMixin],
    props: {
      modelValue: String,
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
    data: () => ({
      inputId: Math.random().toString(36).substring(2),
    }),
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
