import React, { forwardRef } from 'react'; // 1. Importe o forwardRef
import './Resume.css';

// 2. Envolva o componente com forwardRef
const Resume = forwardRef(({ dados }, ref) => {
  const { template, foto, nome, resumo, contato, habilidades, experiencias, formacoes } = dados;

  const renderContent = () => {
    // ... (função renderContent continua exatamente igual)
    const sections = (
      <>
        <section className="resume-section"><h2>Experiência Profissional</h2>{experiencias.map((exp, index) => (<div key={index} className="experience-item"><h3>{exp.cargo}</h3><p className="experience-details"><strong>{exp.empresa}</strong> | {exp.periodo}</p><p>{exp.descricao}</p></div>))}</section>
        <section className="resume-section"><h2>Formação Acadêmica</h2>{formacoes.map((formacao, index) => (<div key={index} className="education-item"><h3>{formacao.curso}</h3><p className="education-details"><strong>{formacao.instituicao}</strong> | {formacao.periodo}</p></div>))}</section>
      </>
    );

    switch (template) {
      case 'layout-creative-minimalist':
        return (<>
          <header className="main-header">{foto && <img src={foto} alt="Foto de Perfil" className="profile-photo" />}<h1>{nome}</h1><p>{resumo}</p><div className="contact-info"><p>{contato.email}</p><p>{contato.telefone}</p><p>{contato.linkedin}</p></div></header>
          <main className="resume-main-content">{sections}<section className="resume-section"><h2>Habilidades</h2><div className="skills-container">{habilidades.split(',').map((skill, index) => (skill.trim() && <span key={index} className="skill-tag">{skill.trim()}</span>))}</div></section></main>
        </>);
      case 'layout-data-centric':
        return (<>
          <header className="main-header"><h1>{nome}</h1><div className="contact-info"><p>{contato.email}</p><p>{contato.telefone}</p><p>{contato.linkedin}</p></div></header>
          <div className="content-grid"><div className="grid-item resume-summary"><p>{resumo}</p></div><div className="grid-item resume-skills"><h2>Habilidades</h2><div className="skills-container">{habilidades.split(',').map((skill, index) => (skill.trim() && <span key={index} className="skill-tag">{skill.trim()}</span>))}</div></div><div className="grid-item resume-main-col">{sections}</div></div>
        </>);
      case 'layout-classic-modern':
      default:
        return (<>
          <aside className="resume-sidebar">{foto && <img src={foto} alt="Foto de Perfil" className="profile-photo" />}<div className="sidebar-section"><h2>Contato</h2><p>{contato.email}</p><p>{contato.telefone}</p><p>{contato.linkedin}</p></div><div className="sidebar-section"><h2>Habilidades</h2><div className="skills-container-sidebar">{habilidades.split(',').map((skill, index) => (skill.trim() && <span key={index} className="skill-tag-sidebar">{skill.trim()}</span>))}</div></div></aside>
          <main className="resume-main-content"><header className="main-header"><h1>{nome}</h1><p>{resumo}</p></header>{sections}</main>
        </>);
    }
  };

  return (
    <div className="resume-container">
      {/* 3. Anexe a ref ao elemento que queremos capturar */}
      <div ref={ref} className={`resume-preview ${template}`}>
        {renderContent()}
      </div>
    </div>
  );
});

export default Resume;