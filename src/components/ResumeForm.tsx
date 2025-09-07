import React, { useState } from "react";
import type { PersonalInfo, ResumeData, Skill, Experience } from "../types";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";
import AiButton from "./ui/AiButton";
import { improveText } from "../services/ai";
import type { PersonalErrors, ExperienceErrors } from "../hooks/useValidation";
import SuggestionsModal from "./SuggestionsModal";
import { Sparkles } from "lucide-react";

// Props dos Subcomponentes
interface PersonalInfoFormProps {
  data: PersonalInfo;
  onPersonalInfoChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  personalErrors: PersonalErrors;
  onImproveClick: (
    field: "summary",
    text: string,
    id?: undefined
  ) => Promise<void>;
  isLoading: boolean;
}

interface SkillsFormProps {
  skills: Skill[];
  onAddSkill: (skill: Omit<Skill, "id">) => void;
  onRemoveSkill: (id: string) => void;
}

interface ExperienceFormProps {
  experiences: Experience[];
  onAddExperience: () => void;
  onRemoveExperience: (id: string) => void;
  onExperienceChange: (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  experienceErrors: ExperienceErrors;
  onImproveClick: (
    field: "description",
    text: string,
    id: string
  ) => Promise<void>;
  loadingExperienceId: string | null;
}

interface ResumeFormProps {
  data: ResumeData;
  onPersonalInfoChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onAddSkill: (skill: Omit<Skill, "id">) => void;
  onRemoveSkill: (id: string) => void;
  onAddExperience: () => void;
  onRemoveExperience: (id: string) => void;
  onExperienceChange: (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  personalErrors: PersonalErrors;
  experienceErrors: ExperienceErrors;
  apiKey: string;
}

// Dados Pessoais
const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  data,
  onPersonalInfoChange,
  personalErrors,
  onImproveClick,
  isLoading,
}) => {
  const summaryMaxLength = 500;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">Dados Pessoais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            type="text"
            name="name"
            value={data.name}
            onChange={onPersonalInfoChange}
            placeholder="Nome completo"
            aria-invalid={!!personalErrors.name}
            className={personalErrors.name ? "border-red-500" : ""}
          />
          {personalErrors.name && (
            <p className="mt-1 text-sm text-red-600">{personalErrors.name}</p>
          )}
        </div>
        <div>
          <Input
            type="email"
            name="email"
            value={data.email}
            onChange={onPersonalInfoChange}
            placeholder="E-mail"
            aria-invalid={!!personalErrors.email}
            className={personalErrors.email ? "border-red-500" : ""}
          />
          {personalErrors.email && (
            <p className="mt-1 text-sm text-red-600">{personalErrors.email}</p>
          )}
        </div>
        <div>
          <Input
            type="tel"
            name="phone"
            value={data.phone}
            onChange={onPersonalInfoChange}
            placeholder="Telefone (DDD + número)"
            inputMode="numeric"
            aria-invalid={!!personalErrors.phone}
            className={personalErrors.phone ? "border-red-500" : ""}
          />
          {personalErrors.phone && (
            <p className="mt-1 text-sm text-red-600">{personalErrors.phone}</p>
          )}
        </div>
        <div>
          <Input
            type="url"
            name="linkedin"
            value={data.linkedin}
            onChange={onPersonalInfoChange}
            placeholder="LinkedIn URL"
            aria-invalid={!!personalErrors.linkedin}
            className={personalErrors.linkedin ? "border-red-500" : ""}
          />
          {personalErrors.linkedin && (
            <p className="mt-1 text-sm text-red-600">
              {personalErrors.linkedin}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <Textarea
          name="summary"
          value={data.summary}
          onChange={onPersonalInfoChange}
          placeholder="Resumo Profissional (máx. 500 caracteres)"
          className="h-28"
          maxLength={summaryMaxLength}
        />
        <div className="text-right text-xs text-gray-500 mt-1">
          {data.summary.length}/{summaryMaxLength}
        </div>
        <div className="flex justify-end mt-2">
          <AiButton
            onClick={() => onImproveClick("summary", data.summary)}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                <Sparkles size={16} />
                <span>Processando...</span>
              </>
            ) : (
              <>
                <Sparkles size={16} />
                <span>Melhorar com IA</span>
              </>
            )}
          </AiButton>
        </div>
      </div>
    </section>
  );
};

