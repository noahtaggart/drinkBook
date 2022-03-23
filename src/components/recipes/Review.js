import React, { useEffect, useState } from "react"
import { Link, useHistory, useParams } from "react-router-dom"
import Settings from "../repositories/Settings"
import StarRatingComponent from "react-star-rating-component"

export const RecipeReview = ({recipeId}, {setReviewPage}) => {
    const [newReview, update] = useState({})
    const [starCountState, setStarCount] = useState({ rating: 0 })

    const submitReview = (evt) => {
        evt.preventDefault()

        if (newReview.headline && newReview.body && newReview.rating > 0){

            const newObject = {
                headline: newReview.headline,
                body: newReview.body,
                starRating: starCountState.rating,
                recipeId: recipeId,
                userId: parseInt(localStorage.getItem("drink_token")),
            }
            const fetchOption = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newObject)
            }
            return fetch(`${Settings.remoteURL}/ratings`, fetchOption)
            .then(setReviewPage(false))
            
        }


    }

    const onStarClick = (nextValue) => {
        setStarCount({ rating: nextValue });
    }


    return (
        <>
            <div>
                <h4>Create Review</h4>
                    <StarRatingComponent
                        name="rate1"
                        starCount={5}
                        starColor={"#ffb400"}
                        value={starCountState.rating}
                        onStarClick={(e) => { onStarClick(e) }}
                    />
                <div className="form-group">
                    <label htmlFor="review-headline">Add a headline</label><br></br>
                    <textarea required autoFocus className="review-headline"
                        onChange={e => {
                            const copy = { ...newReview }
                            copy.headline = e.target.value
                            update(copy)
                        }
                        }
                        placeholder="What's most important to know" /><br></br>
                    <label htmlFor="review-body">Add a written review</label><br></br>
                    <textarea required autoFocus className="review-body"
                        onChange={e => {
                            const copy = { ...newReview }
                            copy.body = e.target.value
                            update(copy)
                        }
                        }
                        placeholder="What did you like or dislike?" /><br></br>
                </div>
                <br></br>
                <button onClick={submitReview}><a className="a--button">Submit</a></button>
            </div>
        </>
    )

}