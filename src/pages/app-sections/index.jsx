import { getData } from "@utils/getData";
import PageLayout from "@components/page-layout";

export async function getServerSideProps(context) {
    const data = await getData(context.query.section_id, "app-sections");
    return {
        props: {
            ...data, // Pass the fetched data as props
            resourceType: "app", // You can pass this to identify the type
        },
    };
}

const Home = ({ myItems, sectionId, resourceType }) => {
    return (
        <PageLayout
            pageTitle="التطبيقات" // Page title in Arabic
            myApps={myItems} // Data fetched from the API
            sectionId={sectionId} // Section ID from the query
            resourceType={resourceType} // Optional: Identify resource type
        />
    );
};

export default Home;