// Habilidades
const SkillsForm: React.FC<SkillsFormProps> = ({
  skills,
  onAddSkill,
  onRemoveSkill,
}) => {
  const [newSkill, setNewSkill] = useState<{
    name: string;
    level: "Básico" | "Intermediário" | "Avançado";
  }>({ name: "", level: "Básico" });

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      onAddSkill(newSkill);
      setNewSkill({ name: "", level: "Básico" });
    }
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 border-b pb-2">Habilidades</h2>
      <div className="flex items-center gap-2 mb-4">
        <Input
          type="text"
          value={newSkill.name}
          onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
          placeholder="Nome da habilidade"
          className="flex-grow"
        />
        <select
          value={newSkill.level}
          onChange={(e) =>
            setNewSkill({
              ...newSkill,
              level: e.target.value as "Básico" | "Intermediário" | "Avançado",
            })
          }
          className="p-2 border rounded"
        >
          <option>Básico</option>
          <option>Intermediário</option>
          <option>Avançado</option>
        </select>
        <Button type="button" onClick={handleAddSkill}>
          Adicionar
        </Button>
      </div>
      <ul className="space-y-2">
        {skills.map((skill) => (
          <li
            key={skill.id}
            className="flex items-center justify-between bg-gray-100 p-2 rounded"
          >
            <span>
              {skill.name}{" "}
              <span className="text-sm text-gray-500">({skill.level})</span>
            </span>
            <Button
              type="button"
              onClick={() => onRemoveSkill(skill.id)}
              variant="ghost"
            >
              Remover
            </Button>
          </li>
        ))}
      </ul>
    </section>
  );
};

