import './App.css';
import { useEffect, useState } from 'react';
import Recipe from './Recipe';

function App() {
  const APP_ID = '47188587'
  const APP_KEY = '8390b8493436033b16730ce2c457bcdd'
  const ACCESS_POINT = `https://api.edamam.com/api/recipes/v2?type=public&q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`

  const [recipe, setRecipe] = useState([])
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('chicken')

  useEffect(() => {
    getRecipes()
  }, [query])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json()
    setRecipe(data.hits)
    console.log(data.hits)
  }

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = e => {
    e.preventDefault()
    setQuery(search)
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form" action="">
        <input className="search-bar" type="text" name="" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">Search</button>
      </form>
      {recipe.map(recipe => (
        <Recipe 
        key={recipe.recipe.calories} 
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories} 
        image={recipe.recipe.image} 
        ingredients={recipe.recipe.ingredients}
        />
      ))}
    </div>
  );
}

export default App;
