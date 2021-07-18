import './App.css';
import React, { useEffect, useState } from 'react';
import Recipe from './Recipe';

const App = () => {
  const APP_ID = "8a98dfa5";
  const APP_KEY = "22f8260f3c354faff39f874d1f393b89";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  useEffect(  () => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`); 
    const data = await response.json();
    setRecipes(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return(
    <div className="App">
      <h1 className="pagetitle">Search Any Recipe</h1>
      <form className="search-form" onSubmit={getSearch}>
        <input 
          type="text" 
          className="search-bar" 
          value={search}
          onChange={updateSearch}
          />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map(recipe =>(
          <Recipe 
          key={recipe.recipe.label}
          title={recipe.recipe.label} 
          calories={recipe.recipe.calories} 
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}
        />
        ))}
      </div>
    </div>
  );
};

export default App;
