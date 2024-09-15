import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ProductArea from "@containers/explore-product/layout-01";
import axios from "axios";

export async function getStaticProps() {
    try {
        const result = await axios.get("http://127.0.0.1:8000/api/app");
        console.log(result.data.apps.data);
        console.log("http://127.0.0.1:8000/api/app");
        return {
            props: {
                className: "template-color-1",
                myApps: result.data.apps.data,
            },
        };
    } catch {
        return {
            props: {
                className: "template-color-1",
            },
        };
    }
}

const Product = ({ myApps }) => (
    <Wrapper>
        <SEO pageTitle="Apps" />
        <Header />
        <main id="main-content">
            <Breadcrumb pageTitle="Our Apps" currentPage="Our Apps" />
            {myApps ? (
                <ProductArea data={{ products: myApps }} />
            ) : (
                <span>لا يوجد تطبيقات</span>
            )}
        </main>
        <Footer />
    </Wrapper>
);

export default Product;
