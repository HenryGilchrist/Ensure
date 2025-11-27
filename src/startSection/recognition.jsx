import financial from '../assets/logos/financial.png'
import observer from '../assets/logos/observer.png'
import bbc from '../assets/logos/bbc.png'
import times from '../assets/logos/theTimes.png'
import telegraph from '../assets/logos/telegraph.png'

function Recognition(){

    return (
        <div className="recognition-wrapper">
            As seen in 
            <div className="recognition-logo-section">
                <div className="recognition-cell-slider">
                    <div className="logo-cell" 
                        style={{backgroundImage: `url(${financial})`}}>
                    </div>
                    <div className="logo-cell" 
                        style={{backgroundImage: `url(${telegraph})`}}>
                    </div>
                    <div className="logo-cell" 
                        style={{backgroundImage: `url(${bbc})`}}>
                    </div>
                    <div className="logo-cell" 
                        style={{backgroundImage: `url(${times})`}}>
                    </div>
                    <div className="logo-cell" 
                        style={{backgroundImage: `url(${observer})`}}>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recognition;