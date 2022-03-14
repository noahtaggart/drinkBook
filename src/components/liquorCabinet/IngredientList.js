//displays list of current ingredients from currentUser's currentInventory
//fetches from http://localhost:8088/users/{currentUser}/?_embed=currentInventory

import React, { useEffect, useState } from "react"
import Settings from "../repositories/Settings"
import { IngredientDisplay } from "./IngredientDisplay"
import { IngredientInput } from "./IngredientInput"



export const IngredientList = (props) => {
    const [user, setUser] = useState({})

    
    const fetchUser = () => {
        fetch(`${Settings.remoteURL}/users/?_embed=currentInventory`)
        .then(res => res.json())
        .then((data) => {
            const matchedUser = data.find(user => user.id === parseInt(localStorage.getItem("drink_token")))
            setUser(matchedUser)
        })}
            
            
            //fetches user with embedded inventory
            useEffect(
                () => {
                       fetchUser()
                    
                    
        
                },[]
            )
    
        //iterates through all ingredients and runs them through the ingredientCard function
    return (
        <>
        <ul>
        
        {user.currentInventory?.map(
            (ingredient) => 
            <IngredientDisplay key={`ingredient--${ingredient.id}`} ingredientParam={ingredient} fetchUser={fetchUser}/>
            )}
        </ul>
        <IngredientInput user={user} fetchUser={fetchUser} />
        </>
    )

}

