import { IFamilyMemberInit } from 'src/store/utils/models';

export enum FamilyRole {
  Father = 'Father',
  Mother = 'Mother',
}

export const initialFormData: IFamilyMemberInit = {
  lastName: '',
  firstName: '',
  middleName: '',
  birthDate: null,
  relation: null,
  applicant: false,
};

export const familyRoles: Record<FamilyRole, string> = {
  [FamilyRole.Father]: 'Отец',
  [FamilyRole.Mother]: 'Мать',
};

export enum FormMode {
  ADD = 'ADD',
  EDIT = 'EDIT',
}
