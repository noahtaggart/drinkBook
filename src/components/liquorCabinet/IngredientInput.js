import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import Settings from "../repositories/Settings";



//adds ingredient to users currentInventory
export const IngredientInput = ({user, fetchUser}) => {
    //creates new ingredient object in state
    const [newIngredient, update] = useState({})

    //stores all ingredients in state
    const [ingredientList, updateList] = useState([])



    //fetches user with embedded inventory
    useEffect(
        () => {
            let queryString=`${Settings.remoteURL}/ingredients?`
            user.currentInventory?.forEach(currentInventory => {queryString +=`id_ne=${currentInventory.ingredientId}&`
        }
            );
                return fetch(queryString)
                .then(res => res.json())
                .then((data) => { updateList(data) })
            
            
            

        },[user]
    )

 
    const history = useHistory()

    //function that posts the new object to the currentInventory in the API
    const submitIngredient = (evt) => {
        evt.preventDefault()

        const newObject = {
            userId: parseInt(localStorage.getItem("drink_token")),
            ingredientId: newIngredient.ingredientId
        }

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newObject)
        }
        return fetch(`${Settings.remoteURL}/currentInventory`, fetchOption)
            .then(fetchUser)
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
                        <select className="ingredient" defaultValue={0} onChange={
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
                        </select>
                    </div>
                </fieldset>
                <button className="btn btn-primary" onClick={submitIngredient}><a className="a--button">Add ingredient</a></button>
            </form>
        </>
    )
}
