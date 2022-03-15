import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Settings from "../repositories/Settings"
import { NewRecipeIngredient } from "./NewRecipeIngredient"
import "./RecipeCard.css"

export const RecipeCard = ({ recipeParam }) => {
    //imports all recipe ingredients and filters them by current recipe
    const [recipeIngredients, setAmount] = useState([])
    //sets the params as recipeId
    const { recipeId } = useParams()
    //sets state for the current recipeObject
    const [recipeObject, setRecipe] = useState({ recipePhotos: [{ photoUrl: "" }] })

    const [ingredientRefresh, update] = useState(false)







    //if recipeId exists (single recipe view), fetches the object with that Id. Sets to recipeObject
    useEffect(() => {
        if (recipeId) {
            fetch(`${Settings.remoteURL}/recipes/${recipeId}/?_embed=recipePhotos`)
                .then(res => res.json())
                .then((data) => {
                    setRecipe(data)
                })
        }
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
            if ("id" in recipeObject) {

                fetch(`${Settings.remoteURL}/recipeIngredients?recipeId=${recipeObject.id}&_expand=ingredient`)
                    .then(res => res.json())
                    .then((data) => {
                        setAmount(data)
                    })
            }
        },[recipeObject, ingredientRefresh ]
    )

    const SinglePageRender = () => {
        if (recipeId) {
            return <>
            <li className="card recipe--single">
                    <div className="card-body">
                        <h3 key={`recipeName--${recipeObject.id}`} className="card-title"><Link to={`/recipes/${recipeObject.id}`}>{recipeObject.name}</Link>
                        </h3>
                        {recipeObject.recipePhotos.length >= 1 ?
                            <img src={recipeObject.recipePhotos[0]?.photoUrl} alt={recipeObject.name} />
                            : ""
                        }
                        {recipeIngredients.map(
                            (recipeIngredient) => {
                                return <div className="ingredient" key={`ingredientAmount--${recipeIngredient.id}`}>{recipeIngredient.ingredientAmount} of <Link to={`/liquorcabinet/${recipeIngredient.ingredient.id}`}>{recipeIngredient.ingredient.name}</Link></div>
                            })}
                        <br></br>
                        <div className="directions">{recipeObject.description}</div>
                    </div>
                    {parseInt(localStorage.getItem("drink_token")) === recipeObject.userId? 
                    <NewRecipeIngredient ingredientRefresh={ingredientRefresh} updateIngredients={update} currentRecipeId={recipeObject.id}/>:""
                    }
                </li>
            </>
        }
    }

    const ListPageRender = () => {
        if (recipeParam) {
            return <>
            <li className="card recipe--list">
                    <div className="card-body">
                        <h3 key={`recipeName--${recipeObject.id}`} className="card-title"><Link to={`/recipes/${recipeObject.id}`}>{recipeObject.name}</Link>
                        </h3>
                        {recipeObject.recipePhotos.length >= 1 ?

                            <img src={recipeObject.recipePhotos[0]?.photoUrl} alt={recipeObject.name} />
                            : ""
                        }


                        {recipeIngredients.map(
                            (recipeIngredient) => {
                                return <div className="ingredient" key={`ingredientAmount--${recipeIngredient.id}`}>{recipeIngredient.ingredientAmount} of <Link to={`/liquorcabinet/${recipeIngredient.ingredient.id}`}>{recipeIngredient.ingredient.name}</Link></div>
                            })}
                        <br></br>
                        <div className="directions">{recipeObject.description}</div>
                    </div>
                </li>
            </>
        }
    }



    return (
        <>
        {SinglePageRender()}
        {ListPageRender()}
        </>

    )
} 
