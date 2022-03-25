import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import Settings from "../repositories/Settings";



//adds ingredient to users currentInventory
export const IngredientInput = ({user, fetchUser}) => {
    //creates new ingredient object in state
    const [newIngredient, update] = useState({ingredientId:0})

    //stores all ingredients in state
    const [ingredientList, updateList] = useState([])

    //function to alphabatize list, made by request from Ian McAllister
    const codeForIan = ( a,b) => {
            const nameA = a.name.toUpperCase()
            const nameB= b.name.toUpperCase()
            if (nameA < nameB) {
                return -1
            }
            if (nameA> nameB) {
                return 1
            }
            return 0
    }

    //fetches user with embedded inventory
    useEffect(
        () => {
            let queryString=`${Settings.remoteURL}/ingredients?`
            user.currentInventory?.forEach(currentInventory => {queryString +=`id_ne=${currentInventory.ingredientId}&`
        }
            );
                return fetch(queryString)
                .then(res => res.json())
                .then((data) => updateList(data.sort(codeForIan)))
                
            
            
            

        },[user.currentInventory]
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
                update({ingredientId:0})
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
                        <select className="ingredient" value={newIngredient.ingredientId}  onChange={
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
                <button onClick={submitIngredient}><a className="a--button">Add ingredient</a></button>
            </form>
        </>
    )
}
