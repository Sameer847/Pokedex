import React from "react";
import "./App.css"; // Add custom styles here
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS first


import PokemonList from "./components/PokemonList";
import Type from "./components/Type";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logo from "./assets/pokemon.svg";
function App() {
  return (
    <Router>
      <div className="App">
        <br />
        {/* <header className="App-header">
        <img src={Logo} alt="Pokemon Logo" className="pokemon-logo" />
      </header> */}
        {/* <PokemonList /> */}
        <Routes>
          <Route path="/" element={<PokemonList />} /> {/* Pokemon list page */}
          <Route path="/type" element={<Type />} /> {/* About page */}
        </Routes>
        <br />
      </div>
    </Router>
  );
}

export default App;
