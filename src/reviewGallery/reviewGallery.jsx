import { useState, useRef } from 'react'
import LeftArrowIcon from '../assets/icons/leftArrowIcon.jsx'
import RightArrowIcon from '../assets/icons/rightArrowIcon.jsx'
import ReviewGalleryCell from './reviewGalleryCell.jsx';

function ReviewGallery({ featuredReviews }){

        

        // Control CSS Transformations using State
        const [cellWrapperTransform, setCellWrapperTransform] = useState("");

        const cellWrapperRef = useRef(null);
        const firstCellRef = useRef(null);
        const secondCellRef = useRef(null);
        const [buttonDisabled, setButtonDisabled] = useState(false);
        const [reviewIndex,setReviewIndex] = useState(0);

        const totalCellOffsetWidth = "(var(--featuredReviewCellWidth) + var(--featuredReviewCellWrapperPadding))";

        const transitionDurationStr = getComputedStyle(document.documentElement)
            .getPropertyValue("--featuredReviewSlideTime")
            .slice(0, -1); // Remove Last Character 's' from e.g. '0.5s'

        const transitionDurationMS = Number(transitionDurationStr) * 1000;

        async function sleep(ms){
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        function snapWrapperToSide(toEndBool = false, indexPastN = 0){
            /* 
                ToEndBool is a boolean. Which we convert to 1 or 0 (true or false)
                1 means the wrapper is pushed all the way right, past cell N - wrapping round to index 1.
                0 means it's in it's original position.
            */
           const toEnd = Number(toEndBool);

            cellWrapperRef.current.style.transition = "none";
            cellWrapperRef.current.style.transform = 
                `translateX(calc( 
                    -${toEnd} * 
                    ( ${indexPastN} * ${totalCellOffsetWidth} )
                ))`;
            
            // Force DOM reflow with dynamic request:
            forceReactReflow();

            // Reset Wrapper Transition to default CSS
            cellWrapperRef.current.style.transition = "";

        }

        function forceReactReflow(){
            void cellWrapperRef.current.offsetHeight;
        }

        function transformCellToEnd(cell){
            cell.current.style.transform = `translateX(calc( ${featuredReviews.length} * ${totalCellOffsetWidth} ))`;
        }

            function removeCellTransform(cell){
            cell.current.style.transform = "";
        }



        function transformWrapper(newIndex){
            setCellWrapperTransform( ` translateX(calc( -${newIndex} * ${totalCellOffsetWidth} ))`);
        }

        function resetAllTransforms(){
            removeCellTransform(firstCellRef);
            removeCellTransform(secondCellRef);
            snapWrapperToSide(false);
        }

        function calculateDirection(target){
            const length = featuredReviews.length;
            let direction;

            if (target > reviewIndex){
                direction = false;
            }
            else if (target < reviewIndex) {
                direction =  true;
            }
            else return -1;

            if(Math.abs(target - reviewIndex) == length - 1) return !direction;
            else return direction;
        }
        
        async function controlCellTransform(scrollDirectionLeft, chosenReviewIndex){

            let newIndex;
            const N = featuredReviews.length - 1;
            const indexPastN = N + 1;
            // Not a real review. But is used to animate our wrap-around from N -> 1  &  1 -> N

            if(chosenReviewIndex != null){
                scrollDirectionLeft = calculateDirection(chosenReviewIndex);

                if (scrollDirectionLeft == -1) return; // At our chosen index already

                newIndex = chosenReviewIndex;
            }
            else{
                if(scrollDirectionLeft){
                newIndex = reviewIndex == 0 ? N : reviewIndex - 1;
                }
                else{ // Right
                    newIndex = reviewIndex == N ? 0 : reviewIndex + 1;
                }
            }

            setButtonDisabled((d) => !d);
            

            setReviewIndex(newIndex);

            if (reviewIndex == N){
                if(scrollDirectionLeft){
                    transformWrapper(newIndex);
                    await sleep(transitionDurationMS);
                    removeCellTransform(firstCellRef);
                }
                else{ // Scrolling to Right. Wrapping Round. Index N -> 0
                    transformCellToEnd(secondCellRef);
                    transformWrapper(indexPastN);
                    await sleep(transitionDurationMS);
                    resetAllTransforms();
                }
            }
            else if(newIndex == N){
                if(scrollDirectionLeft){
                    transformCellToEnd(firstCellRef);
                    transformCellToEnd(secondCellRef);
                    snapWrapperToSide(true, indexPastN);
                    transformWrapper(newIndex);
                    await sleep(transitionDurationMS);
                    removeCellTransform(secondCellRef);
                }
                else{ // Scrolling to Right. N - 1 -> N
                    transformCellToEnd(firstCellRef);
                    transformWrapper(newIndex);
                    await sleep(transitionDurationMS);
                }
            }
            else{
                transformWrapper(newIndex);
                await sleep(transitionDurationMS);

            }

            setButtonDisabled((d) => !d);
        }


    return (
        <>
            <div className="review-section-wrapper">
                <div className="review-gallery-title">Trusted nationwide, by people just like you:</div>
                <div className="review-gallery-slider-wrapper">
                    <div className="review-gallery-cell-slider" ref={cellWrapperRef} style={{transform: cellWrapperTransform}}>
                        {
                            featuredReviews.map((reviewObj, index) =>
                            (
                                <div className="review-gallery-cell" ref={index == 0 ? firstCellRef : index == 1 ? secondCellRef : null} key={`dot${index}`} >
                                    < ReviewGalleryCell reviewObj={reviewObj} />
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="review-gallery-controls">
                    <div>
                    {
                        featuredReviews.map((_, index) =>
                            (<div 
                                className={`photo-dots ${index == reviewIndex ? "selected" : ""}`}
                                onClick={() => controlCellTransform(null, index)}
                                key={`dot${index}`} >
                            </div>)
                            )
                    
                    }
                    </div>
                    <div className="gallery-arrow-wrapper">
                        <button className="gallery-arrow-button" disabled={buttonDisabled} onClick={() => controlCellTransform(true)}>< LeftArrowIcon /></button>
                        <button className="gallery-arrow-button" disabled={buttonDisabled} onClick={() => controlCellTransform(false)}>< RightArrowIcon /></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ReviewGallery;