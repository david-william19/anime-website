import React from "react";
import { Route, Routes } from "react-router-dom";
import AnimeCollection from "./pages/AnimeCollection";
import AnimeList from "./pages/AnimeList";
import './index.css'
import AnimeCollectionDetail from "./pages/AnimeCollectionDetail";
import AnimeDetail from "./pages/AnimeDetail";

function App() {


  return (
      <Routes>
        <Route path="/" index element={<AnimeList />} />
        <Route path="/anime-collection" element={<AnimeCollection />} />
        <Route path="/anime-collection/:name" element={<AnimeCollectionDetail />} />
        <Route path="/anime-detail/:id" element={<AnimeDetail />} />
      </Routes>
  );
}

export default App;
