import { useState } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import ProductBid from "@components/product-bid";

const CountdownTimer = dynamic(() => import("@ui/countdown/layout-01"), {
    ssr: false,
});

const ShareDropdown = dynamic(() => import("@components/share-dropdown"), {
    ssr: false,
});
//single service in services page example in /app page
const Service = ({
    overlay,
    title,
    slug,
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
                    "product-style-one",
                    !overlay && "no-overlay"
                    // placeBid && "with-placeBid"
                )}
            >
                <div className="card-thumbnail">
                    {/* {image && ( */}
                    <Anchor path={`/app/${slug}`}>
                        <Image
                            src={
                                // image ||
                                "https://static.semrush.com/blog/uploads/media/39/4f/394f92fd06792246f5833d1ab3c05c4d/reverse-image-search.svg"
                            }
                            alt={title}
                            width={533}
                            height={533}
                        />
                    </Anchor>
                    {/* )} */}
                </div>
                <div className="product-share-wrapper">
                    {/* <div className="profile-share">
                        <span className="latest-bid">
                            القسم:{" "}
                            <Anchor
                                className="more-author-text"
                                path={`/app/${slug}`}
                            >
                                {section}
                            </Anchor>
                        </span>
                    </div>
                    <div className="profile-share">
                        <span className="latest-bid">
                            الحالة:{" "}
                            <Anchor
                                className="more-author-text"
                                path={`/app/${slug}`}
                            >
                                {status ? "فعال" : "غير فعال"}
                            </Anchor>
                        </span>
                    </div> */}
                    {/* {!disableShareDropdown && <ShareDropdown />} */}
                </div>
                <Anchor path={`/app/${slug}`}>
                    <span className="product-name">{title}</span>
                </Anchor>
                <span className="latest-bid">السعر: {price?.amount}</span>
                <br></br>
                {/* <span className="latest-bid">ملاحظة : {note}</span> */}
                <ProductBid price={1} likeCount={likeCount} />
            </div>
        </>
    );
};

Service.propTypes = {
    overlay: PropTypes.bool,
    title: PropTypes.string.isRequired,
    slug: PropTypes.number.isRequired,
    price: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        currency: PropTypes.string.isRequired,
    }).isRequired,
    likeCount: PropTypes.number.isRequired,
    image: PropTypes.string,
    disableShareDropdown: PropTypes.bool,
};

Service.defaultProps = {
    overlay: false,
};

export default Service;
