import { normalizedData } from "@utils/methods";
import homepageData from "../../data/homepages/home-08.json";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-02";
import Footer from "@layout/footer/footer-02";
import ExploreServiceArea from "@containers/explore-service/all-services";

const PageLayoutSection = ({
    pageTitle,
    items,
    sectionId,
    resourceType,
    hasSection,
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
                        sectionTitle={pageTitle}
                        id="list-item-3"
                        space={2}
                        hasSection={hasSection}
                        data={{
                            ...content["explore-product-section"],
                            parentSlug: resourceType,
                            sectionId: sectionId,
                            products: items,
                        }}
                    />
                )}
            </main>
            <Footer className="pr--40" />
        </Wrapper>
    );
};

export default PageLayoutSection;
