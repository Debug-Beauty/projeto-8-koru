import { useState } from 'react';
import type { ResumeData, Skill, Experience } from './types';
import ResumeForm from './components/ResumeForm';
import ResumePreview from './components/ResumePreview';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: { name: '', email: '', phone: '', linkedin: '', summary: '' },
    skills: [],
    experiences: [],
  });

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setResumeData(prevData => ({
      ...prevData,
      personalInfo: { ...prevData.personalInfo, [name]: value },
    }));
  };

  const addSkill = (skill: Omit<Skill, 'id'>) => {
    setResumeData(prevData => ({
      ...prevData,
      skills: [...prevData.skills, { ...skill, id: crypto.randomUUID() }],
    }));
  };

  const removeSkill = (id: string) => {
    setResumeData(prevData => ({
      ...prevData,
      skills: prevData.skills.filter(skill => skill.id !== id),
    }));
  };

  const addExperience = () => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
      isCurrent: false,
    };
    setResumeData(prevData => ({
      ...prevData,
      experiences: [...prevData.experiences, newExperience],
    }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prevData => ({
      ...prevData,
      experiences: prevData.experiences.filter(exp => exp.id !== id),
    }));
  };

  const handleExperienceChange = (id: string, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const inputValue = type === 'checkbox' && e.target instanceof HTMLInputElement ? e.target.checked : value;
    setResumeData(prevData => ({
      ...prevData,
      experiences: prevData.experiences.map(exp =>
        exp.id === id ? { ...exp, [name]: inputValue } : exp
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans flex flex-col">
      <Header />

      <main className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 p-8 max-w-7xl mx-auto w-full">

        <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto flex flex-col">
          <ResumeForm
            data={resumeData}
            onPersonalInfoChange={handlePersonalInfoChange}
            onAddSkill={addSkill}
            onRemoveSkill={removeSkill}
            onAddExperience={addExperience}
            onRemoveExperience={removeExperience}
            onExperienceChange={handleExperienceChange}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg overflow-y-auto flex flex-col">
          <ResumePreview data={resumeData} />
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default App;