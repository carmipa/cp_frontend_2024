import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/Home";
import "./index.css";  // Deve ser importado primeiro
import "./App.css";    // Deve ser importado depois para garantir que os estilos tenham prioridade

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
