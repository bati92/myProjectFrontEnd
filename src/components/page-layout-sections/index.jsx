import { normalizedData } from "@utils/methods";
import homepageData from "../../data/homepages/home-08.json";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-02";
import Footer from "@layout/footer/footer-02";
import ExploreServiceArea from "@containers/explore-service/service-categories";
const PageLayoutSections = ({
    pageTitle,
    items,
    sectionId,
    resourceType,
    // linkPart,
}) => {
    const content = normalizedData(homepageData?.content || []);

    return (
        <Wrapper>
            <SEO pageTitle={pageTitle} />
            <Header />
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
