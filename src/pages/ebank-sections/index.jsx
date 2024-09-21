import { getData } from "@utils/getData";
import PageLayoutSections from "@components/page-layout-sections";

export async function getServerSideProps(context) {
    const data = await getData("ebank-sections");
    return {
        props: {
            ...data,
        },
    };
}

const Home = ({ myItems, className }) => {
    return (
        <PageLayoutSections
            pageTitle="البنوك الإلكترونية"
            items={myItems?.ebankSections?.data}
            resourceType="ebank"
        />
    );
};

export default Home;
