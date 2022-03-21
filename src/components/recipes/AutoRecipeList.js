
import React, { useEffect, useState } from "react"
import Settings from "../repositories/Settings"
import { RecipeCard } from "./RecipeCard"


//exports list of ALL recipes
export const AutoRecipeList = (props) => {
    const [recipes, setRecipes] = useState([])
    const [userInventory, updateInventory] = useState([])

    //fetches current users Inventory
    useEffect(() => {
        fetch(`${Settings.remoteURL}/currentInventory`)
            .then(res => res.json())
            .then((data) => {
                const userIngredients = data.filter(ingredient => ingredient.userId === parseInt(localStorage.getItem("drink_token")))
                updateInventory(userIngredients)
            })
    }, [])

    //function for the .every() method. 
  const checkInventory = (recipeIngredient) => {
    //sets default boolean
    let inventoryCheck = false    
    //checks recipeIngredient against item from inventory
    for (const item of userInventory) {
            if (recipeIngredient.ingredientId === item.ingredientId)
            //if the user has the ingredient, returns true
            inventoryCheck = true
        } return inventoryCheck
  }

    //fetches matching recipes with embedded ingredients
    useEffect(
        () => {
            //defines empty array of recipes
            const newArray =[]
            return fetch(`${Settings.remoteURL}/recipes?_embed=recipeIngredients`)
                .then(res => res.json())
                .then((data) => {
                    for (const recipe of data) {
                        //checks every recipeIngredient
                        if (recipe.recipeIngredients.every(checkInventory) === true){
                            //if all ingredients return true, push recipe to new array
                            newArray.push(recipe)
                        }
                        
                    }
                })
                //sets recipes as array of matching recipes
                .then(() => setRecipes(newArray))
        }, [userInventory]
    )

    //iterates through all recipes and runs them through the RecipeCard function
    return (


        <ul className="cardList">
            {recipes.map(
                (recipe =>
                    <RecipeCard key={`recipe--${recipe.id}`} recipeParam={recipe} />
                ))}
        </ul>

    )

}