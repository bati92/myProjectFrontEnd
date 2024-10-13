import PropTypes from "prop-types";
import Slider, { SliderItem } from "@ui/slider";
import { IDType, ImageType } from "@utils/types";
import SingleSlide from "./slide";

const HeroArea = ({ data }) => (
    <div className="rn-banner-area">

        {data && (
            <Slider
                options={{ dots: true }}
                className="slider-activation-banner-4 game-banner-short-slick-wrapper slick-arrow-style-one rn-slick-dot-style"
            >
                {data?.map((banner) => (

                    <SliderItem
                        key={banner.id}
                        className="slider-style-7 border-radious-none pt--150 pb--190 pt_sm--70 pb_sm--70"
                        data-black-overlay="6"
                    >
                        <SingleSlide
                            title={banner.title}
                            image={banner.image_url}
                        />
                    </SliderItem>
                ))}
            </Slider>
        )}
    </div>
);

export default HeroArea;
