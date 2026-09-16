import { NdaFormData } from "@/types/nda";

export interface NdaDisplayValues {
  PURPOSE: string;
  EFFECTIVE_DATE: string;
  MNDA_TERM: string;
  CONFIDENTIALITY_TERM: string;
  GOVERNING_LAW: string;
  JURISDICTION: string;
}

function pluralize(count: number, unit: string) {
  return `${count} ${unit}${count === 1 ? "" : "s"}`;
}

export function formatEffectiveDate(value: string): string {
  if (!value) return "[Today’s date]";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "[Today’s date]";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function buildDisplayValues(data: NdaFormData): NdaDisplayValues {
  const purpose = data.purpose.trim() || "[Purpose not yet specified]";

  const mndaTerm =
    data.mndaTermType === "expires"
      ? `${pluralize(data.mndaTermYears, "year")} from the Effective Date`
      : "until terminated in accordance with the terms of the MNDA";

  const confidentialityTerm =
    data.confidentialityTermType === "years"
      ? `${pluralize(
          data.confidentialityTermYears,
          "year"
        )} from the Effective Date (and, for trade secrets, until no longer a trade secret under applicable law)`
      : "perpetuity";

  const governingLaw = data.governingLaw.trim() || "[state]";
  const jurisdiction =
    data.jurisdiction.trim() || "[city or county and state]";

  return {
    PURPOSE: purpose,
    EFFECTIVE_DATE: formatEffectiveDate(data.effectiveDate),
    MNDA_TERM: mndaTerm,
    CONFIDENTIALITY_TERM: confidentialityTerm,
    GOVERNING_LAW: governingLaw,
    JURISDICTION: jurisdiction,
  };
}
