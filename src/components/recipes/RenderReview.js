import React, { useEffect, useState } from "react"
import StarRatingComponent from "react-star-rating-component"

export const ShowRecipeReview = ({ reviews }) => {
    
    const [recipeRating, setRating] = useState(0)




    useEffect(() => {
        let sum = 0
        if (reviews) {

            for (const review of reviews) {
                sum += review.starRating
                const averageRating = sum / reviews.length
                setRating(averageRating)
            }
        }
    }, [reviews])

    return (
        <>
                <div className="total-reviews">Total Reviews: {reviews.length}</div>
            {recipeRating > 0 ?
            <>
            <div className="average-box">

                <div className="average">Average rating:</div> <StarRatingComponent name="rate3"
                editing={false}
                value={recipeRating} /> ({recipeRating}/5)
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