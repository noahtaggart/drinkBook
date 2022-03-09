import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/recipes">Recipes</Link>
            </li>
            <Link className="navbar__link" to="#"
                onClick={
                    () => {
                        localStorage.removeItem("drink_token")
                    }
                }>Logout</Link>
        </ul>
    )
}