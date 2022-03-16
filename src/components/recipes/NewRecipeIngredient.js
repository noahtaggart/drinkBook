import React, { useEffect, useState } from "react"
import Settings from "../repositories/Settings"
import { useHistory } from "react-router-dom";

//new recipe { id: , name: , userId: , description:""}
//new ingredient {id: , recipeId: , ingredientId: , ingredientAmount}


export const NewRecipeIngredient = ({ currentRecipeId, ingredientRefresh, updateIngredients }) => {
    //all ingredients
    const [ingredientList, updateList] = useState([])
    //creates new ingredient object in state
    const [newIngredient, update] = useState({})
    //new recipe object in state
    const history = useHistory()

    //stores all ingredients in state
    useEffect(() => {
        fetch(`${Settings.remoteURL}/ingredients`)
            .then(res => res.json())
            .then((data) => { updateList(data) })
    }, [])






    //function that posts the new object to the recipeIngredients in the API
    const submitIngredient = (evt) => {
        evt.preventDefault()

        if (newIngredient.ingredientId >= 1 && newIngredient.ingredientAmount) {

        
        
        const newObject = {
            recipeId: currentRecipeId,
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
                .then(() => {
                    updateIngredients(!ingredientRefresh)
                    history.push(`/recipes/${currentRecipeId}`)
                })


        }
    }
    return (
        <>
            <form className="ingredientInventoryForm">
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="ingredient">Add New Ingredient?</label><br></br>
                        <select className="ingredient" required defaultValue={0} onChange={
                            (evt) => {
                                const copy = { ...newIngredient }
                                copy.ingredientId = parseInt(evt.currentTarget.value)
                                update(copy)
                            }
                        }>
                            <option value="0" disabled hidden>Choose an ingredient...</option>
                            {ingredientList.map(ingredient => {
                                return <option key={`ingredient--${ingredient.id}`} value={ingredient.id}>{ingredient.name}</option>

                            })}
                        </select><br></br>
                        <label htmlFor="ingredientAmount">How much?</label><br></br>
                        <input type="text" required autoFocus className="ingredient"
                            onChange={e => {
                                const copy = { ...newIngredient }
                                copy.ingredientAmount = e.target.value
                                update(copy)
                            }
                            }
                            placeholder="Ingredient amount, be sure to include units" /><br></br>
                    </div>
                </fieldset>
                <button className="btn btn-primary" onClick={submitIngredient}>Add ingredient</button>
            </form>
        </>
    )
}








