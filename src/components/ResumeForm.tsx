import { useState } from "react";
import type { PersonalInfo, ResumeData, Skill, Experience } from "../types";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";
import type { PersonalErrors, ExperienceErrors } from "../hooks/useValidation";

// Props para o formulário de currículo
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

  // NOVO: mapas de erro
  personalErrors: PersonalErrors;
  experienceErrors: ExperienceErrors;
}

/* =======================
   Formulário: Dados Pessoais
======================= */
const PersonalInfoForm = ({
  data,
  onPersonalInfoChange,
  personalErrors,
}: {
  data: PersonalInfo;
  onPersonalInfoChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  personalErrors: PersonalErrors;
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
      </div>
    </section>
  );
};

/* =======================
   Formulário: Habilidades
======================= */
const SkillsForm = ({
  skills,
  onAddSkill,
  onRemoveSkill,
}: {
  skills: Skill[];
  onAddSkill: (skill: Omit<Skill, "id">) => void;
  onRemoveSkill: (id: string) => void;
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

/* =======================
   Formulário: Experiências
======================= */
const ExperienceForm = ({
  experiences,
  onAddExperience,
  onRemoveExperience,
  onExperienceChange,
  experienceErrors,
}: {
  experiences: Experience[];
  onAddExperience: () => void;
  onRemoveExperience: (id: string) => void;
  onExperienceChange: (
    id: string,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  experienceErrors: ExperienceErrors;
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

/* =======================
   Componente principal
======================= */
const ResumeForm = ({
  data,
  onPersonalInfoChange,
  onAddSkill,
  onRemoveSkill,
  onAddExperience,
  onRemoveExperience,
  onExperienceChange,
  personalErrors,
  experienceErrors,
}: ResumeFormProps) => {
  return (
    <form className="space-y-8 flex-grow" noValidate>
      <PersonalInfoForm
        data={data.personalInfo}
        onPersonalInfoChange={onPersonalInfoChange}
        personalErrors={personalErrors}
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
      />
    </form>
  );
};

export default ResumeForm;
