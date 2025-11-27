import Nav from  './startSection/nav.jsx'
import VerticalCollage from './startSection/verticalCollage.jsx'
import FAQ from './endSection/FAQ.jsx'
import ReviewGallery from './reviewGallery/reviewGallery.jsx'
import ReviewAPI from './apiSection/reviewAPI.jsx'
import Footer from './endSection/footer.jsx'
import EndSection from './endSection/endSection.jsx'
import Recognition from './startSection/recognition.jsx'
import OpeningSection from './startSection/openingSection.jsx'

// Import Prop Display Objects
import { policyOptionPairs, featuredReviews, collagePairs } from './assets/displayObjects/displayObjects.js'



function App() {

  return (
  <>
    < Nav />
    < OpeningSection policyOptionPairs={policyOptionPairs} />
    < Recognition />
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
