import Vue from 'vue';
import { store } from '../store/index.js';
import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { checkFamilyMemberAlreadyExists } from './utils/index.js';
import { realEstateExample } from './utils/models.js';

Vue.config.productionTip = false;

const mock = new AxiosMockAdapter(axios);

mock.onPost('/api/family/members').reply(function (payload) {
  const familyMember = JSON.parse(payload.data);

  if (
    !checkFamilyMemberAlreadyExists(
      store.getters.getFamilyMembers,
      familyMember
    )
  ) {
    store.commit('addFamilyMember', {
      ...JSON.parse(payload.data),
      realEstate: realEstateExample,
    });

    return [200, {}];
  } else {
    return [400, {}];
  }
});

mock.onPost('edit').reply(function (payload) {
  const familyMember = JSON.parse(payload.data);

  if (
    !checkFamilyMemberAlreadyExists(
      store.getters.getFamilyMembers,
      familyMember.newMember,
      familyMember.index
    )
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
  return [
    200,
    store.commit('deleteFamilyMember', config.url.split('/').at(-1)),
  ];
});

mock.onGet('/api/family/members').reply(function () {
  return [200, store.getters.getFamilyMembers];
});

mock.onGet(/\/api\/family\/members\/\d+\/real-estate/).reply(function (config) {
  return [
    200,
    store.getters.getFamilyMemberRealEstate(config.url.split('/').at(-2)),
  ];
});
