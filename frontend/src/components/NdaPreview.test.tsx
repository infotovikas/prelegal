import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import NdaPreview from "./NdaPreview";
import { defaultNdaFormData } from "@/types/nda";

describe("NdaPreview", () => {
  it("renders with the id the PDF download button targets", () => {
    render(<NdaPreview data={defaultNdaFormData} />);
    expect(document.getElementById("nda-preview")).toBeInTheDocument();
  });

  it("shows placeholders for blank party fields", () => {
    render(<NdaPreview data={defaultNdaFormData} />);
    expect(screen.getAllByText("[Print name]").length).toBeGreaterThan(0);
    expect(screen.getAllByText("[Company]").length).toBeGreaterThan(0);
  });

  it("renders filled-in party details instead of placeholders", () => {
    render(
      <NdaPreview
        data={{
          ...defaultNdaFormData,
          partyOne: {
            ...defaultNdaFormData.partyOne,
            company: "Acme, Inc.",
          },
        }}
      />
    );

    expect(screen.getByText("Acme, Inc.")).toBeInTheDocument();
  });

  it("hides the MNDA Modifications row when none are provided", () => {
    render(<NdaPreview data={defaultNdaFormData} />);
    expect(screen.queryByText("MNDA Modifications")).not.toBeInTheDocument();
  });

  it("shows the MNDA Modifications row when provided", () => {
    render(
      <NdaPreview
        data={{ ...defaultNdaFormData, modifications: "Add a mutual publicity clause." }}
      />
    );
    expect(screen.getByText("MNDA Modifications")).toBeInTheDocument();
    expect(
      screen.getByText("Add a mutual publicity clause.")
    ).toBeInTheDocument();
  });

  it("renders all ten standard-terms clause titles", () => {
    render(<NdaPreview data={defaultNdaFormData} />);
    expect(screen.getByText("Introduction.")).toBeInTheDocument();
    expect(screen.getByText("Equitable Relief.")).toBeInTheDocument();
    expect(screen.getByText("General.")).toBeInTheDocument();
  });
});
