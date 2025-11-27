import { X } from 'lucide-react'

function HalfScreenDropdownMenu({ children, title, openBool, setOpenBool, updateFilters, clearFilters }){

    function updateClick(){
        updateFilters();
        setOpenBool(false);
    }

    return(
        <div className="dropdown-menu-wrapper">
            <div className="dropdown-menu-blur" onClick={() => setOpenBool(false)}></div>
            <div className="dropdown-menu-window">
                <div className="dropdown-menu-content">
                    <div className="dropdown-menu-header">
                        <div className="dropdown-menu-title">{title}</div>
                        <a className="dropdown-menu-clear" onClick={clearFilters}>Clear</a>
                        < X className="exit-dropdown-menu" onClick={() => setOpenBool(false)} />
                    </div>
                {
                    children
                }    
                    <button className="button update-filters" onClick={updateClick}>Apply Filters</button>
                </div>     
            </div>
        </div>  
    )
}

export default HalfScreenDropdownMenu;