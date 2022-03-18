
import React, { useState } from "react"
import { useHistory } from "react-router-dom";
import Settings from "../repositories/Settings";


//new ingredient { id: , name: , photoUrl: , description:""}

export const NewIngredient = () => {
    //creates new ingredient object in state
    const [newIngredient, update] = useState({})
    const history = useHistory()

    //function that posts the new object to the ingredients in the API
    const submitIngredient = (evt) => {
        evt.preventDefault()


        if (newIngredient.name && newIngredient.description) {

            const newObject = {
                name: newIngredient.name,
                description: newIngredient.description,
                photoUrl: newIngredient.photoUrl
            }

            const fetchOption = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newObject)
            }
            return fetch(`${Settings.remoteURL}/ingredients`, fetchOption)
                .then((data) => data.json())
                .then(() => {
                    history.push(`newingredients/`)
                })

        }


    }

    return (
        <>
            <li>

                <form className="IngredientForm">
                    <h4 className="IngredientForm_name">New Ingredient</h4>
                    <fieldset>
                        <div className="form-group">
                            <label htmlFor="ingredient">Name for Ingredient:</label><br></br>
                            <input type="text" required autoFocus className="ingredient"
                                onChange={e => {
                                    const copy = { ...newIngredient }
                                    copy.name = e.target.value
                                    update(copy)
                                }
                                }
                                placeholder="Ingredient name..." /><br></br>
                            <label htmlFor="ingredientDescription">Description:</label><br></br>
                            <input type="text" required autoFocus className="ingredientDescription" onChange={e => {
                                const copy = { ...newIngredient }
                                copy.description = e.target.value
                                update(copy)
                            }}
                                placeholder="Ingredient description..." /><br></br>
                            <label htmlFor="ingredientPhoto">Picture URL:</label><br></br>
                            <input type="text" required autoFocus className="ingredientPhoto" onChange={e => {
                                const copy = { ...newIngredient }
                                copy.photoUrl = e.target.value
                                update(copy)
                            }}
                                placeholder="Photo Url..." />
                        </div>
                    </fieldset>
                    <button className="btn btn-primary" onClick={submitIngredient}>Add Ingredient</button>
                </form>
            </li>
        </>
    )
}