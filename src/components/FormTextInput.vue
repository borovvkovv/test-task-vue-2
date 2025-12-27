<template>
  <div class="container">
    <label
      :for="propertyName"
      :class="[
        {
          error: property.$dirty && !property.isFilled,
        },
      ]"
    >
      {{ label }}
    </label>
    <div>
      <input
        :id="propertyName"
        type="text"
        :class="[
          {
            input: true,
            inputError: property.$dirty && !property.isFilled,
          },
        ]"
        :value="property.$model"
        @input="onInputHandler"
      />
      <p v-if="property.$dirty && !property.isFilled">Обязательное значение</p>
    </div>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate';

  export default {
    name: 'FormTextInput',
    mixins: [validationMixin],
    props: {
      property: Object,
      propertyName: '',
      label: '',
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
