<template>
  <div class="container">
    <label
      :for="propertyName"
      :class="[
        {
          error: !isFilled,
        },
      ]"
    >
      {{ label }}
    </label>
    <div>
      <select
        :id="propertyName"
        type="date"
        :class="[{ input: true, inputError: !isFilled }]"
        v-model="value"
      >
        <option
          v-for="optionKey in optionsKeys"
          :value="optionKey"
        >
          {{ options[optionKey] }}
        </option>
      </select>
      <p v-if="!isFilled">Обязательное значение</p>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { FamilyRole } from './utils/models';

  interface IProps {
    modelValue: FamilyRole | null;
    propertyName: string;
    label: string;
    options: Record<FamilyRole, string>;
    isFilled: boolean;
  }

  interface IComputed {
    value: FamilyRole | null;
    optionsKeys: FamilyRole[];
  }

  export default Vue.extend<IProps, {}, IComputed, {}>({
    name: 'FormSelectInput',
    props: {
      modelValue: String as () => FamilyRole | null,
      propertyName: String,
      label: String,
      options: Object as () => Record<FamilyRole, string>,
      isFilled: Boolean,
    },
    model: {
      prop: 'modelValue',
      event: 'update:modelValue',
    },
    computed: {
      optionsKeys() {
        return Object.keys(this.$props.options).map((x) => x as FamilyRole);
      },
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
