import React, { useEffect, useState } from "react"
import StarRatingComponent from "react-star-rating-component"
import ReactStars from "react-rating-stars-component"

export const ShowRecipeReview = ({ reviews }) => {
    
    const [recipeRating, setRating] = useState({})




    useEffect(() => {
        let sum = 0
        if (reviews) {

            for (const review of reviews) {
                sum += review.starRating
                const averageRating = (sum / reviews.length)
                if (averageRating % 1 === 0) {
                    const roundedAverage = averageRating
                    const copy = {...recipeRating}
                copy.value = roundedAverage
                copy.edit = false
                copy.isHalf = true
                copy.activeColor = "#FCB401"
                copy.size=24
                setRating(copy)

                } else {
                    const roundedAverage = Math.round(averageRating *10) / 10
                    const fixedAverage = parseFloat(roundedAverage.toFixed(1))
                    const copy = {...recipeRating}
                copy.value = fixedAverage
                copy.edit = false
                copy.isHalf = true
                copy.activeColor = "#FCB401"
                copy.size=24
                setRating(copy)
            
                }
                
            }
        }
    }, [reviews])

    return (
        <>
                <div className="total-reviews">Total Reviews: {reviews.length}</div>
            {recipeRating.value > 0 ?
            <>
            <div className="average-box">

                <div className="average">Average rating:</div> <ReactStars {...recipeRating} /> ({recipeRating.value}/5)
                </div>
            </>
                : ""}
            <ul className="review-list">

                {reviews.map(review =>
                    < li key={`review--${review.id}`} className="review-card" >
                        <div className="review-header">

                            <StarRatingComponent
                                name="rate2"
                                editing={false}
                                value={review.starRating}
                            />
                            <div className="review-user">{review.user?.username}</div>
                        </div>
                        <h5 className="review-headline">
                            {review.headline}
                        </h5>
                        <div className="review-body">{review.body}</div>



                    </li>
                )}
            </ul>
        </>
    )

}