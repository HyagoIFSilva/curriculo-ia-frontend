import React, { forwardRef } from 'react';
import './Resume.css';

const Resume = forwardRef(({ dados }, ref) => {
  const { template, foto, nome, resumo, contato, habilidades, experiencias, formacoes, idiomas } = dados;

  const renderSharedSections = () => (
    <>
      <section className="resume-section">
        <h2>Experiência Profissional</h2>
        {experiencias.map((exp, index) => (
          <div key={index} className="experience-item">
            <h3>{exp.cargo}</h3>
            <p className="experience-details"><strong>{exp.empresa}</strong> | {exp.periodo}</p>
            <p>{exp.descricao}</p>
          </div>
        ))}
      </section>
      <section className="resume-section">
        <h2>Formação Acadêmica</h2>
        {formacoes.map((formacao, index) => (
          <div key={index} className="education-item">
            <h3>{formacao.curso}</h3>
            <p className="education-details"><strong>{formacao.instituicao}</strong> | {formacao.periodo}</p>
          </div>
        ))}
      </section>
    </>
  );

  const renderContent = () => {
    switch (template) {
      case 'layout-creative-minimalist':
        return (
          <div className="resume-content-wrapper">
            <header className="main-header">
              {foto && <img src={foto} alt="Foto de Perfil" className="profile-photo" />}
              <h1>{nome}</h1>
              <p>{resumo}</p>
              <div className="contact-info">
                <p>{contato.email}</p><p>{contato.telefone}</p><p>{contato.linkedin}</p>
              </div>
            </header>
            <main className="resume-main-content">{renderSharedSections()}
              <section className="resume-section"><h2>Habilidades</h2><div className="skills-container">{habilidades.split(',').map((skill, index) => (skill.trim() && <span key={index} className="skill-tag">{skill.trim()}</span>))}</div></section>
              <section className="resume-section"><h2>Idiomas</h2><div className="languages-container">{idiomas.map((lang, index) => (<div key={index} className="language-item"><p><strong>{lang.idioma}:</strong> {lang.nivel}</p></div>))}</div></section>
            </main>
          </div>
        );

      case 'layout-data-centric':
        return (
          <div className="resume-content-wrapper">
            <header className="main-header"><h1>{nome}</h1><div className="contact-info"><p>{contato.email}</p><p>{contato.telefone}</p><p>{contato.linkedin}</p></div></header>
            <div className="content-grid">
              <div className="grid-item resume-summary"><p>{resumo}</p></div>
              <div className="grid-item resume-skills"><h2>Habilidades</h2><div className="skills-container">{habilidades.split(',').map((skill, index) => (skill.trim() && <span key={index} className="skill-tag">{skill.trim()}</span>))}</div></div>
              <div className="grid-item resume-languages"><div className="sidebar-section"><h2>Idiomas</h2><div className="languages-container">{idiomas.map((lang, index) => (<div key={index} className="language-item"><p><strong>{lang.idioma}:</strong> {lang.nivel}</p></div>))}</div></div></div>
              <div className="grid-item resume-main-col">{renderSharedSections()}</div>
            </div>
          </div>
        );
        
      case 'layout-classic-modern':
      default:
        return (
          <>
            <aside className="resume-sidebar">
              {foto && <img src={foto} alt="Foto de Perfil" className="profile-photo" />}
              <div className="sidebar-section"><h2>Contato</h2><p>{contato.email}</p><p>{contato.telefone}</p><p>{contato.linkedin}</p></div>
              <div className="sidebar-section"><h2>Habilidades</h2><div className="skills-container-sidebar">{habilidades.split(',').map((skill, index) => (skill.trim() && <span key={index} className="skill-tag-sidebar">{skill.trim()}</span>))}</div></div>
              <div className="sidebar-section"><h2>Idiomas</h2><div className="languages-container">{idiomas.map((lang, index) => (<div key={index} className="language-item"><p><strong>{lang.idioma}:</strong> {lang.nivel}</p></div>))}</div></div>
            </aside>
            <main className="resume-main-content">
              <header className="main-header"><h1>{nome}</h1><p>{resumo}</p></header>
              {renderSharedSections()}
            </main>
          </>
        );
    }
  };

  return (
    <div className="resume-container">
      <div ref={ref} className={`resume-preview ${template}`}>
        {renderContent()}
      </div>
    </div>
  );
});

export default Resume;