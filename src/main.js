// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App.vue';
import { store } from './store/index.js';
import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';

Vue.config.productionTip = false;

// This sets the mock adapter on the default instance
const mock = new AxiosMockAdapter(axios);
const mockRealEstateType = ['Дом', 'Участок', 'Квартира'];
const mockAddresses = ['ул. Мира 12', 'ул. Ленина 14', 'ул. Московская, 11'];
const mockOwnership = ['100%', '50%', '25%'];

mock.onPost('/api/family/members').reply(function (payload) {
  const familyMember = JSON.parse(payload.data);

  if (
    store.getters.getFamilyMembers.filter(
      (x) =>
        x.lastName === familyMember.lastName &&
        x.firstName === familyMember.firstName &&
        x.middleName === familyMember.middleName &&
        x.birthDate === familyMember.birthDate
    ).length < 1
  ) {
    const realEstate = {
      hasRealEstate: true,
      objects: [
        {
          type: mockRealEstateType[0],
          address: mockAddresses[0],
          ownership: mockOwnership[0],
        },
        {
          type: mockRealEstateType[2],
          address: mockAddresses[1],
          ownership: mockOwnership[2],
        },
      ],
    };

    store.commit('addFamilyMember', {
      ...JSON.parse(payload.data),
      realEstate: realEstate,
    });
    return [200, {}];
  } else {
    return [400, {}];
  }
});

mock.onPost('edit').reply(function (payload) {
  const familyMember = JSON.parse(payload.data);

  if (
    store.getters.getFamilyMembers.filter(
      (x, i) =>
        familyMember.index !== i &&
        x.lastName === familyMember.newMember.lastName &&
        x.firstName === familyMember.newMember.firstName &&
        x.middleName === familyMember.newMember.middleName &&
        x.birthDate === familyMember.newMember.birthDate
    ).length < 1
  ) {
    store.commit('changeFamilyMember', {
      newMember: familyMember.newMember,
      index: familyMember.index,
    });
    return [200, {}];
  } else {
    return [400, {}];
  }
});

mock.onDelete(/\/api\/family\/members\/\d+/).reply(function (config) {
  // console.log(config.url.split('/').at(-1));
  return [
    200,
    store.commit('deleteFamilyMember', config.url.split('/').at(-1)),
  ];
});

mock.onGet('/api/family/members').reply(function (config) {
  // console.log(store.getters.getFamilyMembers);
  return [200, store.getters.getFamilyMembers];
});

mock.onGet(/\/api\/family\/members\/\d+\/real-estate/).reply(function (config) {
  return [
    200,
    store.getters.getFamilyMemberRealEstate(config.url.split('/').at(-2)),
  ];
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  components: { App },
  template: '<App/>',
});
