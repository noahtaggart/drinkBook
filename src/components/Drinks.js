import React from "react"
import { Route, Redirect, Link } from "react-router-dom"
import { RecipeList } from "./recipes/RecipesList"
import "./drinks.css"
import Login from "./auth/Login"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Register } from "./auth/Register"
import image from "../components/logo.png"

export const Drinks = () => {
    return (
        <>
            <Route
                render={() => {
                    if (localStorage.getItem("drink_token")) {
                        return (
                            <>
                                <Link to={`/recipes`} ><img src={image} alt="drinkbook logo"/></Link>
                                <NavBar />
                                <ApplicationViews />
                                <Redirect to="/recipes"/>
                            </>
                        );
                    } else {
                        return <Redirect to="/home" />;
                    }
                }}
            />
            <Route exact path="/home">
                <NavBar/>
                <RecipeList/>
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
        </>
    )
}