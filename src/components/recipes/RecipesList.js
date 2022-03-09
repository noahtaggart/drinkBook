import React, { useEffect, useState } from "react"
import Settings from "../repositories/Settings"
import { RecipeCard } from "./RecipeCard"

//exports list of ALL recipes
export const RecipeList = () => {
    const [recipes, setRecipes] = useState([])

    useEffect(
        () => {
            fetch(`${Settings.remoteURL}/recipes`)
            .then(res => res.json())
            .then((data) => {
                setRecipes(data)
            })
        },[]
    )

    return (
        <>
        {recipes.map(
            (recipe) => {
                return RecipeCard(recipe)
            }
        )}
        </>
    )

}