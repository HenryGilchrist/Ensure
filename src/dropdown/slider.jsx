import Slider from '@mui/material/Slider';

function SliderInput({optionSettings}){

    // Colour Variables
    
    const starGold = "var(--reviewAPIStarGold)";
    const starGoldShadow = `hsla(from ${starGold} h s l / 0.12)`;
    const reviewGreen = "var(--reviewAPIAlteredFeaturedReviewGreen)";

    return(
        <div className="dropdown-menu-slider-wrapper">
            <Slider
                value={optionSettings.sliderSettings.parentStateVal}
                max={optionSettings.sliderSettings.max}
                {
                    ...(optionSettings.sliderSettings.min && {min: optionSettings.sliderSettings.min})
                }
                {
                    ...(optionSettings.sliderSettings.labelFormat && {valueLabelFormat: optionSettings.sliderSettings.labelFormat})
                }
                onChange={optionSettings.sliderSettings.setParentState}
                step={0.5}
                marks
                sx={{
                    color: starGold,
                    '& .MuiSlider-rail': {
                        backgroundColor: '#cccccc'
                    },
                    '& .MuiSlider-thumb': {
                        '&.Mui-focusVisible': {
                            boxShadow: 'none'
                        },
                        '&.Mui-active:hover': {
                            boxShadow: `0px 0px 0px 14px ${starGoldShadow}`
                        },
                        '&:hover': {
                            boxShadow: `0px 0px 0px 8px ${starGoldShadow}`
                        }
                    }
                }}
                valueLabelDisplay="auto"/>

            <div className="slider-range-text">
                <div>{`${optionSettings.sliderSettings.parentStateVal[0]} Star`}</div>
                <div>{`${optionSettings.sliderSettings.parentStateVal[1]} Star`}</div>
            </div>
        </div>
    )
}

export default SliderInput;