import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Settings from "../repositories/Settings"
import "./RecipeCard.css"

export const RecipeCard = ({recipeParam}) => {
    //imports all recipe ingredients and filters them by current recipe
    const [recipeIngredients, setAmount] = useState([])
    //sets the params as recipeId
    const { recipeId } = useParams()
    //sets state for the current recipeObject
    const [recipeObject, setRecipe] = useState({ recipePhotos: [{ photoUrl: "" }] })

    //if recipeId exists (single recipe view), fetches the object with that Id. Sets to recipeObject
    useEffect(() => {
        if (recipeId) {
            fetch(`${Settings.remoteURL}/recipes/${recipeId}/?_embed=recipePhotos`)
            .then(res => res.json())
            .then((data) => {
                setRecipe(data)
            })}
        }, [recipeId]
    )

    //if recipeParam exists (list view), fetches the object with that Id. Sets to recipeObject
    useEffect(
        () => {
            if (recipeParam) {
                fetch(`${Settings.remoteURL}/recipes/${recipeParam.id}/?_embed=recipePhotos`)
                .then(res => res.json())
                .then((data) => {
                    setRecipe(data)
                }
                )
            }
        }, [recipeParam]
    )
    
    //fetches recipeIngredients with expanded ingredients. matches to current recipeObject. Sets to recipeIngredients
    useEffect(
        () => {
            fetch(`${Settings.remoteURL}/recipeIngredients?_expand=ingredient`)
                .then(res => res.json())
                .then((data) => {
                    const matchedRecipeIngredients = data.filter(recipeIngredient => recipeIngredient.recipeId === recipeObject.id)
                    setAmount(matchedRecipeIngredients)
                })
        }, []
    )



    return (

        <li className="card recipe--single">
            <div className="card-body">
                <h3 key={`recipeName--${recipeObject.id}`} className="card-title"><Link to={`/recipes/${recipeObject.id}`}>{recipeObject.name}</Link>
                </h3>
                <img src={recipeObject.recipePhotos[0].photoUrl} alt={recipeObject.name} />
                {recipeIngredients.map(
                    (recipeIngredient) => {
                        return <div className="ingredient" key={`ingredientAmount--${recipeIngredient.id}`}>{recipeIngredient.ingredientAmount} of {recipeIngredient.ingredient.name}</div>
                    })}
                <br></br>
                <div className="directions">{recipeObject.description}</div>
            </div>
        </li>

    )
} 