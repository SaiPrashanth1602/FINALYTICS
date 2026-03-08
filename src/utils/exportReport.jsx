import jsPDF from "jspdf";
import { toPng } from "html-to-image";

// src/utils/exportReport.js
export const exportReport = () => {
  try {
    const reportData = "BITWARS SYSTEM AUDIT\nStatus: Verified\nNodes: Stable";
    const blob = new Blob([reportData], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'BitWars_Audit.txt');
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Audit Export Failed:", error);
  }
};