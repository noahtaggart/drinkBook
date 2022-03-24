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
            {recipeRating > 0 ?
                <div className="average">Average rating: {recipeRating}</div>
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