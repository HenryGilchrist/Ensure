import { Trash2 } from 'lucide-react'
import { useState } from 'react'
import CreateReviewWindow from './createReviewWindow';
import DropdownButton from './dropdownButton';

function ReviewActionButtons({reviewObj, deleteReview, editReview}){
    const initialValues = {name: reviewObj.name, rating: reviewObj.rating, policy: reviewObj.policy, review: reviewObj.review};
    async function handleDelete(){
        const error = await deleteReview(reviewObj.id);
        if(error !== undefined) window.alert(error);
    }

    return(
        <div className="review-api-action-buttons">
            < DropdownButton title={"Edit"} haltScrolling={true} classPostfix={'action-button'} useChevron={false}>
                < CreateReviewWindow initialValues={initialValues} reviewID={reviewObj.id} parentRequest={editReview} />
            </DropdownButton>
            <div className="review-api-delete-wrapper">
                < Trash2 className="review-api-delete-button" onClick={handleDelete}/>
            </div>
        </div>
    )
}

export default ReviewActionButtons;