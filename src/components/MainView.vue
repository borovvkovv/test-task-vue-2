<template>
  <div class="container">
    <Form ref="form"
      @submit="onFormSubmitHandler"
      :submit-button-text="submitButtonText"
      v-bind:formDataProps="formData"
    />
    <span v-if="responseError" class="memberExistsError">Член семьи с таким ФИО и датой рождения уже существует!</span>
    <table
      v-if="allFamilyMembers.length > 0"
      class="table"
    >
      <thead>
        <tr>
          <th>ФИО</th>
          <th>Дата рождения</th>
          <th>Роль в семье</th>
          <th>Признак заявителя</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(x) in allFamilyMembers">
          <td>{{ getFIO(x) }}</td>
          <td>{{ formatDate(new Date(x.birthDate)) }}</td>
          <td>{{ getFamilyRoleTitle(x) }}</td>
          <td>{{ formatApplicant(x) }}</td>
          <td><input type="button" value="Редактировать" @click="onEditMemberHandler(x)"></input></td>
          <td><input type="button" value="Удалить" @click="onDeleteMemberHandler(x.id)"></input></td>
          <td><input type="button" value="Инф-ия о недвиж-ти" @click="onRealEstateShowHandler(x.id)"></input></td>
        </tr>
      </tbody>
    </table>
    <RealEstateModal ref="realEstateModal" />
  </div>
</template>

<script lang="ts">
import Form from './Form.vue';
import RealEstateModal from './RealEstateModal.vue';
import {  FamilyRole, familyRoles, FormMode,  } from './utils/models';
import { instance } from '../api';
import { IFamilyMember, IFamilyMemberInit } from 'src/store/utils/models';
import Vue from 'vue';

interface IData {
  mode: FormMode,
  responseError: boolean,
  allFamilyMembers: IFamilyMember[],
  formData: IFamilyMember | null,
}

interface IMethods {
  onFormSubmitHandler(value: IFamilyMemberInit): void
  onDeleteMemberHandler(familyMemberIndex: number): void
  onEditMemberHandler(familyMember: IFamilyMember): void
  onRealEstateShowHandler(familyMemberIndex: number): void
  updateMembers(): void
  reset(): void
  getFIO(familyMember:IFamilyMember): String
  formatApplicant(familyMember:IFamilyMember): string
  getFamilyRoleTitle(familyMember:IFamilyMember): string
  formatDate(date:Date): string
}

interface IComputed {
  submitButtonText:string;
}

export default Vue.extend<IData, IMethods,IComputed,{}>({
  name: 'MainView',
  components:{Form: Form, RealEstateModal: RealEstateModal },
  data: () => ({
      mode: FormMode.ADD,
      responseError: false,
      allFamilyMembers: [],
      formData: null,
  }),
  methods: {
    onFormSubmitHandler(value: IFamilyMemberInit) {
      this.responseError = false;

      if (this.mode == FormMode.EDIT)
        instance({
          url:`/members/${this.formData.id}` ,
          method: 'put',
          data: {...this.formData, ...value},
        })
        .catch(() => {
          this.responseError = true;
          setTimeout(() => {
            this.responseError = false;
          }, 3000);
        })
        .then(() => {
          if (!this.responseError)
            this.updateMembers();

          this.reset();
        });
      else
        instance({
            url:'/members' ,
            method: 'post',
            data: value,
        })
        .catch(() => {
          this.responseError = true;

          setTimeout(() => {
            this.responseError = false;
          }, 3000);
        })
        .then(() => {
          if (!this.responseError)
          {
            this.updateMembers();
            this.reset();
          }
        });

    },
    onDeleteMemberHandler(familyMemberIndex: number) {
      instance({
            url:`/members/${familyMemberIndex}` ,
            method: 'delete',
      })
      .then(() => {
        this.updateMembers();
        this.reset();
      });
    },
    onEditMemberHandler(familyMember: IFamilyMember) {
      this.mode = FormMode.EDIT;
      this.formData = familyMember;
    },
    onRealEstateShowHandler(familyMemberIndex: number) {
      (this.$refs.realEstateModal as InstanceType<typeof RealEstateModal>).open(familyMemberIndex)
    },
    updateMembers() {
      instance<IFamilyMember[], IFamilyMember[]>({
            url:'/members' ,
            method: 'get',
      })
      .then((response) => {
        this.allFamilyMembers = response.data.map((x) => ({...x, birthDate: typeof x.birthDate === 'string' ? new Date(x.birthDate) : x.birthDate}));
      });
    },
    reset() {
      this.mode = FormMode.ADD;
      this.formData = null;
      (this.$refs.form as InstanceType<typeof Form>).reset();
    },
    getFIO(familyMember:IFamilyMember) { return `${familyMember.lastName} ${familyMember.firstName} ${familyMember.middleName}` },
    formatApplicant(familyMember:IFamilyMember) { return familyMember.applicant === true ? 'Да' : 'Нет' },
    getFamilyRoleTitle(familyMember:IFamilyMember) {
      const familyRoleKey = Object.keys(familyRoles).find((x) => x === familyMember.relation)

      return familyRoles[familyRoleKey as FamilyRole]
    },
    formatDate(date:Date) {
      var dateAsString = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      var monthAsString = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
      var yearAsString = date.getFullYear();

      return `${dateAsString }.${monthAsString}.${yearAsString}`
    },
  },
  computed: {
    submitButtonText() {
      return this.mode === FormMode.ADD ? 'Добавить' : 'Сохранить';
    },
  },
});
</script>

<style scoped>
  .table {
    border: 1px solid black;
  }

  .container {
    width: fit-content;
  }

  .memberExistsError {
    color: red;
  }
</style>
