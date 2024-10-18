import axios from "axios";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import homepageData from "../../data/homepages/home-08.json";
import { normalizedData } from "@utils/methods";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-02";
import Footer from "@layout/footer/footer-02";

import TopBarArea from "@containers/top-bar";
import HeroArea from "@containers/hero/layout-08";
import ExploreServiceArea from "@containers/explore-service/service-categories";

const PageLayoutSections = ({ pageTitle, items, sectionId, resourceType }) => {
    const [slider, setSlider] = useState([]);

    useEffect(() => {
        const fetchSlider = async () => {
            try {
                const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
                const result = await axios.get(`${apiBaseUrl}/slider`);
                setSlider(result.data.slider.data);
            } catch (error) {
                // Handle the error gracefully by showing a notification or logging
                console.error("Error fetching slider:", error); // Replace with a logging library if needed
            }
        };
        fetchSlider();
    }, []);

    const content = normalizedData(homepageData?.content || []);

    return (
        <Wrapper>
            <SEO pageTitle={pageTitle} />
            <Header />
            <div className="list-item-1">
                <TopBarArea />
                <HeroArea data={slider} />
            </div>
            <main
                id="main-content"
                className="rn-nft-mid-wrapper nft-left-sidebar-nav pr--40 pr_sm--15 pt-5"
            >
                {!items || items.length === 0 ? (
                    <h2 className="text-center">لا توجد بيانات متاحة</h2>
                ) : (
                    <ExploreServiceArea
                        sectionTitle={pageTitle}
                        id="list-item-3"
                        space={2}
                        data={{
                            ...content["explore-product-section"],
                            parentSlug: resourceType,
                            sectionId,
                            products: items,
                        }}
                    />
                )}
            </main>
            <Footer className="pr--40" />
        </Wrapper>
    );
};

// Updated PropTypes validation
PageLayoutSections.propTypes = {
    pageTitle: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                .isRequired,
            name: PropTypes.string,
            // Add other properties as needed for better validation
        })
    ).isRequired,
    sectionId: PropTypes.string.isRequired,
    resourceType: PropTypes.string.isRequired,
};

export default PageLayoutSections;
