<template>
  <form
    @submit.prevent="submit"
    class="form"
  >
    <FormTextInput
      :property="$v.formData.lastName"
      property-name="lastName"
      label="Фамилия"
      @input="
        (newValue) => {
          $v.formData.lastName.$model = newValue;
        }
      "
    />
    <FormTextInput
      :property="$v.formData.firstName"
      property-name="firstName"
      label="Имя"
      @input="
        (newValue) => {
          $v.formData.firstName.$model = newValue;
        }
      "
    />
    <FormTextInput
      :property="$v.formData.middleName"
      property-name="middleName"
      label="Отчество"
      @input="
        (newValue) => {
          $v.formData.middleName.$model = newValue;
        }
      "
    />
    <FormDateInput
      :property="$v.formData.birthDate"
      property-name="birthDate"
      label="Дата рождения"
      @input="
        (newValue) => {
          $v.formData.birthDate.$model = newValue;
        }
      "
    />
    <FormSelectInput
      :property="$v.formData.relation"
      property-name="relation"
      label="Роль в семье"
      :options="familyRoles"
      @input="
        (newValue) => {
          $v.formData.relation.$model = newValue;
        }
      "
    />
    <FormCheckboxInput
      :property="$v.formData.applicant"
      property-name="applicant"
      label="Признак заявителя"
      @input="
        (newValue) => {
          $v.formData.applicant.$model = newValue;
        }
      "
    />
    <input
      type="submit"
      :value="
        submitStatus === 'PENDING'
          ? 'Отправка...'
          : mode === 'ADD'
          ? 'Добавить'
          : 'Готово'
      "
    />
  </form>
</template>

<script>
  import { validationMixin } from 'vuelidate';
  import { familyRoles, initialFormData } from './utils/models';
  import { dateFormatValidation, notEmptyStringValidation } from './utils';
  import FormTextInput from './FormTextInput.vue';
  import FormDateInput from './FormDateInput.vue';
  import FormSelectInput from './FormSelectInput.vue';
  import FormCheckboxInput from './FormCheckboxInput.vue';

  export default {
    name: 'Form',
    mixins: [validationMixin],
    components: {
      FormTextInput,
      FormDateInput,
      FormSelectInput,
      FormCheckboxInput,
    },
    props: {
      mode: String,
      formDataProps: initialFormData,
    },
    data() {
      return {
        formData: initialFormData,
        submitStatus: null,
        familyRoles,
      };
    },
    validations: {
      formData: {
        lastName: { isFilled: notEmptyStringValidation },
        firstName: { isFilled: notEmptyStringValidation },
        middleName: {
          isFilled: notEmptyStringValidation,
        },
        birthDate: {
          isFilled: notEmptyStringValidation,
          isCorrect: dateFormatValidation,
        },
        relation: { isFilled: notEmptyStringValidation },
        applicant: {},
      },
    },
    methods: {
      submit() {
        this.$v.formData.$touch();
        this.$v.$touch();

        if (!this.$v.formData.$invalid) {
          this.$emit('submit', this.$v.formData.$model);
        }
      },
    },
    watch: {
      formDataProps: {
        handler: function (newValue) {
          this.$v.formData.$model = { ...newValue };
          this.$v.formData.$reset();
        },
        deep: true,
      },
    },
  };
</script>

<style scoped>
  .form {
    width: fit-content;
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
</style>
