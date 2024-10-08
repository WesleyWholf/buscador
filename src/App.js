import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';

import api from './services/api';

function App() {

  const [input, setInput] = useState('');

  const [cep, setCep] = useState({});

  async function handleSearch() {
    if(input === ''){
      alert("Preencha o campo com seu CEP")
      return;
    }
    

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      console.log(response.data)
      setInput("");

    }catch{
      alert("Ops, erro na busca");
      setInput("")

    }
  }

  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput">
        <input
        type="text"
        placeholder="Digite seu CEP"
        value={input}
        onChange={(e) => setInput(e.target.value) }
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff"/>
        </button>
      </div>

      {Object.keys(cep).length > 0 &&(

        <main>
          <h2>CEP: {cep.cep}</h2>

          <span>{cep.logradouro}</span>

          <span>Complemnto: {cep.complemento}</span>

          <span>{cep.bairro}</span>

          <span>{cep.localidade} - {cep.uf}</span>
        </main>

      )}

    </div>
  );
}

export default App;
