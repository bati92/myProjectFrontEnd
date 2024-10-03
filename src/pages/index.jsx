import React, { useEffect, useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-02";
import Footer from "@layout/footer/footer-02";
import TopBarArea from "@containers/top-bar";
import HeroArea from "@containers/hero/layout-08";
import homepageData from "../data/homepages/home-08.json";
import ExploreServiceArea from "@containers/explore-service/service-sections";
import { normalizedData } from "@utils/methods";
import myStaticServices from "../data/my-static-services.json";
import axios from "axios";

export async function getStaticProps() {
    return {
        props: {
            className: "home-sticky-pin sidebar-header position-relative",
        },
    };
}

const Home = () => {
    const content = normalizedData(homepageData?.content || []);
    const [services, setServices] = useState(myStaticServices);
    const [slider, setSlider] = useState([]);

    useEffect(() => {
        const fetchSlider = async () => {
            try {
                const result = await axios.get(
                    "http://127.0.0.1:8000/api/slider"
                );
                setSlider(result.data.slider.data);
            } catch (error) {
                console.log("Error fetching slider:", error);
            }
        };
        fetchSlider();

        const fetchTotals = async () => {
            try {
                const result = await axios.get(
                    "http://127.0.0.1:8000/api/totalRecords"
                );
                const fetchedTotalRecords = result.data;

                const updatedServices = services.map((service) => {
                    return {
                        ...service,
                        total:
                            fetchedTotalRecords[`${service.slug}Records`] || 0,
                    };
                });
                setServices(updatedServices);
            } catch (error) {
                console.log("Error fetching totals:", error);
            }
        };
        fetchTotals();
   


    }, []);

    return (
        <Wrapper>
            <SEO pageTitle="Home" />
            <Header />
            <main
                id="main-content"
                className="rn-nft-mid-wrapper nft-left-sidebar-nav pr--40 pr_sm--15"
            >
                <div className="list-item-1">
                    <TopBarArea  />
                    <HeroArea data={slider} />
                </div>
                <ExploreServiceArea
                    id="list-item-3"
                    space={2}
                    data={{
                        ...content["explore-product-section"],
                        products: services,
                    }}
                />
            </main>
            <Footer className="pr--40" />
        </Wrapper>
    );
};

export default Home;
