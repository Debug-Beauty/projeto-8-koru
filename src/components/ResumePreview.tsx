// src/components/ResumePreview.tsx
import React from "react";
import type { ResumeData } from "../types";
import { improveText } from "../services/ai";


type ResumePreviewProps = { data: ResumeData };

// Pré-visualização do currículo (compatível com ref para exportar PDF)
const ResumePreview = React.forwardRef<HTMLDivElement, ResumePreviewProps>(
  ({ data }, ref) => {
    const { personalInfo, skills, experiences } = data;

    return (
      <div
        ref={ref}
        id="resume-preview"
        className="p-4 font-serif flex-grow" style={{ backgroundColor: '#ffffff', color: '#2d3748' }}
      >
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-wide">
            {personalInfo.name || "Seu Nome"}
          </h1>
          <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 mt-2 text-sm" style={{ color: '#718096' }}>
            <span>{personalInfo.email || "seu.email@exemplo.com"}</span>
            <span>{personalInfo.phone || "(XX) XXXXX-XXXX"}</span>
            <span>{personalInfo.linkedin || "linkedin.com/in/seu-perfil"}</span>
          </div>
        </header>

        <section className="mb-6">
          <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 pb-1 mb-2" style={{ borderBottom: '2px solid #e2e8f0' }}>
            Resumo
          </h2>
          <p className="text-sm text-justify">
            {personalInfo.summary ||
              "Aqui vai um breve resumo sobre suas qualificações e objetivos profissionais. Tente destacar seus pontos fortes e o que você busca na sua carreira."}
          </p>
        </section>

        {skills.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 pb-1 mb-2" style={{ borderBottom: '2px solid #e2e8f0' }}>
              Habilidades
            </h2>
            <ul className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill) => (
                <li
                  key={skill.id}
                  className="text-sm font-medium px-3 py-1 rounded-full" style={{ backgroundColor: '#edf2f7', color: '#2d3748' }}
                >
                  {skill.name}
                </li>
              ))}
            </ul>
          </section>
        )}

        {experiences.length > 0 && (
          <section>
            <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 pb-1 mb-2" style={{ borderBottom: '2px solid #e2e8f0' }}>
              Experiência
            </h2>
            <div className="space-y-4 mt-2">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <h3 className="font-bold text-md">{exp.role || "Cargo"}</h3>
                  <div className="flex justify-between text-sm italic " style={{ color: '#718096' }}>
                    <span>{exp.company || "Empresa"}</span>
                    <span>
                      {exp.startDate || "Início"} -{" "}
                      {exp.isCurrent ? "Presente" : exp.endDate || "Fim"}
                    </span>
                  </div>
                  <p className="text-sm mt-1 text-justify">
                    {exp.description ||
                      "Descrição das suas atividades, projetos e responsabilidades no cargo."}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    );
  }
);

ResumePreview.displayName = "ResumePreview";
export default ResumePreview;
