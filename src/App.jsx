import { useState, useRef, useEffect } from 'react';
import Editor from './components/Editor';
import Resume from './components/Resume';
import './App.css';

const initialState = {
  foto: '',
  nome: 'Seu Nome Aqui',
  resumo: 'Desenvolvedor apaixonado por criar soluções inovadoras e interfaces intuitivas, com sólida experiência em React e Node.js. Buscando novos desafios para aplicar e expandir minhas habilidades técnicas.',
  contato: { email: 'seu.email@exemplo.com', telefone: '(11) 98765-4321', linkedin: 'linkedin.com/in/seu-usuario' },
  habilidades: 'HTML, CSS, JavaScript, React, Node.js, SQL, Git, Scrum',
  idiomas: [{ idioma: 'Português', nivel: 'Nativo' }, { idioma: 'Inglês', nivel: 'Avançado' }],
  experiencias: [{ cargo: 'Desenvolvedor Front-end Sênior', empresa: 'Tech Solutions Inc.', periodo: 'Jan 2024 - Presente', descricao: 'Liderança no desenvolvimento do novo portal do cliente, resultando em um aumento de 20% na satisfação do usuário. Mentor de 3 desenvolvedores juniores.' }],
  formacoes: [{ instituicao: 'Universidade Exemplo', curso: 'Análise e Desenvolvimento de Sistemas', periodo: 'Jan 2021 - Dez 2023' }]
};

function App() {
  const resumeRef = useRef();
  const [template, setTemplate] = useState('layout-classic-modern');
  const [corTema, setCorTema] = useState('#0d6efd');
  const [dados, setDados] = useState(initialState);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isCoverLetterLoading, setIsCoverLetterLoading] = useState(false);

  useEffect(() => { document.documentElement.style.setProperty('--color-primary', corTema); }, [corTema]);

  useEffect(() => {
    const dadosSalvos = localStorage.getItem('resumeData');
    if (dadosSalvos) {
      const parsedData = JSON.parse(dadosSalvos);
      setDados(parsedData);
      if (parsedData.corTema) { setCorTema(parsedData.corTema); }
    }
  }, []);

  useEffect(() => { localStorage.setItem('resumeData', JSON.stringify({ ...dados, corTema })); }, [dados, corTema]);

  const handleDadosChange = (section, index, event) => {
    const { name, value } = event.target;
    const novosDados = { ...dados };
    if (section === 'experiencias' || section === 'formacoes' || section === 'idiomas') {
      novosDados[section][index][name] = value;
    } else if (section === 'contato') {
      novosDados[section][name] = value;
    } else {
      novosDados[section] = value;
    }
    setDados(novosDados);
  };

  const handleAddItem = (section) => {
    const novosDados = { ...dados };
    let newItem;
    if (section === 'experiencias') {
      newItem = { cargo: '', empresa: '', periodo: '', descricao: '' };
    } else if (section === 'formacoes') {
      newItem = { instituicao: '', curso: '', periodo: '' };
    } else if (section === 'idiomas') {
      newItem = { idioma: '', nivel: 'Básico' };
    }
    novosDados[section].push(newItem);
    setDados(novosDados);
  };

  const handleDeleteItem = (section, index) => {
    const novosDados = { ...dados };
    novosDados[section] = novosDados[section].filter((_, i) => i !== index);
    setDados(novosDados);
  };

  const handleFotoChange = (event) => {
    const file = event.target.files[0];
    if (file) { const reader = new FileReader(); reader.onloadend = () => { setDados({ ...dados, foto: reader.result }); }; reader.readAsDataURL(file); }
  };

  const handleDeleteFoto = () => setDados({ ...dados, foto: '' });

  const handleAiImprove = async (text, section, index = null) => {
    setIsAiLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/improve-text', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }), });
      if (!response.ok) { throw new Error('Falha na resposta da API'); }
      const data = await response.json();
      const novosDados = { ...dados };
      if (section === 'resumo') {
        novosDados.resumo = data.improvedText;
      } else if (section === 'experiencias') {
        novosDados.experiencias[index].descricao = data.improvedText;
      }
      setDados(novosDados);
    } catch (error) {
      console.error("Erro ao otimizar com IA:", error);
      alert("Não foi possível otimizar o texto.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleGenerateCoverLetter = async (targetJob, targetCompany) => {
    setIsCoverLetterLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData: dados, targetJob, targetCompany }),
      });
      if (!response.ok) { throw new Error('Falha na resposta da API'); }
      const data = await response.json();
      return data.coverLetter;
    } catch (error) {
      console.error("Erro ao gerar carta:", error);
      alert("Não foi possível gerar a carta de apresentação.");
    } finally {
      setIsCoverLetterLoading(false);
    }
  };

  return (
    <div className="app-container">
      <Editor
        dados={dados}
        template={template} setTemplate={setTemplate}
        corTema={corTema} setCorTema={setCorTema}
        onDadosChange={handleDadosChange}
        onAddItem={handleAddItem}
        onDeleteItem={handleDeleteItem}
        onFotoChange={handleFotoChange}
        onDeleteFoto={handleDeleteFoto}
        onAiImprove={handleAiImprove}
        isAiLoading={isAiLoading}
        onGenerateCoverLetter={handleGenerateCoverLetter}
        isCoverLetterLoading={isCoverLetterLoading}
      />
      <Resume ref={resumeRef} dados={{ ...dados, template }} />
    </div>
  );
}
export default App;