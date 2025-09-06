// src/App.tsx
import { useRef, useState, useEffect } from "react";
import type { ResumeData, Skill, Experience } from "./types";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ConfirmModal from "./components/ConfirmModal";
import ExportButton from "./components/ExportButton";

import {
  validateResume,
  type PersonalErrors,
  type ExperienceErrors,
} from "./hooks/useValidation";

type PendingAction =
  | { type: "remove-skill"; id: string }
  | { type: "remove-exp"; id: string }
  | null;

// UUID com fallback (sem any)
const uuid = (): string => {
  const c = globalThis.crypto as Crypto | undefined;
  if (c && "randomUUID" in c) {
    return (c as Crypto & { randomUUID: () => string }).randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: { name: "", email: "", phone: "", linkedin: "", summary: "" },
    skills: [],
    experiences: [],
  });

  const [personalErrors, setPersonalErrors] = useState<PersonalErrors>({});
  const [experienceErrors, setExperienceErrors] = useState<ExperienceErrors>({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [pending, setPending] = useState<PendingAction>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // 🔹 API Key
  const [apiKey, setApiKey] = useState("");
  useEffect(() => {
    const saved = localStorage.getItem("gemini_api_key");
    if (saved) setApiKey(saved);
  }, []);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const key = e.target.value;
    setApiKey(key);
    localStorage.setItem("gemini_api_key", key);
  };

  const handlePersonalInfoChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setResumeData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value },
    }));
  };

  const addSkill = (skill: Omit<Skill, "id">) => {
    setResumeData((prev) => ({
      ...prev,
      skills: [...prev.skills, { ...skill, id: uuid() }],
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s.id !== id),
    }));
  };

  const requestRemoveSkill = (id: string) => {
    setPending({ type: "remove-skill", id });
    setConfirmMessage("Excluir esta habilidade?");
    setConfirmOpen(true);
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: uuid(),
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      description: "",
      isCurrent: false,
    };
    setResumeData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, newExperience],
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((e) => e.id !== id),
    }));
  };

  const requestRemoveExperience = (id: string) => {
    setPending({ type: "remove-exp", id });
    setConfirmMessage("Excluir esta experiência?");
    setConfirmOpen(true);
  };

  const handleExperienceChange = (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const name = target.name as keyof Experience;
    const value =
      target instanceof HTMLInputElement && target.type === "checkbox"
        ? (target.checked as Experience[keyof Experience])
        : (target.value as Experience[keyof Experience]);

    setResumeData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) =>
        exp.id === id ? { ...exp, [name]: value } : exp
      ),
    }));
  };

  // valida e atualiza os erros
  const runValidation = (): boolean => {
    const res = validateResume(resumeData);
    setPersonalErrors(res.personal);
    setExperienceErrors(res.experiences);
    return res.ok;
  };

  const handleValidateClick = () => {
    const ok = runValidation();
    if (ok) alert("Tudo certo! ✅");
    else alert("Há campos para ajustar. Veja os avisos em vermelho.");
  };

  const handleConfirm = () => {
    if (pending?.type === "remove-skill") removeSkill(pending.id);
    else if (pending?.type === "remove-exp") removeExperience(pending.id);
    setPending(null);
    setConfirmOpen(false);
  };

  const handleCancel = () => {
    setPending(null);
    setConfirmOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <Header />

      <main className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 p-8 max-w-7xl mx-auto w-full">
        <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto flex flex-col">
          {/* Campo da API Key */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">API do Google Gemini:</label>
            <input
              type="password"
              value={apiKey}
              onChange={handleApiKeyChange}
              className="w-full p-2 border rounded bg-gray-100"
              placeholder="Cole sua API Key aqui..."
            />
          </div>

          {/* Ações globais */}
          <div className="flex gap-3 mb-4">
            <button
              className="px-4 py-2 rounded-lg bg-blue-600 text-white"
              onClick={handleValidateClick}
            >
              Validar
            </button>
          </div>

          <ResumeForm
            data={resumeData}
            onPersonalInfoChange={handlePersonalInfoChange}
            onAddSkill={addSkill}
            onRemoveSkill={requestRemoveSkill}
            onAddExperience={addExperience}
            onRemoveExperience={requestRemoveExperience}
            onExperienceChange={handleExperienceChange}
            personalErrors={personalErrors}
            experienceErrors={experienceErrors}
            apiKey={apiKey} 
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto flex flex-col">
          <div className="flex justify-end mb-4">
            <ExportButton />
          </div>
          <ResumePreview ref={previewRef} data={resumeData} />
        </div>
      </main>

      <Footer />

      <ConfirmModal
        open={confirmOpen}
        title="Confirmar exclusão"
        description={confirmMessage}
        confirmText="Excluir"
        cancelText="Cancelar"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default App;

