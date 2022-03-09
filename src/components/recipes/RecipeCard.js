import React, { useEffect, useState } from "react"
import Settings from "../repositories/Settings"

export const RecipeCard = (recipeObject) => {
    const [ingredientsAmounts, setIngredientsAmount] = useState([])
    const [ingredients, setIngredients] = useState([])
    const [photos, setPhotos] = useState([])

    useEffect(
        () => {
            fetch(`${Settings.remoteURL}/recipes/${recipeObject.id}/?_embed=recipeIngredients`)
            .then(res => res.json())
            .then((data) => {
                setIngredientsAmount(data)
            })
        },[]
    )
    useEffect(
        () => {
            fetch(`${Settings.remoteURL}/recipes/${recipeObject.id}/?_embed=recipePhotos`)
            .then(res => res.json())
            .then((data) => {
                setPhotos(data)
            })
        },[]
    )
    useEffect(
        () => {
            fetch(`${Settings.remoteURL}/ingredients`)
            .then(res => res.json())
            .then((data) => {
                setIngredients(data)
            })
        },[]
    )

    return (
        <>
            <li className="card animal--single">
                <div className="card-body">
                    <h5 className="card-title">{recipeObject.name}
                    </h5>   
                </div>
            </li>
        </>
    )
} 