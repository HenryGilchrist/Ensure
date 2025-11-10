// Policy Options Images
import PolicyCouple from './assets/policyOptions/couple.png'
import PolicyWomanSmiling from './assets/policyOptions/oldWomanSmiling.png'
import PolicyWomanHospital from './assets/policyOptions/oldWomanHospital.png'
import PolicyChoices from './assets/policyOptions/laptopChoices.png'

// Collage Images
import CollageFlexible from './assets/collage/flexible.jpg'
import CollagePiggyBank from './assets/collage/piggyBank.jpg'
import CollageEasyStart from './assets/collage/easyStart.jpg'
import CollageAdvisor from './assets/collage/advisor.png'

// Featured Review Images
import ReviewLila from './assets/reviewGallery/lila.jpeg'
import ReviewCarlaMateo from './assets/reviewGallery/carlaMateo.jpg'
import ReviewMichael from './assets/reviewGallery/michael.jpg'
import ReviewSusan from './assets/reviewGallery/susan.jpg'
import ReviewMaxElana from './assets/reviewGallery/maxElena.jpg'
import ReviewJohn from './assets/reviewGallery/john.jpeg'


export const collagePairs = [
    {
      text: {
        title: "Flexible Policies", 
        body: "We understand that life doesn’t stand still — that’s why as your family grows, our plans grow with you."
      }, 
      image: CollageFlexible
    },
    {
      text: {
        title: "Quick Sign Up", 
        body: "To get started, simply complete our brief online form, and our guidance team will contact you shortly to schedule your initial meeting."
      }, 
      image: CollageEasyStart
    },
    {
      text: {
        title: "Affordable Options", 
        body: "Plans that fit your life — and your budget!"
      }, 
      image: CollagePiggyBank
    },
     { 
        text: 
        {
          title: "Trusted Expertise", 
          body: "Our experienced advisors take the time to understand your story: both personal and financial — so your plan reflects what matters most to you."
        }, 
        image: CollageAdvisor
    }
  ]

  export const policyOptionPairs = [
    {title: "Term Insurance", image: PolicyWomanSmiling},
    {title: "Joint Life Insurance", image: PolicyCouple},
    {title: "Serious Illness Cover", image: PolicyWomanHospital},
    {title: "Find what's right for you", image: PolicyChoices, whiteTrue: true, customButtonText: "Take a 2-minute quiz"}
  ]

export const featuredReviews = [
  {
    name: "Susan",
    review:
      "I was nervous about getting life insurance, but the staff made the experience reassuring and straightforward. They were professional and polite throughout.",
    policyType: "Term Insurance",
    rating: 5,
    image: ReviewSusan
  },
  {
    name: "Carla & Mateo",
    review:
      "We can’t thank Emily enough for her help! She made the process clear, easy, and stress-free. The experience well exceeded our expectations.",
    policyType: "Joint Life Insurance",
    rating: 5,
    image: ReviewCarlaMateo
  },
  {
    name: "Michael",
    review:
      "David was wonderful to work with — clear, polite, and quick to respond to all my questions. It did take a bit longer than I thought to finalize everything, but he kept me informed the whole time.",
    policyType: "Term Insurance",
    rating: 4.5,
    image: ReviewMichael
  },
  {
    name: "Lila",
    review:
      "The entire team was wonderful. Clear communication, polite, and helpful guidance every step of the way.",
    policyType: "Term Insurance",
    rating: 5,
    image: ReviewLila
  },
  {
    name: "John",
    review:
      "I was impressed by how clear the communication was. The process of setting up my policy was smooth, and the team was professional and polite throughout.",
    policyType: "Term Insurance",
    rating: 4.5,
    image: ReviewJohn
  },
  {
    name: "Max & Elena",
    review:
      "We're so happy we chose this company! The team made the experience feel personal and stress-free. They were polite, clear in their explanations, and genuinely helpful when answering our questions.",
    policyType: "Joint Life Insurance",
    rating: 5,
    image: ReviewMaxElana
  }
];