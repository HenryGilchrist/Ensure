import { cloneElement, Children, useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

function DropdownButton({ children = null, classPostfix = "", title, haltScrolling = false, useChevron = true}){

    const [openBool, setOpenBool] = useState(false);

    useEffect(() => {
        if(haltScrolling){
            document.body.classList.toggle('no-scroll', openBool);
        }
    }, [openBool])

    const passStateToChildren = Children.map(children, (child) =>
        cloneElement(child, { openBool, setOpenBool })
    );

    return (
        <div className={`dropdown-button-wrapper ${classPostfix}`}>
            <div className={`button dropdown-button ${classPostfix} ${useChevron && openBool ? 'open' : ''}`} >
                <div className='dropdown-button-hitbox' onClick={() => setOpenBool(o => !o)}></div>
                {title} {useChevron && <ChevronDown className='dropdown-button-chevron lucide' />}
            </div>
            {
                openBool && passStateToChildren
            } 
        </div>
    )
}

export default DropdownButton;