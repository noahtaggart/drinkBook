import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";
import Settings from "../repositories/Settings";

//adds ingredient to users currentInventory
export const ingredientInput = () => {
    
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
    const submitIngredient = (evt) => {
        evt.preventDefault()

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
                history.push("/currentInventory")
            })
    } 
    
    
    
    
}
 // userId: parseInt(localStorage.getItem("drink_token"),