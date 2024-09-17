import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-02";
import Footer from "@layout/footer/footer-02";
import ExploreServiceCategoryArea from "@containers/explore-service/service-categories";
import { normalizedData } from "@utils/methods";
import homepageData from "../../data/homepages/home-08.json";
import axios from "axios";

export async function getStaticProps() {
    try {
        const result = await axios.get(
            "http://127.0.0.1:8000/api/app-sections"
        );
        console.log(result.data.app_sections.data);
        console.log("http://127.0.0.1:8000/api/app-sections");
        return {
            props: {
                className: "home-sticky-pin sidebar-header position-relative",
                myApps: result?.data?.app_sections?.data,
            },
        };
    } catch (error) {
        console.log(error);

        return {
            props: {
                className: "home-sticky-pin sidebar-header position-relative",
            },
        };
    }
}

const Home = ({ myApps }) => {
    const content = normalizedData(homepageData?.content || []);

    return (
        <Wrapper>
            <SEO pageTitle="اقسام التطبيقات" />
            <Header />
            <main
                id="main-content"
                className="rn-nft-mid-wrapper nft-left-sidebar-nav pr--40 pr_sm--15 pt-5"
            >
                {!myApps || myApps.length === 0 ? (
                    <h2 className="text-center">لا توجد بيانات متاحة</h2>
                ) : (
                    <ExploreServiceCategoryArea
                        sectionTitle="اقسام التطبيقات"
                        id="list-item-3"
                        space={2}
                        data={{
                            ...content["explore-product-section"],
                            parentSlug: "app",
                            products: myApps,
                        }}
                    />
                )}
            </main>
            <Footer className="pr--40" />
        </Wrapper>
    );
};

export default Home;
