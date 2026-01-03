import Vue from 'vue';
import Vuex from 'vuex';
import {
  ChangeFamilyMemberPaylod,
  IFamilyMember,
  RealEstate,
} from './utils/models';

Vue.use(Vuex);

const store = new Vuex.Store<{ members: IFamilyMember[] }>({
  state: { members: [] },
  mutations: {
    addFamilyMember(state, familyMember: IFamilyMember) {
      state.members.push(familyMember);
    },
    deleteFamilyMember(state, familyMemberId: number) {
      console.log(state);
      const familyMemberIndex = state.members.findIndex(
        (x) => x.id === familyMemberId
      );
      state.members = [
        ...state.members.slice(0, familyMemberIndex),
        ...state.members.slice(familyMemberIndex + 1),
      ];
      console.log(state);
    },
    changeFamilyMember(state, payload: ChangeFamilyMemberPaylod) {
      state.members[state.members.findIndex((x) => x.id === payload.index)] =
        payload.newMember;
    },
  },
  getters: {
    getFamilyMembers: (state): IFamilyMember[] => {
      return state.members;
    },
    getFamilyMemberRealEstate:
      (state) =>
      (index: number): RealEstate => {
        return state.members[state.members.findIndex((x) => x.id === index)]
          .realEstate;
      },
  },
});

export { store };
