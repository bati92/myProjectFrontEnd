import { getData } from "@utils/getData";
import PageLayoutSections from "@components/page-layout-sections";

export async function getServerSideProps(context) {
    const data = await getData("app-sections");
    return {
        props: {
            ...data,
        },
    };
}

const Home = ({ myItems, className }) => {
    return (
        <PageLayoutSections
            pageTitle="التطبيقات"
            items={myItems?.appSections?.data}
            resourceType="app"
        />
    );
};

export default Home;
