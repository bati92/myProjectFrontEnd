import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { motion } from "framer-motion";
import SectionTitle from "@components/section-title/layout-03";
import Service from "@components/service-custome";
import { flatDeep } from "@utils/methods";
import FilterButtons from "@components/filter-buttons";

//services in eacH service pages example /app page
const ExploreServiceArea = ({
    className,
    space,
    data,
    id,
    sectionTitle,
    hasSection,
}) => {
    const filters = [
        ...new Set(
            flatDeep(data?.products?.map((item) => item.categories) || [])
        ),
    ];
    const [products, setProducts] = useState([]);
    useEffect(() => {
        setProducts(data?.products);
    }, [data?.products]);

    const filterHandler = (filterKey) => {
        const prods = data?.products ? [...data.products] : [];
        if (filterKey === "all") {
            setProducts(data?.products);
            return;
        }
        const filterProds = prods.filter((prod) =>
            prod.categories.includes(filterKey)
        );
        setProducts(filterProds);
    };

    return (
        <div
            className={clsx(
                "rn-product-area masonary-wrapper-activation",
                space === 1 && "rn-section-gapTop",
                space === 2 && "rn-section-gapBottom",
                className
            )}
            id={id}
        >
            <div className="container">
                <div className="row gx-5 align-items-center mb--60">
                    <div className="col-lg-4">
                        {sectionTitle && (
                            <SectionTitle
                                className="mb--0"
                                disableAnimation
                                title={sectionTitle}
                            />
                        )}
                    </div>
                    <div className="col-lg-8">
                        <FilterButtons
                            buttons={filters}
                            filterHandler={filterHandler}
                        />
                    </div>
                </div>
                <div className="col-lg-12">
                    <motion.div layout className="isotope-list item-4">
                        {products?.slice(0, 100)?.map((prod) => (
                            <motion.div
                                key={prod.id}
                                className={clsx("grid-item")}
                                layout
                            >
                                <Service
                                    title={prod.name}
                                    serviceId={prod.id}
                                    parentSlug={data.parentSlug}
                                    sectionId={data.sectionId}
                                    price={{
                                        amount: prod.price,
                                        currency: "TL",
                                    }}
                                    likeCount={prod.id}
                                    image={prod.image}
                                    hasSection={hasSection}
                                    iban={prod?.iban}
                                    accountName={prod?.accountName}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

ExploreServiceArea.propTypes = {
    className: PropTypes.string,
    space: PropTypes.oneOf([1, 2]),
    id: PropTypes.string,
    sectionTitle: PropTypes.string,
    hasSection: PropTypes.bool,
    data: PropTypes.shape({
        sectionId: PropTypes.number,
        // section_title: SectionTitleType,
        parentSlug: PropTypes.string,
        // products: PropTypes.arrayOf(ProductType),
        placeBid: PropTypes.bool,
    }),
};

ExploreServiceArea.defaultProps = {
    space: 1,
};

export default ExploreServiceArea;
