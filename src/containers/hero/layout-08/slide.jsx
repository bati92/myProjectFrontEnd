import { useState } from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import PlaceBidModal from "@components/modals/placebid-modal";

const SingleSlide = ({ image, title }) => {
    const [showBidModal, setShowBidModal] = useState(false);
    const handleBidModal = () => {
        setShowBidModal((prev) => !prev);
    };
    return (
        <>
            <Image
                className="slider-bg"
                src={`http://localhost:8000/images/sliders/${image}`}
                alt={title}
                quality={100}
                priority
                fill
                sizes="100vw"
                style={{
                    objectFit: "cover",
                }}
            />

            <PlaceBidModal show={showBidModal} handleModal={handleBidModal} />
        </>
    );
};

SingleSlide.propTypes = {
    title: PropTypes.string,
    image: PropTypes.string,
};

export default SingleSlide;
