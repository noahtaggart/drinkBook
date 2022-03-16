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
    //triggers editscreen
    const [editable, setEditable] = useState(false)
    //creates new recipe object in state
    const [editRecipe, update] = useState({})
    //creates new ingredient object in state
    const [newIngredient, updateNewIng] = useState({})
    //triggers ingredients to refresh
    const [ingredientReload, setIngredientReload] = useState(false)

    const [editableIngredients, setEditIng] = useState(false)

    //all ingredients
    const [ingredients, setIngredients] = useState([])

    const history = useHistory()

    //function that posts the edit object to the recipes in the API
    const submitEditedRecipe = (evt) => {
        evt.preventDefault()
        editedRecipe()

        setEditable(false)
        history.push(`/recipes/${recipeObject.id}`)

    }

    const editedRecipe = () => {
        const editRecipeObject = {
            name: editRecipe.name,
            userId: editRecipe.userId,
            description: editRecipe.description
        }

        const fetchOption = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editRecipeObject)
        }
        return fetch(`${Settings.remoteURL}/recipes/${recipeId}`, fetchOption)
    }

    
    const removeIngredientRecipe = (ingredientId) => {
        const currentItem = recipeIngredients.find(item => item.ingredientId === ingredientId)
        fetch(`${Settings.remoteURL}/recipeIngredients/${currentItem.id}`, {
            method: "DELETE"
        }).then(setIngredientReload(true))


    }

     //function that posts the new object to the recipeIngredients in the API
     const submitIngredient = () => {
        

        if (newIngredient.ingredientId >= 1 && newIngredient.ingredientAmount) {

        
        
        const newObject = {
            recipeId: recipeObject.id,
            ingredientId: newIngredient.ingredientId,
            ingredientAmount: newIngredient.ingredientAmount
            
        }
        

            const fetchOption = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newObject)
            }
            return fetch(`${Settings.remoteURL}/recipeIngredients`, fetchOption)

        }
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
                .then(setIngredientReload(false))
                .then((data) => {
                    setRecipe(data)
                })
        }
    }, [recipeId, editable, ingredientReload]
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

    //sets all ingredients
    useEffect(() => {
        fetch(`${Settings.remoteURL}/ingredients`)
            .then(res => res.json())
            .then((data) => {
                setIngredients(data)
            })
    }, [])

    const SinglePageRender = () => {
        if (recipeId) {
            //triggers if recipe is editable or not
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
                //screen for editable recipe
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
                            <div>
                                {editableIngredients === false ?
                                    <>
                                        {recipeIngredients.map(
                                            (recipeIngredient) => {
                                                return <div className="ingredient" key={`ingredientAmount--${recipeIngredient.id}`}> {recipeIngredient.ingredientAmount} of {recipeIngredient.ingredient.name}
                                                </div>
                                            })}
                                        <button onClick={() => setEditIng(true)}>Change Ingredients?</button>
                                    </>
                                    : //edit ingredients
                                    <>
                                        {
                                            recipeIngredients.map(
                                                (recipeIngredient) => {
                                                    return <div className="ingredient" key={`ingredientAmount--${recipeIngredient.id}`}> {recipeIngredient.ingredientAmount} of {recipeIngredient.ingredient.name}
                                                        <button onClick={() => {
                                                            removeIngredientRecipe(recipeIngredient.id)
                                                        }}>🗑️</button>
                                                    </div>


                                                })
                                        }
                                        <label htmlFor="ingredientAmount">How much?</label>
                                        <input type="text" autoFocus className="ingredientAmount" onChange={e => {
                                            const copy = { ...newIngredient }
                                            copy.ingredientAmount = e.target.value
                                            updateNewIng(copy)
                                        }} />
                                        <select className="ingredient" required defaultValue={0} onChange={(evt) => {
                                            const copy = { ...newIngredient }
                                            copy.ingredientId = parseInt(evt.currentTarget.value)
                                            updateNewIng(copy)
                                        }}>
                                            <option value="0" disabled hidden>Choose an ingredient...</option>
                                            {ingredients.map(ingredient => {
                                                return <option key={`ingredient--${ingredient.id}`} value={ingredient.id}>{ingredient.name}</option>

                                            })}
                                        </select>
                                        <button className="btn btn-primary" onClick={()=>submitIngredient()}>Add ingredient</button>
                                        <br></br>
                                        <button onClick={() => setEditIng(false)}>Done Changing Ingredients</button>
                                    </>


                                }


                            </div>
                            <br></br>
                            <textarea onChange={e => {
                                const copy = { ...editRecipe }
                                copy.description = e.target.value
                                update(copy)
                            }} className="directions" defaultValue={recipeObject.description} /> <br></br>
                            <button className="btn btn-primary" onClick={() => submitEditedRecipe}>Save Changes</button>
                        </div>
                    </li >
                    //put recipe
                    //put recipe ingredients

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


