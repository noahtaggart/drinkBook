import React from "react"
import { Route } from "react-router-dom"
import { RecipeCard } from "./recipes/RecipeCard"
import { RecipeList } from "./recipes/RecipesList"

export const ApplicationViews = () => {
    return (
        <>
        <Route exact path="/recipes">
            <RecipeList/>
            </Route>
            <Route exact path="/recipes/:recipeId(\d+)">
            <RecipeCard/>
            </Route>
        </>
    )
}