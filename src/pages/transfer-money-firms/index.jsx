import { getData } from "@utils/getData";
import PageLayoutServices from "@components/page-layout-services";
import myStaticServices from "../../data/my-static-services.json";

export async function getServerSideProps(context) {
    const data = await getData(`transfer-money-firms`);
    return {
        props: {
            ...data,
        },
    };
}

const Home = ({ myItems, className }) => {
    const item = myStaticServices.find(
        (item) => item.slug === "transfer-money-firm"
    );
    const hasSections = item ? item.hasSections : null;
    return (
        <PageLayoutServices
            pageTitle="شركات تحويل الاموال"
            items={myItems?.transferMoneyFirms?.data}
            resourceType="transfer-money-firm"
            hasSection={hasSections}
        />
    );
};

export default Home;
