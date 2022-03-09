import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Settings from "../repositories/Settings"
import "./RecipeCard.css"

export const RecipeCard = ({ recipeObject }) => {
    const [photos, setPhotos] = useState({ recipePhotos: [{ photoUrl: "" }] })
    const [recipeIngredients, setAmount] = useState([])
    const { recipeId } = useParams()

    useEffect(
        () => {
            fetch(`${Settings.remoteURL}/recipes/${recipeObject.id}/?_embed=recipePhotos`)
                .then(res => res.json())
                .then((data) => {
                    setPhotos(data)
                })
        }, []
    )

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
                <h3 key={`recipeName--${recipeObject.id}`} className="card-title">{recipeObject.name}
                </h3>
                <img src={photos.recipePhotos[0].photoUrl} alt={recipeObject.name} />
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