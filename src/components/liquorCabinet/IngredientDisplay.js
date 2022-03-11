import "./IngredientCard.css"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Settings from "../repositories/Settings"


export const IngredientDisplay = ({ingredientParam}) => {
    //sets params as ingredientId
    const { ingredientId } = useParams()
    //sets ingredients
    const [ingredient, setIngredient] = useState({id:0, name:""})


    //in single view page, sets ingredientId match as ingredient
    useEffect(() => {
        if(ingredientId) {

            fetch(`${Settings.remoteURL}/ingredients`)
            .then(res => res.json())
            .then((data) => {
                const matchedIngredient = data.find(ingredient => ingredient.id === 
                    //why is this a string?
                    parseInt(ingredientId))
                setIngredient(matchedIngredient)
                
                
            })
        }
    },[ingredientId])


//in list view page, sets the current ingredientParam as ingredient
    useEffect(() => {
        if (ingredientParam){
            fetch(`${Settings.remoteURL}/ingredients`)
            .then(res => res.json())
            .then((data) => {
                const matchedIngredient = data.find(ingredient => ingredient.id === ingredientParam.ingredientId)
            setIngredient(matchedIngredient)
        })
    }
    },[ingredientParam])
    
    
    
    
    
    return(
    <li className="card ingredient--single">
        <div className="card-body">
            <h3 key={`ingredientName--${ingredient.id}`} className="card-title"><Link to={`/liquorcabinet/${ingredient.id}`}>{ingredient.name}</Link></h3>
            {/* <img src={ingredient?.photoUrl} alt={ingredient.name} />
            <div className="ingredient--description">{ingredient?.description}</div> */}
            </div>
        </li>
    )
}

