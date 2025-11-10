function OptionBoxZoom({ optionPairs }){
    return(
        <div className="policy-option-wrapper">
            {
                optionPairs.map((pairObj, index) => (
                    <div className={`policy-option-cell ${pairObj.whiteTrue ? "white" : ""}`} key={`optionKey${index}`}>
                        <img className={"policy-option-image"} alt={`image ${pairObj.id}`} src={pairObj.image} />
                        <div className="policy-option-title">{pairObj.title}</div>
                        {
                            pairObj.customButtonText ? <button className="button">{pairObj.customButtonText}</button> 
                            : <button className="button">Get Started</button>
                        }
                    </div>
                ))

            }
        </div>
    )
}

export default OptionBoxZoom;