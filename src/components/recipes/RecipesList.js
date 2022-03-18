import React, { useEffect, useState } from "react"
import Settings from "../repositories/Settings"
import { RecipeCard } from "./RecipeCard"
// import "./RecipeCard.css"


//exports list of ALL recipes
export const RecipeList = (props) => {
    const [recipes, setRecipes] = useState([])
    //fetches all recipes
    useEffect(
        () => {
            fetch(`${Settings.remoteURL}/recipes`)
                .then(res => res.json())
                .then((data) => {
                    setRecipes(data)
                })
        }, []
    )

    //iterates through all recipes and runs them through the RecipeCard function
    return (
        
            <ul className="cardList">
                {recipes.map(
                    (recipe =>
                        <RecipeCard key={`recipe--${recipe.id}`} recipeParam={recipe} />
                ))}
            </ul>

    )

}
