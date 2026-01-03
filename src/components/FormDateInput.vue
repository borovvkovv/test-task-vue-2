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
      <DatePicker
        :id="propertyName"
        v-model="value"
        valueType="date"
        format="DD.MM.YYYY"
        placeholder="ДД.ММ.ГГГГ"
        :class="[
          {
            input: true,
            inputError: isDirty && !isFilled,
          },
        ]"
      ></DatePicker>
      <p v-if="isDirty && !isFilled">Обязательное значение</p>
    </div>
  </div>
</template>

<script lang="ts">
  import { validationMixin } from 'vuelidate';
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import Vue from 'vue';

  interface IComputed {
    value: Date;
  }

  interface IProps {
    modelValue: Date;
    propertyName: string;
    label: string;
    isFilled: boolean;
    isDirty: boolean;
  }

  export default Vue.extend<IProps, {}, IComputed, {}>({
    name: 'FormDateInput',
    mixins: [validationMixin],
    components: { DatePicker },
    model: {
      prop: 'modelValue',
      event: 'update:modelValue',
    },
    props: {
      modelValue: Date,
      propertyName: String,
      label: String,
      isFilled: Boolean,
      isDirty: Boolean,
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
