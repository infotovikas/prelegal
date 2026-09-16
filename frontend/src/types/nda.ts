export interface PartyInfo {
  printName: string;
  title: string;
  company: string;
  noticeAddress: string;
}

export type MndaTermType = "expires" | "until-terminated";
export type ConfidentialityTermType = "years" | "perpetuity";

export interface NdaFormData {
  partyOne: PartyInfo;
  partyTwo: PartyInfo;
  purpose: string;
  effectiveDate: string;
  mndaTermType: MndaTermType;
  mndaTermYears: number;
  confidentialityTermType: ConfidentialityTermType;
  confidentialityTermYears: number;
  governingLaw: string;
  jurisdiction: string;
  modifications: string;
}

export const emptyParty: PartyInfo = {
  printName: "",
  title: "",
  company: "",
  noticeAddress: "",
};

export const defaultNdaFormData: NdaFormData = {
  partyOne: { ...emptyParty },
  partyTwo: { ...emptyParty },
  purpose: "Evaluating whether to enter into a business relationship with the other party.",
  effectiveDate: "",
  mndaTermType: "expires",
  mndaTermYears: 1,
  confidentialityTermType: "years",
  confidentialityTermYears: 1,
  governingLaw: "",
  jurisdiction: "",
  modifications: "",
};
