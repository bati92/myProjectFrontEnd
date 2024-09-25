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
import PropTypes from "prop-types";
import myStaticServices from "../data/my-static-services.json";
import withAuth from "@components/auth/withAuth";
import axios from "axios";

export async function getStaticProps() {
    return {
        props: {
            className: "home-sticky-pin sidebar-header position-relative",
        },
    };
}

const Home = ({ token }) => {
    const content = normalizedData(homepageData?.content || []);
    const [services, setServices] = useState(myStaticServices);

    useEffect(() => {
        // const token = localStorage.getItem("token");
        // const getUserData = async () => {
        //     try {
        //         const response = await axios.get(
        //             "http://127.0.0.1:8000/api/user",
        //             {
        //                 headers: {
        //                     Authorization: `Bearer ${token}`,
        //                 },
        //             }
        //         );
        //         if (response.ok) {
        //             const userData = await response.json();
        //             console.log(userData);
        //         } else {
        //             console.error("Failed to fetch user data");
        //         }
        //     } catch (error) {
        //         console.log("Error fetching totals:", error);
        //     }
        // };
        // getUserData();

        const fetchTotals = async () => {
            try {
                const result = await axios.get(
                    "http://127.0.0.1:8000/api/totalRecords",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
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
                    <TopBarArea />
                    <HeroArea data={content["hero-section"]} />
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

export default withAuth(Home);
