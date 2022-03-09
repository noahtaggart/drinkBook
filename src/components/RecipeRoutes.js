import React from "react";
import { Route } from "react-router-dom";
import { RecipeList } from "./recipes/RecipesList";
import { RecipeCard } from "./recipes/RecipeCard";

export default () => {
    return (
        <>
        <Route exact path="/recipes">
            <RecipeList/>
        </Route>
        <Route path="/recipes/:recipeId(\d+)">
            <RecipeCard/>
            </Route>
        </>
    )
}