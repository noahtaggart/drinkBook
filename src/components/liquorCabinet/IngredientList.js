//displays list of current ingredients from currentUser's currentInventory
//fetches from http://localhost:8088/users/{currentUser}/?_embed=currentInventory

import React, { useEffect, useState } from "react"
import Settings from "../repositories/Settings"


export const IngredientList = (props) => {
    const [user, setUser] = useState({currentInventory:[{
        ingredientId:null
    }]})


    //fetches user with embedded inventory
    useEffect(
        () => {
                fetch(`${Settings.remoteURL}/users/${parseInt(localStorage.getItem("drink_token"))}/?_embed=currentInventory`)
            .then(res => res.json())
            .then((data) => {
                setUser(data)
            
            })
            

        },[]
    )
    
        //iterates through all ingredients and runs them through the ingredientCard function
    return (
        <>
        <ul>
        
        {user.currentInventory.map(
            (ingredient) => ingredient.ingredientId
            // <ingredientCard key={`ingredient--${ingredient.id}`} ingredientParam={ingredient}/>
            )}
        </ul>
            </>
    )

}

