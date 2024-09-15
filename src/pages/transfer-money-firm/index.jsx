import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-02";
import Footer from "@layout/footer/footer-02";
import ExploreProductArea from "@containers/explore-product/layout-09";
import { normalizedData } from "@utils/methods";

// Demo data
import homepageData from "../../data/homepages/home-08.json";
import axios from "axios";

export async function getStaticProps() {
    try {
        const result = await axios.get(
            "http://127.0.0.1:8000/api/transfer-money-firm"
        );
        console.log(result.data.transfer_money_firms.data);
        console.log("http://127.0.0.1:8000/api/transfer-money-firm");
        return {
            props: {
                className: "home-sticky-pin sidebar-header position-relative",
                myTransferMoneyFirms: result.data.transfer_money_firms.data,
            },
        };
    } catch {
        console.log("error");

        return {
            props: {
                className: "home-sticky-pin sidebar-header position-relative",
            },
        };
    }
}

const Home = ({ myTransferMoneyFirms }) => {
    const content = normalizedData(homepageData?.content || []);
    // const liveAuctionData = myDataCommunications
    //     .filter(
    //         (prod) =>
    //             prod?.auction_date && new Date() <= new Date(prod?.auction_date)
    //     )
    //     .sort(
    //         (a, b) =>
    //             Number(new Date(b.published_at)) -
    //             Number(new Date(a.published_at))
    //     )
    //     .slice(0, 4);
    return (
        <Wrapper>
            <SEO pageTitle="شركات الشحن" />
            <Header />
            <main
                id="main-content"
                className="rn-nft-mid-wrapper nft-left-sidebar-nav pr--40 pr_sm--15 pt-5"
            >
                {!myTransferMoneyFirms || myTransferMoneyFirms == [] ? (
                    <h2 className="text-center">لا توجد بيانات متاحة</h2>
                ) : (
                    <ExploreProductArea
                        sectionTitle="شركات الشحن"
                        id="list-item-3"
                        space={2}
                        data={{
                            ...content["explore-product-section"],
                            products: myTransferMoneyFirms,
                        }}
                    />
                )}
            </main>
            <Footer className="pr--40" />
        </Wrapper>
    );
};

export default Home;
