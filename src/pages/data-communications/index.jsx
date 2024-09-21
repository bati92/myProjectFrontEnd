import { getData } from "@utils/getData";
import PageLayoutServices from "@components/page-layout-services";
import myStaticServices from "../../data/my-static-services.json";

export async function getServerSideProps(context) {
    const data = await getData(`data-communications`);
    return {
        props: {
            ...data,
        },
    };
}

const Home = ({ myItems, className }) => {
    const item = myStaticServices.find(
        (item) => item.slug === "data-communication"
    );
    const hasSections = item ? item.hasSections : null;
    return (
        <PageLayoutServices
            pageTitle="البيانات والاتصالات"
            items={myItems?.dataCommunications?.data}
            resourceType="data-communication"
            hasSection={hasSections}
        />
    );
};

export default Home;
