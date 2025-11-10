import OptionBoxZoom from './optionBoxZoom.jsx'
import OpeningText from './openingText.jsx'
import Nav from  './nav.jsx'
import VerticalCollage from './verticalCollage.jsx'
import FAQ from './FAQ.jsx'
import ReviewGallery from './reviewGallery.jsx'
import ReviewAPI from './reviewAPI.jsx'
import Footer from './footer.jsx'

// Import Prop Display Objects
import { policyOptionPairs, featuredReviews, collagePairs } from './displayObjects.js'
import EndSection from './endSection.jsx'


function App() {

  return (
  <>
    < Nav />
    <div className="opening-section-wrapper">
      < OpeningText />
      < OptionBoxZoom optionPairs={policyOptionPairs} />
    </div>
    <div className="awards"><span className="awards-title">Industry Recognition:</span> British Insurance Awards — <i>Life Insurance Company of the Year</i>: <span className="awards-year-list">1999, 2001, 2002, 2005, 2007, 2010, 2011, 2019, 2022 & 2024</span></div>
    < VerticalCollage collagePairs={collagePairs} />
    < ReviewGallery featuredReviews={featuredReviews} />  
    < ReviewAPI/>
    < FAQ />
    < EndSection />
    < Footer />
  </>
  )
}

export default App
