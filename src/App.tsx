import { useState } from 'react'

import './App.css'

const handleSubmit = (e) => {
    e.preventDefault();
    aoEnviar(Text); // Envia o dado para o componente pai
  };


function App() {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={Text}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Digite algo..."
      />
      <button type="submit">Enviar</button>
    </form>

  )
}

export default App
