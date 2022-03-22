
import React, { useState, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom";
import Settings from "../repositories/Settings";
import { NewRecipeIngredient } from "./NewRecipeIngredient";



//edit recipe { id: , name: , userId: , description:""}

//What I want it to do:
//1. show existing recipe card
//2. edit button that allows change to title, saves to recipe stateobject
//3. edit button that allows change to description, saves to recipe stateobject
//4A. Add Ingredient form, saves to statearray
//5. Edit button on each ingredient, edits ingredients in statearray, button sends to api
//4. Delete button on each ingredient, removes from api








export const EditRecipe = () => {
    const { recipeId } = useParams()
    //creates new recipe object in state
    const [editRecipe, update] = useState({
    })
    const history = useHistory()


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

//     return (
//         <>
//             <form className="RecipeForm">
//                 <h4 className="RecipeForm_name">Edit Recipe</h4>
//                 <fieldset>
//                     <div className="form-group">
//                         <label htmlFor="recipe">Name for Recipe:</label><br></br>
//                         <input type="text" required autoFocus className="recipe"
//                         onChange={e => {
//                             const copy = {...editRecipe}
//                             copy.name = e.target.value
//                             update(copy)
//                         }
//                     }
//                     value={editRecipe.name}/><br></br>
//                     <label htmlFor="recipeDescription">Directions:</label><br></br>
//                     <input type="text" required autoFocus className="recipeDescription" onChange={e => {
//                         const copy = {...editRecipe}
//                         copy.description = e.target.value
//                         update(copy)
//                     }}
//                     value={editRecipe.description}/>
//                     </div>
//                 </fieldset>
//                 <button className="btn btn-primary" onClick={submitEditedRecipe}>Save Changes</button>
//             </form>
//             <br></br>
//                     <NewRecipeIngredient currentRecipeId={recipeId}/>
//         </>
//     )
}