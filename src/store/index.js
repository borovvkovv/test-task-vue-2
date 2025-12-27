import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    familyMembers: [],
  },
  mutations: {
    addFamilyMember(state, payload) {
      state.familyMembers.push(payload);
    },
    deleteFamilyMember(state, payload) {
      console.log(payload);
      state.familyMembers = [
        ...state.familyMembers.slice(0, payload),
        ...state.familyMembers.slice(payload + 1),
      ];
    },
    changeFamilyMember(state, payload) {
      state.familyMembers[payload.index] = payload.newMember;
    },
  },
  getters: {
    getFamilyMembers: (state) => {
      return state.familyMembers;
    },
    getFamilyMemberRealEstate: (state) => (index) => {
      return state.familyMembers[index].realEstate;
    },
  },
});

export { store };
