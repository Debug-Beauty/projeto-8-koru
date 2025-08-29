import type { ResumeData } from '../types';

interface ResumePreviewProps {
    data: ResumeData;
}

// Pré-visualização do currículo
const ResumePreview = ({ data }: ResumePreviewProps) => {
    const { personalInfo, skills, experiences } = data;

    return (
        <div className="text-gray-800 p-4 font-serif flex-grow">
            <header className="text-center mb-8">
                <h1 className="text-4xl font-bold tracking-wide">{personalInfo.name || "Seu Nome"}</h1>
                <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
                    <span>{personalInfo.email || "seu.email@exemplo.com"}</span>
                    <span>{personalInfo.phone || "(XX) XXXXX-XXXX"}</span>
                    <span>{personalInfo.linkedin || "linkedin.com/in/seu-perfil"}</span>
                </div>
            </header>

            <section className="mb-6">
                <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-2">Resumo</h2>
                <p className="text-sm text-justify">
                    {personalInfo.summary || "Aqui vai um breve resumo sobre suas qualificações e objetivos profissionais. Tente destacar seus pontos fortes e o que você busca na sua carreira."}
                </p>
            </section>

            {skills.length > 0 && (
                <section className="mb-6">
                    <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-2">Habilidades</h2>
                    <ul className="flex flex-wrap gap-2 mt-2">
                        {skills.map(skill => (
                            <li key={skill.id} className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                                {skill.name}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {experiences.length > 0 && (
                <section>
                    <h2 className="text-xl font-bold uppercase tracking-wider border-b-2 border-gray-300 pb-1 mb-2">Experiência</h2>
                    <div className="space-y-4 mt-2">
                        {experiences.map(exp => (
                            <div key={exp.id}>
                                <h3 className="font-bold text-md">{exp.role || "Cargo"}</h3>
                                <div className="flex justify-between text-sm italic text-gray-600">
                                    <span>{exp.company || "Empresa"}</span>
                                    {/* Lógica para exibir o período */}
                                    <span>
                                        {exp.startDate || "Início"} - {exp.isCurrent ? 'Presente' : (exp.endDate || "Fim")}
                                    </span>
                                </div>
                                <p className="text-sm mt-1 text-justify">{exp.description || "Descrição das suas atividades, projetos e responsabilidades no cargo."}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default ResumePreview;