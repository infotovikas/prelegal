import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DownloadPdfButton from "./DownloadPdfButton";

const addImage = vi.fn();
const addPage = vi.fn();
const pdfBlob = new Blob(["%PDF-fake"], { type: "application/pdf" });
const output = vi.fn(() => pdfBlob);

vi.mock("jspdf", () => ({
  default: vi.fn().mockImplementation(function MockJsPDF() {
    return {
      internal: { pageSize: { getWidth: () => 595, getHeight: () => 842 } },
      addImage,
      addPage,
      output,
    };
  }),
}));

vi.mock("html2canvas-pro", () => ({
  default: vi.fn().mockResolvedValue({
    width: 1000,
    height: 1000,
    toDataURL: () => "data:image/png;base64,fake",
  }),
}));

describe("DownloadPdfButton", () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="nda-preview">content</div>';
    URL.createObjectURL = vi.fn(() => "blob:mock-url");
    URL.revokeObjectURL = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("generates a PDF and downloads it as a plain octet-stream, not application/pdf", async () => {
    const user = userEvent.setup();
    const clickSpy = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(() => {});

    render(<DownloadPdfButton targetId="nda-preview" fileName="test-nda.pdf" />);

    await user.click(screen.getByRole("button", { name: /download pdf/i }));

    await waitFor(() => expect(clickSpy).toHaveBeenCalled());

    expect(output).toHaveBeenCalledWith("blob");
    expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
    const [blobArg] = (URL.createObjectURL as ReturnType<typeof vi.fn>).mock
      .calls[0];
    expect(blobArg.type).toBe("application/octet-stream");
    expect(screen.queryByText(/could not generate/i)).not.toBeInTheDocument();

    clickSpy.mockRestore();
  });

  it("shows an error message if PDF generation fails", async () => {
    const user = userEvent.setup();
    output.mockImplementationOnce(() => {
      throw new Error("boom");
    });

    render(<DownloadPdfButton targetId="nda-preview" fileName="test-nda.pdf" />);
    await user.click(screen.getByRole("button", { name: /download pdf/i }));

    expect(
      await screen.findByText("Could not generate the PDF. Please try again.")
    ).toBeInTheDocument();
  });

  it("does nothing when the target element is missing", async () => {
    document.body.innerHTML = "";
    const user = userEvent.setup();

    render(<DownloadPdfButton targetId="missing" fileName="test-nda.pdf" />);
    await user.click(screen.getByRole("button", { name: /download pdf/i }));

    expect(output).not.toHaveBeenCalled();
  });
});
