import React from "react"
import { Route } from "react-router-dom"
import { RecipeList } from "./recipes/RecipesList"

export const ApplicationViews = () => {
    return (
        <>
        <Route exact path="/recipes">
            <RecipeList/>
            </Route>
        </>
    )
}