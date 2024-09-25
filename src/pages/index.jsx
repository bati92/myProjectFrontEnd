// import React, { useEffect, useState } from "react";
// import SEO from "@components/seo";
// import Wrapper from "@layout/wrapper";
// import Header from "@layout/header/header-02";
// import Footer from "@layout/footer/footer-02";
// import TopBarArea from "@containers/top-bar";
// import HeroArea from "@containers/hero/layout-08";
// import ExploreServiceArea from "@containers/explore-service/service-sections";
// import { normalizedData } from "@utils/methods";

// // import react, { useState } from "react";
// import PropTypes from "prop-types";
// import clsx from "clsx";
// import Button from "@ui/button";
// import ErrorText from "@ui/error-text";
// import { useForm } from "react-hook-form";

import homepageData from "../data/homepages/home-08.json";
// import myStaticServices from "../data/my-static-services.json";
// import axios from "axios";

// export async function getStaticProps() {
//     // console.log("lobanalobanalobanalobanalobanalobanalobanalobana");

//     // const token = localStorage.getItem("lobana", "token");
//     // console.log(localStorage.getItem("token"), "lobana");
//     try {
//         const result = await axios.get(
//             "http://127.0.0.1:8000/api/totalRecords",
//             {
//                 headers: {
//                     Authorization: `Bearer ${token}`, // Include the token in the Authorization header
//                 },
//             }
//         );
//         const totalRecords = result.data;

//         return {
//             props: {
//                 // totalRecords: [],
//                 totalRecords: totalRecords,
//                 className: "home-sticky-pin sidebar-header position-relative",
//             },
//             // revalidate: 10,
//         };
//     } catch (error) {
//         console.log("Error fetching totals:", error);
//         return {
//             props: {
//                 totalRecords: [],
//                 className: "home-sticky-pin sidebar-header position-relative",
//             },
//             // revalidate: 10,
//         };
//     }
// }
// const Home = ({ totalRecords }) => {
//     const content = normalizedData(homepageData?.content || []);

//     const [services, setServices] = useState(myStaticServices);
//     // const updatedServices = services.map((service) => {
//     //     return {
//     //         ...service,
//     //         total: totalRecords[`${service.slug}Records`] || 0,
//     //     };
//     // });

//     // setServices(updatedServices);
//     // const fetchTotals = async () => {
//     //     try {
//     //         const result = await axios.get(
//     //             "http://127.0.0.1:8000/api/totalRecords"
//     //         );
//     //         const totalRecords = result.data;

//     //         const updatedServices = services.map((service) => {
//     //             return {
//     //                 ...service,
//     //                 total: totalRecords[`${service.slug}Records`] || 0,
//     //             };
//     //         });

//     //         setServices(updatedServices);
//     //     } catch (error) {
//     //         console.log("Error fetching totals:", error);
//     //     }
//     // };

//     // // Fetch totals when the component mounts
//     useEffect(() => {
//         console.log("lobanalobanalobanalobanalobanalobanalobanalobana");

//         const token = localStorage.getItem("lobana", "token");
//         console.log(localStorage.getItem("token"), "lobana");
//         // fetchTotals();
//         const updatedServices = services?.map((service) => {
//             return {
//                 ...service,
//                 total: totalRecords[`${service.slug}Records`] || 0,
//             };
//         });
//         setServices(updatedServices);
//     }, [totalRecords]);

//     return (
//         <Wrapper>
//             <SEO pageTitle="Home" />
//             <Header />
//             <main
//                 id="main-content"
//                 className="rn-nft-mid-wrapper nft-left-sidebar-nav pr--40 pr_sm--15"
//             >
//                 <div className="list-item-1">
//                     <TopBarArea />
//                     <HeroArea data={content["hero-section"]} />
//                 </div>
//                 <ExploreServiceArea
//                     id="list-item-3"
//                     space={2}
//                     data={{
//                         ...content["explore-product-section"],
//                         products: services, // Use updated services array
//                     }}
//                 />
//             </main>
//             <Footer className="pr--40" />
//         </Wrapper>
//     );
// };

// export default Home;
import React, { useEffect, useState } from "react";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-02";
import Footer from "@layout/footer/footer-02";
import TopBarArea from "@containers/top-bar";
import HeroArea from "@containers/hero/layout-08";
import ExploreServiceArea from "@containers/explore-service/service-sections";
import { normalizedData } from "@utils/methods";
import PropTypes from "prop-types";
import myStaticServices from "../data/my-static-services.json";
import axios from "axios";

export async function getStaticProps() {
    // This will fetch data that does not require authentication
    return {
        props: {
            className: "home-sticky-pin sidebar-header position-relative",
        },
    };
}

const Home = () => {
    const content = normalizedData(homepageData?.content || []);
    const [services, setServices] = useState(myStaticServices);

    useEffect(() => {
        const getUserData = async () => {
            const token = localStorage.getItem("token");

            const response = await fetch("http://127.0.0.1:8000/api/user", {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const userData = await response.json();
            } else {
                console.error("Failed to fetch user data");
            }
        };

        getUserData();

        const fetchTotals = async () => {
            const token = localStorage.getItem("token");

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

        fetchTotals(); // Call the function to fetch totals on component mount
    }, []); // Empty dependency array ensures this runs once

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
                        products: services, // Use updated services array
                    }}
                />
            </main>
            <Footer className="pr--40" />
        </Wrapper>
    );
};

export default Home;
