import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Settings from "../repositories/Settings"
import "./NavBar.css"

export const NavBar = (props) => {
const [currentUser, update] = useState({})

useEffect(() => {
    if (localStorage.getItem("drink_token")){

        fetch(`${Settings.remoteURL}/users/${parseInt(localStorage.getItem("drink_token"))}`)
        .then(res => res.json())
        .then((data) => {
            update(data)
        })
    }
},[])



    if (localStorage.getItem("drink_token")) {

        return (

            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/recipes">Recipes</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/autorecipes">Auto Recipes</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/liquorcabinet">Your Liquor Cabinet</Link>
                </li>
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/newrecipe">Add New Recipe</Link>
                </li>
                {currentUser.employee===true? <li className="navbar__item active"><Link className="navbar__link" to="/newIngredient">Add New Ingredient</Link></li>:""}
                


                <Link className="navbar__link" to="#"
                    onClick={
                        () => {
                            localStorage.removeItem("drink_token")
                        }
                    }>Logout({currentUser.username})</Link>
            </ul>
        )
    } else {
        return (
            <>

                <Link className="navbar__link" to="/login">Login</Link>

            </>



        )
    }
}