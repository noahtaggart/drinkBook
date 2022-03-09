import React from "react"
import { Route, Redirect } from "react-router-dom"
import { RecipeList } from "./recipes/RecipesList"
import "./drinks.css"
import Login from "./auth/Login"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Register } from "./auth/Register"

export const Drinks = () => {
    return (
        <>
            <Route
                render={() => {
                    if (localStorage.getItem("drink_token")) {
                        return (
                            <>
                                <img src="drinkbook\src\components\logo.png" alt="drinkbook logo"/>
                                <NavBar />
                                <ApplicationViews />
                            </>
                        );
                    } else {
                        return <Redirect to="/login" />;
                    }
                }}
            />

            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </>
    )
}