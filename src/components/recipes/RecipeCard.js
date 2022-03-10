import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Settings from "../repositories/Settings"
import "./RecipeCard.css"

export const RecipeCard = ({recipeParam}) => {
    const [photos, setPhotos] = useState({ recipePhotos: [{ photoUrl: "" }] })
    const [recipeIngredients, setAmount] = useState([])
    const { recipeId } = useParams()
    const [recipeObject, setRecipe] = useState({})

    useEffect(() => {
        if (recipeId) {
            fetch(`${Settings.remoteURL}/recipes/${recipeId}`)
            .then(res => res.json())
            .then((data) => {
                setRecipe(data)
            })}
        }, [recipeId]
    )
    useEffect(
        () => {
            if (recipeParam) {
                fetch(`${Settings.remoteURL}/recipes/${recipeParam.id}`)
                .then(res => res.json())
                .then((data) => {
                    setRecipe(data)
                }
                )
            }
        }, [recipeParam]
    )
    useEffect(
        () => {
            if (recipeId) {

                fetch(`${Settings.remoteURL}/recipes/${recipeId}/?_embed=recipePhotos`)
                .then(res => res.json())
                .then((data) => {
                    setPhotos(data)
                })
            }
        }, [recipeId]
    )
    useEffect(
        () => {
            if (recipeParam) {

                fetch(`${Settings.remoteURL}/recipes/${recipeParam.id}/?_embed=recipePhotos`)
                .then(res => res.json())
                .then((data) => {
                    setPhotos(data)
                })
            }
            }, [recipeParam]
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
                <h3 key={`recipeName--${recipeObject.id}`} className="card-title"><Link to={`/recipes/${recipeObject.id}`}>{recipeObject.name}</Link>
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