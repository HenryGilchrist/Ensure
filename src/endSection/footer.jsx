function Footer(){

    const sectionLinks = [
    {
        title: "Get in touch",
        links: 
            [
                "Contact Us",
                "Find an Advisor", 
                "Make a Claim",
                "Request a Callback",
                "Contact Preferences",
                "Fraud & Security",
                "Update Your Policy",
                "Careers"
            ]
    },
    {
        title: "About",
        links: 
            [
                "Our Mission & Values", 
                "Leadership Team",
                "Governance, Reports & Results",
                "Inclusion & Diversity"
            ]
    },
    {
        title: "Tools",
        links: 
            [
                "Life Insurance Guide",
                "Planning for Retirement", 
                "How Much Cover Do I Need?",
                "Glossary of Terms",
                "Coverage Eligibility Checker",
                "News & Media Centre",
                "Mon – Fri : 9 am – 8 pm EST",
                "Call us +44 717-514-0901"
            ]
    }]

    return(
        <div className="footer">
            <div className="footer-flex">
            {
                sectionLinks.map((section, index) => 
                (
                    <div className="link-section" key={`link-section${index}`}>
                        {section.title}
                        <ul>
                    {
                        section.links.map((link, index) => (
                            <li key={`footer-link${index}`}>{link}</li>
                        ))
                    }
                        </ul>
                    </div>
                ))
            }
            </div>
            <div className="footer-line"></div>
            <div className="footer-flex wide">
                <div className="footer-ending-text">Ensure is authorised by the Prudential Regulation Authority and regulated by the Financial Conduct Authority and the Prudential Regulation Authority under registration number 106078.</div>
                <div className="footer-ending-text">Registered in the UK and Ireland. Registered office: 1 Life House, London EC2Y 5EB.</div>
            </div>
            
        </div>
    )
}

export default Footer;