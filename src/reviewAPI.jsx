import ApiIcon from './assets/icons/apiSymbol.jsx'
import DropdownOption from "./dropdownOption.jsx";
import DropdownButton from './dropdownButton.jsx';
import HalfScreenDropdownMenu from './halfScreenDropdownMenu.jsx';
import ReviewAPIRow from './reviewAPIRow.jsx';
import ReviewAPIPageButtons from './reviewAPIPageButtons.jsx';
import SliderInput from './slider.jsx';
import CreateReviewWindow from './createReviewWindow.jsx';

import { useState, useEffect, useRef } from 'react';


function ReviewAPI(){

    // API Data
    const [pageIndex, setPageIndex] = useState(0);
    const [reviewCount,setReviewCount] = useState(0);
    const [groupFiveReviews, setGroupFiveReviews] = useState([]);
    const [userID, setUserID] = useState(null);
    const loginRunning = useRef(false);
    const basePath = "https://ensure-api-omega.vercel.app";
   

    // Write & Edit Review State Values

    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [name, setName] = useState("");
    const [policy, setPolicy] = useState("Term Insurance");

    // Filter & Sort State Settings
    const [sortByIndex, setSortByIndex] = useState([0]);
    const [filterDateIndex, setFilterDateIndex] = useState([]);
    const [filterRatingRange, setFilterRatingRange] = useState([0, 5]);
    const [filterPolicyIndex, setFilterPolicyIndex] = useState([]);
    const [filterString, setFilterString] = useState("");
    const [orderString, setOrderString] = useState("");

    // Filter & Sort Display Objects

    const filterDropdownMenuOptionSettings = [
        {
            title: "Date",
            setParentState: setFilterDateIndex,
            parentStateVal: filterDateIndex,
            optionsList: ["Date, last 30 days","Date, last 6 months"],
            dateVals: [30,180]
        },
        {
            title: "Rating",
            sliderSettings: {
                parentStateVal: filterRatingRange,
                setParentState: (event, newValue) => setFilterRatingRange(newValue),
                max: 5,
                labelFormat: (value) => `${value} Star`
            }

        },
        {
            title: "Policy",
            setParentState: setFilterPolicyIndex,
            parentStateVal: filterPolicyIndex,
            isMultiSelect: true,
            optionsList: ["Term Insurance", "Joint Life Insurance", "Serious Illness Cover"]
        }
    ]

    const sortByOptions = [
      "Date, oldest to newest",
      "Date, newest to oldest",
      "Rating, low to high",
      "Rating, high to low", 
      "Name, A-Z",
      "Name, Z-A"
    ];

    // Helper Functions

    function getDateFilter(offset) {
        const today = new Date();
        const pastDate = new Date(today);
        pastDate.setDate(today.getDate() - offset);
        return `filter[date][gte]=${pastDate.toISOString().split('T')[0]}`;
    }

    const encodeSpaces = (text) => text.replace(' ', "%20");

    // Request Query String Functions

    function clearFilters(){
        setFilterDateIndex([]);
        setFilterRatingRange([0, 5]);
        setFilterPolicyIndex([]);

        setFilterString("");
    }

    function updateFilterString(){
        setPageIndex(0);

        let settings = filterDropdownMenuOptionSettings;
        const filters = [];

        settings.forEach(setting => {
            const titleKey = setting.title.toLowerCase();
            
            if (setting.sliderSettings) {
                const [min, max] = setting.sliderSettings.parentStateVal;
                if (min !== 0) filters.push(`filter[${titleKey}][gte]=${min}`);
                if (max !== 5) filters.push(`filter[${titleKey}][lte]=${max}`);
            }
            else if (setting.dateVals) {
                if (setting.parentStateVal.length > 0){
                    const daysOffset = setting.dateVals[setting.parentStateVal[0]];
                    filters.push(getDateFilter(daysOffset));
                }
            }
            else if (!setting.isMultiSelect) {
                const selectedValue = setting.optionsList[setting.parentStateVal[0]];
                if (selectedValue) filters.push(`filter[${titleKey}][eq]=${encodeSpaces(selectedValue)}`);
            }
            else if (setting.parentStateVal.length > 0 && setting.isMultiSelect) {
                setting.parentStateVal.forEach(index => {
                    const value = setting.optionsList[index];
                    if (value) filters.push(`filter[${titleKey}][eq]=${encodeSpaces(value)}`);
                });
            }

            const filterStringFormat = filters.join("&");
            console.log("Query String - Filters:\n" + filterStringFormat);
            setFilterString(filterStringFormat);
        });
    }

        function updateSortString(options = sortByOptions, stateVal = sortByIndex){
            setPageIndex(0);
            const property = options[stateVal].split(',')[0].toLowerCase();
            const order = stateVal % 2 == 0 ? 'asc' : 'desc';

            const orderStringFormat = `sort=${property}&order=${order}`;
            setOrderString(orderStringFormat);
        }

    // HTTP Request Functions

    async function reauthenticate(){
        console.log("No refresh token found. Initiating re-authentication");
        const postfix = await register();
        await login(postfix);
    }

    async function automateLogin(){
        const loggedIn = await AmILoggedIn();
        if (!loggedIn) await reauthenticate();
    }

    async function getAccessToken(pathPostfix = '/token'){
        const path = basePath + pathPostfix;
        const response = await fetch(path, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' // Will automatically attach refresh token - If in cookie storage
        })
        const responseObj = await response.json();
        return responseObj;
    }

    async function AmILoggedIn(){
        const response = await getAccessToken('/users/me');
        if(response.success){
            setUserID(response.userID);
            console.log("Refresh Token Verified\n" + response.message);
            console.log("User ID:\n" + response.userID);
            return true;
        }
        else {
            console.log(response.message);
            return false;
        }
    }

    async function register(){
        let postfix = 1 + Math.floor(Math.random() * 100);
        const path = basePath + '/users/register';
        let username = `username${postfix}`;
        let password = `password${postfix}`;
        const userDetails = {username, password};
        let successful = false;

        do {
            const response = await fetch(path,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            })
            const responseObj = await response.json();
            if (responseObj.success){
                successful = true;
                console.log(responseObj.message);
            }
            else {
                postfix++;
                username = `username${postfix}`;
                password = `password${postfix}`;
            }
        } while (!successful)


        
        return postfix;
    }   

    async function login(postfix){
        const path = basePath + '/users/login';
        let username = `username${postfix}`;
        let password = `password${postfix}`;
        let userObj = {username, password};
         const response = await fetch(path,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({username, password})
        })
        const responseObj = await response.json();
        if(responseObj.success){
            console.log(responseObj.message);
            console.log(userObj);
            console.log(`User ID:\n${responseObj.userID}`);
            console.log(responseObj.message);
            setUserID(responseObj.userID);
        }
    }

    async function getReviewGroup(){

        let path = basePath + `/reviews?page=${pageIndex + 1}&limit=5`;
        if (filterString.length > 0) path = path + '&' + filterString;
        if (orderString.length > 0) path = path + '&' + orderString;

        const response = await fetch(path);
        const responseObj = await response.json();
        if (responseObj.success){
            if (responseObj["length"] !== reviewCount) setReviewCount(responseObj["length"]);
            setGroupFiveReviews(responseObj.data)
        }
        else {
            setGroupFiveReviews([]);
            setReviewCount(0);
            window.alert(responseObj.message);
        }
    }

    async function modifyReviewRequest(path, method, bodyObj){

        let refreshTries = 1;
        do{
            let requestTries = 1;

            do {
                const response = await fetch(path, {
                    method,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    ...(bodyObj !== undefined && {body: JSON.stringify(bodyObj)}),
                    credentials: 'include'
                })
                const responseObj = await response.json();

                if(responseObj.success) {
                    getReviewGroup();
                    return window.alert(responseObj.message);
                }
                else {
                    if([400, 404].includes(response.status)){
                        if (response.status == 404) getReviewGroup();
                        return responseObj.message;
                    }
                    const tokenResponse = await getAccessToken();
                    console.log("Update Token Request:\n" + tokenResponse.message);
                    requestTries++;
                }
            } while (requestTries < 3)

            await reauthenticate();
            refreshTries++;
        
        } while (refreshTries < 3)
    }

    async function postNewReview(reviewObj){
        const path = basePath + '/reviews';
        const errors = await modifyReviewRequest(path, 'POST', reviewObj);
        if(errors) return errors;
        else return;
    }

    async function editReview(reviewObj, reviewID){
        const {date, ...review} = reviewObj;
        console.log(review);
        const path = basePath + `/reviews/${reviewID}`;
        const errors = modifyReviewRequest(path, 'PUT', review);
        if(errors) return errors;
        else return;
    }

    function deleteReview(reviewID){
        const result = window.confirm("Are you sure you wish to delete this review?");
        if (result) {
            const path = basePath + `/reviews/${reviewID}`;
            const errors = modifyReviewRequest(path, 'DELETE');
            if(errors) return errors;
            else return;
        }
        else return;
    }

    // React Hooks

    useEffect(() => {
        if(loginRunning.current) return;
        loginRunning.current = true;
        automateLogin();
    },[]);

    useEffect(() => {
        getReviewGroup();
    },[pageIndex, filterString, orderString]);

    useEffect(() => {
        updateSortString(sortByOptions, sortByIndex);
    },[sortByIndex]);

    return (
    <>
        <div className="review-api-title">Customer Reviews</div>
        <div className="review-api-subheading">
            Powered by Ensure's REST API 
            < ApiIcon />
        </div>
        <div className="review-api-wrapper">
            <div className="review-api-toolbar">
                < DropdownButton title={"Sort By"} classPostfix={'api-toolbar'}>
                    < DropdownOption mustBeOne={true} setParentState={setSortByIndex} parentStateVal={sortByIndex} initialIndexArray={[0]} optionsList={sortByOptions} />
                </ DropdownButton>
                < DropdownButton title={"Filter"} haltScrolling={true} classPostfix={'api-toolbar'}>
                    <HalfScreenDropdownMenu title={"Filter"} updateFilters={updateFilterString} clearFilters={clearFilters}>
                    {
                        filterDropdownMenuOptionSettings.map((optionSettings, index) =>
                        (
                            optionSettings.sliderSettings
                            ?
                                <DropdownButton title={optionSettings.title} classPostfix={'dropdown-menu'} key={`dropdownButton${index}`}>
                                    <SliderInput optionSettings={optionSettings}/>
                                </DropdownButton>
                                
                            :
                                <DropdownButton title={optionSettings.title} classPostfix={'dropdown-menu'} key={`dropdownButton${index}`}>
                                    <DropdownOption {...optionSettings} classPostfix={'dropdown-menu'} />
                                </DropdownButton>
                        ))
                    }            
                    </HalfScreenDropdownMenu>
                </DropdownButton>
            </div>
            <div className="review-api-table-wrapper">
                <div className="review-api-table">
                {
                    groupFiveReviews.map((reviewObj, index) =>
                        < ReviewAPIRow 
                            reviewObj={reviewObj} 
                            key={`row${index}`} 
                            {...(reviewObj.userID == userID && {editReview: editReview, deleteReview: deleteReview})}
                        />    
                    )
                }
                </div>
            </div>
            < ReviewAPIPageButtons pageIndex={pageIndex} setPageIndex={setPageIndex} reviewCount={reviewCount} />
        </div>
        <div className="review-api-write-review">
            Already a customer?
            < DropdownButton title={"Leave a Review"} classPostfix={'write-review'} haltScrolling={true} useChevron={false}>
                < CreateReviewWindow title={"Write Review"} parentRequest={postNewReview}/>
            </DropdownButton>
        </div>
    </>
    )
}

export default ReviewAPI;