// Experiências
const ExperienceForm: React.FC<ExperienceFormProps> = ({
  experiences,
  onAddExperience,
  onRemoveExperience,
  onExperienceChange,
  experienceErrors,
  onImproveClick,
  loadingExperienceId,
}) => {
  return (
    <section>
      <div className="flex justify-between items-center mb-4 border-b pb-2">
        <h2 className="text-2xl font-bold">Experiências</h2>
        <Button type="button" onClick={onAddExperience}>
          Adicionar Experiência
        </Button>
      </div>
      <div className="space-y-6">
        {experiences.map((exp) => {
          const errs = experienceErrors[exp.id] || {};
          const isCurrent = !!exp.isCurrent;
          const isCurrentLoading = loadingExperienceId === exp.id;

          return (
            <div
              key={exp.id}
              className="bg-gray-50 p-4 rounded-md border relative"
            >
              <div className="absolute right-3 top-3">
                <Button
                  type="button"
                  onClick={() => onRemoveExperience(exp.id)}
                  variant="destructive"
                  aria-label="Remover experiência"
                  title="Remover experiência"
                >
                  &times;
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Input
                    type="text"
                    name="role"
                    value={exp.role}
                    onChange={(e) => onExperienceChange(exp.id, e)}
                    placeholder="Cargo"
                    aria-invalid={!!errs.role}
                    className={errs.role ? "border-red-500" : ""}
                  />
                  {errs.role && (
                    <p className="mt-1 text-sm text-red-600">{errs.role}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="text"
                    name="company"
                    value={exp.company}
                    onChange={(e) => onExperienceChange(exp.id, e)}
                    placeholder="Empresa"
                    aria-invalid={!!errs.company}
                    className={errs.company ? "border-red-500" : ""}
                  />
                  {errs.company && (
                    <p className="mt-1 text-sm text-red-600">{errs.company}</p>
                  )}
                </div>
                <div>
                  <Input
                    type="text"
                    name="startDate"
                    value={exp.startDate}
                    onChange={(e) => onExperienceChange(exp.id, e)}
                    placeholder="Data de início (dd/mm/aaaa)"
                    inputMode="numeric"
                    aria-invalid={!!errs.startDate}
                    className={errs.startDate ? "border-red-500" : ""}
                  />
                  {errs.startDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errs.startDate}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    type="text"
                    name="endDate"
                    value={isCurrent ? "" : exp.endDate}
                    onChange={(e) => onExperienceChange(exp.id, e)}
                    placeholder={
                      isCurrent ? "Presente" : "Data de fim (dd/mm/aaaa)"
                    }
                    disabled={isCurrent}
                    inputMode="numeric"
                    aria-invalid={!!errs.endDate}
                    className={`${isCurrent ? "bg-gray-200" : ""} ${
                      errs.endDate ? "border-red-500" : ""
                    }`}
                  />
                  {errs.endDate && (
                    <p className="mt-1 text-sm text-red-600">{errs.endDate}</p>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <Textarea
                  name="description"
                  value={exp.description}
                  onChange={(e) => onExperienceChange(exp.id, e)}
                  placeholder="Descrição das atividades"
                  className="h-28"
                />
                <div className="flex justify-end mt-2">
                  <AiButton
                    onClick={() =>
                      onImproveClick("description", exp.description, exp.id)
                    }
                    disabled={!!loadingExperienceId}
                  >
                    {isCurrentLoading ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                        <Sparkles size={16} />
                        <span>Processando...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={16} />
                        <span>Melhorar com IA</span>
                      </>
                    )}
                  </AiButton>
                </div>
              </div>
              <div className="mt-2 flex items-center">
                <input
                  type="checkbox"
                  id={`current-${exp.id}`}
                  name="isCurrent"
                  checked={isCurrent}
                  onChange={(e) => onExperienceChange(exp.id, e)}
                  className="mr-2 h-4 w-4"
                />
                <label htmlFor={`current-${exp.id}`}>Trabalho atual</label>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// Componente Principal
const ResumeForm: React.FC<ResumeFormProps> = ({
  data,
  onPersonalInfoChange,
  onAddSkill,
  onRemoveSkill,
  onAddExperience,
  onRemoveExperience,
  onExperienceChange,
  personalErrors,
  experienceErrors,
  apiKey,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [modalTarget, setModalTarget] = useState<{
    field: "summary" | "description";
    id?: string;
  } | null>(null);

  const handleImproveClick = async (
    field: "summary" | "description",
    text: string,
    id?: string
  ) => {
    setModalTarget({ field, id });
    setIsLoading(true);
    setSuggestions([]);
    setIsModalOpen(true);

    try {
      const prompt =
        field === "summary"
          ? "Aja como um recrutador experiente. Melhore o seguinte resumo profissional para um currículo. Mantenha um tom profissional e incorpore palavras-chave relevantes para a área de atuação. O foco principal é corrigir erros de gramática e ortografia, melhorar a fluência e otimizar o texto para ter o máximo de impacto e densidade de informação."
          : "Aja como um recrutador experiente. Melhore a seguinte descrição de experiência profissional para um currículo. Use verbos de ação fortes no início das frases e quantifique os resultados e responsabilidades sempre que possível (por exemplo, 'aumentou as vendas em 20%', 'gerenciou uma equipe de 5 pessoas'). O foco principal é corrigir erros de gramática e ortografia, melhorar a fluência e otimizar o texto para ter o máximo de impacto e densidade de informação.";
      
      const minDelay = new Promise(resolve => setTimeout(resolve, 1000));
      const improvePromise = improveText(apiKey, prompt, text);

      const [result] = await Promise.all([improvePromise, minDelay]);

      setSuggestions(result.suggestions);
    } catch (error) {
      console.error("Falha ao buscar sugestões da IA:", error);
      setSuggestions(["Houve um erro ao buscar sugestões. Tente novamente."]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectSuggestion = (selectedText: string) => {
    if (!modalTarget) return;

    if (modalTarget.field === "summary") {
      onPersonalInfoChange({
        target: { name: "summary", value: selectedText },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    } else if (modalTarget.field === "description" && modalTarget.id) {
      onExperienceChange(modalTarget.id, {
        target: { name: "description", value: selectedText },
      } as React.ChangeEvent<HTMLTextAreaElement>);
    }

    setIsModalOpen(false);
    setModalTarget(null);
  };

  return (
    <>
      <SuggestionsModal
        open={isModalOpen}
        title="Sugestões da IA"
        isLoading={isLoading}
        suggestions={suggestions}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectSuggestion}
      />

      <form className="space-y-8 flex-grow" noValidate>
        <PersonalInfoForm
          data={data.personalInfo}
          onPersonalInfoChange={onPersonalInfoChange}
          personalErrors={personalErrors}
          onImproveClick={handleImproveClick}
          isLoading={isLoading && modalTarget?.field === "summary"}
        />
        <SkillsForm
          skills={data.skills}
          onAddSkill={onAddSkill}
          onRemoveSkill={onRemoveSkill}
        />
        <ExperienceForm
          experiences={data.experiences}
          onAddExperience={onAddExperience}
          onRemoveExperience={onRemoveExperience}
          onExperienceChange={onExperienceChange}
          experienceErrors={experienceErrors}
          onImproveClick={handleImproveClick}
          loadingExperienceId={
            isLoading && modalTarget?.field === "description"
              ? modalTarget.id ?? null
              : null
          }
        />
      </form>
    </>
  );
};

export default ResumeForm;

