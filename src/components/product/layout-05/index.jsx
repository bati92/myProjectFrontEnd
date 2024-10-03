import { useState } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import ClientAvatar from "@ui/client-avatar";
import ProductBid from "@components/product-bid";
import Button from "@ui/button";
import { ImageType } from "@utils/types";
import PlaceBidModal from "@components/modals/placebid-modal";

const CountdownTimer = dynamic(() => import("@ui/countdown/layout-01"), {
    ssr: false,
});

const ShareDropdown = dynamic(() => import("@components/share-dropdown"), {
    ssr: false,
});

const Product = ({
    overlay,
    title,
    slug,
    note,
    status,
    section,
    price,
    likeCount,
    image,
    disableShareDropdown,
}) => {
    // const [showBidModal, setShowBidModal] = useState(false);
    // const handleBidModal = () => {
    //     setShowBidModal((prev) => !prev);
    // };
    return (
        <>
            <div
                className={clsx(
                    "companyCard product-style-one",
                    !overlay && "no-overlay"
                    // placeBid && "with-placeBid"
                )}
            >
                <div className="card-thumbnail">
                    {/* {image && ( */}
                    <Anchor path={`/charge/${slug}`}>
                        <Image
                            src= {`${image}`}
                            alt={title}
                            width={533}
                            height={533}
                        />
                    </Anchor>
                    {/* )} */}
                </div>
          
         
               
            </div>
        </>
    );
};

Product.propTypes = {
    overlay: PropTypes.bool,
    title: PropTypes.string.isRequired,
    slug: PropTypes.number.isRequired,
    note: PropTypes.string,
    status: PropTypes.number,
    section: PropTypes.number.isRequired,
    price: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
    }).isRequired,
    likeCount: PropTypes.number.isRequired,
    image: PropTypes.string,
    // image: ImageType.isRequired,
    disableShareDropdown: PropTypes.bool,
};

Product.defaultProps = {
    overlay: false,
};

export default Product;
