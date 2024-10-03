import PropTypes from "prop-types";
import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-02";
import Footer from "@layout/footer/footer-02";
import CTAArea from "@containers/cta";
import { normalizedData } from "@utils/methods";
import { getData } from "@utils/getData";
import aboutData from "../../data/innerpages/about.json";
import { useState, useEffect } from "react";

export async function getStaticProps() {
    return {
        props: {
            className: "template-color-1",
        },
    };
}

const About = () => {
    const [aboutUsData, setAboutUsData] = useState({});
    useEffect(() => {
        const fetchsetting = async () => {
            const data = await getData(`about-us`);
            setAboutUsData(data.myItems.setting);
        };
        fetchsetting();
    }, []);
    const content = normalizedData(aboutData?.content || []);
    return (
        <Wrapper>
            <SEO pageTitle="About" />
            <Header />
            <main id="main-content">
                <CTAArea data={aboutUsData} />
            </main>
            <Footer />
        </Wrapper>
    );
};

About.propTypes = {
    posts: PropTypes.arrayOf(PropTypes.shape({})),
};

export default About;
