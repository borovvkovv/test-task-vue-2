export const checkFamilyMemberAlreadyExists = (
  familyMembers,
  familyMember,
  familyMemberIndex = undefined
) => {
  return familyMembers.some(
    (x, i) =>
      (familyMemberIndex === undefined || familyMemberIndex !== i) &&
      x.lastName === familyMember.lastName &&
      x.firstName === familyMember.firstName &&
      x.middleName === familyMember.middleName &&
      x.birthDate === familyMember.birthDate
  );
};
