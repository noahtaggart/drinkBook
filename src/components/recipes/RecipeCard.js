import React, { useEffect, useState } from "react"
import { Link, useParams, useHistory } from "react-router-dom"
import Settings from "../repositories/Settings"
import "./RecipeCard.css"

export const RecipeCard = ({ recipeParam }) => {
    //imports all recipe ingredients and filters them by current recipe
    const [recipeIngredients, setAmount] = useState([])
    //sets the params as recipeId
    const { recipeId } = useParams()
    //sets state for the current recipeObject
    const [recipeObject, setRecipe] = useState({ recipePhotos: [{ photoUrl: "" }] })
    const [editable, setEditable] = useState(false)
    //creates new recipe object in state
    const [editRecipe, update] = useState({
    })
    const history = useHistory()

    //function that posts the edit object to the recipes in the API
    const submitEditedRecipe = (evt) => {
        evt.preventDefault()
        const editObject = {
            name: editRecipe.name,
            userId: editRecipe.userId,
            description: editRecipe.description
        }

        const fetchOption = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editObject)
        }
        return fetch(`${Settings.remoteURL}/recipes/${recipeId}`, fetchOption)
            .then(() => {
                setEditable(false)
            })
            .then(() => {
                history.push(`/recipes/${recipeObject.id}`)
                

    })
}



    useEffect(() => {
        const defaultRecipe = {
            name: recipeObject.name,
            userId: recipeObject.userId,
            description: recipeObject.description
        }
        update(defaultRecipe)
    }, [recipeObject])

    //if recipeId exists (single recipe view), fetches the object with that Id. Sets to recipeObject
    useEffect(() => {
        if (recipeId) {
            fetch(`${Settings.remoteURL}/recipes/${recipeId}/?_embed=recipePhotos`)
                .then(res => res.json())
                .then((data) => {
                    setRecipe(data)
                })
        }
    }, [recipeId, editable]
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
        }, [recipeObject]
    )

    const SinglePageRender = () => {
        if (recipeId) {
            if (editable === false) {

                return <>
                    {parseInt(localStorage.getItem("drink_token")) === recipeObject.userId ?
                        <li className="card recipe--single">
                            <div className="card-body"><button onClick={() => setEditable(true)}>Edit Recipe</button>
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
                        : <li className="card recipe--single">
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
                    }
                </>
            } else {
                return (
                    <li className="card recipe--single">
                        <div className="card-body">
                            <input type="text" defaultValue={recipeObject.name} key={`recipeName--${recipeObject.id}`} className="card-title" onChange={e => {
                                const copy = { ...editRecipe }
                                copy.name = e.target.value
                                update(copy)
                            }} /><br></br>

                            {recipeObject.recipePhotos.length >= 1 ?
                                <img src={recipeObject.recipePhotos[0]?.photoUrl} alt={recipeObject.name} />
                                : ""
                            }
                            {recipeIngredients.map(
                                (recipeIngredient) => {
                                    return <div className="ingredient" key={`ingredientAmount--${recipeIngredient.id}`}>{recipeIngredient.ingredientAmount} of {recipeIngredient.ingredient.name}</div>
                                })}
                            <br></br>
                            <textarea onChange={e => {
                                const copy = { ...editRecipe }
                                copy.description = e.target.value
                                update(copy)
                            }} className="directions" defaultValue={recipeObject.description} />
                            <button className="btn btn-primary" onClick={submitEditedRecipe}>Save Changes</button>
                        </div>
                    </li>
                    //put recipe
                    //put recipe ingredients
                    //look into text area
                    //change editable back to false
                )
            }
        }
    }

    const ListPageRender = () => {
        if (recipeParam && localStorage.getItem("drink_token")) {
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
        } else if (localStorage.getItem("drink_token") === undefined) {
            return <>
                <li className="card recipe--list">
                    <div className="card-body">
                        <h3 key={`recipeName--${recipeObject.id}`} className="card-title">{recipeObject.name}
                        </h3>
                        {recipeObject.recipePhotos.length >= 1 ?

                            <img src={recipeObject.recipePhotos[0]?.photoUrl} alt={recipeObject.name} />
                            : ""
                        }


                        {recipeIngredients.map(
                            (recipeIngredient) => {
                                return <div className="ingredient" key={`ingredientAmount--${recipeIngredient.id}`}>{recipeIngredient.ingredientAmount} of {recipeIngredient.ingredient.name}</div>
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


//create edit option
