
import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import Settings from "../repositories/Settings";


//new recipe { id: , name: , userId: , description:""}

export const NewRecipe = () => {
    //creates new recipe object in state
    const [newRecipe, update] = useState({})
    const history = useHistory()

    //function that posts the new object to the recipes in the API
    const submitRecipe = (evt) => {
        evt.preventDefault()

        if (newRecipe.name && newRecipe.description){

            const newObject = {
                name: newRecipe.name,
                userId: parseInt(localStorage.getItem("drink_token")),
                description: newRecipe.description
            }
            
            const fetchOption = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newObject)
            }
            return fetch(`${Settings.remoteURL}/recipes`, fetchOption)
            .then((data) => data.json())
            .then((data) => {
                //redirect to new recipe Objects page. how to get that id?
                history.push(`recipes/${data.id}`)
            })
        }


    }

    return (
        <>
            <form className="RecipeForm">
                <h4 className="RecipeForm_name">New Recipe</h4>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="recipe">Name for Recipe:</label><br></br>
                        <input type="text" required autoFocus className="recipe"
                        onChange={e => {
                            const copy = {...newRecipe}
                            copy.name = e.target.value
                            update(copy)
                        }
                    }
                    placeholder="Recipe name..."/><br></br>
                    <label htmlFor="recipeDescription">Directions:</label><br></br>
                    <textarea required autoFocus className="recipeDescription" onChange={e => {
                        const copy = {...newRecipe}
                        copy.description = e.target.value
                        update(copy)
                    }}
                    placeholder="Recipe directions..."/>
                    </div>
                </fieldset>
                <button className="btn btn-primary" onClick={submitRecipe}><a className="a--button">Add Recipe</a></button>
            </form>
        </>
    )
}