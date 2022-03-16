import React from "react"
import { Route } from "react-router-dom"
import { IngredientDisplay } from "./liquorCabinet/IngredientDisplay"
import { IngredientList } from "./liquorCabinet/IngredientList"
import { NewIngredient } from "./liquorCabinet/NewIngredient"
import { EditRecipe } from "./recipes/EditRecipe"
import { NewRecipe } from "./recipes/NewRecipe"
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
            <Route exact path="/recipes/:recipeId(\d+)/edit">
                <EditRecipe />
            </Route>
            <Route exact path="/liquorcabinet">
                <IngredientList/>
                </Route>
            <Route exact path="/liquorcabinet/:ingredientId(\d+)">
                <IngredientDisplay/>
                </Route>
            <Route exact path="/newrecipe">
                <NewRecipe/>
            </Route>
            <Route exact path="/newingredient">
                <NewIngredient/>
            </Route>
            
        </>
    )
}