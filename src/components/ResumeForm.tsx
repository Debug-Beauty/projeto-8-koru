import { useState } from "react";
import type { PersonalInfo, ResumeData, Skill, Experience } from "../types";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import Button from "./ui/Button";

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
}

// Formulário para Dados Pessoais
const PersonalInfoForm = ({
    data,
    onPersonalInfoChange,
}: {
    data: PersonalInfo;
    onPersonalInfoChange: (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
}) => {
    const summaryMaxLength = 500;
    return (
        <section>
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Dados Pessoais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={onPersonalInfoChange}
                    placeholder="Nome Completo"
                />
                <Input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={onPersonalInfoChange}
                    placeholder="Email"
                />
                <Input
                    type="tel"
                    name="phone"
                    value={data.phone}
                    onChange={onPersonalInfoChange}
                    placeholder="Telefone"
                />
                <Input
                    type="url"
                    name="linkedin"
                    value={data.linkedin}
                    onChange={onPersonalInfoChange}
                    placeholder="LinkedIn URL"
                />
            </div>
            <Textarea
                name="summary"
                value={data.summary}
                onChange={onPersonalInfoChange}
                placeholder="Resumo Profissional"
                className="mt-4 h-28"
                maxLength={summaryMaxLength}
            />
        </section>
    );
};

// Formulário para Habilidades
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
                        setNewSkill({ ...newSkill, level: e.target.value as any })
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

// Formulário para Experiências
const ExperienceForm = ({
    experiences,
    onAddExperience,
    onRemoveExperience,
    onExperienceChange,
}: {
    experiences: Experience[];
    onAddExperience: () => void;
    onRemoveExperience: (id: string) => void;
    onExperienceChange: (
        id: string,
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
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
                {experiences.map((exp) => (
                    <div
                        key={exp.id}
                        className="bg-gray-50 p-4 rounded-md border relative"
                    >
                        <Button
                            type="button"
                            onClick={() => onRemoveExperience(exp.id)}
                            variant="destructive"
                        >
                            &times;
                        </Button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                type="text"
                                name="role"
                                value={exp.role}
                                onChange={(e) => onExperienceChange(exp.id, e)}
                                placeholder="Cargo"
                            />
                            <Input
                                type="text"
                                name="company"
                                value={exp.company}
                                onChange={(e) => onExperienceChange(exp.id, e)}
                                placeholder="Empresa"
                            />
                            <Input
                                type="text"
                                name="startDate"
                                value={exp.startDate}
                                onChange={(e) => onExperienceChange(exp.id, e)}
                                placeholder="Data de Início (Ex: Jan 2020)"
                            />
                            <Input
                                type="text"
                                name="endDate"
                                value={exp.isCurrent ? "Presente" : exp.endDate}
                                onChange={(e) => onExperienceChange(exp.id, e)}
                                placeholder="Data de Fim (Ex: Dez 2022)"
                                disabled={exp.isCurrent} // Desabilita o campo se for o trabalho atual
                                className={exp.isCurrent ? "bg-gray-200" : ""}
                            />
                        </div>
                        <Textarea
                            name="description"
                            value={exp.description}
                            onChange={(e) => onExperienceChange(exp.id, e)}
                            placeholder="Descrição das atividades"   
                            className="mt-4 h-28"                         
                        />

                        <div className="mt-2 flex items-center">
                            <input
                                type="checkbox"
                                id={`current-${exp.id}`}
                                name="isCurrent"
                                checked={exp.isCurrent}
                                onChange={(e) => onExperienceChange(exp.id, e)}
                                className="mr-2 h-4 w-4"
                            />
                            <label htmlFor={`current-${exp.id}`}>Trabalho atual</label>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};


const ResumeForm = ({
    data,
    onPersonalInfoChange,
    onAddSkill,
    onRemoveSkill,
    onAddExperience,
    onRemoveExperience,
    onExperienceChange,
}: ResumeFormProps) => {
    return (      
        <form className="space-y-8 flex-grow">
            <PersonalInfoForm
                data={data.personalInfo}
                onPersonalInfoChange={onPersonalInfoChange}
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
            />
        </form>
    );
};

export default ResumeForm;