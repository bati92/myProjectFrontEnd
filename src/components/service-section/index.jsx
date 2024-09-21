import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import PropTypes from "prop-types";
import Image from "next/image";
import clsx from "clsx";
import Anchor from "@ui/anchor";
import ClientAvatar from "@ui/client-avatar";
import ProductBid from "@components/product-bid";
import Button from "@ui/button";
import { ImageType } from "@utils/types";

const CountdownTimer = dynamic(() => import("@ui/countdown/layout-01"), {
    ssr: false,
});

const ShareDropdown = dynamic(() => import("@components/share-dropdown"), {
    ssr: false,
});
//single service in home page example in /home  page
// thumbnail - pictures above - service name - number of sections - stars + heart
const Service = ({
    overlay,
    title,
    slug,
    total,
    price,
    likeCount,
    image,
    authors,
    hasSections,
    directToOrder,
    disableShareDropdown,
}) => {
    // const [showBidModal, setShowBidModal] = useState(false);
    // const handleBidModal = () => {
    //     setShowBidModal((prev) => !prev);
    // };
    const [servicePath, setServicePath] = useState(`/${slug}s`);

    useEffect(() => {
        let path = `/${slug}s`;
        if (hasSections) {
            path = `/${slug}-sections`;
        } else if (directToOrder) {
            path = `/${slug}-order`;
        }
        setServicePath(path);
    }, [servicePath]);
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
                    {true && (
                        // {image?.src && (
                        <Anchor path={servicePath}>
                            <Image
                                src={
                                    "https://static.semrush.com/blog/uploads/media/39/4f/394f92fd06792246f5833d1ab3c05c4d/reverse-image-search.svg"
                                }
                                // src={image.src}

                                alt={image?.alt || "NFT_portfolio"}
                                width={533}
                                height={533}
                            />
                        </Anchor>
                    )}
                    {/* {auction_date && <CountdownTimer date={auction_date} />}
                    {placeBid && (
                        <Button onClick={handleBidModal} size="small">
                            Place Bid
                        </Button>
                    )} */}
                </div>
                <div className="product-share-wrapper">
                    <div className="profile-share">
                        {authors?.map((client) => (
                            <ClientAvatar
                                key={client.name}
                                slug={client.slug}
                                name={client.name}
                                image={
                                    "https://static.semrush.com/blog/uploads/media/39/4f/394f92fd06792246f5833d1ab3c05c4d/reverse-image-search.svg"
                                }
                                // image={client.image}
                            />
                        ))}
                        {/* <Anchor
                            className="more-author-text"
                            path={`/product/${slug}`}
                        >
                            {bitCount}+ Place Bitjjjj.
                        </Anchor> */}
                    </div>
                    {!disableShareDropdown && <ShareDropdown />}
                </div>
                <Anchor path={`/${slug}`}>
                    <span className="product-name">{title}</span>
                </Anchor>

                <>
                    <span className="latest-bid">عدد </span>
                    <span className="latest-bid">{title}: </span>
                    <span className="latest-bid">{total}</span>
                    <ProductBid price={price} likeCount={likeCount} />
                </>
            </div>
        </>
    );
};

Service.propTypes = {
    overlay: PropTypes.bool,
    hasSections: PropTypes.bool,
    directToOrder: PropTypes.bool,
    title: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    likeCount: PropTypes.number.isRequired,
    image: ImageType.isRequired,
    authors: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
            image: ImageType.isRequired,
        })
    ),
    // disableShareDropdown: PropTypes.bool,
};

Service.defaultProps = {
    overlay: false,
};

export default Service;
