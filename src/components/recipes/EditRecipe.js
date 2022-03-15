
import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom";
import Settings from "../repositories/Settings";
import { NewRecipeIngredient } from "./NewRecipeIngredient";


//edit recipe { id: , name: , userId: , description:""}

export const EditRecipe = () => {
    const { recipeId } = useParams()
    //creates new recipe object in state
    const [editRecipe, update] = useState({
    })
    const history = useHistory()
    const [ingredientRefresh, updateIngredients] = useState(false)


    useEffect(() => {
        fetch(`${Settings.remoteURL}/recipes/${recipeId}`)
        .then(res => res.json())
        .then((data) => {
            update(data)
        })

    },[])

    //function that posts the edit object to the recipes in the API
    const submitEditedRecipe = (evt) => {
        evt.preventDefault()

        if (editRecipe.name && editRecipe.description){

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
            .then((data) => data.json())
            .then(() => {
                history.push(`/recipes/${recipeId}`)
            }
            )
        }


    }

    return (
        <>
            <form className="RecipeForm">
                <h4 className="RecipeForm_name">edit Recipe</h4>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="recipe">Name for Recipe:</label><br></br>
                        <input type="text" required autoFocus className="recipe"
                        onChange={e => {
                            const copy = {...editRecipe}
                            copy.name = e.target.value
                            update(copy)
                        }
                    }
                    placeholder={editRecipe.name}/><br></br>
                    <label htmlFor="recipeDescription">Directions:</label><br></br>
                    <input type="text" required autoFocus className="recipeDescription" onChange={e => {
                        const copy = {...editRecipe}
                        copy.description = e.target.value
                        update(copy)
                    }}
                    placeholder={editRecipe.description}/>
                    </div>
                </fieldset>
                <button className="btn btn-primary" onClick={submitEditedRecipe}>Finish Editing</button>
            </form>
            <br></br>
            <NewRecipeIngredient currentRecipeId={recipeId} ingredientRefresh={ingredientRefresh} updateIngredients={updateIngredients} />
        </>
    )
}