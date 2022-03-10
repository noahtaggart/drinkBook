import "./IngredientCard.css"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Settings from "../repositories/Settings"

export const IngredientDisplay = ({ingredientParam}) => {
    
    return <li className="card ingredient--single">
        <div className="card-body">
            <h3 key={`ingredientName--${ingredient.id}`} className="card-title"><Link to={`/liquorcabinet/${ingredient.id}`}>{ingredient.name}</Link></h3>
            </div>
        </li>
}