import { normalizedData } from "@utils/methods";
import homepageData from "../../data/homepages/home-08.json";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-02";
import Footer from "@layout/footer/footer-02";

import TopBarArea from "@containers/top-bar";
import HeroArea from "@containers/hero/layout-08";
import ExploreServiceArea from "@containers/explore-service/service-categories";
import { useEffect,useState } from "react";




const PageLayoutSections = ({
    pageTitle,
    items,
    sectionId,
    resourceType,
    // linkPart,
}) => {
    const [slider, setSlider] = useState([]);
    useEffect(() => {
        const fetchSlider = async () => {
            try {
                const result = await axios.get(
                    `${apiBaseUrl}/slider`
                );
                setSlider(result.data.slider.data);
            } catch (error) {
                console.log("Error fetching slider:", error);
            }
        };
        fetchSlider();
            
        });
    
    const content = normalizedData(homepageData?.content || []);

    return (
        <Wrapper>
            <SEO pageTitle={pageTitle} />
            <Header />
            <div className="list-item-1">
                    <TopBarArea  />
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
                        sectionTitle={pageTitle} // Dynamic title
                        id="list-item-3"
                        space={2}
                        // linkPart={linkPart}
                        data={{
                            ...content["explore-product-section"],
                            parentSlug: resourceType, // Optional: Pass resource type for dynamic display
                            sectionId: sectionId,
                            products: items, // Fetched data (apps, transfers, etc.)
                        }}
                    />
                )}
            </main>
            <Footer className="pr--40" />
        </Wrapper>
    );
};

export default PageLayoutSections;
