import { useState, useRef, useEffect } from 'react';
import Editor from './components/Editor';
import Resume from './components/Resume';
import './App.css';

const initialState = {
  foto: '',
  nome: 'Seu Nome Aqui',
  resumo: 'Desenvolvedor apaixonado por criar soluções inovadoras e interfaces intuitivas, com sólida experiência em React e Node.js. Buscando novos desafios para aplicar e expandir minhas habilidades técnicas.',
  contato: {
    email: 'seu.email@exemplo.com',
    telefone: '(11) 98765-4321',
    linkedin: 'linkedin.com/in/seu-usuario'
  },
  habilidades: 'HTML, CSS, JavaScript, React, Node.js, SQL, Git, Scrum',
  experiencias: [
    { cargo: 'Desenvolvedor Front-end Sênior', empresa: 'Tech Solutions Inc.', periodo: 'Jan 2024 - Presente', descricao: 'Liderança no desenvolvimento do novo portal do cliente, resultando em um aumento de 20% na satisfação do usuário. Mentor de 3 desenvolvedores juniores.' }
  ],
  formacoes: [
    { instituicao: 'Universidade Exemplo', curso: 'Análise e Desenvolvimento de Sistemas', periodo: 'Jan 2021 - Dez 2023' }
  ]
};

function App() {
  const resumeRef = useRef();
  const [template, setTemplate] = useState('layout-classic-modern');
  
  // Todo o nosso estado de dados agora vive em um único objeto
  const [dados, setDados] = useState(initialState);

  // useEffect para CARREGAR os dados do localStorage quando o app iniciar
  useEffect(() => {
    const dadosSalvos = localStorage.getItem('resumeData');
    if (dadosSalvos) {
      setDados(JSON.parse(dadosSalvos));
    }
  }, []); // O array vazio [] significa que este efeito roda apenas UMA VEZ

  // useEffect para SALVAR os dados no localStorage sempre que eles mudarem
  useEffect(() => {
    localStorage.setItem('resumeData', JSON.stringify(dados));
  }, [dados]); // Este efeito roda toda vez que o objeto 'dados' for alterado

  // Funções de manipulação agora atualizam o objeto 'dados'
  const handleDadosChange = (section, index, event) => {
    const { name, value } = event.target;
    const novosDados = { ...dados };

    if (section === 'experiencias' || section === 'formacoes') {
      novosDados[section][index][name] = value;
    } else if (section === 'contato') {
      novosDados[section][name] = value;
    } else {
      novosDados[section] = value; // Para nome, resumo, habilidades
    }
    setDados(novosDados);
  };
  
  const handleAddItem = (section) => {
    const novosDados = { ...dados };
    const newItem = section === 'experiencias' 
      ? { cargo: '', empresa: '', periodo: '', descricao: '' }
      : { instituicao: '', curso: '', periodo: '' };
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

  return (
    <div className="app-container">
      <Editor 
        dados={dados} 
        template={template}
        setTemplate={setTemplate}
        onDadosChange={handleDadosChange}
        onAddItem={handleAddItem}
        onDeleteItem={handleDeleteItem}
        onFotoChange={handleFotoChange}
        onDeleteFoto={handleDeleteFoto}
      />
      <Resume ref={resumeRef} dados={{ ...dados, template }} />
    </div>
  );
}
export default App;