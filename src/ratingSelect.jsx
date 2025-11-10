import FullStar from "./assets/icons/fullStar";
import HalfStar from "./assets/icons/halfStar";

import { useEffect, useState } from 'react'


function RatingSelect({ ratingVal, setRatingVal}){
    
    const [hoverVal, setHoverVal] = useState(0);
    const tenItems = new Array(5).fill(0);

    function returnSelectedRatingStars(){
            const higherRating = Math.max(ratingVal, hoverVal);

            const ratingCeiling = Math.ceil(higherRating);
            const ratingFloor = Math.floor(higherRating);
            const decimal = higherRating - ratingFloor;
        
            let arrayOfStars = [];
        
            for(let i = 0; i < ratingFloor; i++){
                arrayOfStars.push(< FullStar />);
            }
        
            if (decimal > 0) arrayOfStars.push(< HalfStar />);

            for(let i = 0; i < 5 - ratingCeiling; i++){
                arrayOfStars.push(< FullStar empty={true} />);
            }
        
            return arrayOfStars;
    }

    return(
        <div className="rating-select-wrapper">
            <div className="rating-select-star-wrapper">
            {
                returnSelectedRatingStars()
            }
            </div>
            <div className="rating-select-hitbox-wrapper">
            {
                tenItems.map((_, index) =>
                    <div className="rating-select-hitbox-cell">
                        <div 
                            className="rating-select-hitbox-cell-half"
                            onMouseEnter={() => setHoverVal(index + 0.5)}
                            onMouseLeave={() => setHoverVal(0)}
                            onClick={() => setRatingVal(index + 0.5)}
                        ></div>
                        <div 
                            className="rating-select-hitbox-cell-half"
                            onMouseEnter={() => setHoverVal(index + 1)}
                            onMouseLeave={() => setHoverVal(0)}
                            onClick={() => setRatingVal(index + 1)}
                        ></div>
                    </div>
                )
            }
            </div>
        </div>
    )
}

export default RatingSelect;