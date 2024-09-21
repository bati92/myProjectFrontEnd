import { getData } from "@utils/getData";
import PageLayoutServices from "@components/page-layout-services";
import myStaticServices from "../../data/my-static-services.json";

export async function getServerSideProps(context) {
    const data = await getData(`programs`);
    return {
        props: {
            ...data,
        },
    };
}

const Home = ({ myItems, className }) => {
    const item = myStaticServices.find((item) => item.slug === "program");
    const hasSections = item ? item.hasSections : null;
    return (
        <PageLayoutServices
            pageTitle="البرامج"
            items={myItems?.programs?.data}
            resourceType="program"
            hasSection={hasSections}
        />
    );
};

export default Home;
