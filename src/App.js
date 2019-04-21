import React, {useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';

const App = () => {

    const APP_ID = 'c95521a1';
    const APP_KEY = '09dea3a70e467ad557b5d76dd7729391';

    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState('');
    const [query, setQuery] = useState('chicken');


    useEffect(() => {
        getRecipes();
    }, [query]);

    const getRecipes = async () => {
        const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);

        const data = await response.json();
        setRecipes(data.hits);
        console.log(data.hits);

    };

    const getSearch = e => {
        e.preventDefault();
        setQuery(search);
        setSearch('');
    };

    const updateSearch = e => {
        setSearch(e.target.value);
        console.log(search);
    };

    return (
        <div className="App">
            <form onSubmit={getSearch} className="search-form">
                <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
                <button className="search-button" type="submit">Search</button>
            </form>
            <div className="recipes">
                {recipes.map(recipe => (
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
    )
};

export default App;
