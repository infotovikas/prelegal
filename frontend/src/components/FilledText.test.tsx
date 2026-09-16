import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import FilledText from "./FilledText";
import { NdaDisplayValues } from "@/lib/nda-format";

const values: NdaDisplayValues = {
  PURPOSE: "Exploring a partnership.",
  EFFECTIVE_DATE: "[Today’s date]",
  MNDA_TERM: "1 year from the Effective Date",
  CONFIDENTIALITY_TERM: "perpetuity",
  GOVERNING_LAW: "Delaware",
  JURISDICTION: "New Castle, DE",
};

describe("FilledText", () => {
  it("renders bold markdown segments as <strong>", () => {
    render(<FilledText text="This is **important** text." values={values} />);
    const strong = screen.getByText("important");
    expect(strong.tagName).toBe("STRONG");
  });

  it("substitutes a known token with its value", () => {
    render(<FilledText text="Governed by {{GOVERNING_LAW}}." values={values} />);
    expect(screen.getByText("Delaware")).toBeInTheDocument();
  });

  it("styles placeholder values (starting with '[') distinctly from filled values", () => {
    render(<FilledText text="{{EFFECTIVE_DATE}}" values={values} />);
    const node = screen.getByText("[Today’s date]");
    expect(node.className).toContain("italic");
  });

  it("does not italicize a real value", () => {
    render(<FilledText text="{{GOVERNING_LAW}}" values={values} />);
    const node = screen.getByText("Delaware");
    expect(node.className).not.toContain("italic");
  });

  it("renders plain text around tokens untouched", () => {
    const { container } = render(
      <FilledText text="Term: {{MNDA_TERM}} exactly." values={values} />
    );
    expect(container.textContent).toBe(
      "Term: 1 year from the Effective Date exactly."
    );
  });
});
