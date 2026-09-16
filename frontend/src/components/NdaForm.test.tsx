import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NdaForm from "./NdaForm";
import { defaultNdaFormData } from "@/types/nda";

describe("NdaForm", () => {
  it("reports Party 1 print name changes via onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<NdaForm data={defaultNdaFormData} onChange={onChange} />);

    const [partyOnePrintName] = screen.getAllByPlaceholderText("Jordan Lee");
    await user.type(partyOnePrintName, "A");

    expect(onChange).toHaveBeenCalledWith({
      ...defaultNdaFormData,
      partyOne: { ...defaultNdaFormData.partyOne, printName: "A" },
    });
  });

  it("switches the MNDA term type to until-terminated", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<NdaForm data={defaultNdaFormData} onChange={onChange} />);

    await user.click(screen.getByText("Continues until terminated"));

    expect(onChange).toHaveBeenCalledWith({
      ...defaultNdaFormData,
      mndaTermType: "until-terminated",
    });
  });

  it("clamps MNDA term years to a minimum of 1", () => {
    const onChange = vi.fn();

    render(<NdaForm data={defaultNdaFormData} onChange={onChange} />);

    const [yearInput] = screen.getAllByDisplayValue("1");
    fireEvent.change(yearInput, { target: { value: "0" } });

    expect(onChange).toHaveBeenCalledWith({
      ...defaultNdaFormData,
      mndaTermType: "expires",
      mndaTermYears: 1,
    });
  });

  it("updates governing law from its own field", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<NdaForm data={defaultNdaFormData} onChange={onChange} />);

    const governingLaw = screen.getByPlaceholderText("Delaware");
    await user.type(governingLaw, "T");

    expect(onChange).toHaveBeenCalledWith({
      ...defaultNdaFormData,
      governingLaw: "T",
    });
  });
});
