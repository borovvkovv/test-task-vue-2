import { IFamilyMemberInit } from 'src/store/utils/models';

export enum FamilyRole {
  Father = 'Father',
  Mother = 'Mother',
}

export const initialFormData: IFamilyMemberInit = {
  lastName: '1',
  firstName: '11',
  middleName: '1',
  birthDate: new Date(),
  relation: FamilyRole.Father,
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

export enum SubmitStatus {
  Pending = 'PENDING',
  Ready = 'READY',
}
