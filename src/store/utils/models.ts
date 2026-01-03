import { FamilyRole } from 'src/components/utils/models';

export interface IFamilyMemberInit {
  lastName: string;
  firstName: string;
  middleName: string;
  birthDate: Date;
  relation: FamilyRole | null;
  applicant: boolean;
}

export interface IFamilyMember extends IFamilyMemberInit {
  id: number;
  realEstate: RealEstate;
}

export type RealEstate = {
  hasRealEstate: boolean;
  objects: { type: string; address: string; ownership: string }[];
};

export type ChangeFamilyMemberPaylod = {
  index: number;
  newMember: IFamilyMember;
};
