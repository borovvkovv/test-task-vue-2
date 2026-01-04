<template>
  <form
    @submit.prevent="submit"
    class="form"
  >
    <FormTextInput
      v-model="$v.formData.lastName.$model"
      label="Фамилия"
      :is-filled="$v.formData.lastName.isFilled"
      :is-dirty="$v.formData.lastName.$dirty"
    />
    <FormTextInput
      v-model="$v.formData.firstName.$model"
      label="Имя"
      :is-filled="$v.formData.firstName.isFilled"
      :is-dirty="$v.formData.firstName.$dirty"
    />
    <FormTextInput
      v-model="$v.formData.middleName.$model"
      label="Отчество"
      :is-filled="$v.formData.middleName.isFilled"
      :is-dirty="$v.formData.middleName.$dirty"
    />
    <FormDateInput
      v-model="$v.formData.birthDate.$model"
      label="Дата рождения"
      :is-filled="$v.formData.birthDate.isFilled"
      :is-dirty="$v.formData.birthDate.$dirty"
    />
    <FormSelectInput
      v-model="$v.formData.relation.$model"
      label="Роль в семье"
      :options="familyRoles"
      :is-filled="$v.formData.relation.isFilled"
    />
    <FormCheckboxInput
      v-model="$v.formData.applicant.$model"
      label="Признак заявителя"
    />
    <input
      type="submit"
      :value="submitButtonText"
    />
  </form>
</template>

<script lang="ts">
  import { validationMixin } from 'vuelidate';
  import {
    FamilyRole,
    familyRoles,
    FormMode,
    initialFormData,
  } from './utils/models';
  import { notEmptyStringValidation, notNullOrUndefined } from './utils';
  import Vue from 'vue';
  import { IFamilyMemberInit } from 'src/store/utils/models';
  import FormTextInput from './FormTextInput.vue';
  import FormDateInput from './FormDateInput.vue';
  import FormSelectInput from './FormSelectInput.vue';
  import FormCheckboxInput from './FormCheckboxInput.vue';

  interface IData {
    formData: IFamilyMemberInit;
    familyRoles: Record<FamilyRole, string>;
  }

  interface IMethods {
    submit(): void;
    reset(): void;
  }

  interface IComputed {
    submitButtonText: string;
  }

  interface IProps {
    submitButtonText: string;
    formDataProps: IFamilyMemberInit | null;
  }

  export default Vue.extend<IData, IMethods, IComputed, IProps>({
    name: 'Form',
    mixins: [validationMixin],
    components: {
      FormTextInput,
      FormDateInput,
      FormSelectInput,
      FormCheckboxInput,
    },
    props: {
      submitButtonText: String,
      formDataProps: Object as () => IFamilyMemberInit,
    },
    data: () => ({
      formData: { ...initialFormData },
      familyRoles: familyRoles,
    }),
    validations: {
      formData: {
        lastName: { isFilled: notEmptyStringValidation },
        firstName: { isFilled: notEmptyStringValidation },
        middleName: { isFilled: notEmptyStringValidation },
        birthDate: { isFilled: notNullOrUndefined },
        relation: { isFilled: notNullOrUndefined },
        applicant: {},
      },
    },
    methods: {
      submit() {
        this.$v.formData.$touch();
        this.$v.$touch();

        if (!this.$v.formData.$invalid)
          this.$emit('submit', this.$v.formData.$model);
      },
      reset() {
        this.$v.formData.$model = { ...initialFormData };
        this.$v.formData.$reset();
      },
    },
    watch: {
      formDataProps: {
        handler: function (newValue) {
          if (newValue !== null) {
            this.$v.formData.$model = { ...newValue };
          } else {
            this.$v.formData.$model = { ...initialFormData };
          }
          this.$v.formData.$reset();
        },
        deep: true,
      },
    },
  });
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
