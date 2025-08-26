import React from 'react';
import './Editor.css';

function Editor({ dados, template, setTemplate, onDadosChange, onAddItem, onDeleteItem, onFotoChange, onDeleteFoto }) {
  return (
    <div className="editor-container">
      <div className="export-section">
        <button onClick={() => window.print()} className="btn-export">
          Exportar para PDF
        </button>
      </div>
      <h2>Editor de Currículo</h2>
      <div className="form-section">
        <h3>Template</h3>
        <div className="template-switcher">
          <button onClick={() => setTemplate('layout-classic-modern')} className={template === 'layout-classic-modern' ? 'active' : ''}>Clássico</button>
          <button onClick={() => setTemplate('layout-creative-minimalist')} className={template === 'layout-creative-minimalist' ? 'active' : ''}>Minimalista</button>
          <button onClick={() => setTemplate('layout-data-centric')} className={template === 'layout-data-centric' ? 'active' : ''}>Moderno</button>
        </div>
      </div>
      <div className="form-section">
        <h3>Foto de Perfil</h3>
        <div className="form-group-box">
          <input type="file" accept="image/png, image/jpeg" onChange={onFotoChange} className="input-file" id="file-upload" />
          <label htmlFor="file-upload" className="btn-upload">Escolher Foto</label>
          {dados.foto && (<button onClick={onDeleteFoto} className="btn-delete-photo">Remover Foto</button>)}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="nome">Nome Completo</label>
        <input type="text" id="nome" name="nome" value={dados.nome} onChange={(e) => onDadosChange('nome', null, e)} />
      </div>
      <div className="form-section">
        <h3>Informações de Contato</h3>
        <div className="form-group-box">
          <input type="email" name="email" placeholder="E-mail" value={dados.contato.email} onChange={(e) => onDadosChange('contato', null, e)} />
          <input type="tel" name="telefone" placeholder="Telefone" value={dados.contato.telefone} onChange={(e) => onDadosChange('contato', null, e)} />
          <input type="text" name="linkedin" placeholder="URL do seu LinkedIn" value={dados.contato.linkedin} onChange={(e) => onDadosChange('contato', null, e)} />
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="resumo">Resumo Profissional</label>
        <textarea id="resumo" name="resumo" rows="5" value={dados.resumo} onChange={(e) => onDadosChange('resumo', null, e)}></textarea>
      </div>
      <div className="form-section">
        <h3>Experiência Profissional</h3>
        {dados.experiencias.map((exp, index) => (
          <div key={index} className="form-group-box">
            <input type="text" name="cargo" placeholder="Cargo" value={exp.cargo} onChange={(e) => onDadosChange('experiencias', index, e)} />
            <input type="text" name="empresa" placeholder="Empresa" value={exp.empresa} onChange={(e) => onDadosChange('experiencias', index, e)} />
            <input type="text" name="periodo" placeholder="Período" value={exp.periodo} onChange={(e) => onDadosChange('experiencias', index, e)} />
            <textarea name="descricao" rows="4" placeholder="Descrição" value={exp.descricao} onChange={(e) => onDadosChange('experiencias', index, e)}></textarea>
            <button onClick={() => onDeleteItem('experiencias', index)} className="btn-delete">Remover Experiência</button>
          </div>
        ))}
        <button onClick={() => onAddItem('experiencias')} className="btn-add">+ Adicionar Experiência</button>
      </div>
      <div className="form-section">
        <h3>Formação Acadêmica</h3>
        {dados.formacoes.map((formacao, index) => (
          <div key={index} className="form-group-box">
            <input type="text" name="instituicao" placeholder="Instituição" value={formacao.instituicao} onChange={(e) => onDadosChange('formacoes', index, e)} />
            <input type="text" name="curso" placeholder="Curso" value={formacao.curso} onChange={(e) => onDadosChange('formacoes', index, e)} />
            <input type="text" name="periodo" placeholder="Período" value={formacao.periodo} onChange={(e) => onDadosChange('formacoes', index, e)} />
            <button onClick={() => onDeleteItem('formacoes', index)} className="btn-delete">Remover Formação</button>
          </div>
        ))}
        <button onClick={() => onAddItem('formacoes')} className="btn-add">+ Adicionar Formação</button>
      </div>
      <div className="form-section">
        <h3>Habilidades</h3>
        <div className="form-group">
          <label htmlFor="habilidades">Liste suas habilidades separadas por vírgula</label>
          <textarea id="habilidades" name="habilidades" rows="4" value={dados.habilidades} onChange={(e) => onDadosChange('habilidades', null, e)}></textarea>
        </div>
      </div>
    </div>
  );
}
export default Editor;