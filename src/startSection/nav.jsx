import LogoSymbol from "../assets/icons/logoSymbol";

function Nav(){
    return (
    <>
        <header>
            <nav className="navbar">
                <div className="logo-wrapper">
                    < LogoSymbol />
                    <div className="logo-text">ENSURE</div>
                </div>
                <div className="navbar-section">
                    <a>Find your policy</a>
                    <a>Wellbeing support</a>
                    <a>Making a claim</a>
                    <a>Our background</a>
                </div>
                <div className="navbar-section">
                    <a>Sign in</a>
                    <button className="button nav">Get started</button>
                </div>
            </nav>
        </header>
    </>
    )
}

export default Nav;