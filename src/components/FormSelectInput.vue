<template>
  <div class="container">
    <label
      :for="propertyName"
      :class="[
        {
          error: !property.isFilled,
        },
      ]"
    >
      {{ label }}
    </label>
    <div>
      <select
        :id="propertyName"
        type="date"
        :class="[{ input: true, inputError: !property.isFilled }]"
        v-model="property.$model"
      >
        <option
          v-for="option in options"
          :value="option.value"
        >
          {{ option.title }}
        </option>
      </select>
      <p v-if="!property.isFilled">Обязательное значение</p>
    </div>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate';

  export default {
    name: 'FormSelectInput',
    mixins: [validationMixin],
    props: {
      property: Object,
      propertyName: '',
      label: '',
      options: [],
    },
    methods: {
      onInputHandler(e) {
        this.$emit('input', e.target.value);
      },
    },
  };
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
