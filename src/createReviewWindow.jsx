import RatingSelect from './ratingSelect.jsx';
import { X } from 'lucide-react'
import { useState } from 'react'

function CreateReviewWindow({ title, setOpenBool, parentRequest, reviewID = undefined, initialValues = {}}){
    let vals = {name: "", rating: 0, review: "", policyVal: ""};
    vals = {...vals, ...initialValues}

    const [name, setName] = useState(vals.name);
    const [rating, setRating] = useState(vals.rating);
    const [review, setReview] = useState(vals.review);
    const [policy, setPolicy] = useState(vals.policy);

    async function handleSubmit() {
        const reviewObj = {name, rating, review, policy};
        const isEditRequest = reviewID !== undefined;
        const errors = isEditRequest ? await parentRequest(reviewObj, reviewID) : await parentRequest(reviewObj);
        
        if(errors) window.alert(errors);
        else setOpenBool(false);
    }

    return(
        <div className="create-review-wrapper">
            <div className="create-review-blur"></div>
            <div className="create-review-window">
                <div className="create-review-header">
                    <div className="create-review-title">{title}</div>
                    < X className="exit-dropdown-menu" onClick={() => setOpenBool(false)} />
                </div>
                <div className="create-review-input-section">
                    <div className="create-review-input-top-section">
                        <label className="create-review-name-input">
                            Name:
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter Name(s)"></input>
                        </label>
                        <label>
                            Policy Type:
                            <select
                                value={policy}
                                className="create-review-select-policy"
                                onChange={(e) => setPolicy(e.target.value)}
                            >
                                <option value="">--Choose Option--</option>
                                <option value="Term Insurance">Term Insurance</option>
                                <option value="Joint Life Insurance">Joint Life Insurance</option>
                                <option value="Serious Illness Cover">Serious Illness Cover</option>
                            </select>
                        </label>
                    </div>
                    <textarea 
                        value={review} 
                        disabled={false}
                        className="create-review-textarea"
                        onChange={(e) => setReview(e.target.value)} 
                        placeholder="Write Review Here"
                    />
                    <RatingSelect ratingVal={rating} setRatingVal={setRating} />
                </div>
                <button onClick={handleSubmit} className="create-review-submit">Submit</button>
            </div>
        </div>
    )
}

export default CreateReviewWindow;