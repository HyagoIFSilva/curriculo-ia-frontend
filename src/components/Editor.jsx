import React from 'react';
import './Editor.css';

function Editor({ dados, template, setTemplate, corTema, setCorTema, onDadosChange, onAddItem, onDeleteItem, onFotoChange, onDeleteFoto, onAiImprove, isAiLoading }) {
  const coresDisponiveis = ['#0d6efd', '#198754', '#dc3545', '#ffc107', '#6f42c1', '#212529'];

  return (
    <div className="editor-container">
      <div className="export-section">
        <button onClick={() => window.print()} className="btn-export">Exportar para PDF</button>
      </div>
      
      <h2>Editor de Currículo</h2>
      
      <div className="form-section">
        <h3>Aparência</h3>
        <div className="appearance-controls">
          <div className="control-group">
            <label>Template</label>
            <div className="template-switcher">
              <button onClick={() => setTemplate('layout-classic-modern')} className={template === 'layout-classic-modern' ? 'active' : ''}>Clássico</button>
              <button onClick={() => setTemplate('layout-creative-minimalist')} className={template === 'layout-creative-minimalist' ? 'active' : ''}>Minimalista</button>
              <button onClick={() => setTemplate('layout-data-centric')} className={template === 'layout-data-centric' ? 'active' : ''}>Moderno</button>
            </div>
          </div>
          <div className="control-group">
            <label>Cor Principal</label>
            <div className="color-picker">{coresDisponiveis.map(cor => (<div key={cor} className={`color-swatch ${corTema === cor ? 'active' : ''}`} style={{ backgroundColor: cor }} onClick={() => setCorTema(cor)}/>))}</div>
          </div>
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
          <div className="input-group">
            <label htmlFor="email">E-mail</label>
            <input id="email" type="email" name="email" value={dados.contato.email} onChange={(e) => onDadosChange('contato', null, e)} />
          </div>
          <div className="form-row">
            <div className="input-group">
              <label htmlFor="telefone">Telefone</label>
              <input id="telefone" type="tel" name="telefone" value={dados.contato.telefone} onChange={(e) => onDadosChange('contato', null, e)} />
            </div>
            <div className="input-group">
              <label htmlFor="linkedin">LinkedIn</label>
              <input id="linkedin" type="text" name="linkedin" value={dados.contato.linkedin} onChange={(e) => onDadosChange('contato', null, e)} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="resumo">Resumo Profissional</label>
        <textarea id="resumo" name="resumo" rows="5" value={dados.resumo} onChange={(e) => onDadosChange('resumo', null, e)}></textarea>
        <button onClick={() => onAiImprove(dados.resumo, 'resumo')} disabled={isAiLoading} className="btn-ai">{isAiLoading ? 'Otimizando...' : 'Otimizar com IA ✨'}</button>
      </div>
      
      <div className="form-section">
        <h3>Experiência Profissional</h3>
        {dados.experiencias.map((exp, index) => (
          <div key={index} className="form-group-box">
            <div className="input-group"><label htmlFor={`cargo-${index}`}>Cargo</label><input id={`cargo-${index}`} type="text" name="cargo" value={exp.cargo} onChange={(e) => onDadosChange('experiencias', index, e)} /></div>
            <div className="form-row">
              <div className="input-group"><label htmlFor={`empresa-${index}`}>Empresa</label><input id={`empresa-${index}`} type="text" name="empresa" value={exp.empresa} onChange={(e) => onDadosChange('experiencias', index, e)} /></div>
              <div className="input-group"><label htmlFor={`periodo-exp-${index}`}>Período</label><input id={`periodo-exp-${index}`} type="text" name="periodo" value={exp.periodo} onChange={(e) => onDadosChange('experiencias', index, e)} /></div>
            </div>
            <div className="input-group"><label htmlFor={`descricao-${index}`}>Descrição</label><textarea id={`descricao-${index}`} name="descricao" rows="6" value={exp.descricao} onChange={(e) => onDadosChange('experiencias', index, e)}></textarea></div>
            <div className="action-buttons"><button onClick={() => onAiImprove(exp.descricao, 'experiencias', index)} disabled={isAiLoading} className="btn-ai">{isAiLoading ? 'Otimizando...' : 'Otimizar Descrição ✨'}</button><button onClick={() => onDeleteItem('experiencias', index)} className="btn-delete">Remover</button></div>
          </div>
        ))}
        <button onClick={() => onAddItem('experiencias')} className="btn-add">+ Adicionar Experiência</button>
      </div>
      
      <div className="form-section">
        <h3>Formação Acadêmica</h3>
        {dados.formacoes.map((formacao, index) => (
          <div key={index} className="form-group-box">
            <div className="input-group"><label htmlFor={`instituicao-${index}`}>Instituição</label><input id={`instituicao-${index}`} type="text" name="instituicao" value={formacao.instituicao} onChange={(e) => onDadosChange('formacoes', index, e)} /></div>
            <div className="form-row">
              <div className="input-group"><label htmlFor={`curso-${index}`}>Curso</label><input id={`curso-${index}`} type="text" name="curso" value={formacao.curso} onChange={(e) => onDadosChange('formacoes', index, e)} /></div>
              <div className="input-group"><label htmlFor={`periodo-form-${index}`}>Período</label><input id={`periodo-form-${index}`} type="text" name="periodo" value={formacao.periodo} onChange={(e) => onDadosChange('formacoes', index, e)} /></div>
            </div>
            <div className="action-buttons"><button onClick={() => onDeleteItem('formacoes', index)} className="btn-delete full-width">Remover</button></div>
          </div>
        ))}
        <button onClick={() => onAddItem('formacoes')} className="btn-add">+ Adicionar Formação</button>
      </div>
      
      <div className="form-section">
        <h3>Habilidades</h3>
        <div className="form-group"><label htmlFor="habilidades">Liste suas habilidades separadas por vírgula</label><textarea id="habilidades" name="habilidades" rows="4" value={dados.habilidades} onChange={(e) => onDadosChange('habilidades', null, e)}></textarea></div>
      </div>
      
      <div className="form-section">
        <h3>Idiomas</h3>
        {dados.idiomas.map((item, index) => (
          <div key={index} className="form-group-box language-item-editor">
            <div className="input-group"><label htmlFor={`idioma-${index}`}>Idioma</label><input id={`idioma-${index}`} type="text" name="idioma" value={item.idioma} onChange={(e) => onDadosChange('idiomas', index, e)} /></div>
            <div className="input-group"><label htmlFor={`nivel-${index}`}>Nível</label><select id={`nivel-${index}`} name="nivel" value={item.nivel} onChange={(e) => onDadosChange('idiomas', index, e)}><option value="Básico">Básico</option><option value="Intermediário">Intermediário</option><option value="Avançado">Avançado</option><option value="Fluente">Fluente</option><option value="Nativo">Nativo</option></select></div>
            <button onClick={() => onDeleteItem('idiomas', index)} className="btn-delete-item">Remover</button>
          </div>
        ))}
        <button onClick={() => onAddItem('idiomas')} className="btn-add">+ Adicionar Idioma</button>
      </div>
    </div>
  );
}
export default Editor;