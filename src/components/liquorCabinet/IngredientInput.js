import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import Settings from "../repositories/Settings";

//adds ingredient to users currentInventory
export const IngredientInput = () => {
    
    //creates new ingredient object in state
    const [newIngredient, update] = useState({
       userId:null,
       ingredientId:null
    })
    
    //stores all ingredients in state
    const [ingredientList, updateList] = useState([])
    useEffect(() => {
        fetch(`${Settings.remoteURL}/ingredients`)
        .then(res => res.json())
        .then((data) => {updateList(data)})
    },[])
    
    const history = useHistory()

    //function that posts the new object to the currentInventory in the API
    const submitIngredient = (evt) => {

        const newObject = {
            userId: parseInt(localStorage.getItem("drink_token")),
            ingredientId: newIngredient.ingredientId
        }

        const fetchOption = {
            method:"POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObject)
        }
        return fetch(`${Settings.remoteURL}/currentInventory`, fetchOption)
            .then(() => {
                history.push("/liquorcabinet")
            })
    } 

    return (
        <>
        <form className="ingredientInventoryForm">
            <h4 className="ingredientInventoryForm_name">New Ingredient</h4>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="ingredient">Ingredient:</label>
                    <select className="ingredient"  onChange={
                                (evt) => {
                                    const copy = {...newIngredient}
                                    copy.ingredientId = parseInt(evt.currentTarget.value)
                                    update(copy)
                                }
                            }>
                        <option value="" disabled selected hidden>Choose an ingredient...</option>
                        {ingredientList.map(ingredient => {
                            return <option value={ingredient.id}>{ingredient.name}</option>
                        })}
                    </select>
                </div>
            </fieldset>


            <button className="btn btn-primary" onClick={submitIngredient}>Add ingredient</button>
        </form>
        </>
    )
    
    
    
    
}
 // userId: parseInt(localStorage.getItem("drink_token"),