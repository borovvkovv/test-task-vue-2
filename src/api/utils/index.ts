import { IFamilyMember, IFamilyMemberInit } from 'src/store/utils/models';

export const checkFamilyMemberAlreadyExists = (
  familyMembers: IFamilyMember[],
  familyMember: IFamilyMemberInit,
  familyMemberIndex?: number
) => {
  return familyMembers.some(
    (x) =>
      (familyMemberIndex === undefined || familyMemberIndex !== x.id) &&
      x.lastName === familyMember.lastName &&
      x.firstName === familyMember.firstName &&
      x.middleName === familyMember.middleName &&
      Number(x.birthDate) === Number(familyMember.birthDate)
  );
};
