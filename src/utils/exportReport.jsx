import jsPDF from "jspdf";
import { toPng } from "html-to-image";

export const exportReport = async () => {
  try {
    const element = document.getElementById("dashboard") || document.getElementById("report-root");

    if (!element) {
      throw new Error("Nothing reportable is visible yet.");
    }

    const dataUrl = await toPng(element, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: getComputedStyle(document.documentElement)
        .getPropertyValue("--app-background")
        .trim() || "#ffffff",
    });

    const pdf = new jsPDF("p", "mm", "a4");

    const imgProps = pdf.getImageProperties(dataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    const pageHeight = pdf.internal.pageSize.getHeight();

    let heightLeft = pdfHeight;
    let position = 0;

    // first page
    pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, pdfHeight);
    heightLeft -= pageHeight;

    // extra pages
    while (heightLeft > 0) {
      position = heightLeft - pdfHeight;
      pdf.addPage();
      pdf.addImage(dataUrl, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;
    }

    pdf.save("Finalytics_Audit_Report.pdf");
    return { ok: true, filename: "Finalytics_Audit_Report.pdf" };

  } catch (error) {
    console.error("Export failed:", error);
    return {
      ok: false,
      message: error instanceof Error ? error.message : "Export failed.",
    };
  }
};
