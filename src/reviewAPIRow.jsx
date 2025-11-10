import { returnStars } from './reviewGalleryCell'
import ReviewActionButtons from './reviewActionButtons';
import DropdownButton from './dropdownButton';
import { EllipsisVertical } from 'lucide-react'

function ReviewAPIRow({ reviewObj, userID, editReview, deleteReview }){
    const allowReviewUpdate = editReview !== undefined;

    function formatDateFromISO(isoString) {
        const [datePart, timePart] = isoString.split('T');
        const [year, month, day] = datePart.split('-');
        const [hours, minutes] = timePart.split(':');
        
        const monthString = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        
        const hourNum = parseInt(hours);
        const amOrPm = hourNum >= 12 ? 'PM' : 'AM';
        const twelveHourNum = hourNum % 12 || 12;
        
        const formattedTime = `${twelveHourNum}:${minutes.padStart(2, '0')} ${amOrPm}`;
        const formattedDate = `${day.padStart(2, '0')}/${month}/${year}`;
        
        return (
        <>
            {formattedDate}
            ,
            <br />
            {formattedTime}
        </>
        )
    }

    return(
        <div className="review-api-row">
            <div>
                <div className="review-api-row-name">{reviewObj.name}</div>
                <div className="review-api-row-policy">{reviewObj.policy}</div>
            </div>
            <div className="review-api-row-review-wrapper">
                <div className="review-api-row-rating">{returnStars(reviewObj.rating)}</div>
                <div className="review-api-row-review">{reviewObj.review}</div>
            </div>
            <div className="review-api-row-date">{formatDateFromISO(reviewObj.date)}</div>
            {
                allowReviewUpdate
                &&
                < DropdownButton title={<EllipsisVertical className="review-api-row-ellipsis" />} classPostfix={'row-edit'} useChevron={false}>
                    < ReviewActionButtons editReview={editReview} deleteReview={deleteReview} reviewObj={reviewObj}/>
                </DropdownButton>
                
            }
        </div>
    )
}

export default ReviewAPIRow;