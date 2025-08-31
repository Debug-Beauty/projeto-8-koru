import React from "react";
import Button from "./ui/Button"; // seu botão estilizado
import { Printer } from "lucide-react"; // ícone de impressora
import html2pdf from "html2pdf.js"; // npm install html2pdf.js

const ExportButton: React.FC = () => {
  const handleExportPDF = () => {
    const element = document.getElementById("resume-preview");
    if (!element) {
      alert("Preview não encontrado!");
      return;
    }

    const opt = {
      margin:       10,
      filename:     "curriculo.pdf",
      image:        { type: "jpeg", quality: 0.98 },
      html2canvas:  { scale: 2, useCORS: true }, // melhora a qualidade e tenta evitar erros
      jsPDF:        { unit: "mm", format: "a4", orientation: "p" }
    };

    html2pdf()
      .set(opt)
      .from(element)
      .save()
      .catch((err: any) => {
        console.error("Erro ao exportar PDF:", err);
        alert("Ocorreu um erro ao gerar o PDF. Veja o console.");
      });
  };

  return (
    <Button onClick={handleExportPDF} variant="primary">
      <div className="flex items-center gap-2">
        <Printer size={18} />
        Exportar PDF
      </div>
    </Button>
  );
};

export default ExportButton;