import { useState, useEffect } from "react";
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
    serviceId,
    parentSlug,
    sectionId,
    price,
    likeCount,
    hasSection,
    iban,
    accountName,
    image,
    disableShareDropdown,
}) => {
    const [servicePath, setServicePath] = useState("");

    useEffect(() => {
        let path = "";
        if (hasSection) {
            path = `/${parentSlug}-sections/${sectionId}/${parentSlug}-order/${serviceId}`;
        } else {
            path = `/${parentSlug}s/${parentSlug}-order/${serviceId}`;
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
                    {/* {image && ( */}
                    <Anchor path={servicePath}>
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
                <div className="product-share-wrapper"></div>
                <Anchor path={servicePath}>
                    <span className="product-name">{title}</span>
                </Anchor>
                {parentSlug !== "transfer-money-firm" ? (
                    <>
                        <span className="latest-bid">
                            السعر: {price?.amount}
                        </span>
                        <br></br>
                        {/* <span className="latest-bid">ملاحظة : {note}</span> */}
                    </>
                ) : (
                    <>
                        <span className="latest-bid">iban: {iban}</span>
                        <br></br>
                        <span className="latest-bid">
                            account name : {accountName}
                        </span>
                    </>
                )}

                <ProductBid price={1} likeCount={likeCount} />
            </div>
        </>
    );
};

Service.propTypes = {
    overlay: PropTypes.bool,
    hasSection: PropTypes.bool,
    title: PropTypes.string.isRequired,
    serviceId: PropTypes.number.isRequired,
    parentSlug: PropTypes.string.isRequired,
    price: PropTypes.shape({
        amount: PropTypes.number,
        currency: PropTypes.string,
    }),
    iban: PropTypes.string,
    accountName: PropTypes.string,

    likeCount: PropTypes.number.isRequired,
    image: PropTypes.string,
    disableShareDropdown: PropTypes.bool,
};

Service.defaultProps = {
    overlay: false,
};

export default Service;
