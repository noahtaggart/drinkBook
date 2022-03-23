//displays list of current ingredients from currentUser's currentInventory
//fetches from http://localhost:8088/users/{currentUser}/?_embed=currentInventory

import React, { useEffect, useState } from "react"
import Settings from "../repositories/Settings"
import { IngredientDisplay } from "./IngredientDisplay"
import { IngredientInput } from "./IngredientInput"
// import "./IngredientCard.css"



export const IngredientList = () => {
    const [user, setUser] = useState({})


    //fetches user with embedded inventory
    const fetchUser = () => {
        fetch(`${Settings.remoteURL}/users/?_embed=currentInventory`)
            .then(res => res.json())
            .then((data) => {
                const matchedUser = data.find(user => user.id === parseInt(localStorage.getItem("drink_token")))
                setUser(matchedUser)
            })
    }


    useEffect(
        () => {
            fetchUser()
        }, []
    )

    //iterates through all ingredients and runs them through the ingredientCard function
    return (
        <>
            <ul className="inventoryList">
                <li className="card ingredient--list">
                    <IngredientInput user={user} fetchUser={fetchUser} />
                </li>
                {user?.currentInventory?.map(
                    (ingredient) =>
                        <IngredientDisplay key={`ingredient--${ingredient.id}`} ingredientParam={ingredient} fetchUser={fetchUser} />
                )}
            </ul>
        </>
    )

}

