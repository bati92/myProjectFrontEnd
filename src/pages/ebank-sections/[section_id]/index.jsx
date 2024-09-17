import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-02";
import Footer from "@layout/footer/footer-02";
import ExploreServiceArea from "@containers/explore-service/all-services";
import { normalizedData } from "@utils/methods";
import homepageData from "../../../data/homepages/home-08.json";
import axios from "axios";

export async function getServerSideProps(context) {
    try {
        const result = await axios.get(
            `http://127.0.0.1:8000/api/app-sections/${context.query.section_id}`
        );
        console.log(result.data.apps);
        console.log(
            `http://127.0.0.1:8000/api/app-sections/${context.query.section_id}`
        );
        return {
            props: {
                className: "home-sticky-pin sidebar-header position-relative",
                myApps: result?.data?.apps,
                sectionId: context.query.section_id,
            },
        };
    } catch (error) {
        console.log(error);

        return {
            props: {
                className: "home-sticky-pin sidebar-header position-relative",
                sectionId: context.query.section_id,
            },
        };
    }
}

const Home = ({ myApps, sectionId }) => {
    const content = normalizedData(homepageData?.content || []);

    return (
        <Wrapper>
            <SEO pageTitle=" التطبيقات" />
            <Header />
            <main
                id="main-content"
                className="rn-nft-mid-wrapper nft-left-sidebar-nav pr--40 pr_sm--15 pt-5"
            >
                {!myApps || myApps.length === 0 ? (
                    <h2 className="text-center">لا توجد بيانات متاحة</h2>
                ) : (
                    <ExploreServiceArea
                        sectionTitle=" التطبيقات"
                        id="list-item-3"
                        space={2}
                        data={{
                            ...content["explore-product-section"],
                            parentSlug: "app",
                            sectionId: sectionId,
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
