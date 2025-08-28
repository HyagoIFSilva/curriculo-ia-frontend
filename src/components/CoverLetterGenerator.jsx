import React, { useState } from 'react';
import './CoverLetter.css';

function CoverLetterGenerator({ dados, onGenerate, isLoading }) {
  const [targetJob, setTargetJob] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGenerateClick = async () => {
    const letter = await onGenerate(targetJob, targetCompany);
    if (letter) {
      setGeneratedLetter(letter);
      setIsModalOpen(true);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    alert('Carta de apresentação copiada para a área de transferência!');
  };

  return (
    <div className="form-section">
      <h3>Suíte de Candidatura IA</h3>
      <div className="form-group-box">
        <div className="input-group">
          <label htmlFor="targetJob">Cargo Desejado</label>
          <input 
            id="targetJob" 
            type="text" 
            value={targetJob} 
            onChange={(e) => setTargetJob(e.target.value)} 
            placeholder="Ex: Desenvolvedor React Pleno"
          />
        </div>
        <div className="input-group">
          <label htmlFor="targetCompany">Empresa</label>
          <input 
            id="targetCompany" 
            type="text" 
            value={targetCompany} 
            onChange={(e) => setTargetCompany(e.target.value)}
            placeholder="Ex: Google"
          />
        </div>
        <button onClick={handleGenerateClick} disabled={isLoading} className="btn-ai full-width">
          {isLoading ? 'Gerando...' : 'Gerar Carta de Apresentação ✨'}
        </button>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Carta de Apresentação Gerada</h2>
            <textarea readOnly value={generatedLetter} rows="15"></textarea>
            <div className="modal-actions">
              <button onClick={copyToClipboard} className="btn-copy">Copiar Texto</button>
              <button onClick={() => setIsModalOpen(false)} className="btn-close">Fechar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoverLetterGenerator;