import { describe, expect, it } from "vitest";
import { buildDisplayValues, formatEffectiveDate } from "./nda-format";
import { defaultNdaFormData } from "@/types/nda";

describe("formatEffectiveDate", () => {
  it("returns a placeholder when no date is given", () => {
    expect(formatEffectiveDate("")).toBe("[Today’s date]");
  });

  it("returns a placeholder for an invalid date string", () => {
    expect(formatEffectiveDate("not-a-date")).toBe("[Today’s date]");
  });

  it("formats a valid date as a long-form US date", () => {
    expect(formatEffectiveDate("2026-01-15")).toBe("January 15, 2026");
  });
});

describe("buildDisplayValues", () => {
  it("falls back to placeholders when fields are blank", () => {
    const values = buildDisplayValues(defaultNdaFormData);

    expect(values.EFFECTIVE_DATE).toBe("[Today’s date]");
    expect(values.GOVERNING_LAW).toBe("[state]");
    expect(values.JURISDICTION).toBe("[city or county and state]");
  });

  it("singularizes a one-year MNDA term", () => {
    const values = buildDisplayValues({
      ...defaultNdaFormData,
      mndaTermType: "expires",
      mndaTermYears: 1,
    });

    expect(values.MNDA_TERM).toBe("1 year from the Effective Date");
  });

  it("pluralizes a multi-year MNDA term", () => {
    const values = buildDisplayValues({
      ...defaultNdaFormData,
      mndaTermType: "expires",
      mndaTermYears: 3,
    });

    expect(values.MNDA_TERM).toBe("3 years from the Effective Date");
  });

  it("describes an until-terminated MNDA term", () => {
    const values = buildDisplayValues({
      ...defaultNdaFormData,
      mndaTermType: "until-terminated",
    });

    expect(values.MNDA_TERM).toBe(
      "until terminated in accordance with the terms of the MNDA"
    );
  });

  it("describes a perpetual confidentiality term", () => {
    const values = buildDisplayValues({
      ...defaultNdaFormData,
      confidentialityTermType: "perpetuity",
    });

    expect(values.CONFIDENTIALITY_TERM).toBe("perpetuity");
  });

  it("trims whitespace-only purpose, governing law, and jurisdiction", () => {
    const values = buildDisplayValues({
      ...defaultNdaFormData,
      purpose: "   ",
      governingLaw: "   ",
      jurisdiction: "   ",
    });

    expect(values.PURPOSE).toBe("[Purpose not yet specified]");
    expect(values.GOVERNING_LAW).toBe("[state]");
    expect(values.JURISDICTION).toBe("[city or county and state]");
  });

  it("passes through provided values unchanged", () => {
    const values = buildDisplayValues({
      ...defaultNdaFormData,
      purpose: "Exploring a potential partnership.",
      governingLaw: "Delaware",
      jurisdiction: "New Castle, DE",
    });

    expect(values.PURPOSE).toBe("Exploring a potential partnership.");
    expect(values.GOVERNING_LAW).toBe("Delaware");
    expect(values.JURISDICTION).toBe("New Castle, DE");
  });
});
