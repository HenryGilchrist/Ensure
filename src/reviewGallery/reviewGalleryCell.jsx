import FullStar from '../assets/icons/fullStar.jsx'
import HalfStar from '../assets/icons/halfStar.jsx'

export function returnStars(reviewRating){

    const ratingFloor = Math.floor(reviewRating);
    const decimal = reviewRating - ratingFloor;

    let arrayOfStars = [];

    for(let i = 0; i < ratingFloor; i++){
        arrayOfStars.push(< FullStar key={`star ${i}`} />);
    }

    if (decimal > 0) arrayOfStars.push(< HalfStar key={`half-star`} />);

    return arrayOfStars;
}

function ReviewGalleryCell({ reviewObj }){

    return(
    <>
        <div className="review-gallery-cell-text-wrapper">
            <div>
            {
                returnStars(reviewObj.rating)
            }
            <div className="review-gallery-cell-text-review">"{reviewObj.review}"</div>
            </div>
            
            <div className="review-gallery-cell-text-bottom-section">
                <div>
                    <div className="review-gallery-cell-text-name">{reviewObj.name}</div>
                    <div className="review-gallery-cell-text-policy">{reviewObj.policyType}</div>
                </div>
            </div>
        </div>
        <div className="review-gallery-cell-image" style={{backgroundImage: `url(${reviewObj.image})`}}></div>    
    </>
    )

}

export default ReviewGalleryCell;;