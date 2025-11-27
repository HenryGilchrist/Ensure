import { useState } from 'react'

function DropdownOption({ setParentState, parentStateVal, classPostfix = "", mustBeOne = false, isMultiSelect = false, optionsList, setOpenBool }){

    function handleOptionClick(index){
        if(isMultiSelect){
            if(parentStateVal.includes(index)){
                setParentState(o => o.filter(optionIndex => optionIndex !== index));
            }
            else{
                setParentState(o => [...o, index]);
            }
        }
        else{
            if(parentStateVal.includes(index)){
                if(!mustBeOne) setParentState([]);
            } 
            else setParentState([index]);

            setOpenBool(false);
        }
    }

    return(
        <div className={`dropdown-options-wrapper ${classPostfix}`}>
        {
            optionsList.map((option, index) =>
                <div 
                    className={`dropdown-option-cell 
                    ${classPostfix} 
                    ${parentStateVal.includes(index) ? 'selected' : ''}`}

                    onClick={() => handleOptionClick(index)}
                    key={`option${index}`}
                >
                    {option}
                </div>
            )
            
        }
        </div>
    )
}

export default DropdownOption;