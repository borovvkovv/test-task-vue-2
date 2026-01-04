import Vue from 'vue';
import { store } from '../store';
import AxiosMockAdapter from 'axios-mock-adapter';
import { checkFamilyMemberAlreadyExists } from './utils';
import { realEstateExample } from './utils/models';
import { instance } from './';
import { IFamilyMember, IFamilyMemberInit } from 'src/store/utils/models';

Vue.config.productionTip = false;

const mock = new AxiosMockAdapter(instance);

mock.onPost('/api/family/members').reply(function (payload) {
  const familyMember = JSON.parse(payload.data, function (k, v) {
    if (k === 'birthDate') return new Date(v);

    return v;
  }) as IFamilyMemberInit;
  const allFamilyMembers = store.getters.getFamilyMembers as IFamilyMember[];

  if (!checkFamilyMemberAlreadyExists(allFamilyMembers, familyMember)) {
    const id = allFamilyMembers.reduce(
      (acc, curr) => (curr.id > acc ? curr.id : acc),
      0
    );
    store.commit('addFamilyMember', {
      ...familyMember,
      realEstate: realEstateExample,
      id: id + 1,
    });

    return [200, {}];
  } else {
    return [400, {}];
  }
});

mock.onPut(/\/api\/family\/members\/\d+/).reply(function (payload) {
  const familyMember = JSON.parse(payload.data, function (k, v) {
    if (k === 'birthDate') return new Date(v);

    return v;
  });

  if (
    !checkFamilyMemberAlreadyExists(
      store.getters.getFamilyMembers,
      familyMember,
      familyMember.id
    )
  ) {
    store.commit('changeFamilyMember', {
      newMember: familyMember,
      index: familyMember.id,
    });
    return [200, {}];
  } else {
    return [400, {}];
  }
});

mock.onDelete(/\/api\/family\/members\/\d+/).reply(function (config) {
  store.commit(
    'deleteFamilyMember',
    Number(config.url.split('/')[config.url.split('/').length - 1])
  );

  return [200, {}];
});

mock.onGet('/api/family/members').reply(function () {
  return [200, store.getters.getFamilyMembers];
});

mock.onGet(/\/api\/family\/members\/\d+\/real-estate/).reply(function (config) {
  return [
    200,
    store.getters.getFamilyMemberRealEstate(
      Number(config.url.split('/')[config.url.split('/').length - 2])
    ),
  ];
});
