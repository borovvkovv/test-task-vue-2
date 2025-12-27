<template>
  <div class="container">
    <label :for="propertyName">
      {{ label }}
    </label>
    <div>
      <input
        :id="propertyName"
        type="checkbox"
        v-model="propertyLocal"
        @input="onInputHandler"
      />
    </div>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate';

  export default {
    name: 'FormCheckboxInput',
    mixins: [validationMixin],
    props: {
      property: Object,
      propertyName: '',
      label: '',
    },
    data() {
      return {
        propertyLocal: false,
      };
    },
    methods: {
      onInputHandler() {
        this.$emit('input', !this.property.$model);
      },
    },
    watch: {
      property: {
        handler: function () {
          this.propertyLocal = this.property.$model;
        },
        deep: true,
      },
    },
  };
</script>

<style scoped>
  .container {
    display: flex;
    column-gap: 10px;
  }
</style>
