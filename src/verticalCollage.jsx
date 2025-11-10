function VerticalCollage({ collagePairs }){
    return (
        <div className="collage-wrapper">
        {
            collagePairs.map((pairObj, index) =>
            (
                index % 2 == 0 ? 
                (
                    <div className="collage-pair" key={`collagePair${index}`}>
                        <div className="collage-text-wrapper">
                            <div className="collage-text-title">{pairObj.text.title}</div>
                            <div className="collage-text-body">{pairObj.text.body}</div>
                        </div>
                        <div className="collage-img" style={{backgroundImage: `url(${pairObj.image})`}}></div>
                    </div>
                )
                :
                (
                    <div className="collage-pair" key={`collagePair${index}`}>
                        <div className="collage-img" style={{backgroundImage: `url(${pairObj.image})`}}></div>
                        <div className="collage-text-wrapper">
                            <div className="collage-text-title">{pairObj.text.title}</div>
                            <div className="collage-text-body">{pairObj.text.body}</div>
                        </div>
                    </div>
                )
            ))       
        }
        </div>
            

    )
}

export default VerticalCollage;