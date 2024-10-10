import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-02";
import Footer from "@layout/footer/footer-02";
import Breadcrumb from "@components/breadcrumb";
import CreateNewArea from "@containers/create-new";
import { getData } from "@utils/getData";
import TopBarArea from "@containers/top-bar";

export async function getServerSideProps(context) {
    const data = await getData(`transfer-money-firm/${context.query.transfer_id}`);
    return {
        props: {
            ...data
  
        },
    };
}
    

const Home = (data) => (
    <Wrapper>
        <SEO pageTitle="charge" />
        <Header />
        <TopBarArea  />
        <main id="main-content">
            <Breadcrumb pageTitle={data.myItems.transferMoneyFirm.name} />
            <CreateNewArea  data={data.myItems.transferMoneyFirm}/>
        </main>
        <Footer />
    </Wrapper>
);

export default Home;
