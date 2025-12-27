<template>
  <div class="container">
    <Form ref="form" @submit="onFormSubmitHandler" :mode="mode" v-bind:formDataProps="formData" />
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
        <tr v-for="(x, i) in allFamilyMembers">
          <td>{{ getFIO(x) }}</td>
          <td>{{ x.birthDate }}</td>
          <td>{{ getFamilyRoleTitle(x) }}</td>
          <td>{{ formatApplicant(x) }}</td>
          <td><input type="button" value="Редактировать" @click="onEditMemberHandler(x, i)"></input></td>
          <td><input type="button" value="Удалить" @click="onDeleteMemberHandler(i)"></input></td>
          <td><input type="button" value="Инф-ия о недвиж-ти" @click="onRealEstateShowHandler(i)"></input></td>
        </tr>
      </tbody>
    </table>
    <RealEstateModal ref="realEstateModal" />
  </div>
</template>

<script>
import Form from './Form.vue';
import RealEstateModal from './RealEstateModal.vue';
import axios from 'axios';
import { familyRoles } from './utils/models';

export default {
  name: 'MainView',
  components:{Form: Form, RealEstateModal: RealEstateModal},
  data() {
    return {
      mode: 'ADD',
      editIndex: -1,
      responseError: false,
      allFamilyMembers: [],
      formData: {
        lastName: '',
        firstName: '',
        middleName: '',
        birthDate: '',
        relation: '',
        applicant: false,
      },
    };
  },
  methods: {
    onFormSubmitHandler(value) {
      this.responseError = false;

      if (this.mode == 'EDIT')
        axios.post('edit', {
          newMember: value,
          index: this.editIndex
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
          this.mode = 'ADD';
        });
      else
        axios.post('/api/family/members', value)
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
    onDeleteMemberHandler(familyMemberIndex) {
      axios.delete(`/api/family/members/${familyMemberIndex}`, familyMemberIndex).then(this.updateMembers);;
    },
    onEditMemberHandler(familyMember, familyMemberIndex) {
      this.mode = 'EDIT';
      this.editIndex = familyMemberIndex;
      this.formData = familyMember;
    },
    onRealEstateShowHandler(familyMemberIndex) {
      this.$refs.realEstateModal.open(familyMemberIndex)
    },
    updateMembers() {
      axios.get('/api/family/members').then((response) => {
        this.allFamilyMembers = response.data;
      });
    },
    reset() {
      this.formData = {
        lastName: '',
        firstName: '',
        middleName: '',
        birthDate: '',
        relation: '',
        applicant: false,
      };
    },
    getFIO(familyMember) { return `${familyMember.lastName} ${familyMember.firstName} ${familyMember.middleName}` },
    formatApplicant(familyMember) { return familyMember.applicant === true ? 'Да' : 'Нет' },
    getFamilyRoleTitle(familyMember) { return familyRoles.find((familyRole) =>
      familyRole.value === familyMember.relation).title
    }
  },
};
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
