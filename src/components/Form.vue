<template>
  <form
    @submit.prevent="submit"
    class="form"
  >
    <label
      for="lastName"
      :class="[
        {
          error: $v.formData.lastName.$dirty && !$v.formData.lastName.isFilled,
        },
      ]"
    >
      Фамилия
    </label>
    <div>
      <input
        id="lastName"
        type="text"
        :class="[
          {
            inputError:
              $v.formData.lastName.$dirty && !$v.formData.lastName.isFilled,
          },
        ]"
        v-model="$v.formData.lastName.$model"
      />
      <p v-if="$v.formData.lastName.$dirty && !$v.formData.lastName.isFilled">
        Обязательное значение
      </p>
    </div>
    <!-- /////////////////////////////////////////////// -->
    <label
      for="name"
      :class="[
        {
          error:
            $v.formData.firstName.$dirty && !$v.formData.firstName.isFilled,
        },
      ]"
    >
      Имя
    </label>
    <div>
      <input
        id="name"
        type="text"
        :class="[
          {
            inputError:
              $v.formData.firstName.$dirty && !$v.formData.firstName.isFilled,
          },
        ]"
        v-model="$v.formData.firstName.$model"
      />
      <p v-if="$v.formData.firstName.$dirty && !$v.formData.firstName.isFilled">
        Обязательное значение
      </p>
    </div>
    <!-- /////////////////////////////////////////////// -->
    <label
      for="second-name"
      :class="[
        {
          error:
            $v.formData.middleName.$dirty && !$v.formData.middleName.isFilled,
        },
      ]"
    >
      Отчество
    </label>
    <div>
      <input
        id="second-name"
        type="text"
        :class="[
          {
            inputError:
              $v.formData.middleName.$dirty && !$v.formData.middleName.isFilled,
          },
        ]"
        v-model="$v.formData.middleName.$model"
      />
      <p
        v-if="$v.formData.middleName.$dirty && !$v.formData.middleName.isFilled"
      >
        Обязательное значение
      </p>
    </div>
    <!-- /////////////////////////////////////////////// -->
    <label
      for="birth-date"
      :class="[
        {
          error:
            $v.formData.birthDate.$dirty &&
            (!$v.formData.birthDate.isFilled ||
              !$v.formData.birthDate.isCorrect),
        },
      ]"
    >
      Дата рождения
    </label>
    <div>
      <input
        id="birth-date"
        type="text"
        placeholder="XX.XX.XXXX"
        :class="[
          {
            inputError:
              $v.formData.birthDate.$dirty &&
              (!$v.formData.birthDate.isFilled ||
                !$v.formData.birthDate.isCorrect),
          },
        ]"
        v-model="$v.formData.birthDate.$model"
      />
      <p v-if="$v.formData.birthDate.$dirty && !$v.formData.birthDate.isFilled">
        Обязательное значение
      </p>
      <p
        v-if="$v.formData.birthDate.$dirty && !$v.formData.birthDate.isCorrect"
      >
        Формат даты xx.xx.xxxx
      </p>
    </div>
    <!-- /////////////////////////////////////////////// -->
    <label
      for="family-role"
      :class="[{ error: !$v.formData.relation.isFilled }]"
    >
      Роль в семье
    </label>
    <div>
      <select
        id="family-role"
        type="date"
        :class="[{ inputError: !$v.formData.relation.isFilled }]"
        v-model="$v.formData.relation.$model"
      >
        <option
          value="father"
          selected
        >
          Father
        </option>
        <option
          value="mother"
          selected
        >
          mother
        </option>
      </select>
      <p v-if="!$v.formData.relation.isFilled">Обязательное значение</p>
    </div>
    <label for="isApplicant">Признак заявителя</label>
    <div>
      <input
        id="isApplicant"
        type="checkbox"
        placeholder="Признак заявителя"
        v-model="$v.formData.applicant"
      />
    </div>
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

  export default {
    name: 'Form',
    mixins: [validationMixin],
    props: {
      mode: String,
      formDataProps: {
        lastName: String,
        firstName: String,
        middleName: String,
        birthDate: String,
        relation: String,
        applicant: Boolean,
      },
    },
    data() {
      return {
        formData: {
          lastName: '',
          firstName: '',
          middleName: '',
          birthDate: '',
          relation: '',
          applicant: false,
        },
        submitStatus: null,
      };
    },
    validations: {
      formData: {
        lastName: { isFilled: (value) => value !== '' && value !== undefined },
        firstName: { isFilled: (value) => value !== '' && value !== undefined },
        middleName: {
          isFilled: (value) => value !== '' && value !== undefined,
        },
        birthDate: {
          isFilled: (value) => value !== '' && value !== undefined,
          isCorrect: (value) => /^\d{2}[./-]\d{2}[./-]\d{4}$/.test(value),
        },
        relation: { isFilled: (value) => value !== '' && value !== undefined },
      },
    },
    methods: {
      submit() {
        this.$v.formData.$touch();
        this.$v.$touch();

        if (!this.$v.formData.$invalid) {
          this.$emit('mymy', this.$v.formData.$model);
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
    row-gap: 5px;
    width: fit-content;
  }

  .form > label {
    text-align: right;
  }

  .form > input {
    width: fit-content;
    text-align: left;
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
