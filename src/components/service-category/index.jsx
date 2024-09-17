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
//single service section / category  in services page example in /app page
// قسم الترجمة في صفحة التطبيقات
// التطبيقات/قسم الترجمة
const ServiceCategory = ({
    overlay,
    id,
    title,
    slug,
    likeCount,
    image,
    disableShareDropdown,
}) => {
    return (
        <>
            <div
                className={clsx("product-style-one", !overlay && "no-overlay")}
            >
                <div className="card-thumbnail">
                    {/* {image && ( */}
                    <Anchor path={`/${slug}-sections/${id}`}>
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
                <Anchor path={`/${slug}-sections/${id}`}>
                    <span className="product-name">{title}</span>
                </Anchor>

                <ProductBid price={1} likeCount={likeCount} />
            </div>
        </>
    );
};

ServiceCategory.propTypes = {
    overlay: PropTypes.bool,
    id: PropTypes.number.isRequired,
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

ServiceCategory.defaultProps = {
    overlay: false,
};

export default ServiceCategory;
