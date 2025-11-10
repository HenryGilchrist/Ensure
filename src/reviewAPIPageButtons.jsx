import { ChevronLeft, ChevronRight } from 'lucide-react'

function ReviewAPIPageButtons({ pageIndex, setPageIndex, reviewCount }){

    function returnPageNumberButtons(){
        const multipleFiveDec = reviewCount / 5;
        const multipleFiveRounded = Math.ceil(multipleFiveDec);
        let pageButtonList = [];

        for(let i = 0; i < multipleFiveRounded; i++){
            pageButtonList.push(
                <button 
                    className={`review-api-page-button ${pageIndex == i ? 'selected' : ''}`} 
                    disabled={pageIndex == i}
                    key={`key${i}`}
                    onClick={() => setPageIndex(i)}
                    >{i+1}
                </button>
            );
        }

        return pageButtonList;
    }

    return (
        <div className="review-api-page-button-wrapper">
            <button className="review-api-page-button-arrow" disabled={pageIndex == 0} onClick={() => setPageIndex((i) => i - 1)}>< ChevronLeft className="lucide" /></button>
        {
            returnPageNumberButtons()
        }
            <button className="review-api-page-button-arrow" disabled={pageIndex + 1 == Math.ceil(reviewCount / 5)} onClick={() => setPageIndex((i) => i + 1)}>< ChevronRight className="lucide" /></button>
        </div>
    )
}

export default ReviewAPIPageButtons;