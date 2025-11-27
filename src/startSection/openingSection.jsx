import OpeningText from "../endSection/openingText";
import OptionBoxZoom from "./optionBoxZoom";

function OpeningSection({ policyOptionPairs }){

    return (
        <div className="opening-section-wrapper">
      < OpeningText />
      < OptionBoxZoom optionPairs={policyOptionPairs} />
    </div>
    )
}

export default OpeningSection;