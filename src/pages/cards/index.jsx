import { getData } from "@utils/getData";
import PageLayoutServices from "@components/page-layout-services";
import myStaticServices from "../../data/my-static-services.json";

export async function getServerSideProps(context) {
    const data = await getData(`cards`);
    return {
        props: {
            ...data,
        },
    };
}

const Home = ({ myItems, className }) => {
    const item = myStaticServices.find((item) => item.slug === "card");
    const hasSections = item ? item.hasSections : null;
    return (
        <PageLayoutServices
            pageTitle="البطاقات"
            items={myItems?.cards?.data}
            resourceType="card"
            hasSection={hasSections}
        />
    );
};

export default Home;
